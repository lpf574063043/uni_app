<template>
	<view style="overflow: hidden;">
		<!-- 官方扩展ui -->
		<uni-nav-bar rightText="发布" :statusBar="true" left-icon="back" @clickLeft="back" @clickRight="submit">
			<view class="kejian u-f-ajc" @tap="changelooks">
				{{gettype}}
				<view class="icon iconfont icon-toBottom"></view>
			</view>
		</uni-nav-bar>
		<!-- 输入文字框 -->
		<view class="uni-textarea">
			<textarea v-model="value" placeholder="说点什么吧...." />
			</view>
		<!-- 上传图片 -->
		<uploud-imges :imageList="imglist" @upload="upload" @del="delimg"></uploud-imges>
		<!-- 遮罩层 -->
		<view class="zezhao" v-show="isshow">
			<view class="mtitle">严禁发表以下消息</view>
			<view class="mtext">涉及黄色,政治,广告及骚扰信息</view>
			<view class="mtext">涉及人生攻击</view>
			<view class="mtext">联系方式,透露他人隐私</view>
			<button type="warn"  @tap="lodshow">朕知道了</button>
		</view>
		<!-- 模态框 -->
		<view class="mtai" v-show="isshow" @tap="lodshow"></view>
		<!-- 底部 -->
		<view class="u-f-ac addinput-foot">
			
			<picker class="u-f1 u-f-ajc" mode="selector" :range="postclass.range" @change="changePostClass">
				<view class="u-f1 u-f-ajc">
				{{postclass.title ? postclass.title : "选择分类"}}
				</view>
			</picker>
			
			<view class="u-f1 u-f-ajc" 
			hover-class="addinput-foot-btn"
			@tap="changeTopic">{{topic.title ? topic.title : "选择话题"}}</view>
		</view>
	</view>
</template>

