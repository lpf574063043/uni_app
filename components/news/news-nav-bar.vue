<template>
	<view>
		<uni-nav-bar :fixed="true" :border="false" :statusBar="true" @clickRight="openadd">
			<!-- 左边 -->
			<block slot="left">
				<view class="nav-left">
					<view class="icon iconfont icon-qiandao1"></view>
				</view>
			</block>
			<!-- 中间 -->
			<view class="nav-tab-bar u-f-ajc">
				<!-- <view class="active">关注<view class="nav-tab-bar-line"></view></view> -->
				<block v-for="(item,index) in tabBars" :key="index">
					<view :class="{'active':index==tabindex}" @tap="changetab(index)">
						{{item.name}}
						<view v-show="index==tabindex" class="nav-tab-bar-line"></view>
					</view>
				</block>
			</view>
			<!-- 右边 -->
			<block slot="right">
				<view  class="nav-right">
					<view class="icon iconfont icon-bianji"></view>
				</view>
			</block>
		</uni-nav-bar>
	</view>
</template>

<script>
	import uniNavBar from "../uni-nav-bar/uni-nav-bar.vue";
	export default{
		components:{
			uniNavBar
		},
		methods:{
			openadd(){
				uni.navigateTo({
					url: '../../pages/add-input/add-input'
				});
			},
			changetab(index){
				this.$emit('changetab',index)
			}
		},
		props:{
			tabBars:Array,
			tabindex:Number
		}
	}
</script>

<style scoped>
.nav-left>view,.nav-right>view{
	font-size: 40upx;
}
.nav-left>view{
	color: #FFB400;
}
.nav-right{
	width: 100%;
	text-align: center;
}
.nav-left{
	margin-left: 16upx;
}
.nav-tab-bar{
	width: 100%;
	margin-left: -20upx;
}
.nav-tab-bar>view{
	font-size: 30upx;
	padding: 0 15upx;
	font-weight: bold;
	color: #969896;
}
.active{
	color: #333333 !important;
	text-align: center;
}
.nav-tab-bar-line{
	border-bottom: 6upx solid #fede33;
	border-top: 6upx solid #fede33;
	width: 70upx;
	border-radius: 20upx;
}	
</style>
