<template>
	<view class="u-f-jsb u-f-ac home-list-item" hover-class="home-list-hover" @tap="open">
		<view class="u-f-ac">
			<view v-if="item.icon" class="icon iconfont" :class="['icon-'+item.icon]"></view>{{item.name}}
		</view>
		<!-- <view class="icon iconfont" :class="{'icon-jinru':!item.data}">{{item.data||''}}</view> -->
		<view class="icon iconfont" :class="item.data?'':'icon-jinru'">{{item.data||''}}</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: Object,
			index: Number
		},
		methods: {
			open() {
				switch (this.item.clicktype) {
					case 'navigateTo':
						if (this.item.url) {
							uni.navigateTo({
								url: this.item.url
							});
						}
						break;
					case 'switchTab':
						if (this.item.url) {
							uni.switchTab({
								url: this.item.url
							})
						}
						break;
					case 'bind':
						if (this.user.userbind[this.item.provider]) return;
						this.bindother();
						break;
				}
			},
			// 绑定第三方登录
			bindother() {
				uni.login({
					provider: this.item.provider,
					// #ifdef MP-ALIPAY
					scopes: 'auth_user', //支付宝小程序需设置授权类型
					// #endif
					success: (res) => {
						uni.getUserInfo({
							provider: this.item.provider,
							success: (infoRes) => {
								let options = Object.assign(infoRes, res);
								this.bindEvent(this.user.__formatOtherlogin(this.item.provider, options));
							}
						});
					},
					fail: (err) => {
						uni.showToast({
							title: '绑定失败',
							icon: "none"
						});
						console.log('login fail:', err);
					}
				});
			},
			async bindEvent(data) {
				uni.showLoading({
					title: '绑定中...',
					mask: false
				});
				let [err, res] = await this.$http.post("/user/bindother", data, {
					token: true,
					checktoken: true
				})
				if (!this.$http.errorcheck(err, res)) return uni.hideLoading();
				// 绑定成功
				uni.hideLoading();
				uni.showToast({
					title: '绑定成功！'
				});
				// 修改状态，缓存
				this.user.userbind[this.item.provider] = {
					nickname: data.nickName
				}
				uni.setStorageSync("userbind", this.user.userbind);
				this.$emit('updateuserbind');
			}
			// dsada(){
			// 	uni.navigateTo({
			// 		url: '../../pages/user-set-userinfo/user-set-userinfo',
			// 		success: res => {},
			// 		fail: () => {},
			// 		complete: () => {}
			// 	});
			// }
		}
	}
</script>

<style scoped>
	.home-list-item {
		padding: 20upx;
		border-top: 1upx solid #F4F4F4;
		border-bottom: 1upx solid #F4F4F4;
	}

	.home-list-item>view:last-child {
		color: #CCCCCC;
	}

	.home-list-item>view:first-child {
		color: #333333;
	}

	.home-list-item>view:first-child>view {
		margin-right: 10upx;
	}

	.home-list-hover {
		background-color: #F4F4F4;
	}
</style>
