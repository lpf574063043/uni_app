import config from './confog.js'
import user from './user.js'
export default {
	config: {
		baseurl: config.weburl,
		header: {
			'Content-Type': 'application/json;charset=UTF-8',
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: {},
		method: "GET",
		dataType: "json"
	},
	uplod(url, options = {}) {
		options.url = this.config.baseurl + url
		options.header = options.header || this.config.header
		options.fileType = options.fileType || "image"
		options.formData = options.formData || {}
		options.filePath = options.filePath
		options.name = options.name
		if (options.token) {
			// options.header.token=user.token
			if (options.checktoken && !options.token) {
				uni.showToast({
					title: "请登录",
					icon: "none"
				})
				return uni.switchTab({
					url: "../home/home"
				})
			}
			options.header.token = user.token
		}
		return uni.uploadFile(options)
	},
	request(options = {}) {
		options.header = options.header || this.config.header
		options.method = options.method || this.config.method
		options.dataType = options.dataType || this.config.dataType
		options.url = this.config.baseurl + options.url
		if (options.token) {
			if (options.checktoken && !user.token) { //checktoken验证touken,token传入的tooken
				uni.showToast({
					title: '请登录',
					icon: 'none'
				})
				return uni.navigateTo({
					url: options.loginurl
				})
			}
			// if(!this.checktoken(options.checktoken))return
			// if(!this.checkAuth(options.checkAuth)) return
			// if(options.checktoken){
			// 	if(!user.token){
			// 		uni.showToast({
			// 			title:'请登录',
			// 			icon:'none'
			// 		})
			// 		return uni.navigateTo({
			// 			url:options.loginurl
			// 		})
			// 	}
			// }
			if (options.checkAuth && !user.userinfo.phone) {
				uni.showToast({
					title: "请登录",
					icon: "none"
				})
				return uni.navigateTo({
					url: "../user-bind-phone/user-bind-phone"
				})
			}
			options.header.token = user.token //吧usertoken
		}
		return uni.request(options)
	},
	get(url, data, options = {}) {
		options.url = url
		options.data = data
		options.method = 'GET'
		return this.request(options)
	},
	post(url, data, options = {}) {
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	},
	errorcheck(err, res, errfun = false, resfun = false) {
		if (err) {
			typeof errfun === 'function' && errfun()
			uni.showToast({
				title: "加载失败",
				icon: "none"
			})
			return false
		}
		if (res.data.errorCode) {
			typeof resfun === 'function' && resfun()
			uni.showToast({
				title: res.data.msg,
				icon: "none"
			})
			return false
		}
		return true
	},
	// checkAuth(checkAuth){
	// 	//验证用户权限
	// 	if(checkAuth && !user.userinfo.phone){//checktoken验证touken,token传入的tooken
	// 		uni.showToast({title:'请先绑定手机号码',icon:'none'})
	// 		uni.navigateTo({url:'../user-bind-phone/user-bind-phone'})
	// 		return false
	// 	}
	// 	return true
	// }
}
