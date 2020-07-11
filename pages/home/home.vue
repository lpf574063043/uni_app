<template>
	<view>
		<!-- 未登录 -->
		<template v-if="!islogin">
			<view class="u-f-ajc">登录体验更多功能</view>
			<other-login :noback="true" @logining="islogins" />
			<view class="u-f-ajc" @tap="login">账号密码登录<view class="icon-jinru icon iconfont"></view>
			</view>
		</template>
		<!-- 登录后 -->
		<template v-else>
			<home-info :homeinfo="homeinfo" />
		</template>
		<!-- 数据 -->
		<home-data :homedata="homedata" />
		<!-- 广告位 -->
		<view class="home-adv u-f-ajc">
			<image src="../../static/imges1/104101143_1534637184411_mthumb.jpg" mode="widthFix" lazy-load></image>
		</view>
		<view class="home-list" hover-class="home-list-hover">
			<block v-for="(item,index) in list" :key="index">
				<home-list-item :item="item" :index="index" />
			</block>
		</view>
	</view>
</template>

<script>
	import homeData from "../../components/home/home-data.vue"
	import otherLogin from "../../components/home/other-login.vue"
	import homeInfo from "../../components/home/home-info.vue"
	import homeListItem from "../../components/home/home-list-item.vue"
	export default {
		components: {
			homeListItem,
			homeInfo,
			otherLogin,
			homeData
		},
		data() {
			return {
				islogin: false,
				list: [{
						name: "历史浏览",
						icon: "yanjing",
						clicktype: 'navigateTo',
						url: "../user-history/user-history"
					},
					{
						name: "趣百认证",
						icon: "huiyuan",
						clicktype: '',
						url: ""
					},
					{
						name: "审核趣事",
						icon: "bianji",
						clicktype: '',
						url: ""
					}
				],
				homeinfo: {
					userpic: '',
					username: '',
					totalnum: 0,
					todaynum: 0
				},
				homedata: [{
						name: '趣事',
						num: 0
					},
					{
						name: '动态',
						num: 0
					},
					{
						name: '评论',
						num: 0
					},
					{
						name: '收藏',
						num: 0
					}
				]
			}
		},
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				this.user.navigateTo({
					url: '../user-set/user-set'
				}, 'navigateTo')
				// uni.navigateTo({
				// 	url: "../user-history/user-history"
				// });
			}
		},
		onShow() { //每次到这个页面都会调用onshow
			// console.log(this.user.token)
			// console.log(this.user.userinfo)
			this.islogins()
		},
		methods: {
			islogins() {
				if (!this.user.token) {
					this.islogin = false
					this.homeinfo = {
						userpic: '',
						username: '',
						totalnum: 0,
						todaynum: 0
					}
					this.homedata[0].num = 0
					this.homedata[1].num = 0
					this.homedata[2].num = 0
					this.homedata[3].num = 0
					return
				} else {
					// console.log(uni.getStorageSync('userinfo'))
					this.homeinfo.userpic = this.user.userinfo.userpic
					this.homeinfo.id=this.user.userinfo.id
						// 'http://pic1.zhimg.com/50/v2-ede9473ddcbd84fe7c1e363953ed7410_hd.jpg';
					this.homeinfo.username = this.user.userinfo.username
					this.homeinfo.totalnum = 8
					this.homeinfo.todaynum = 9
					this.homedata[0].num = 1
					this.homedata[1].num = 2
					this.homedata[2].num = 3
					this.homedata[3].num = 4
					this.islogin = true
				}
			},
			login() {
				// uni.navigateTo({
				// 	url: '../user-bind-phone/user-bind-phone',
				// 	success: res => {},
				// 	fail: () => {},
				// 	complete: () => {}
				// });
				uni.navigateTo({
					url: '../login/login',
					//url: '../login/login?id='+'zhangsan',
					success: res => {
						// console.log(JSON.stringify(res))
					},

				});
			}
		}
	}
</script>

<style>
	.home-adv {
		padding: 20upx;
	}

	.home-adv>image {
		border-radius: 20upx;
		max-height: 200upx;
		width: 100%;
	}


	.home-list {
		padding: 20upx;
	}
</style>
