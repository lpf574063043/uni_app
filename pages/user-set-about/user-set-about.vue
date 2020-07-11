<template>
	<view class="body">
		<view class="user-set-about-t u-f-ajc u-f-column">
			<image src="../../static/imges1/loggol.jpg" mode="widthFix" lazy-load></image>
			<view>version 1.0.0</view>
		</view>
		<block v-for="(item,index) in list" :key="index">
			<home-list-item :item="item" :index="index"/>
		</block>
	</view>
</template>

<script>
	import homeListItem from "../../components/home/home-list-item.vue"
	export default {
		components:{
			homeListItem
		},
		data() {
			return {
				list:[
					{
						name:"新版本检测",
						icon:"",
						clicktype:'',
						url:"",
					},
					{
						name:"趣事百科用户协议",
						icon:"",
						clicktype:'',
						url:"",
					}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.body{
	padding: 20upx;
}
.user-set-about-t>image{
	width: 100%;
	margin-bottom: 20upx;
	max-height: 400upx;
	margin-top: 30upx;
}
.user-set-about-t{
	padding: 20upx 0;
}
.user-set-about-t>view{
	color: #CCCCCC;
}
</style>
