<template>
	<view>
		<!-- 模糊背景 -->
		<view class="topic-bg">
			<image :src="topicinfo.titlepic" mode="aspectFill" lazy-load></image>
		</view>
		<!-- 话题信息 -->
		<view class="topic-info">
			<view class="topic-info-t u-f-ac">
				<image 
				:src="topicinfo.titlepic" mode="widthFix" lazy-load></image>
				<view>#{{topicinfo.title}}#</view>
			</view>
			<view class="topic-info-c u-f-ac">
				<view>动态 {{topicinfo.totalnum}}</view>
				<view>今日 {{topicinfo.todaynum}}</view>
			</view>
			<view class="topic-info-b">
				{{topicinfo.desc}}
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			topicinfo:Object
		}
	}
</script>

<style scoped>
.topic-bg{
	width: 100%;
	height: 300upx;
	position: relative;
	overflow: hidden;
}
.topic-bg>image{
	width: 100%;
	position: absolute;
	filter: blur(10upx);
}
.topic-info{
	padding: 0 25upx;
}
.topic-info-t{
	position: relative;
}
.topic-info-t>image{
	width: 150upx;
	min-height: 150upx;
	border-radius: 20upx;
	position: absolute;
	top: -75upx;
}
.topic-info-t>view{
	font-size: 35upx;
	margin-left: 80px;
	flex: 1;
}
.topic-info-c{
	padding: 35upx 0 15upx 0;
}
.topic-info-c>view{
	color: #cdcdcd;
}
.topic-info-b{
	color: #a3a3a3;
	font-size: 32upx;
	padding-bottom: 10upx;
}	
</style>
