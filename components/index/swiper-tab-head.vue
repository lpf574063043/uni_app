<template>
	<!-- //顶部scollview条 -->
	<view class="uni-tab-bar">
		<scroll-view scroll-x="true" class="uni-swiper-tab" :style="scrollstyle">
			<block v-for="(tab,index) in tabBars" :key="index">
				<view @tap="tabtap(index)" :style="scrollitemstyle" :class="{'active':index==tabindex}" class="swiper-tab-list">
				{{tab.name}} {{tab.num?tab.num:""}}
				<view class="swiper-tab-line"></view>
				</view>
			</block>
		</scroll-view>
	</view>
</template>

<script>
	export default{
		methods:{
			tabtap(index){
				this.$emit("tabtap",index)
			}
		},
		props:{
			tabBars:Array,
			tabindex:Number,
			scrollstyle:{
				default:'',
				type:String
			},
			scrollitemstyle:{
				default:'',
				type:String
			}
		}
	}
</script>

<style scoped>
.uni-tab-bar .active{
	color: #343434;
}
.swiper-tab-list{
	color: #969696;
	font-weight: bold;
}
.active .swiper-tab-line{
	border-bottom: 6upx solid #fede33;
	width: 70upx;
	margin: auto;
	border-top: 6upx solid #fede33;
	border-radius: 20upx;
}
.uni-swiper-tab{
	border-bottom: 1upx solid #EEEEEE;
}	
</style>
