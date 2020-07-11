<template>
	<view>
		<!-- 官方扩展ui~~顶部导航栏 -->
		<news-nav-bar :tabBars="tabBars" :tabindex="tabindex" @changetab="changetab">
		</news-nav-bar>

		<view class="uni-tab-bar">
			<swiper @change="tabchange" :current="tabindex" class="swiper-box" :style="{height:swiperheight+'px'}">
				<swiper-item>
					<scroll-view scroll-y="true" class="list" @scrolltolower="load">
						<!-- 列表 -->
						<template v-if="guanzhu.list.length>0">
							<block v-for="(item,index) in guanzhu.list" :key="index">
								<common-list :item="item" :index="index" />
							</block>
							<load-more :loadtext="guanzhu.loadtext"></load-more>
						</template>
						
						<template v-else-if="!guanzhu.firstload">
							<view style="font-size: 50upx;font-weight: bold;padding-top: 100upx;" class="u-f-ajc">
								loading....
							</view>
						</template>
						
						<template v-else>
							<view class="u-f-ajc" style="font-size: 50upx;font-weight: bold;padding-top: 100upx;">
								这里没有数据哟
							</view>
						</template>
						
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y="true" class="list">
						<!-- 搜索框 -->
						<view class="search-input">
							<input type="text" placeholder="搜索话题" class="uni-input" placeholder-class="topic-search icon iconfont icon-sousuo"
							 disabled @tap="openserch" />
						</view>
						<!-- 轮播图 -->
						<swiper class="topic-swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
							<block v-for="(item,index) in topic.swiper" :key="index">
								<swiper-item>
									<image :src="item.src" mode="widthFix" lazy-load></image>
								</swiper-item>
							</block>


						</swiper>
						<!-- 热门分类 -->
						<topic-nav :nav="topic.nav"></topic-nav>
						<!-- 最近更新 -->
						<view class="topic-news animated bounce">
							<view>最近</view>
							<block v-for="(item,index) in topic.list" :key="index">
								<topic-list :item="item" :index="index"></topic-list>
							</block>
							<load-more :loadtext="topic.loadtext"></load-more>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>

	</view>
</template>

