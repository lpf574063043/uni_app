<template>
	<view class="user-list u-f-ac animated fadeInLeft fast">
		<image 
		:src="item.userpic" @tap.stop="openSpace" mode="widthFix" lazy-load></image>
		<view>
			<view>{{item.username}}</view>
			<view style="display: inline-block;">
				<tag-sex-age :age='item.age' :sex='item.sex'></tag-sex-age>
			</view>
		</view>
		
		<view 
		class="icon iconfont  u-f-ajc" 
		:class="[item.isguanzhu?'icon-zhengque1':'icon-jia']"></view>
	</view>
</template>

<script>
	import tagSexAge from "../common/tag-sex-age.vue"
	export default {
		components:{
			tagSexAge
		},
		props:{
			item:Object,
			index:Number
		},
		methods:{
			openSpace(){
				uni.navigateTo({
					url:"../../pages/user-space/user-space?userid="+this.item.id
				})
			},
		}
	}
</script>

<style scoped>
.icon-jia{
	color: #f8791b !important;
}
.user-list{
	border-bottom: 1upx solid #EEEEEE;
	padding: 20upx 20upx;
}
.user-list>image{
	width: 100upx;
	max-height: 100upx;
	border-radius: 100%;
	margin-right: 20upx;
	flex-shrink: 0;
}
.user-list>view:first-of-type{
	flex: 1;
}
.user-list>view:first-of-type>view:first-child{
	font-size: 35upx;
}
.user-list>view:last-of-type{
	width: 80upx;
	color: #CCCCCC;
	font-size: 40upx;
	
}	
</style>
