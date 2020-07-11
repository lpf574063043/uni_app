<template>
	<view class="other-login u-f-ac">
		
		<view @tap="tologin('weixin')" class="u-f-ajc u-f1"><view class="icon iconfont icon-weixin u-f-ajc"></view> </view>
		<view @tap="tologin('sinaweibo')" class="u-f-ajc u-f1"><view class="icon iconfont icon-weibo u-f-ajc"></view> </view>
		<view @tap="tologin('qq')" class="u-f-ajc u-f1"><view class="icon iconfont icon-QQ u-f-ajc"></view> </view>
	</view>
</template>

<script>
	export default{
		props:{
			noback:{
				type:Boolean,
				default:true
			}
		},
		data(){
			return{
				providerList: [],
			}
		},
		onLoad() {
		    
		},
		methods:{
			async loginEvent(data){//第三方登录
				let [err,res]=await this.user.login({
					url:'/user/otherlogin',
					data:data,
					Noback:this.noback
				})
				console.log(JSON.stringify(res.data.data))
				if(res){
					this.$emit('logining')
				}
			},
			tologin(e) {//第三方登录
				switch (e){
					case 'weixin':
					uni.login({
						provider:'weixin',
						scopes:'auth_user',
						success: (res) => {
							// console.log(JSON.stringify(res))
							uni.getUserInfo({
								provider:'weixin',
								success: (infoRes) => {
									let data = this.user.__formatOtherlogin('weixin',Object.assign(infoRes,res));//改变服务器所需要的数据结构
									
									this.loginEvent(data);
								}
							})
						}
					})
						break;
					case 'qq':
					uni.login({
						provider:'qq',
						scopes:'auth_user',
						success: (res) => {
							// console.log(JSON.stringify(res))
							uni.getUserInfo({
								provider:'qq',
								success: (infoRes) => {
									//获取第三方登录相关信息
									let data = this.user.__formatOtherlogin('qq',Object.assign(infoRes,res));
									//登录
									
									this.loginEvent(data);
								}
							})
						}
					})
						break;
					case 'sinaweibo':
					uni.login({
						provider:'sinaweibo',
						scopes:'auth_user',
						success: (res) => {
							console.log(JSON.stringify(res))
							uni.getUserInfo({
								provider:'sinaweibo',
								success: (infoRes) => {
									// console.log(JSON.stringify(infoRes))
									let data = this.user.__formatOtherlogin('sinaweibo',Object.assign(infoRes,res));
									this.loginEvent(data);
								}
							})
						}
					})
						break;	
				}
			}
		}
	}
</script>

<style scoped>
.other-login{
	padding: 20upx 80upx;
}
.other-login>view>view{
	width: 100upx;
	height: 100upx;
	border-radius: 100%;
	font-size: 55upx;
	color: #FFFFFF;
}
.other-login .icon-weixin{
	background-color: #2bd19b;
}
.other-login .icon-weibo{
	background-color: #fc7729;
}
.other-login .icon-QQ{
	background-color: #2caefc;
}	
</style>
