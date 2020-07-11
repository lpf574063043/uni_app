<template>
	<view class="icon iconfont tag-sex" :class="[sex==1?'icon-nv':'icon-nan']">
		{{age}}
	</view>
</template>

<script>
	export default {
		props:{
			age:Number,
			sex:Number
		}
	}
</script>

<style scoped>
.tag-sex{
	background-color: #007AFF;
	color: #FFFFFF;
	font-size: 23upx;
	padding: 5upx 10upx;
	margin-left: 10upx;
	border-radius: 20upx;
	line-height: 30upx;
}
.icon-nv{
	background-color: #ff698d !important;
}
</style>
