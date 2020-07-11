<template>
	<view>
		<template v-if="list.length>0">
			<block v-for="(item,index) in list" :key="index">

				<template v-if="searchType=='post'">
					<index-list :item="item" :index="index" />
				</template>
				<template v-else-if="searchType=='topic'">
					<topic-list :item="item" :index="index"></topic-list>
				</template>
			</block>
			<load-more :loadtext="loadtext" />
		</template>
		<template v-else-if="isshow && list.length<1">
			<view>没有数据.....</view>
		</template>
	</view>
</template>

<script>
	import indexList from "../../components/index/index-list.vue"
	import loadMore from "../../components/common/load-more.vue"
	import topicList from "../../components/news/topic-list.vue"
	export default {
		components: {
			indexList,
			loadMore,
			topicList
		},
		data() {
			return {
				isshow: false,
				loadtext: "上拉加载更多",
				searchtext: '',
				page: 1,
				searchType: 'post',
				list: [

					// {
					// 	userpic:"../../static/imges1/1538122139-VCTSxjGkvF.jpeg",
					// 	username:"张三",
					// 	isguanzhu:false,
					// 	title:"我是标题",
					// 	type:"img",
					// 	titlepic:"../../static/imges1/104101143_1534637184411_mthumb.jpg",
					// 	infonum:{
					// 		index:1,
					// 		dingnum:11,
					// 		cainum:11
					// 	},
					// 	commentnum:10,
					// 	sharenum:10
					// },
					// {
					// 	userpic:"../../static/imges1/1538122139-VCTSxjGkvF.jpeg",
					// 	username:"王麻子",
					// 	isguanzhu:true,
					// 	title:"我是标题",
					// 	type:"video",
					// 	titlepic:"../../static/imges1/104101143_1534637184411_mthumb.jpg",
					// 	playnum:"20w",
					// 	long:"2:47",
					// 	infonum:{
					// 		index:2,
					// 		dingnum:11,
					// 		cainum:11
					// 	},
					// 	commentnum:10,
					// 	sharenum:10
					// },
					// {
					// 	userpic:"../../static/imges1/1538122139-VCTSxjGkvF.jpeg",
					// 	username:"张三",
					// 	isguanzhu:false,
					// 	title:"我是标题",
					// 	type:"img",
					// 	titlepic:"../../static/imges1/104101143_1534637184411_mthumb.jpg",
					// 	infonum:{
					// 		index:1,
					// 		dingnum:11,
					// 		cainum:11
					// 	},
					// 	commentnum:10,
					// 	sharenum:10
					// },
					// {
					// 	userpic:"../../static/imges1/1538122139-VCTSxjGkvF.jpeg",
					// 	username:"张三",
					// 	isguanzhu:false,
					// 	title:"我是标题",
					// 	type:"img",
					// 	titlepic:"../../static/imges1/104101143_1534637184411_mthumb.jpg",
					// 	infonum:{
					// 		index:1,
					// 		dingnum:11,
					// 		cainum:11
					// 	},
					// 	commentnum:10,
					// 	sharenum:10
					// },
					// {
					// 	userpic:"../../static/imges1/1538122139-VCTSxjGkvF.jpeg",
					// 	username:"张三",
					// 	isguanzhu:false,
					// 	title:"我是标题",
					// 	type:"img",
					// 	titlepic:"../../static/imges1/104101143_1534637184411_mthumb.jpg",
					// 	infonum:{
					// 		index:1,
					// 		dingnum:11,
					// 		cainum:11
					// 	},
					// 	commentnum:10,
					// 	sharenum:10
					// }
				]
			}
		},
		onReachBottom() {
			if (this.loadtext != "上拉加载更多") {
				return
			}
			this.loadtext = "加载中..."
			this.page++
			this.getdata()
		},
		onLoad(e) {
			if (!e) return
			this.searchType = e.searchType || "post"
			// #ifndef APP-PLUS
			if (this.searchType == "topic") {
				let currentWebView = this.$mp.$getAppWebview()
				let tn = currentWebView.getStyle().titleNView
				tn.searchInput.placeholder = '搜索话题'
				currentWebView.setStyle({
					titleNView: tn
				})
			}
			// #endif
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
				let obj = this.list.find(value => {
					return value.id === data.post_id;
				});
				if (!obj) return;
				obj.commentnum++; // 评论数+1
			},
			// 更新顶踩数据状态
			updateSupport(data) {
				// 拿到当前对象
				let obj = this.list.find(value => {
					return value.id === data.post_id;
				});
				if (!obj) return;
				let oldindex = obj.infonum.index; // 操作前的状态
				obj.infonum.index = (data.do == 'ding') ? 1 : 2; // 操作后的状态
				if (oldindex !== 0) { //之前操作过
					oldindex == 1 ? obj.infonum.dingnum-- : obj.infonum.cainum--;
				}
				if (obj.infonum.index !== 0) { // 当前操作
					obj.infonum.index == 1 ?
						obj.infonum.dingnum++ : obj.infonum.cainum++;
				}
			},
			// 更新关注信息
			updateGuanZhu(data) {
				this.list.forEach((item, index) => {
					if (item.userid === data.userid) {
						item.isguanzhu = data.data;
					}
				})
			},
			_format(item) {
				switch (this.searchType) {
					case 'post':
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
							commentnum: item.comment_count,
							sharenum: item.sharenum
						}
						break;
					case 'topic':
						return {
							id: item.id,
							titlepic: item.titlepic,
							title: item.title,
							desc: item.desc,
							totalnum: item.post_count,
							todaynum: item.todaypost_count
						}
						break;
				}

			},
			async getdata() {
				uni.showLoading({
					title: "Loading..."
				})
				let url
				switch (this.searchType) {
					case 'post':
						url = '/search/post'
						break;
					case 'topic':
						url = '/search/topic'
						break;
				}
				let [err, res] = await this.$http.post(url, {
					keyword: this.searchtext,
					page: this.page
				}, {
					token: true
				})
				let error = this.$http.errorcheck(err, res, () => {
					uni.hideLoading()
				}, () => {
					uni.hideLoading()
				})
				if (!error) return
				let arr = []
				let list = res.data.data.list
				let length = list.length
				for (var i = 0; i < list.length; i++) {
					arr.push(this._format(list[i]))
				}
				this.list = this.page > 1 ? this.list.concat(arr) : arr;
				this.isshow = true;
				if (list.length < 10) {
					this.loadtext = '没有更多数据了'
				} else {
					this.loadtext = '上拉加载更多'
				}
				uni.hideLoading()
			}
		},
		onNavigationBarButtonTap(res) {
			if (res.index == 0) {
				uni.navigateBack({
					delta: 1
				});
			}
		},
		onNavigationBarSearchInputChanged(res) {
			this.searchtext = res.text
		},
		onPullDownRefresh() {
			if (!this.isshow) {
				uni.stopPullDownRefresh();
				return
			}
			let list = [{
					userpic: "../../static/imges1/1538122139-VCTSxjGkvF.jpeg",
					username: "张三",
					isguanzhu: false,
					title: "我是标题",
					type: "img",
					titlepic: "../../static/imges1/104101143_1534637184411_mthumb.jpg",
					infonum: {
						index: 1,
						dingnum: 11,
						cainum: 11
					},
					commentnum: 10,
					sharenum: 10
				},
				{
					userpic: "../../static/imges1/1538122139-VCTSxjGkvF.jpeg",
					username: "王麻子",
					isguanzhu: true,
					title: "我是标题",
					type: "video",
					titlepic: "../../static/imges1/104101143_1534637184411_mthumb.jpg",
					playnum: "20w",
					long: "2:47",
					infonum: {
						index: 2,
						dingnum: 11,
						cainum: 11
					},
					commentnum: 10,
					sharenum: 10
				},
				{
					userpic: "../../static/imges1/1538122139-VCTSxjGkvF.jpeg",
					username: "张三",
					isguanzhu: false,
					title: "我是标题",
					type: "img",
					titlepic: "../../static/imges1/104101143_1534637184411_mthumb.jpg",
					infonum: {
						index: 1,
						dingnum: 11,
						cainum: 11
					},
					commentnum: 10,
					sharenum: 10
				},
				{
					userpic: "../../static/imges1/1538122139-VCTSxjGkvF.jpeg",
					username: "张三",
					isguanzhu: false,
					title: "我是标题",
					type: "img",
					titlepic: "../../static/imges1/104101143_1534637184411_mthumb.jpg",
					infonum: {
						index: 1,
						dingnum: 11,
						cainum: 11
					},
					commentnum: 10,
					sharenum: 10
				}
			]
			setTimeout(() => {
				this.list = list
				uni.stopPullDownRefresh()
			}, 2000)
		},
		onNavigationBarSearchInputConfirmed(res) {
			if (res.text != '') {
				this.isshow = !this.isshow
				this.getdata()
			}
		}
	}
</script>

<style>

</style>
