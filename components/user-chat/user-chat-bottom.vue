<template>
	<view class="user-chat-bottom u-f-ac">
		<input type="text" placeholder="文明发言" :focus='focus' @blur="blur" v-model="text"/>
		<view class="u-f-ajc icon iconfont icon-zhifeiji" @tap="submit"></view>
	</view>
</template>

<script>
	export default{
		props:{
			focus:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return{
				text:""
			}
		},
		methods:{
			submit(){
				this.$emit('submit',this.text)
				this.text=''
			},
			blur(){
				this.$emit('blur')
			}
		}
	}
</script>

<style scoped>
.user-chat-bottom{
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 120upx;
	padding: 0 20upx;
	border-top: 1upx solid #EEEEEE;

	background-color: #007AFF;
}
.user-chat-bottom>input{
	background-color: #F7F7F7;
	flex: 1;
	margin-right: 20upx;
	padding: 10upx 20upx;
	border-radius: 10upx;
}
.user-chat-bottom>view{
	width: 80upx;
	font-size: 45upx;
	color: #000000;
}	
</style>
