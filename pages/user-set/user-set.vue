<template>
	<view class="body">
		<block v-for="(item,index) in list" :key="index">
			<home-list-item :item="item" :index="index"/>
		</block>
		<button type="primary" class="user-set-btn" @tap="logout">退出登录</button>
	</view>
</template>

<script>
	import homeListItem from "../../components/home/home-list-item.vue"
	export default {
		components:{
			homeListItem
		},
		data() {
			return {
				list:[
					{
						name:"账号与安全",
						icon:"",
						clicktype:'navigateTo',
						url:"../../pages/user-safe/user-safe",
					},
					{
						name:"绑定邮箱",
						icon:"",
						clicktype:'navigateTo',
						url:"../../pages/user-set-email/user-set-email",
					},
					{
						name:"资料编辑",
						icon:"",
						clicktype:'navigateTo',
						url:"../../pages/user-set-userinfo/user-set-userinfo",
					},
					{
						name:"小纸条",
						icon:"",
						clicktype:'switchTab',
						url:"../../pages/paper/paper",
					},
					{
						name:"清除缓存",
						icon:"",
						clicktype:'',
						url:"",
					},
					{
						name:"意见反馈",
						icon:"",
						clicktype:'navigateTo',
						url:"../../pages/user-set-help/user-set-help",
					},
					{
						name:"关于趣事百科",
						icon:"",
						clicktype:'navigateTo',
						url:"../../pages/user-set-about/user-set-about",
					},
				]
			}
		},
		methods: {
			logout(){
				this.user.logout()
				// uni.navigateTo({
				// 	url: '../home/home',
				// 	success: res => {},
				// 	fail: () => {},
				// 	complete: () => {}
				// });
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
</style>
