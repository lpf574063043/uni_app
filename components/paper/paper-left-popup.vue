<template>
	<view>
		<view class="paper-left-popup" v-show="shows">
			<view @tap="addfriend" hover-class="paper-left-popup-h" class="u-f-ac">
				<view class="icon iconfont icon-sousuo"></view> 加好友
			</view>
			<view @tap="clear" hover-class="paper-left-popup-h" class="u-f-ac">
				<view class="icon iconfont icon-cuowu1"></view>清除缓存
			</view>
		</view>
		<view class="paper-left-popup-mask" v-show="shows" @tap="hidepopup"></view>
	</view>
</template>

<script>
	export default{
		props:{
			shows:Boolean
		},
		methods:{
			addfriend(){
				this.$emit('addfriend')
			},
			clear(){
				this.$emit('clear')
			},
			hidepopup(){
				this.$emit('hidepopup')
			}
		}
	}
</script>

<style scoped>
.paper-left-popup{
	position: fixed;
	right: 10upx;
	top: 100upx;
	background-color: #FFFFFF;
	z-index: 10;
	width: 55%;
	box-shadow: 1upx 1upx 20upx 2upx #CCCCCC;
}
.paper-left-popup>view{
	padding: 20upx;
	font-size: 35upx;
}
.paper-left-popup>view>view{
	margin-right: 10upx;
}
.paper-left-popup-h{
	background-color: #EEEEEE;
}
.paper-left-popup-mask{
	position: fixed;
	top: 0;bottom: 0;left: 0;right: 0;
	background-color: rgba(51,51,51,0.73);
	z-index: 9;
}	
</style>