<script>
	import newsNavBar from "../../components/news/news-nav-bar.vue"
	import commonList from '../../components/common/common-list.vue';
	import loadMore from "../../components/common/load-more.vue";
	import topicNav from "../../components/news/topic-nav.vue";
	import topicList from "../../components/news/topic-list.vue"
	export default {
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					let height = res.windowHeight - uni.upx2px(100)
					this.swiperheight = height
				}
			})
			this.__init()
		},
		components: {
			commonList,
			newsNavBar,
			loadMore,
			topicNav,
			topicList
		},
		data() {
			return {
				swiperheight: 500,
				tabindex: 0,
				tabBars: [{
						name: '关注',
						id: 'guanzhu'
					},
					{
						name: '话题',
						id: 'huati'
					}
				],
				guanzhu: {
					firstload:false,
					page:1,
					loadtext: "上拉加载更多",
					list: [{ //图文
							userpic: "../../static/imges1/20170617202755_vasTA.jpeg",
							username: '张三',
							sex: 1,
							age: 25,
							isguanzhu: true,
							title: '标题图文',
							titlepic: '../../static/imges1/15361977_214857628142_2.jpg',
							video: false,
							share: false,
							path: '重庆 江北',
							sharenum: 20,
							goodnum: 20,
							commentnum: 50
						},
						{ //图文
							userpic: "../../static/imges1/20170617202755_vasTA.jpeg",
							username: '张三',
							sex: 0,
							age: 25,
							isguanzhu: false,
							title: '标题分享',
							titlepic: '',
							video: false,
							share: {
								title: '你看我帅不??',
								titlepic: '../../static/imges1/15361977_214857628142_2.jpg'
							},
							path: '重庆 江北',
							sharenum: 20,
							goodnum: 20,
							commentnum: 50
						},
						{ //视频
							userpic: "../../static/imges1/20170617202755_vasTA.jpeg",
							username: '张三',
							sex: 0,
							age: 25,
							isguanzhu: false,
							title: '标题视频',
							titlepic: '../../static/imges1/15361977_214857628142_2.jpg',
							video: {
								looknum: '20w',
								long: '2:36'
							},
							share: false,
							path: '重庆 江北',
							sharenum: 20,
							goodnum: 20,
							commentnum: 50
						}
					]
				},
				topic: {
					loadtext: "上拉加载更多",
					swiper: [{
							src: "../../static/imges1/1539273772-RVSGakIOPA.jpg"
						},
						{
							src: "../../static/imges1/Xbzs_011.jpg"
						},
						{
							src: "../../static/imges1/a4758670_s.jpg"
						}
					],
					nav: [{
							name: "最新"
						},
						{
							name: "游戏"
						},
						{
							name: "打卡"
						},
						{
							name: "情感"
						},
						{
							name: "故事"
						},
						{
							name: "喜爱"
						}
					],
					list: [{
							titlepic: "../../static/imges1/20170617202755_vasTA.jpeg",
							title: "我是标题",
							desc: "人生自古谁无死,留取丹心照汗青",
							totalnum: 50,
							todaynum: 60
						},
						{
							titlepic: "../../static/imges1/20170617202755_vasTA.jpeg",
							title: "我是标题",
							desc: "人生自古谁无死,留取丹心照汗青",
							totalnum: 50,
							todaynum: 60
						},
						{
							titlepic: "../../static/imges1/20170617202755_vasTA.jpeg",
							title: "我是标题",
							desc: "人生自古谁无死,留取丹心照汗青",
							totalnum: 50,
							todaynum: 60
						}
					]
				}
			}
		},
		onShow() {
			this.getFollowPostList()
		},
		methods: {
			// 获取动态列表
			async getFollowPostList() {
				let url = `/followpost/${this.guanzhu.page}`;
				let [err, res] = await this.$http.get(url, {}, {
					token: true
				});
				if (!this.$http.errorcheck(err, res)) {
					this.guanzhu.firstload = true;
					return this.guanzhu.loadtext = "上拉加载更多";
				}
				let arr = [];
				console.log(res)
				let list = res.data.data.list;
				for (let i = 0; i < list.length; i++) {
					arr.push(this.__format(list[i]));
				}
				this.guanzhu.list = this.guanzhu.page > 1 ?
					this.guanzhu.list.concat(arr) : arr;
				this.guanzhu.firstload = true;
				this.guanzhu.loadtext = list.length < 10 ? "没有更多数据了" : "上拉加载更多";
				return;
			},
			__format(item) {
				let obj = {
					userid: item.user.id,
					userpic: item.user.userpic,
					username: item.user.username,
					isguanzhu: !!item.user.fens.length,
					id: item.id,
					title: item.title,
					type: "img", // img:图文,video:视频
					titlepic: item.titlepic,
					video: false,
					path: item.path,
					share: !!item.share,
					infonum: {
						index: (item.support.length > 0) ? (item.support[0].type + 1) : 0, //0:没有操作，1:顶,2:踩；
						dingnum: item.ding_count,
						cainum: item.cai_count,
					},
					sex: item.user.userinfo.sex,
					age: item.user.userinfo.age,
					goodnum: item.ding_count,
					commentnum: item.comment_count,
					sharenum: item.sharenum,
				};
				if (item.user_id === this.user.userinfo.id) {
					obj.isguanzhu = true;
				}
				return obj;
			},
			openserch() {
				uni.navigateTo({
					url: "../search/search?searchType=topic"
				})
			},
			//初始化数据
			__init() {
				this.getswiper()
				this.gethot()
				this.getnav()
				uni.$on('updatedata',this.updatedata)
			},
			updatedata(data) {
				switch (data.type) {
					case "guanzhu":
						this.updateGuanZhu(data)
						break;
					case "support":
						this.updateSupport(data);
						break;
					case 'updateComment':
						this.updateComment(data);
						break;
				}
			},
			// 更新评论数
			updateComment(data) {
				// 拿到当前对象guanzhu
				let obj = this.guanzhu.list.find(value => {
					return value.id === data.post_id;
				});
				if (!obj) return;
				obj.commentnum++; // 评论数+1
			},
			// 更新关注信息
			updateGuanZhu(data) {
				this.guanzhu.list.forEach((item, index) => {
					if (item.userid === data.userid) {
						item.isguanzhu = data.data;
					}
				})
			},
			updateSupport(data) {
				let obj = this.guanzhu.list.find((item) => {
					return item.id === data.post_id;
				})
				if (!obj || obj.infonum.index === 1) return;
				if (data.do == 'ding') {
					obj.infonum.index = 1;
					obj.goodnum++;
				}
			},
			//获取广告
			async getswiper() {
				let [err, res] = await this.$http.get('/adsense/0')
				if (!this.$http.errorcheck(err, res)) return
				let arr = []
				for (var i = 0; i < res.data.data.list.length; i++) {
					arr.push({
						src: res.data.data.list[i].src,
						url: res.data.data.list[i].url
					})
				}
				this.topic.swiper = arr
			},
			//获取热门分类
			async getnav() {
				let [err, res] = await this.$http.get('/topicclass')
				if (!this.$http.errorcheck(err, res)) return
				let arr = []
				let list = res.data.data.list
				for (var i = 0; i < list.length; i++) {
					arr.push({
						id: list[i].id,
						name: list[i].name
					})
				}
				this.topic.nav = arr
			},
			//获取热门话题
			async gethot() {
				let arr = []
				let [err, res] = await this.$http.get('/hottopic')
				if (!this.$http.errorcheck(err, res)) return
				let list = res.data.data.list
				for (var i = 0; i < list.length; i++) {
					arr.push({
						id: list[i].id,
						titlepic: list[i].titlepic,
						title: list[i].title,
						desc: list[i].desc,
						totalnum: list[i].post_count,
						todaynum: list[i].todaypost_count
					})
				}
				this.topic.list = arr
			},
			changetab(index) {
				this.tabindex = index
			},
			tabchange(e) {
				this.tabindex = e.detail.current
			},
			load() {
				if (this.guanzhu.loadtext !== "上拉加载更多") {
					return;
				}
				this.guanzhu.loadtext = "加载中..."
				this.guanzhu.page++
				this.getFollowPostList()
			}
		},
		onReachBottom() {
			if (this.topic.loadtext !== "上拉加载更多") {
				return
			}
			this.topic.loadtext = "加载中..."
			setTimeout(() => {
				let arr = [{
						titlepic: "../../static/imges1/20170617202755_vasTA.jpeg",
						title: "我是标题",
						desc: "人生自古谁无死,留取丹心照汗青",
						totalnum: 50,
						todaynum: 60
					},
					{
						titlepic: "../../static/imges1/20170617202755_vasTA.jpeg",
						title: "我是标题",
						desc: "人生自古谁无死,留取丹心照汗青",
						totalnum: 50,
						todaynum: 60
					},
					{
						titlepic: "../../static/imges1/20170617202755_vasTA.jpeg",
						title: "我是标题",
						desc: "人生自古谁无死,留取丹心照汗青",
						totalnum: 50,
						todaynum: 60
					}
				]
				this.topic.list = this.topic.list.concat(arr);
				this.topic.loadtext = "上拉加载更多";
			}, 1000)
		}
	}
</script>

<style>
	.search-input {
		padding: 20upx;
	}

	.search-input>input {
		background-color: #f4f4f4;
		border-radius: 10upx;
	}

	.topic-search {
		display: flex;
		justify-content: center;
		font-size: 27upx;
	}

	.topic-swiper image {
		width: 100%;
		border-radius: 20upx;
		max-height: 400upx;
	}

	.topic-swiper {
		padding: 0 20upx 20upx 20upx;
		height: 400upx;
	}

	.topic-news {
		padding: 20upx;
	}

	.topic-news>view:first-child {
		padding-bottom: 5upx;
		font-size: 32upx;
		color: #000000;
	}
</style>
