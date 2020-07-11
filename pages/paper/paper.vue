<template>
	<view class="body">
		<block v-for="(item,index) in list" :key="index">
			<paper-list :item="item" :index="index"/>
		</block>
		<load-more :loadtext="loadtext"/>
		<!-- <uni-badge class="uni-badge-left-margin" text="123" type="error" /> -->
		<!-- 操作菜单 -->
		<paper-left-popup 
		:shows="shows" 
		@addfriend="addfriend" 
		@clear="clear" 
		@hidepopup="hidepopup"/>
	</view>
</template>

<script>
	import paperList from "../../components/paper/paper-list.vue"
	import loadMore from "../../components/common/load-more.vue"
	import paperLeftPopup from "../../components/paper/paper-left-popup.vue"
	export default {
		components:{
			paperList,
			loadMore,
			paperLeftPopup
		},
		data() {
			return {
				shows:false,
				loadtext:"上拉加载更多",
				list:[
					{
						userpic:"../../static/imges1/1538122139-VCTSxjGkvF.jpeg",
						username:"名称",
						time:"10:21",
						data:"我是消息",
						noreadnum:2
					},
					{
						userpic:"../../static/imges1/1538122139-VCTSxjGkvF.jpeg",
						username:"名称",
						time:"10:21",
						data:"我是消息",
						noreadnum:2
					},
					{
						userpic:"../../static/imges1/1538122139-VCTSxjGkvF.jpeg",
						username:"名称",
						time:"10:21",
						data:"我是消息",
						noreadnum:2
					},
					{
						userpic:"../../static/imges1/1538122139-VCTSxjGkvF.jpeg",
						username:"名称",
						time:"10:21",
						data:"我是消息",
						noreadnum:2
					},
					{
						userpic:"../../static/imges1/1538122139-VCTSxjGkvF.jpeg",
						username:"名称",
						time:"10:21",
						data:"我是消息",
						noreadnum:2
					},
					{
						userpic:"../../static/imges1/1538122139-VCTSxjGkvF.jpeg",
						username:"名称",
						time:"10:21",
						data:"我是消息",
						noreadnum:2
					},
					{
						userpic:"../../static/imges1/1538122139-VCTSxjGkvF.jpeg",
						username:"名称",
						time:"10:21",
						data:"我是消息",
						noreadnum:2
					},
					{
						userpic:"../../static/imges1/1538122139-VCTSxjGkvF.jpeg",
						username:"名称",
						time:"10:21",
						data:"我是消息",
						noreadnum:2
					},
					{
						userpic:"../../static/imges1/1538122139-VCTSxjGkvF.jpeg",
						username:"名称",
						time:"10:21",
						data:"我是消息",
						noreadnum:2
					}
				]
			}
		},
		onPullDownRefresh() {
			this.getdata()
		},
		onNavigationBarButtonTap(e) {
			switch (e.index){
				case 0:
				this.shows=false
				// uni.navigateTo({
				// 	url: '../user-list/user-list'
				// });
				this.user.navigateTo({
					url: '../user-list/user-list'
				},'navigateTo')
					break;
				case 1:
				this.hidepopup()
					break;
			}
		},
		methods: {
			addfriend(){
				this.hidepopup()
			},
			clear(){
				this.hidepopup()
			},
			hidepopup(){
				this.shows=!this.shows
			},
			getdata(){
				let arr=[
					{
						userpic:"../../static/imges1/1538122139-VCTSxjGkvF.jpeg",
						username:"张三",
						time:"10:21",
						data:"你好",
						noreadnum:3
					},
					{
						userpic:"../../static/imges1/1538122139-VCTSxjGkvF.jpeg",
						username:"张三",
						time:"10:21",
						data:"你好",
						noreadnum:3
					},
					{
						userpic:"../../static/imges1/1538122139-VCTSxjGkvF.jpeg",
						username:"张三",
						time:"10:21",
						data:"你好",
						noreadnum:3
					}
				]
				setTimeout(()=>{
					this.list=arr
					uni.stopPullDownRefresh()
				},2000)
			},
			loaddata(){
				if(this.loadtext!=="上拉加载更多"){return}
				this.loadtext="加载中..."
				setTimeout(()=>{
					let list=[
							{
								userpic:"../../static/imges1/1538122139-VCTSxjGkvF.jpeg",
								username:"张三",
								time:"10:21",
								data:"你好",
								noreadnum:3
							},
							{
								userpic:"../../static/imges1/1538122139-VCTSxjGkvF.jpeg",
								username:"张三",
								time:"10:21",
								data:"你好",
								noreadnum:3
							},
							{
								userpic:"../../static/imges1/1538122139-VCTSxjGkvF.jpeg",
								username:"张三",
								time:"10:21",
								data:"你好",
								noreadnum:3
							}
					]
					this.list=this.list.concat(list)
					this.loadtext="上拉加载更多"
				},3000)
			}
		},
		onReachBottom() {
			this.loaddata()
		}
	}
</script>

<style>
.body{
	padding: 0 20upx;
}

</style>
