<template>
	<view class="body">
		<input type="password" v-if="haspassword==true" v-model="oldpassword" class="uni-input" placeholder="输入旧密码" />
		<input type="password" v-model="newpassword" class="uni-input" placeholder="输入新密码" />
		<input type="password" v-model="renewpassword" class="uni-input" placeholder="确认新密码" />
		<button :disabled="disabled" type="primary" @tap="submit" class="user-set-btn" :class="{'user-set-btn-disable':disabled}">修改完成</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				haspassword: false,//用户之前是否设置过密码
				oldpassword: '',
				newpassword: "",
				renewpassword: "",
				disabled: true
			}
		},
		watch: {
			oldpassword() {
				this.change()
			},
			newpassword() {
				this.change()
			},
			renewpassword() {
				this.change()
			}
		},
		onLoad(e) {
			this.haspassword = !!(e.password && e.password !== "false");
		},
		methods: {
			change() { //按钮验证
				// if(this.oldpassword && this.newpassword && this.renewpassword){
				// 	this.disabled=false
				// }else{
				// 	this.disabled=true
				// }
				if (this.newpassword && this.renewpassword) {
					this.disabled = false
					return
				}
				if (this.haspassword && !this.oldpassword) {
					this.disabled = true
					return
				}
				this.disabled = true
			},
			checkpassword() { //验证层
				if (this.haspassword && (!this.oldpassword || this.oldpassword == "")) {
					uni.showToast({
						title: '旧密码不能为空',
						icon: "none"
					});
					return false;
				}
				if (!this.newpassword || this.newpassword == '') {
					uni.showToast({
						title: "新密码不能为空",
						icon: 'none'
					})
					return false;
				}
				if (!this.renewpassword || this.renewpassword == '') {
					uni.showToast({
						title: "确认密码不能为空",
						icon: 'none'
					})
					return false;
				}
				if (this.renewpassword !== this.newpassword) {
					uni.showToast({
						title: '密码不一致',
						icon: 'none'
					})
					return false;
				}
				return true
			},
			async submit() {
				if (!this.checkpassword()) return;
				this.disabled = true;
				let [err, res] = await this.$http.post('/repassword', {
					oldpassword: this.oldpassword || 0,
					newpassword: this.newpassword,
					renewpassword: this.renewpassword,
				}, {
					token: true,
					checktoken: true
				})
				if (!this.$http.errorcheck(err, res)) {
					this.disabled = false;
					return;
				}
				// 修改状态，缓存
				this.user.userinfo.password = true;
				uni.setStorageSync('userinfo', this.user.userinfo);
				this.disabled = false;
				return uni.showToast({
					title: '修改密码成功！',
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
