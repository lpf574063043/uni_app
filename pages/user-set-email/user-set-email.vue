<template>
	<view class="body">
		<input type="text" v-model="email" class="uni-input" placeholder="输入邮箱" />

		<!-- <input type="password" v-model="password" class="uni-input" placeholder="输入密码"/> -->
		<button :disabled="disabled || isbind" type="primary" @tap="submit" class="user-set-btn" :class="{'user-set-btn-disable':disabled||isbind}">{{isbind?'已绑定':'立即绑定'}}</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isbind: false,
				email: '',
				password: '',
				disabled: true
			}
		},
		onShow() {
			// let e=uni.getStorageSync('userinfo').email
			// if(e!=='' && e!==false && e!==null){
			// 	this.email=e
			// }
		},
		watch: {
			email() {
				this.change()
			},
			// password(){
			// 	this.change()
			// }
		},
		onLoad(e) {
			if (e.email && e.email !== 'false' && e.email !== 'null') {
				this.email = e.email
				this.disabled = true
				this.isbind = true
			}
		},
		methods: {
			change() {//验证是否输入来设置disabled
				if (this.email) {
					this.disabled = false
				} else {
					this.disabled = true
				}
			},
			checkemail() {//验证层
				let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
				if (!this.email || this.email == '') {
					uni.showToast({
						title: "邮箱不能为空",
						icon: 'none'
					})
					return false;
				} else if (!reg.test(this.email)) {
					uni.showToast({
						title: "邮箱格式不正确",
						icon: 'none'
					})
					return false;
				}
				return true
			},
			async submit() {
				if (!this.checkemail()) return;
				this.disabled = true;
				let [err, res] = await this.$http.post('/user/bindemail', {
					email: this.email
				}, {
					token: true,
					checktoken: true
				});
				// let [err,res]=await uni.request({
				// 	url: '/user/bindemail',
				// 	method: 'post',
				// 	data: {email: this.email},
				// 	header:{
				// 		'token':uni.getStorageSync('userinfo').token
				// 	}
				// });
				if (!this.$http.errorcheck(err, res)) {
					return this.disabled = false;
				}
				console.log(res+this.email)
				// 绑定成功
				this.isbind = true;
				this.disabled = false;
				// 修改状态，缓存
				this.user.userinfo.email = this.email;
				uni.setStorageSync("userinfo", this.user.userinfo);
				return uni.showToast({
					title: '绑定成功！',
					success: () => {
						uni.navigateBack({
							delta: 1
						});
					}
				});
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

	.uni-input {
		font-size: 30upx;
		border-bottom: 1upx solid #F4F4F4;
		margin-bottom: 20upx;
	}

	.user-set-btn-disable {
		background-color: #F4F4F4 !important;
		border: 1upx solid #EEEEEE !important;
		color: #909090 !important;
	}
</style>
