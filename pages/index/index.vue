<template>
	<view class="animated bounce">
		<swiper-tab :tabindex="tabindex" :tabBars="tabBars" @tabtap="tabtap">
		</swiper-tab>

		<view class="uni-tab-bar">
			<swiper @change="tabchange" :current="tabindex" class="swiper-box" :style="{height:swiperheight+'px'}">
				<swiper-item v-for="(items,index) in newslist" :key="index">
					<template v-if="items.list.length>0">
						<scroll-view scroll-y="true" class="list" @scrolltolower="load(index)">
							<block v-for="(item,dex) in items.list" :key="dex">
								<index-list @changeevent="updatedata" :item="item" :index="dex"></index-list>
							</block>
							<load-more :loadtext="items.loadtext"></load-more>
						</scroll-view>
					</template>
					<template v-else-if="!items.firstload">
						<view style="font-size: 50upx;font-weight: bold;color: #000000;padding-top: 100upx;" class="u-f-ajc">Loading...</view>
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
	import indexList from "../../components/index/index-list.vue";
	import swiperTab from "../../components/index/swiper-tab-head.vue"
	import loadMore from "../../components/common/load-more.vue"
	export default {
		components: {
			indexList,
			swiperTab,
			loadMore
		},
		data() {
			return {
				swiperheight: 500,
				tabindex: 0,
				newslist: [{
						loadtext: "上拉加载更多",
						list: [

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
					},
					{
						loadtext: "上拉加载更多",
						list: [

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
						]
					},
					{
						loadtext: "上拉加载更多",
						list: [

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
						]
					},
					{
						list: [

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
					},
					{
						loadtext: "上拉加载更多",
						list: [

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
							}
						]
					},
					{
						loadtext: "上拉加载更多",
						list: []
					}
				],
				tabBars: [{
						name: '你好',
						id: "guanzhu"
					},
					{
						name: '推荐',
						id: "tuijian"
					},
					{
						name: '体育',
						id: "tiyu"
					},
					{
						name: '热点',
						id: "redian"
					},
					{
						name: '财经',
						id: "caijing"
					},
					{
						name: '娱乐',
						id: "yule"
					}
				]
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					let height = res.windowHeight - uni.upx2px(100)
					this.swiperheight = height
				}
			})
			this.getnav()
			//监听事件,监听全局如有调用updatedata,就会执行this.updatedata去改变全部需要改变的数据
			uni.$on('updatedata', this.updatedata)
		},
		methods: {
			// 更新评论数
			updateComment(data) {
				// 拿到当前对象
				let obj = this.newslist[this.tabindex].list.find(value => {
					return value.id === data.post_id;
				});
				if (!obj) return;
				obj.commentnum++; // 评论数+1
			},
			updateGuanZhu(res) {
				this.newslist[this.tabindex].list.forEach((item, index) => {
					if (item.userid == res.userid) {
						item.isguanzhu = res.data
					}
				})
			},
			// 更新顶踩数据状态
			updateSupport(data) {
				// 拿到当前对象
				let obj = this.newslist[this.tabindex].list.find(value => {
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
			updateList(res) {//发布更新list
				let index = this.tabBars.findIndex((val) => {
					return val.id == res.post_class_id
				})
				if (index > -1) {
					this.newslist[index].list.unshift(this._format(res))
					//unshift数组头部添加
				}
			},
			updatedata(res) {
				switch (res.type) {
					case 'guanzhu':
						this.updateGuanZhu(res);
						break;
					case 'support':
						this.updateSupport(res);
						break;
					case 'updateList':
						this.updateList(res)
						break;
					case 'updateComment':
						this.updateComment(res)
						break;
				}
			},
			//获取文章分类
			async getnav() {
				// let options={
				// 	url:this.confog.weburl+'/postclass',
				// 	method:'GET',
				// 	success: (res) => {
				// 		let arr=[]
				// 		for(var i=0;i<res.data.data.list.length;i++){
				// 			arr.push({
				// 				id:res.data.data.list[i].id,
				// 				name:res.data.data.list[i].classname
				// 			})
				// 		}
				// 		this.tabBars=arr
				// 	}
				// }
				let arr = []
				let arr2 = []
				let [err, res] = await this.$http.get('/postclass', {}, {
					loginurl: '../login/login'
				})
				if (!this.$http.errorcheck(err, res)) return; //请求错误处理
				for (var i = 0; i < res.data.data.list.length; i++) {
					arr.push({
						name: res.data.data.list[i].classname,
						id: res.data.data.list[i].id
					})
					arr2.push({
						loadtext: '上拉加载更多',
						list: [],
						page: 1,
						firstload: false
					})
				}
				this.tabBars = arr
				this.newslist = arr2

				this.tabBars.length > 0 && this.getlist()
			},
			async getlist() {
				let durrentindex=this.tabindex
				let url = `/postclass/${this.tabBars[durrentindex].id}/post/${this.newslist[durrentindex].page}`
				let [err, res] = await this.$http.get(url, {}, {
					token: true
				})
				// if(!this.$http.errorcheck(err,res)) return;
				let error = this.$http.errorcheck(err, res, () => {
					this.newslist[durrentindex].loadtext = '上拉加载更多'
				}, () => {
					this.newslist[durrentindex].loadtext = '上拉加载更多'
				})
				if (!error) return; //错误处理
				let arr = []
				let list = res.data.data.list
				let length = list.length
				for (var i = 0; i < list.length; i++) {
					arr.push(this._format(list[i]))
				}
				this.newslist[durrentindex].list = this.newslist[durrentindex].page > 1 ? this.newslist[durrentindex].list.concat(
					arr) : arr;
				this.newslist[durrentindex].firstload = true;
				if (list.length < 10) {
					this.newslist[durrentindex].loadtext = '没有更多数据了'
				} else {
					this.newslist[durrentindex].loadtext = '上拉加载更多'
				}
				return;
			},
			_format(item) {
				console.log(item.user.fens.length)
				return {
					userid: item.user.id,
					userpic: item.user.userpic || '../../static/imges1/1538122139-VCTSxjGkvF.jpeg',
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
			},
			tabtap(index) {
				this.tabindex = index
				this.getlist()
			},
			tabchange(res) {
				this.tabindex = res.detail.current
				this.getlist()
			},
			load(index) {
				if (this.newslist[index].loadtext != "上拉加载更多") {
					return
				}
				this.newslist[index].loadtext = "加载中..."
				this.newslist[this.tabindex].page++
				this.getlist()
			}
		},
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '../search/search'
			});
		},
		onNavigationBarButtonTap(res) {
			if (res.index == 1) {
				this.user.navigateTo({
					url: '../add-input/add-input?postclass=' + JSON.stringify(this.tabBars)
				})
			}
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
</style>
