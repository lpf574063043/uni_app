<template>
	<view>
		<swiper-tab
		:tabindex="tabindex" 
		:tabBars="tabBars" 
		@tabtap="tabtap">
		</swiper-tab>
		
		
		<view class="uni-tab-bar">
			<swiper 
			@change="tabchange" 
			:current="tabindex" 
			class="swiper-box" 
			:style="{height:swiperheight+'px'}">
				<swiper-item v-for="(items,index) in newslist" :key="index">
					<template v-if="items.list.length>0">
						<scroll-view scroll-y="true" class="list" @scrolltolower="load(index)">
								<block v-for="(item,index1) in items.list" :key="index1">
									<topic-list :ischange='ischange' :item="item" :index="index1"></topic-list>
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
	import swiperTab from "../../components/index/swiper-tab-head.vue";
	import loadMore from "../../components/common/load-more.vue";
	import topicList from "../../components/news/topic-list.vue"
	export default {
		onLoad(e) {
			if(e.ischange){
				this.ischange=true
				uni.setNavigationBarTitle({
					title:"选择所属话题"
				})
			}
			uni.getSystemInfo({
				success: (res) => {
					let height=res.windowHeight-uni.upx2px(100)
					this.swiperheight=height
				}
			})
			this.getlist()
			this.getnav()
			
		},
		components:{
			swiperTab,
			loadMore,
			topicList
		},
		data() {
			return {
				ischange:false,
				swiperheight:500,
				tabindex:0,
				tabBars:[
					{name:'关注',id:"guanzhu"},
					{name:'推荐',id:"tuijian"},
					{name:'体育',id:"tiyu"},
					{name:'热点',id:"redian"},
					{name:'财经',id:"caijing"},
					{name:'娱乐',id:"yule"}
				],
				newslist:[
					{
						loadtext:"上拉加载更多",
						list:[
							{
								titlepic:"../../static/imges1/604928430e1b42d2a7b68317938b2e2a.jpeg",
								title:"我是标题",
								desc:"人生自古谁无死,留取丹心照汗青",
								totalnum:50,
								todaynum:60
							},
							{
								titlepic:"../../static/imges1/604928430e1b42d2a7b68317938b2e2a.jpeg",
								title:"我是标题",
								desc:"人生自古谁无死,留取丹心照汗青",
								totalnum:50,
								todaynum:60
							},
							{
								titlepic:"../../static/imges1/20170617202755_vasTA.jpeg",
								title:"我是标题",
								desc:"人生自古谁无死,留取丹心照汗青",
								totalnum:50,
								todaynum:60
							},
							{
								titlepic:"../../static/imges1/604928430e1b42d2a7b68317938b2e2a.jpeg",
								title:"我是标题",
								desc:"人生自古谁无死,留取丹心照汗青",
								totalnum:50,
								todaynum:60
							},
							{
								titlepic:"../../static/imges1/20170617202755_vasTA.jpeg",
								title:"我是标题",
								desc:"人生自古谁无死,留取丹心照汗青",
								totalnum:50,
								todaynum:60
							},
							{
								titlepic:"../../static/imges1/604928430e1b42d2a7b68317938b2e2a.jpeg",
								title:"我是标题",
								desc:"人生自古谁无死,留取丹心照汗青",
								totalnum:50,
								todaynum:60
							}
						]
					},
					{
						loadtext:"上拉加载更多",
						list:[
							{
								titlepic:"../../static/imges1/604928430e1b42d2a7b68317938b2e2a.jpeg",
								title:"我是标题",
								desc:"人生自古谁无死,留取丹心照汗青",
								totalnum:50,
								todaynum:60
							},
							{
								titlepic:"../../static/imges1/20170617202755_vasTA.jpeg",
								title:"我是标题",
								desc:"人生自古谁无死,留取丹心照汗青",
								totalnum:50,
								todaynum:60
							},
							{
								titlepic:"../../static/imges1/604928430e1b42d2a7b68317938b2e2a.jpeg",
								title:"我是标题",
								desc:"人生自古谁无死,留取丹心照汗青",
								totalnum:50,
								todaynum:60
							},
							{
								titlepic:"../../static/imges1/20170617202755_vasTA.jpeg",
								title:"我是标题",
								desc:"人生自古谁无死,留取丹心照汗青",
								totalnum:50,
								todaynum:60
							},
							{
								titlepic:"../../static/imges1/604928430e1b42d2a7b68317938b2e2a.jpeg",
								title:"我是标题",
								desc:"人生自古谁无死,留取丹心照汗青",
								totalnum:50,
								todaynum:60
							},
							{
								titlepic:"../../static/imges1/20170617202755_vasTA.jpeg",
								title:"我是标题",
								desc:"人生自古谁无死,留取丹心照汗青",
								totalnum:50,
								todaynum:60
							}
						]
					},
					{
						loadtext:"上拉加载更多",
						list:[
							{
								titlepic:"../../static/imges1/604928430e1b42d2a7b68317938b2e2a.jpeg",
								title:"我是标题",
								desc:"人生自古谁无死,留取丹心照汗青",
								totalnum:50,
								todaynum:60
							},
							{
								titlepic:"../../static/imges1/20170617202755_vasTA.jpeg",
								title:"我是标题",
								desc:"人生自古谁无死,留取丹心照汗青",
								totalnum:50,
								todaynum:60
							},
							{
								titlepic:"../../static/imges1/604928430e1b42d2a7b68317938b2e2a.jpeg",
								title:"我是标题",
								desc:"人生自古谁无死,留取丹心照汗青",
								totalnum:50,
								todaynum:60
							},
							{
								titlepic:"../../static/imges1/20170617202755_vasTA.jpeg",
								title:"我是标题",
								desc:"人生自古谁无死,留取丹心照汗青",
								totalnum:50,
								todaynum:60
							},
							{
								titlepic:"../../static/imges1/604928430e1b42d2a7b68317938b2e2a.jpeg",
								title:"我是标题",
								desc:"人生自古谁无死,留取丹心照汗青",
								totalnum:50,
								todaynum:60
							},
							{
								titlepic:"../../static/imges1/20170617202755_vasTA.jpeg",
								title:"我是标题",
								desc:"人生自古谁无死,留取丹心照汗青",
								totalnum:50,
								todaynum:60
							}
						]
					},
					{
						loadtext:"上拉加载更多",
						list:[
							{
								titlepic:"../../static/imges1/604928430e1b42d2a7b68317938b2e2a.jpeg",
								title:"我是标题",
								desc:"人生自古谁无死,留取丹心照汗青",
								totalnum:50,
								todaynum:60
							},
							{
								titlepic:"../../static/imges1/20170617202755_vasTA.jpeg",
								title:"我是标题",
								desc:"人生自古谁无死,留取丹心照汗青",
								totalnum:50,
								todaynum:60
							},
							{
								titlepic:"../../static/imges1/604928430e1b42d2a7b68317938b2e2a.jpeg",
								title:"我是标题",
								desc:"人生自古谁无死,留取丹心照汗青",
								totalnum:50,
								todaynum:60
							},
							{
								titlepic:"../../static/imges1/20170617202755_vasTA.jpeg",
								title:"我是标题",
								desc:"人生自古谁无死,留取丹心照汗青",
								totalnum:50,
								todaynum:60
							},
							{
								titlepic:"../../static/imges1/604928430e1b42d2a7b68317938b2e2a.jpeg",
								title:"我是标题",
								desc:"人生自古谁无死,留取丹心照汗青",
								totalnum:50,
								todaynum:60
							},
							{
								titlepic:"../../static/imges1/20170617202755_vasTA.jpeg",
								title:"我是标题",
								desc:"人生自古谁无死,留取丹心照汗青",
								totalnum:50,
								todaynum:60
							}
						]
					},
					{
						loadtext:"上拉加载更多",
						list:[
							{
								titlepic:"../../static/imges1/604928430e1b42d2a7b68317938b2e2a.jpeg",
								title:"我是标题",
								desc:"人生自古谁无死,留取丹心照汗青",
								totalnum:50,
								todaynum:60
							},
							{
								titlepic:"../../static/imges1/20170617202755_vasTA.jpeg",
								title:"我是标题",
								desc:"人生自古谁无死,留取丹心照汗青",
								totalnum:50,
								todaynum:60
							},
							{
								titlepic:"../../static/imges1/604928430e1b42d2a7b68317938b2e2a.jpeg",
								title:"我是标题",
								desc:"人生自古谁无死,留取丹心照汗青",
								totalnum:50,
								todaynum:60
							},
							{
								titlepic:"../../static/imges1/20170617202755_vasTA.jpeg",
								title:"我是标题",
								desc:"人生自古谁无死,留取丹心照汗青",
								totalnum:50,
								todaynum:60
							},
							{
								titlepic:"../../static/imges1/604928430e1b42d2a7b68317938b2e2a.jpeg",
								title:"我是标题",
								desc:"人生自古谁无死,留取丹心照汗青",
								totalnum:50,
								todaynum:60
							},
							{
								titlepic:"../../static/imges1/20170617202755_vasTA.jpeg",
								title:"我是标题",
								desc:"人生自古谁无死,留取丹心照汗青",
								totalnum:50,
								todaynum:60
							}
						]
					},
					{
						loadtext:"上拉加载更多",
						list:[]
					}
				]
			}
		},
		methods: {
			async getlist(){
				let url=`/topicclass/${this.tabBars[this.tabindex].id}/topic/${this.newslist[this.tabindex].page}`
				let [err,res]=await this.$http.get(url)
				let error=this.$http.errorcheck(err,res,()=>{
					this.newslist[this.tabindex].loadtext='上拉加载更多'
				},()=>{
					this.newslist[this.tabindex].loadtext='上拉加载更多'
				})
				if(!error)return;
				let arr=[]
				let list=res.data.data.list
				let length=list.length
				for(var i=0;i<list.length;i++){arr.push({
					id:list[i].id,
					titlepic:list[i].titlepic,
					title:list[i].title,
					desc:list[i].desc,
					totalnum:list[i].post_count,
					todaynum:list[i].todaypost_count
				})
				this.newslist[this.tabindex].list=this.newslist[this.tabindex].page>1?this.newslist[this.tabindex].list.concat(arr):arr;
				this.newslist[this.tabindex].firstload=true;
				if(list.length < 10){
					this.newslist[this.tabindex].loadtext='没有更多数据了'
				}else{
					this.newslist[this.tabindex].loadtext='上拉加载更多'
				}
				return;
				}
			},
			async getnav(){
				let [err,res]=await this.$http.get('/topicclass')
				if(!this.$http.errorcheck(err,res))return
				let arr=[]
				let arr2=[]
				let list=res.data.data.list
				for(var i=0;i<list.length;i++){
					arr.push({
						name:res.data.data.list[i].classname,
						id:res.data.data.list[i].id
					})
					arr2.push({
						loadtext:'上拉加载更多',
						list:[],
						page:1,
						firstload:false
					})
				}
				this.tabBars=arr
				this.newslist=arr2
				this.tabBars.length>0 &&this.getlist()
			},
			tabtap(index){
				this.tabindex=index
			},
			tabchange(res){
				this.tabindex=res.detail.current
				this.getlist()
			},
			load(index){
				if(this.newslist[index].loadtext!="上拉加载更多"){return}
				this.newslist[index].loadtext="加载中..."
				this.newslist[this.tabindex].page++
				this.getlist()
			}
		}
	}
</script>

<style>
.nothing{
	position: fixed;
	top: 45%;
	left: 15%;
	color: red;
	font-size: 50upx;
}
.topic-view{
	padding: 0 20upx;
}
</style>
