<template>
	<view>
		<!-- pagejson中titlenview设置为false时内容会被顶到手机上面的状态条,所以要用uniStatusBar来占位 -->
		<uni-status-bar bgcolor="#ffe933"></uni-status-bar>
		
		<!-- 背景图 -->
		<view class="u-f-ajc">
			<image class="loginhead" src="../../static/imges1/loggol.jpg" mode="widthFix" lazy-load></image>
		</view>
		
		
		<view class="icon iconfont icon-cuowu" @tap="back"></view>
		<view class="body">
			<!-- 账号密码登录 -->
			<template v-if="!status">
				<input
				type="text" 
				v-model="username" 
				class="uni-input" 
				placeholder="名称/手机号/邮箱"/>
				<view class="login-input-box">
					<input 
					type="text" 
					v-model="password" 
					class="uni-input forget-input" 
					placeholder="输入密码"/>
					<view class="forget u-f-ajc">忘记密码</view>
				</view>
			</template>
			
			
			<!-- 手机验证码登录 -->
			<template v-else>
				<view class="login-input-box">
					<view class="phone u-f-ajc">+86</view>
					<input
					type="text" 
					v-model="phone" 
					class="uni-input phone-input" 
					placeholder="手机号"/>
				</view>
				<view class="login-input-box">
					<input 
					type="text" 
					v-model="checknum" 
					class="uni-input forget-input" 
					placeholder="输入验证码"/>
					<view @tap="getchangenum" class="forget u-f-ajc login-font-color yanzhengma">
						<view class="u-f-ajc">
							{{!codetiem?'获取验证码':codetiem+'s'}}
						</view>
					</view>
				</view>
			</template>
			
			
			
			<button 
			:disabled="disabled" 
			type="primary" 
			@tap="submit" 
			class="user-set-btn"
			:class="{'user-set-btn-disable':disabled}"
			>登录</button>
		</view>
		<!-- 登录状态切换 -->
		<view class="login-status login-padding u-f-ajc login-font-color" @tap="changestatus">
			{{!status?'手机验证码登录':'账号密码登录'}}<view class="icon iconfont icon-jinru"></view>
		</view>
		
		<!-- 第三方登录 -->
		<view class="other-login-title login-padding u-f-ajc login-font-color">第三方登录</view>
		<other-login :noback="false"/>
		<!-- 协议 -->
		<view class="login-rule login-padding u-f-ajc login-font-color">
			注册即代表您同意<text>《xxx协议》</text>
		</view>
	</view>
</template>
<script>
	import uniStatusBar from "../../components/uni-status-bar/uni-status-bar.vue"
	import otherLogin from '../../components/home/other-login.vue'
	export default {
		components:{
			uniStatusBar,
			otherLogin
		},
		data() {
			return {
				disabled:true,
				status:false,
				username:'',
				password:'',
				phone:'',
				checknum:'',
				codetiem:0
			}
		},
		watch:{
			username(){
				this.onbtn()
			},
			password(){
				this.onbtn()
			},
			phone(){
				this.onbtn()
			},
			checknum(){
				this.onbtn()
			}
		},
		
		onLoad() {
			console.log(this.user.userinfo)
		},
		methods: {
			//验证手机号码
			isphone(){
				let reg=/^1[3456789]\d{9}$/
				return reg.test(this.phone)
			},
			//获取验证码
			async getchangenum(){
				if(this.codetiem>0){
					uni.showToast({
						title:'不能重复获取',
						icon:"none"
					})
					return
				}
				if(!this.isphone()){
					uni.showToast({
						title:"请输入正确的手机号码",
						icon:"none"
					})
					return
				}
				//发送请求
				let [err,res]=await this.$http.post('/user/sendcode',{phone:this.phone})
				this.$http.errorcheck(err,res)
				
				uni.showToast({
					title:JSON.stringify(res.data.msg),
					icon:"none"
				})
				if(!res.data.errCode)return
				//发送成功,开起倒计时
				
				uni.showToast({
					title:res.data.data.msg,
					icon:"none"
				})
				this.codetiem=60
				let timer=setInterval(()=>{
					this.codetiem--
					if(this.codetiem<1){
						clearInterval(timer)
						this.codetiem=0
					}
				},1000)
			},
			//初始化表单
			initinput(){
				this.username=''
				this.password=''
				this.phone=''
				this.checknum=''
			},
			//改变按钮的状态13656457563 6122
			onbtn(){
				if(this.username&& this.password || this.phone && this.checknum){
					this.disabled=false
				}else{
					this.disabled=true
				}
			},
			changestatus(){
				this.initinput()
				this.status=!this.status
			},
			back(){
				uni.navigateBack({
					delta: 1
				});
				
			},
			submit(){
				//提交时判断是哪种登录的方式
				//账号密码登录
				if(!this.status){
					return this.user.login({
						url:'/user/login',
						data:{
							username:this.username,
							password:this.password
						}
					})
				} 
				if(!this.isphone()){//验证码登录
					return
				}
				this.user.login({
					url:'/user/phonelogin',
					data:{
						phone:this.phone,
						code:this.checknum
					}
				})
			}
			
		},
		onLoad(e) {
			
		}
	}
</script>

<style>
.loginhead{
	width: 80%;
	max-height: 400upx;
	
}
.icon-cuowu{
	position: fixed;
	top: 30upx;
	left: 30upx;
	font-size: 50upx;
	font-weight: bold;
	color: #000000;
}
.user-set-btn{
	width: 100%;
	margin: 20upx 0;
	background-color: #ffe933;
	color: #000000;
}
.uni-input{
	font-size: 30upx;
	border-bottom: 1upx solid #F4F4F4;
	margin-bottom: 20upx;
}
.user-set-btn-disable{
	background-color: #F4F4F4 !important;
	border: 1upx solid #EEEEEE !important;
	color: #909090 !important;
}


.login-padding{
	padding: 20upx 0;
}
.login-font-color{
	color: #BBBBBB;
}
.other-login-title{
	position: relative;
}
.other-login-title::before,.other-login-title::after{
	content: "";
	position: absolute;
	background-color: #BBBBBB;
	height: 3upx;
	width: 100upx;
	top: 50%;
}
.other-login-title::before{
	left: 25%;
}
.other-login-title::after{
	right: 25%;
}
.login-input-box{
	position: relative;
}
.forget-input{
	padding-right: 150upx;
}
.forget{
	position: absolute;
	right: 0;
	top: 0;
	bottom: 0;
	height: 100%;
	width: 150upx;
}

.phone-input{
	padding-left: 50upx;
	margin-left: 20upx;
}
.phone{
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	height: 100%;
	width: 50upx;
	font-weight: bold;
}
.yanzhengma>view{
	background-color: #EEEEEE;
	border-radius: 10upx;
	font-size: 25upx;
	width: 100%;
	padding: 15upx 0;
}
</style>
