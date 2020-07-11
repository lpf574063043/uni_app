<template>
	<view>
		<scroll-view 
		scroll-y="true" 
		:scroll-top="scolltop" 
		:scroll-with-animation="true" 
		:style="{height:style.contentH+'px'}"
		id="scroll">
			<block v-for="(item,index) in list" :key="index">
				<user-chat-list :item="item" :index="index"/>
			</block>
		</scroll-view>
		
	
		<!-- 底部输入框 -->
		<user-chat-bottom :text="text" @submit="submit"></user-chat-bottom>
		
	</view>
</template>

<script>
	import userChatList from "../../components/user-chat/user-chat-list.vue"
	import time from '../../common/time.js'
	import userChatBottom from "../../components/user-chat/user-chat-bottom.vue"
	export default {
		components:{
			userChatBottom,
			userChatList
		},
		data() {
			return {
				scolltop:0,
				style:{
					contentH:0,
					itemH:0
				},
				text:"",
				list:[]
			}
		},
		onLoad() {
			this.getdata()
			this.initdata()
		},
		onReady() {
			this.pagetobottom()
		},
		methods: {
			initdata(){
				try{
					const res=uni.getSystemInfoSync()
					this.style.contentH=res.windowHeight-uni.upx2px(120)
				}catch(e){}
			},
			//输入类容过多时自动滑动到底部
			pagetobottom(){
				let query=uni.createSelectorQuery()
				query.select('#scroll').boundingClientRect()//获取节点的各个参数
				query.selectAll('.user-chat-item').boundingClientRect()
				query.exec((res)=>{
					// res[1].forEach((ret)=>{
					// 	this.style.itemH+=ret.height
					// });
					for(var req of res[1]){
						this.style.itemH+=req.height
					}
				})
				if(this.style.itemH>this.style.contentH){
					this.scolltop=this.style.itemH
				}
				console.log(this.scolltop)
			},
			submit(data){
				let now=new Date().getTime()
				let obj={
					isme:true,
					userpic:'../../static/imges1/d267eb8e8c5494eea10687cf2af5e0fe98257e7e.jpg',
					type:'text',
					data:data,
					time:now,
					gstime:time.gettime.getChatTime(now,this.list[this.list.length-1].time)
				}
				this.list.push(obj)
				this.pagetobottom()
			},
			getdata(){
				let list=[
					{
						isme:false,
						userpic:'../../static/imges1/d267eb8e8c5494eea10687cf2af5e0fe98257e7e.jpg',
						type:'text',
						data:"dsdasdas",
						time:'1585638995'
					},
					{
						isme:true,
						userpic:'../../static/imges1/d267eb8e8c5494eea10687cf2af5e0fe98257e7e.jpg',
						type:'img',
						data:"../../static/imges1/v2-f4943d21d3a5f2f943081256269501e7_hd.jpg",
						time:'1585638985'
					}
				]
				for(var i=0;i<list.length;i++){
					list[i].gstime=time.gettime.getChatTime(list[i].time,i>0?list[i-1].time:0)
				}
				this.list=list
				this.pagetobottom()
			}
		}
	}
</script>

<style>

</style>