<script>
	const itemLists=['仅自己可见','所有人可见']
	import uniNavBar from "../../components/uni-nav-bar/uni-nav-bar.vue";
	import uploudImges from "../../components/common/uploud-imges.vue"
	export default {
		components:{
			uniNavBar,
			uploudImges
		},
		data() {
			return {
				imglistIds:[],
				yinsi:1,
				value:'',
				imglist:[],
				isshow:true,
				isget:false,
				postclass:{
					id:0,     // 当前选中分类id
					title:"", // 当前选中分类名称
					range:[], // 可选项
					list:[]   // 服务端获取到的分类列表
				},
				topic:{
					id:0,	  // 当前选中话题id
					title:""  // 当前选中话题名称
				}
			}
		},
		computed:{
			gettype(){
				return itemLists[this.yinsi]
			}
		},
		onLoad(e) {
			// 读取缓存信息
			let res = uni.getStorageSync('addinput');
			if (res) {
				this.yinsi = res.yinsi;
				this.imglistIds = res.imglistIds || [];
				if (this.imglistIds.length) {
					this.imglist = res.imglist;
				}
				this.value = res.text;
				if (res.postclass) {
					this.postclass = res.postclass;
				}
				if (res.topic) {
					this.topic = res.topic;
				}
				
			}
			// 获取文章分类
			let postclass = e.postclass ? JSON.parse(e.postclass) : false;
			this.getPostClass(postclass);
			// 监听所属话题选择
			uni.$on('changeTopic',(data)=>{//监听changeTopic事件,创建事件
				this.topic.id = data.id;
				this.topic.title = `#${data.title}#`;
			})
		},
		methods: {
			delimg(index){//删除图片
				this.imglist.splice(index,1)
				this.imglistIds.splice(index,1)
			},
			changePostClass(e){
				console.log(e)
				// 当前选中的id
				this.postclass.id = this.postclass.list[e.target.value].id;
				// 当前选中的名称
				this.postclass.title = this.postclass.list[e.target.value].name;
				console.log(this.postclass.list[e.target.value])
			},
			changeTopic(){
				uni.navigateTo({
					url:"/pages/topic-nav/topic-nav?ischange="+true,
				});
			},
			async getPostClass(postclass){
				if (postclass) {
					this.postclass.list = postclass;
					let arr = [];
					for (let i = 0; i < postclass.length; i++) {
						arr.push(postclass[i].name)
					}
					return this.postclass.range = arr;
				}
				try{
					let [err,res] = await this.$http.get('/postclass');
					if (!this.$http.errorcheck(err,res)) return;
					let list = res.data.data.list;
					let arr = [] , arr2 = [];
					for (let i = 0; i < list.length; i++) {
						arr.push(list[i].classname);
						arr2.push({
							id:list[i].id,
							name:list[i].classname
						})
					}
					this.postclass.range = arr;
					this.postclass.list = arr2;
				}catch(e){
					return;
				}
			},
			back(){
				uni.navigateBack({
					delta: 1
				});
			},
			async submit(){
				if(!this.postclass.id){
					return uni.showToast({
						title:"请选择分类",
						icon:"none"
					})
				}
				uni.showLoading({
					title:"上传中...",
					mask:true
				})
				try{
					let [err,res]=await this.$http.post('/post/create',{
						imglist:JSON.stringify(this.imglistIds),
						text:this.value,
						isopen:this.yinsi,
						topic_id:this.topic.id,
						post_class_id:this.postclass.id
					},{
						tolen:true,
						chechtoken:true,
						chechAuth:true
					})
					// 发布失败
					if (!this.$http.errorcheck(err,res)) {
						return uni.hideLoading();
					}
					// 发布成功
					uni.hideLoading();
					uni.showToast({
						title: '发布成功！'
					});
					this.isget = true;
					uni.$emit('updatedata',{ 
						type:"updateList",
						data:res.data.data.detail
					});
					uni.navigateBack({ delta: 1 });
				}catch(e){
					return
				}
				
			},
			changelooks(){
				uni.showActionSheet({
					itemList: itemLists,
					success: res => {
						this.yinsi=res.tapIndex
					}
				});
			},
			upload(index){
				this.imglist.push(index.url)
				this.imglistIds.push({id:index.id})
				// this.imglist=index
			},
			lodshow(){
				this.isshow=!this.isshow
			}
		},
		onBackPress(){//监听官方顶部导航的返回事件
			if(!this.value && this.imglist.length<1){
				return;
			}
			if(!this.isget){
				uni.showModal({
					content: '是否保存为草稿',
					cancelText: '不保存',
					confirmText: '保存',
					success: res => {
						if(res.confirm){
							let obj={
								yinsi:this.yinsi,
								text:this.value,
								imglist:this.imglist,
								topic:this.topic,
								postclass:this.postclass,
								imglistIds:this.imglistIds
							}
							uni.setStorageSync('addinput',obj)
							console.log('保存')
						}else{
							uni.removeStorageSync('addinput')
							console.log('不保存')
						}
						this.isget=true
						uni.navigateBack({delta:1});
					},
				});
				return true
			}
		}
	}
</script>

<style>
.addinput-foot{
	background: #FFFFFF;
	position: fixed;bottom: 0;left: 0;right: 0;height: 88upx;border-top:1upx solid #DDDDDD
}
.addinput-foot view{
	height: 100%;
}
.addinput-foot-btn{
	background: #F4F4F4;
}	
.kejian{
	margin-left: 100upx;
}
.uni-textarea{
	border: 1upx solid #EEEEEE;
}

.zezhao{
	width: 600upx;
	height: 500upx;
	z-index: 10;
	position: fixed;
	top: 50%;
	left: 50%;
	margin-top: -400upx;
	margin-left: -320upx;
	background-color: #0A98D5;
	border-radius: 40upx;
	padding: 20upx;
}
.mtitle{
	color: #990055;
	text-align: center;
	font-size: 50upx;
	font-weight: bold;
}
.mtext{
	color: #FFFFFF;
	font-size: 30upx;
	margin: 20upx 0;
}
.mtai{
	position: fixed;
	top: 0;left: 0;right: 0;bottom: 0;
	background-color: rgba(51,51,51,0.61);
	z-index: 9;
}
</style>
