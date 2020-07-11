<template>
	<view class="index-list">
		<view class="index-list1 u-f-ac u-f-jsb">
			<view class="u-f-ac">
				<image @tap.stop="openSpace" :src="item.userpic"></image>
				{{item.username}}
			</view>
			<view class="u-f-ac" v-show="!item.isguanzhu" @tap="guanzhu">
				<view class="icon iconfont icon-jia"></view>关注
			</view>
		</view>
		<view class="index-list2" @tap="opendetail">{{item.title}}</view>
		<view class="index-list3 u-f-ajc" @tap="opendetail">
			<!-- 图片 -->
			<!-- <template v-if="item.type=='img'">
				<image :src="item.titlepic" mode="widthFix" lazy-load></image>
			</template> -->
			<template v-if="item.titlepic">
				<image :src="item.titlepic" mode="widthFix" lazy-load></image>
			</template>
			<template v-if="item.type=='video'">
				<image :src="item.titlepic" mode="widthFix" lazy-load></image>
				<!-- 视频 -->
				<view class="index-list-play icon iconfont icon-ziyuan"></view>
				<view class="index-list-play-info">
					{{item.playnum}} 次播放 {{item.long}}
				</view>
			</template>

		</view>
		<view class="index-list4 u-f-ac u-f-jsb">
			<view class="u-f-ac">
				<view @tap="caozuo('ding')" class="u-f-ac" :class="{'active':item.infonum.index==1}">
					<view class="icon iconfont icon-xiao"></view> {{item.infonum.dingnum}}
				</view>
				<view @tap="caozuo('cai')" class="u-f-ac" :class="{'active':item.infonum.index==2}">
					<view class="icon iconfont icon-ku"></view> {{item.infonum.cainum}}
				</view>
			</view>
			<view class="u-f-ac">
				<view class="u-f-ac">
					<view class="icon iconfont icon-xiaoxi1"></view> {{item.commentnum}}
				</view>
				<view class="u-f-ac">
					<view class="icon iconfont icon-fenxiang"></view> {{item.sharenum}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: Object,
			index: Number
		},

		methods: {
			openSpace(){
				uni.navigateTo({
					url:"../../pages/user-space/user-space?userid="+this.item.userid
				})
			},
			async guanzhu() {
				try {
					let [err, res] = await this.$http.post('/follow', {
						follow_id: this.item.userid
					}, {
						token: true,
						checktoken: true,
						checkAuth: true
					})
					console.log(this.item.userid)
					if (!this.$http.errorcheck(err, res)) {
						return;
					}
					uni.showToast({
						title: '关注成功'
					})
					let obj = {
						type: '关注',
						userid: this.item.userid,
						data: true
					}
					this.$emit('changeevent', obj)
					uni.$emit('updatedata', obj)

				} catch (e) {
					return;
				}
			},
			async caozuo(type) {
				try {
					let index = type == 'ding' ? 1 : 2;
					if (this.item.infonum.index == index) return;
					let [err, res] = await this.$http.post('/support', {
						post_id: this.item.id,
						type: index - 1
					}, {
						token: true,
						chechtoken: true,
						checkAuth: true
					})
					// 错误处理
					if (!this.$http.errorcheck(err, res)) return;
					uni.showToast({
						title: index == 1 ? "顶成功" : "踩成功"
					});
					let resdata = {
						type: "support",
						post_id: this.item.id,
						do: type
					};
					// 通知父组件
					this.$emit('changeevent', resdata);
					// 通知全局
					uni.$emit("updatedata", resdata);
				} catch (e) {
					return;
				}
				// switch (type) {
				// 	case 'ding':
				// 		if (this.infonum.index !== 1) {
				// 			this.infonum.dingnum++
				// 		} else {
				// 			return;
				// 		}
				// 		if (this.infonum.index == 2) {
				// 			this.infonum.cainum--
				// 		}
				// 		this.infonum.index = 1
				// 		break;
				// 	case 'cai':
				// 		if (this.infonum.index !== 2) {
				// 			this.infonum.cainum++
				// 		} else {
				// 			return;
				// 		}
				// 		if (this.infonum.index == 1) {
				// 			this.infonum.dingnum--
				// 		}
				// 		this.infonum.index = 2
				// 		break;
				// }
			},
			opendetail() {
				uni.navigateTo({
					url: '../../pages/detail/detail?Data=' + JSON.stringify(this.item),
				})
				this.user.addHistoryList(this.item)
			}
		}
	}
</script>

<style scoped>
	.index-list {
		padding: 20upx 20upx;
		border-bottom: 1upx solid #EEEEEE;
	}

	.index-list1>view:first-child {
		color: #999999;
	}

	.index-list1>view:first-child image {
		width: 85upx;
		max-height: 85upx;
		border-radius: 100%;
		margin-right: 10upx;
	}

	.index-list1>view:last-child {
		background-color: #f4f4f4;
		border-radius: 10upx;
		padding: 0 10upx;
	}

	.index-list2 {
		padding-top: 15upx;
		font-size: 32upx;
	}

	.index-list3 {
		padding-top: 15upx;
		position: relative;
	}

	.index-list3>image {
		width: 100%;
		border-radius: 20upx;
	}

	.index-list4 {
		padding: 15upx 0;
	}

	.index-list4 view {
		color: #999999;
	}

	.index-list4>view:first-child {
		display: flex;
	}

	.index-list4>view>view>view,
	.index-list4>view>view:first-child {
		margin-right: 10upx;
	}

	.index-list-play {
		position: absolute;
		font-size: 100upx;
		color: #FFFFFF;
	}

	.index-list-play-info {
		position: absolute;
		bottom: 10upx;
		right: 15upx;
		background-color: rgba(51, 51, 51, 0.72);
		color: #FFFFFF;
		border-radius: 40upx;
		padding: 0 15upx;
		font-size: 20upx;
	}

	.index-list4 .active,
	.index-list4 .active>view {
		color: #007AFF;
	}
</style>
