<template>
	<view class="user-space-head u-f-ajc">
		<image :src="getimg" mode="widthFix" lazy-load @tap="changeimg"></image>
		<view class="user-space-head-info u-f-ajc u-f-column">
			<image :src="unserinfo.userpic" mode="widthFix" lazy-load></image>
			<view class="user-space-margin u-f-ac">
				{{unserinfo.username}}
				<tag-sex-age :sex="unserinfo.sex" :age="unserinfo.age" />
			</view>
			<view v-if="!unserinfo.isme" :class="unserinfo.isguanzhu?'active':'icon-jia'" class="user-space-margin icon iconfont user-space-head-btn"
			 @tap="guanzhu">
				{{unserinfo.isguanzhu?'已关注':'关注'}}
			</view>
		</view>
	</view>
</template>

<script>
	import tagSexAge from "../common/tag-sex-age.vue"
	export default {
		components: {
			tagSexAge
		},
		onLoad() {
			console.log(this.unserinfo)
		},
		props: {
			unserinfo: Object
		},
		computed: {
			getimg() {
				return `../../static/imges1/${this.unserinfo.bgimg}.jpg`
			},

		},
		methods: {
			async guanzhu() {
				// this.isguanzhu=true
				// uni.showToast({
				// 	title:"关注成功"
				// })
				let url = this.unserinfo.isguanzhu ? '/unfollow' : '/follow'
				uni.showLoading({
					title: 'Loading...',
					mask: false
				})
				let [err, res] = await this.$http.post(url, {
					follow_id: this.unserinfo.id
				}, {
					token: true,
					checktoken: true,
					checkAuth: true
				})
				// 错误处理
				if (!this.$http.errorcheck(err, res)) {
					return uni.hideLoading();
				}
				//成功
				uni.hideLoading()
				uni.showToast({
					title:this.unserinfo.isguanzhu?'取消关注成功':'感谢关注'
				})
				this.$emit('update',!this.unserinfo.isguanzhu)
			},
			changeimg() {
				this.$emit('changeimg',this.unserinfo.bgimg)
				// if (this.bgimg < 4) {
				// 	this.bgimg++
				// } else {
				// 	this.bgimg = 1
				// }
			}
		}
	}
</script>

<style scoped>
	.user-space-margin {
		margin: 15upx 0;
	}

	.user-space-head {
		position: relative;
		height: 500upx;
		overflow: hidden;
	}

	.user-space-head>image {
		position: absolute;
		width: 100%;
		min-height: 500upx;
	}

	.user-space-head-info {
		position: absolute;
		top: 150upx;
	}

	.user-space-head-info>image {
		width: 150upx;
		max-height: 150upx;
		border-radius: 100%;
	}

	.user-space-head-info>view:first-of-type {
		color: #FFFFFF;
		font-size: 35upx;
		font-weight: bold;
		text-shadow: 2upx 2upx 10upx #333333;
	}

	.user-space-head-btn {
		background-color: #ffe933;
		color: #333333;
		border: 1upx solid #ffe933;
		padding: 0 15upx;
		border-radius: 10upx;
		font-size: 28upx;
	}

	.active {
		background-color: rgba(51, 51, 51, -3.37);
		color: #333333;
		border: 1upx solid #FFFFFF;
	}
</style>
