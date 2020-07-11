import $http from "./request.js"
export default {
	token: false,
	userinfo: false,
	//用户相关统计
	counts: {},
	//用户绑定第三登录的情况
	userbind: false,
	checkAuth: true,
	//初始化数据
	__init() { //取出相应数据存在此类
		this.userinfo = uni.getStorageSync('userinfo')
		this.token = uni.getStorageSync('token')
		this.counts = uni.getStorageSync('counts')
		this.userbind = uni.getStorageSync('userbind')
		this.OnUserCounts()
		/* 	this.token=false
			this.userinfo=false
			this.counts={}
			this.userbind=false
			uni.removeStorageSync('userinfo')
			uni.removeStorageSync('token')
			uni.removeStorageSync('counts')
			uni.removeStorageSync('userbind') */
	},
	// 监听用户统计变化
	OnUserCounts() {
		uni.$on('updatedata', (data) => {
			// 文章数+1
			if (data.type == 'updateList') {
				this.counts.post_count++;
			}
			// 评论数+1
			if (data.type == 'updateComment') {
				this.counts.comments_count++;
			}
			// // 粉丝数和关注数变化
			if (data.type == 'guanzhu') {
				data.data ?
					this.counts.withfollow_count++
					:
					this.counts.withfollow_count--;
			}
			// 更新缓存
			uni.setStorageSync("counts", this.counts);
		})
	},
	//登录
	async login(options = {}) {
		let [err, res] = await $http.post(options.url, options.data)
		if (!$http.errorcheck(err, res)) {
			return false
		};
		//登录成功保存用户数据
		this.token = res.data.data.token
		this.userinfo = this.__formatUserinfo(res.data.data)
		//本地存储

		uni.setStorageSync('userinfo', this.userinfo)
		uni.setStorageSync('token', this.token)
		//获取用户相关统计
		await this.getCounts()
		//连接websoket
		//成功提示
		uni.showToast({
			title: "登录成功"
		})
		//返回上一步
		if (!options.Noback) {
			uni.navigateBack({
				delta: 1
			})
		}
		return true
	},
	//用户查看,添加到浏览历史中
	addHistoryList(item) {
		// 取出缓存
		let list = uni.getStorageSync('HistoryList_' + this.userinfo.id);
		list = list ? JSON.parse(list) : [];
		// 查看当前记录是否存在
		let index = list.findIndex((val) => {
			return val.id === item.id;
		})
		// 不存在直接追加
		if (index == -1) {
			list.push(item);
			uni.setStorageSync('HistoryList_' + this.userinfo.id, JSON.stringify(list))
			console.log("加入缓存成功");
		}
	},
	// 清除浏览历史
	clearHistory(){
		uni.removeStorageSync('HistoryList_'+this.userinfo.id);
	},
	//退出登录
	async logout() {
		let showToast = true
		await $http.post('/user/logout', {}, {
			token: true
		})
		uni.removeStorageSync('userinfo')
		uni.removeStorageSync('token')
		uni.removeStorageSync('counts')
		this.token = false
		this.userinfo = false
		this.userbind = false
		this.counts = {}
		uni.switchTab({
			url: "../home/home"
		})
		if (showToast) {
			return uni.showToast({
				title: "退出成功"
			})
			showToast = false
		}
	},
	//获取用户第三方绑定情况
	async getuserbind() {
		let [err, res] = await $http.get('/user/getuserbind', {}, {
			token: true,
			checktoken: true
		})
		if (!$http.errorcheck(err, res)) return false;
		this.userbind = res.data.data
		uni.setStorageSync('userbind', this.userbind)
		return true
	},
	//请求用户相关统计../home/home
	async getCounts() {
		let [err, res] = await $http.get('/user/getcounts'+this.userinfo.id, {}, {
			token: true
		})
		if (!$http.errorcheck(err, res)) return
		this.counts = res.data.data
		uni.setStorageSync('counts', this.counts)
	},
	//格式转换
	__formatUserinfo(obj) {
		if (obj.logintype == 'username' || obj.logintype == 'email' || obj.logintype == 'phone') {
			//设置默认头像
			obj.userpic = obj.userpic || 'http://pic1.zhimg.com/50/v2-ede9473ddcbd84fe7c1e363953ed7410_hd.jpg'
			return obj
		}
		//第三方登录绑定手机的用户
		if (obj.user && obj.user_id > 0) {
			return {
				id: obj.user.id,
				username: obj.nickname,
				userpic: obj.avatarurl,
				phone: obj.user.phone,
				email: obj.user.email,
				status: obj.user.status,
				create_time: obj.user.create_time,
				logintype: obj.logintype,
				password: obj.user.password,
				token: obj.token,
				userinfo: {
					id: obj.user.userinfo.id,
					user_id: obj.user.userinfo.user_id,
					age: obj.user.userinfo.age,
					sex: obj.user.userinfo.sex,
					qg: obj.user.userinfo.qg,
					job: obj.user.userinfo.job,
					path: obj.user.userinfo.path,
					birthday: obj.user.userinfo.birthday,
				}
			}
		}
		//第三方登录未绑定的用户
		// console.log(obj)
		// console.log(obj.token)
		return {
			id: obj.id,
			username: obj.nickname,
			userpic: obj.avatarurl,
			phone: false,
			email: false,
			status: 1,
			create_time: false,
			logintype: obj.logintype,
			token: obj.token,
			userinfo: false
		}
	},
	//第三方登录格式转换
	__formatOtherlogin(provider, options) {
		return {
			provider: provider,
			openid: options.userInfo.unionId || options.userInfo.openId,
			expires_in: options.authResult.expires_in,
			nickName: options.userInfo.nickName,
			avatarUrl: options.userInfo.avatarUrl
		}
	},
	//权限验证
	navigateTo(options, type = 'navigateTo') {
		if (!this.token) {
			uni.showToast({
				title: "请登录",
				icon: "none"
			})
			return uni.navigateTo({
				url: "../login/login"
			})
		}
		//验证是否登录

		// if(!$http.checkAuth(true)) return 
		// if (!NoCheck) {
		// 	if (!$http.checkAuth(true)) return;
		// }
		//验证是否绑定手机号(验证用户操作权限)
		// if(!$http.checkAuth(true)) return
		// if (this.checkAuth && !this.userinfo.phone) {
		// 	uni.showToast({
		// 		title: "请先绑定手机号码",
		// 		icon: "none"
		// 	})
		// 	return uni.navigateTo({
		// 		url: "../user-bind-phone/user-bind-phone"
		// 	})
		// }
		switch (type) {
			case 'navigateTo':
				uni.navigateTo(options)
				break;
			case 'switchTab':
				uni.switchTab(options)
				break;
			case 'navigateBack':
				uni.switchTab(options)
				break;
		}
	}
}
