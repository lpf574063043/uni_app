<template>
	<view class="body">
		<swiper-tab :tabindex="tabindex" :tabBars="tabBars" @tabtap="tabtap" scrollstyle="border-bottom:0" scrollitemstyle="width:33.33%">
		</swiper-tab>
		<!-- 好友列表 -->
		<!-- <block v-for="(item,index) in list" :key="index">
			<user-list :item="item" :index="index"/>
		</block> -->
		<view class="uni-tab-bar">
			<swiper @change="tabchange" :current="tabindex" class="swiper-box" :style="{height:swiperheight+'px'}">
				<swiper-item v-for="(items,index) in userlist" :key="index">
					<template v-if="items.list.length>0">
						<scroll-view scroll-y="true" class="list" @scrolltolower="load(index)">
							<block v-for="(item,dex) in items.list" :key="dex">
								<user-list :item="item" :index="dex" />
							</block>
							<load-more :loadtext="items.loadtext"></load-more>
						</scroll-view>
					</template>
					<template v-else-if="!items.firstload">
						<view class="u-f-ajc" style="font-size: 50upx;font-weight: bold;padding-top: 100upx;">Loading...</view>
					</template>
					<template v-else>
						<view class="nothing">这里没有数据可显示哟</view>
					</template>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import userList from "../../components/user-list/user-list.vue"
	import swiperTab from "../../components/index/swiper-tab-head.vue"
	import loadMore from "../../components/common/load-more.vue"
	export default {
		components: {
			swiperTab,
			userList,
			loadMore
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					let height = res.windowHeight - uni.upx2px(100)
					this.swiperheight = height
				}
			})
		},
		data() {
			return {
				swiperheight: 500,
				tabindex: 0,
				tabBars: [{
						name: '互关',
						id: "guanzhu",
						num: 10
					},
					{
						name: '关注',
						id: "tuijian",
						num: 20
					},
					{
						name: '粉丝',
						id: "fensi",
						num: 30
					}
				],
				userlist: [{
						loadtext: "上拉加载更多",
						list: [],
						page: 1,
						firstload: false
					},
					{
						loadtext: "上拉加载更多",
						list: [],
						page: 1,
						firstload: false
					},
					{
						loadtext: "上拉加载更多",
						list: [],
						page: 1,
						firstload: false
					}
				]
			}
		},
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				uni.navigateBack({
					delta: 1
				});
			}
		},
		onShow() {
			this.__init();
		},
		methods: {
			__init() {
				this.tabBars[0].num = this.user.counts.friend_count < 100 ? this.user.counts.friend_count : '99+';
				this.tabBars[1].num = this.user.counts.withfollow_count < 100 ? this.user.counts.withfollow_count : '99+';
				this.tabBars[2].num = this.user.counts.withfen_count < 100 ? this.user.counts.withfen_count : '99+';
				this.getList();
			},
			// 获取列表
			getUrl() {
				let arr = ['/friends/', '/follows/', '/fens/'];
				return arr[this.tabindex] + this.userlist[this.tabindex].page;
			},
			async getList() {
				try {
					let currentIndex = this.tabindex;
					let [err, res] = await this.$http.get(this.getUrl(), {}, {
						token: true,
						checktoken: true
					});
					// 错误处理
					if (!this.$http.errorcheck(err, res)) {
						this.userlist[currentIndex].loadtext = "上拉加载更多";
						return;
					}
					// 获取成功
					let arr = [];
					
					let list = res.data.data.list;
					for (let i = 0; i < list.length; i++) {
						arr.push(this.__format(list[i], currentIndex));
					}
					this.userlist[currentIndex].list = this.userlist[currentIndex].page > 1 ? this.userlist[currentIndex].list.concat(
						arr) : arr;
					this.userlist[currentIndex].firstload = true;
					this.userlist[currentIndex].loadtext = list.length < 10 ? "没有更多数据了" : "上拉加载更多";
					return;
				} catch (e) {
					return;
				}
			},
			__format(item, currentIndex) {
				return {
					id: item.userinfo.user_id,
					userpic: item.userpic,
					username: item.username,
					age: item.userinfo.age,
					sex: item.userinfo.sex,
					isguanzhu: currentIndex !== 2
				}
			},
			tabtap(index) {
				this.tabindex = index
				if (!this.userlist[this.tabindex].firstload) {
					this.getList();
				}
			},
			tabchange(res) {
				this.tabindex = res.detail.current
				// 判断是否首次加载过了
				if (!this.userlist[this.tabindex].firstload) {
					this.getList();
				}
			},
			load(index) {
				if (this.userlist[index].loadtext !== "上拉加载更多") {
					return;
				}
				this.userlist[index].loadtext = "加载中..."
				this.userlist[index].page++
				this.getList()
			}
		},
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url:"../search/search?searchType=user"
			})
		}
	}
</script>

<style>
	.nothing {
		position: fixed;
		top: 45%;
		left: 15%;
		color: red;
		font-size: 50upx;
	}

	.body {
		padding: 0 20upx;
	}
</style>
