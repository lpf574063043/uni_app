<template>
	
			<view class="topic-list u-f" @tap="opendetail">
				<image 
				:src="item.titlepic" 
				mode="widthFix" 
				lazy-load></image>
				<view>
					<view>#{{item.title}}#</view>
					<view>{{item.desc}}</view>
					<view>动态 {{item.totalnum}} 今日 {{item.todaynum}}</view>
				</view>
			</view>

</template>

<script>
	export default{
		props:{
			item:Object,
			index:Number,
			ischange:{
				default:false,
				type:Boolean,
			}
		},
		methods:{
			opendetail(){
				if(this.ischange){
					uni.$emit('changeTopic',{id:this.item.id,title:this.item.title})
					uni.navigateBack({
						delta:1
					})
					return;
				}
				uni.navigateTo({
					url: '../../pages/topic-detail/topic-detail?detail='+JSON.stringify(this.item)
				});
			}
		}
	}
</script>

<style scoped>

.topic-list{
	padding: 20upx 0;
	border-bottom: 1upx solid #EEEEEE;
}
.topic-list image{
	width: 150upx;
	max-height: 150upx;
	border-radius: 10upx;
	margin-right: 20upx;
}
.topic-list>view>view{
	color: #a4a4a4;
}
.topic-list>view>view:first-child{
	color: #333333;
	font-size: 32upx;
}	
</style>
