<template>
	<view class="body">
		<view class="user-set-userinfo-list u-f-ac u-f-jsb">
			<view>头像</view>
			<view class="u-f-ac" @tap='changeimg'>
				<image :src="userpic" mode="aspectFill" lazy-load></image>
				<view class="icon iconfont icon-qiandao"></view>
			</view>
		</view>

		<view class="user-set-userinfo-list u-f-ac u-f-jsb">
			<view>名称</view>
			<view class="u-f-ac">
				<input type="text" v-model="username" />
				<view class="icon iconfont icon-qiandao"></view>
			</view>
		</view>

		<view class="user-set-userinfo-list u-f-ac u-f-jsb">
			<view>性别</view>
			<view class="u-f-ac" @tap="changeinfo('sex')">
				<view>{{sexarr[sex]}}</view>
				<view class="icon iconfont icon-qiandao"></view>
			</view>
		</view>

		<view class="user-set-userinfo-list u-f-ac u-f-jsb">
			<view>生日</view>
			<picker mode="date" :value="birthday" :start="startDate" :end="endDate" @change="bindDateChange">
				<view class="u-f-ac">
					<view>{{birthday}}</view>
					<view class="icon iconfont icon-qiandao"></view>
				</view>
			</picker>
		</view>

		<view class="user-set-userinfo-list u-f-ac u-f-jsb">
			<view>情感</view>
			<view class="u-f-ac" @tap="changeinfo('qinggan')">
				<view>{{qgarr[qinggan]}}</view>
				<view class="icon iconfont icon-qiandao"></view>
			</view>
		</view>

		<view class="user-set-userinfo-list u-f-ac u-f-jsb">
			<view>职业</view>
			<view class="u-f-ac" @tap="changeinfo('job')">
				<view>{{job}}</view>
				<view class="icon iconfont icon-qiandao"></view>
			</view>
		</view>

		<view class="user-set-userinfo-list u-f-ac u-f-jsb">
			<view>家乡</view>
			<view class="u-f-ac" @tap="openAddres">
				<view>{{pickerText}}</view>
				<view class="icon iconfont icon-qiandao"></view>
			</view>

		</view>
		<simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor="#007AFF">
		</simple-address>


		<button type="primary" @tap="submit" class="user-set-btn">修改完成</button>
	</view>
</template>

<script>
	let sexlist = ['男', '女', '保密']
	let qingganlist = ['已婚', '未婚', '保密']
	let joblist = ['javascript', 'java', 'php']
	import simpleAddress from '../../common/snajichengshiliandong/simple-address/simple-address.nvue'
	import Time from "../../common/time.js"
	export default {
		components: {
			simpleAddress
		},
		onLoad() {
			this.userpic = this.user.userinfo.userpic;
			this.username = this.user.userinfo.username;
			this.sex = this.user.userinfo.userinfo.sex || 0;
			this.qinggan = this.user.userinfo.userinfo.qg || 0;
			this.job = this.user.userinfo.userinfo.job || "请填写";
			this.birthday = this.user.userinfo.userinfo.birthday || "请填写";
			this.pickerText = this.user.userinfo.userinfo.path || "请填写";

		},
		data() {
			return {
				sexarr: sexlist,
				qgarr: qingganlist,
				userpic: '',
				username: '',
				sex: 0,
				qinggan: 0,
				job: '',
				birthday: '', //生日相关
				cityPickerValueDefault: [0, 0, 1], //三级联动相关
				pickerText: '' //三级联动相关
			}
		},
		//生日
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			//打开三级联动事件
			openAddres() {
				this.cityPickerValueDefault = [0, 0, 1]
				this.$refs.simpleAddress.open();
			},
			//三级联动城市
			onConfirm(e) {
				this.pickerText = e.label
			},
			//生日相关
			bindDateChange(e) {
				this.birthday = e.target.value
			},
			//生日相关
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			//修改性别
			changeinfo(e) {
				switch (e) {
					case 'sex':
						uni.showActionSheet({ //弹出操作菜单
							itemList: sexlist,
							success: (e) => {
								this.sex = e.tapIndex
								// console.log(JSON.stringify(e))
							}
						})
						break;
					case 'qinggan':
						uni.showActionSheet({ //弹出操作菜单
							itemList: qingganlist,
							success: (e) => {
								this.qinggan = e.tapIndex
								// console.log(JSON.stringify(e))
							}
						})
						break;
					case 'job':
						uni.showActionSheet({ //弹出操作菜单
							itemList: joblist,
							success: (e) => {
								this.job = joblist[e.tapIndex]
								// console.log(JSON.stringify(e))
							}
						})
						break;
				}
			},
			async submit() {
				let obj = {
					name: this.username,
					sex: this.sex,
					qg: this.qinggan,
					job: this.job,
					birthday: this.birthday,
					path: this.pickerText,
					age: Time.gettime.getAgeByBirthday(this.birthday)
				}
				let [err, res] = await this.$http.post('/edituserinfo', obj, {
					token: true,
					checktoken: true
				});
				// 请求失败处理
				if (!this.$http.errorcheck(err, res)) return;
				// 成功
				uni.showToast({
					title: '修改成功！'
				});
				// 修改状态，缓存
				this.user.userinfo.username = this.username;
				this.user.userinfo.userinfo = obj;
				uni.setStorageSync('userinfo', this.user.userinfo);
			},
			//修改头像
			async changeimg() {
				let [err, res] = await uni.chooseImage({
					count: 1,
					sizeType: ['compressed']
				});
				if (!res) return;
				// 上传
				uni.showLoading({
					title: '上传中...',
					mask: false
				});
				let [err2, res2] = await this.$http.uplod('/edituserpic', {
					name: 'userpic',
					filePath: res.tempFilePaths[0],
					token: true,
					checktoken: true
				});
				// 请求失败
				let data = JSON.parse(res2.data);
				// 上传失败
				if (err2 || data.errorCode) {
					uni.showToast({
						title: data.msg ? data.msg : '上传失败',
						icon: "none"
					});
					uni.hideLoading();
					return false;
				}
				// 成功
				uni.hideLoading();
				uni.showToast({
					title: '修改头像成功!'
				});
				this.userpic = data.data;
				// 修改状态，存储
				this.user.userinfo.userpic = this.userpic;
				uni.setStorageSync("userinfo", this.user.userinfo);
			}
		}
	}
</script>

<style>
	.user-set-btn {
		width: 100%;
		margin: 20upx 0;
		background-color: #ffe933;
		color: #000000;
	}

	.user-set-btn-disable {
		background-color: #F4F4F4 !important;
		border: 1upx solid #EEEEEE !important;
		color: #909090 !important;
	}


	.user-set-userinfo-list {
		padding: 20upx;
		border-bottom: 1upx solid #CCCCCC;
	}

	.user-set-userinfo-list>view:first-child {
		font-size: 32upx;
		font-weight: bold;
		color: #9b9b9b;
	}

	.user-set-userinfo-list>view:last-child>image {
		width: 80upx;
		height: 80upx;
		border-radius: 100%;
	}

	.user-set-userinfo-list>view:last-child>input {
		text-align: right;
		/* 设置input中的文字对齐方式 */

	}

	.user-set-userinfo-list>view:last-child>view:last-of-type {
		margin-left: 20upx;
		color: #9b9b9b;
	}
</style>
