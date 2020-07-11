<template>
	<view class="body">
		
		<uni-collapse :accordion="true">
			<block v-for="(item,index) in list" :key="index">
				<uni-collapse-item  :title="item.title" :show-animation="true">
					<view class="content">{{item.content}}</view>
				</uni-collapse-item>
			</block>
			
		</uni-collapse>
		
		<button
		type="primary" 
		@tap="submit" 
		class="user-set-btn"
		>意见反馈</button>
	</view>
</template>

<script>
	import uniCollapseItem from '../../common/uni-collapse-item/uni-collapse-item.vue'
	import uniCollapse from '../../common/uni-collapse/uni-collapse.vue'
	export default {
		components:{
			uniCollapseItem,
			uniCollapse
		},
		data() {
			return {
				list:[
					{title:'客户上线时间',content:'dasdas'},
					{title:'忘记账号密码怎么办',content:'fsafasf'},
					{title:'怎么搜索查找关注,取消',content:'dafewfsdf'}
				]
			}
		},
		methods: {
			submit(){
				uni.navigateTo({
					url:"/pages/user-feedback/user-feedback"
				})
			}
		}
	}
</script>

<style>
.user-set-btn{
	width: 100%;
	margin: 20upx 0;
	background-color: #ffe933;
	color: #000000;
}
.user-set-btn-disable{
	background-color: #F4F4F4 !important;
	border: 1upx solid #EEEEEE !important;
	color: #909090 !important;
}
.body{
	padding: 20upx;
}
.content {
	padding: 15px;
	font-size: 14px;
	line-height: 20px;
	background-color: #FFFFFF;
	color: #666;
}
</style>
