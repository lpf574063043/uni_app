<template>
	<view>
		<!-- 模糊背景 -->
		<topic-info :topicinfo="topicinfo" />
		<!-- tab切换 -->
		<swiper-tab :tabindex="tabindex" :tabBars="tabBars" @tabtap="tabtap" scrollstyle="border-bottom:0" scrollitemstyle="width:50%">
		</swiper-tab>
		<!-- 列表 -->
		<view class="topic-detail-list">
			<block v-for="(item,index) in tablist" :key="index">
				<template v-if="index==tabindex">
					<block v-for="(items,indexs) in item.list" :key="indexs">
						<common-list :item="items" :index="indexs" />
					</block>
					<!-- 上拉加载 -->
					<load-more :loadtext="item.loadtext"></load-more>
				</template>
			</block>
		</view>
	</view>
</template>

<script>
	import topicInfo from "../../components/topic/topic-info.vue"
	import swiperTab from "../../components/index/swiper-tab-head.vue"
	import loadMore from "../../components/common/load-more.vue"
	import commonList from "../../components/common/common-list.vue"
	export default {
		components: {
			topicInfo,
			swiperTab,
			loadMore,
			commonList
		},
		data() {
			return {
				tablist: [{
						firstlod: false,
						page: 1,
						loadtext: "上拉加载更多",
						list: [{ //图文
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
					{
						firstlod: false,
						page: 1,
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
					}
				],
				tabindex: 0,
				topicinfo: {
					titlepic: "../../static/imges1/104101143_1534637184411_mthumb.jpg",
					desc: "我是描述.......",
					title: "忆往事,敬余生",
					totalnum: 10,
					todaynum: 20
				},
				tabBars: [{
						name: '关注',
						id: "guanzhu"
					},
					{
						name: '推荐',
						id: "tuijian"
					}
				]
			}
		},
		onLoad(e) {
			this.__init(JSON.parse(e.detail))
			uni.$on('updatedata',this.updatedata)
		},
		methods: {
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
				// 拿到当前对象
				let obj = this.tablist[this.tabIndex].list.find(value => {
					return value.id === data.post_id;
				});
				if (!obj) return;
				obj.commentnum++; // 评论数+1
			},
			// 更新关注信息
			updateGuanZhu(data) {
				this.tablist[this.tabIndex].list.forEach((item, index) => {
					if (item.userid === data.userid) {
						item.isguanzhu = data.data;
					}
				})
			},
			updateSupport(data) {
				let obj = this.tablist[this.tabIndex].list.find((item) => {
					return item.id === data.post_id;
				})
				if (!obj || obj.infonum.index === 1) return;
				if (data.do == 'ding') {
					obj.infonum.index = 1;
					obj.goodnum++;
				}
			},
			__init(obj) {//初始化数据
				this.topicinfo = obj
				uni.setNavigationBarTitle({
					title: obj.title
				})
				this.getlist()
			},
			async getlist() {//获取数据
				let url = `/topic/${this.topicinfo.id}/post/${this.tablist[this.tabindex].page}`
				let [err, res] = await this.$http.get(url, {}, {
					token: true
				})
				if (this.$http.errorcheck(err, res)) {
					return this.tablist[this.tabindex].loadtext = '上拉加载更多'
				}
				let arr = []
				let list = res.data.data.list
				let length = list.length
				for (var i = 0; i < list.length; i++) {
					arr.push(this._format(list[i]))
				}
				this.tablist[this.tabindex].list = this.tablist[this.tabindex].page > 1 ? this.tablist[this.tabindex].list.concat(
					arr) : arr;
				console.log(list)
				this.tablist[this.tabindex].firstload = true;
				return this.tablist[this.tabindex].loadtext = list.length < 10 ? '没有更多数据了' : '上拉加载更多'

			},
			_format(item) {
				return {
					userid: item.user.id,
					userpic: item.user.userpic,
					username: item.user.username,
					isguanzhu: !!item.user.fens.length,
					id: item.id,
					title: item.title,
					titlepic: item.titlepic,
					type: 'img',
					video: false,
					path: item.path,
					share: !!item.share,
					infonum: {
						index: item.support.length > 0 ? item.support[0].type + 1 : 0,
						dingnum: item.ding_count,
						cainum: item.cai_count
					},
					goodnum: item.ding_count,
					commentnum: item.comment_count,
					sharenum: item.sharenum
				}
			},
			tabtap(index) {
				this.tabindex = index
			},
			load() {
				if (this.tablist[this.tabindex].loadtext !== "上拉加载更多") {
					return;
				}
				this.tablist[this.tabindex].loadtext = "加载中..."
				this.tablist[this.tabindex].page++
				this.getlist()
			},
			getdata() {
				setTimeout(() => {
					let arr = [{ //图文
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
					this.tablist[this.tabindex].list = arr
					uni.stopPullDownRefresh()
				}, 2000)
			}
		},
		onReachBottom() {
			this.load()
		},
		onPullDownRefresh() {
			this.getdata()
		}
	}
</script>

<style>

</style>
