<template>
	<view class="animated fadeIn fast" v-show="isshow">
		<view class="more-share-model" @tap="upshow"></view>
		<view class="more-share">	
			<view class="more-share-title u-f-ajc">分享到</view>
			<scroll-view scroll-x="true" class="more-share-body">
				<block v-for="(val,index) in list" :key="index">
					<view @tap=share(val) class="more-share-item" hover-class="more-share-hover">
						<view 
						class="icon iconfont u-f-ajc" 
						:class="['icon-'+val.zicon,'more-share-'+val.zclass]">
						</view>
						<view>{{val.name}}</view>
					</view>
				</block>
			</scroll-view>
			<view class="more-share-bottom u-f-ajc" hover-class="more-share-hover" @tap="upshow">取消</view>
		</view>
	</view>
</template>

<script>
	export default{
		watch:{
			sharedata(newvalue,oldvalue){
				this.title=newvalue.title
				this.shareText=newvalue.content
				this.href=newvalue.url
				this.image=newvalue.titlepic
				this.shareType=newvalue.shareType
			}
		},
		data() {
			return {
				title:'',
				shareText: '',
				href:"",
				image: '',
				shareType:1,
				providerList: [],
				list:[
					{
						name: '微信好友',
						id: 'weixin',
						zicon:'weixin',
						zclass:'wx',
						sort:0
					},
					{
						name: '朋友圈',
						id: 'weixin',
						zicon:'huiyuan',
						zclass:'pyq',
						type:'WXSenceTimeline',
						sort:1
					},
					{
						name: '新浪微博',
						id: 'sinaweibo',
						zicon:'weibo',
						zclass:'wb',
						sort:2
					},
					{
						name: 'QQ好友',
						id: 'qq',
						zicon:'QQ',
						zclass:'qq',
						sort:3
					}
				]
			}
		},
		onReady() {
			console.log(this.sharedata)
		},
		props:{
			isshow:Boolean,
			sharedata:Object
		},
		methods:{
		
			async share(e) {
				console.log('分享通道:'+ e.id +'； 分享类型:' + this.shareType);
				
				if(!this.shareText && (this.shareType === 1 || this.shareType === 0)){
					uni.showModal({
						content:'分享内容不能为空',
						showCancel:false
					})
					return;
				}
				
				if(!this.image && (this.shareType === 2 || this.shareType === 0)){
					uni.showModal({
						content:'分享图片不能为空',
						showCancel:false
					})
					return;
				}
				
				let shareOPtions = {
					provider: e.id,
					scene: e.type && e.type === 'WXSenceTimeline' ? 'WXSenceTimeline' : 'WXSceneSession', //WXSceneSession”分享到聊天界面，“WXSenceTimeline”分享到朋友圈，“WXSceneFavorite”分享到微信收藏     
					type: this.shareType,
					success: (e) => {
						console.log('success', e);
						uni.showModal({
							content: '已分享',
							showCancel:false
						})
					},
					fail: (e) => {
						console.log('fail', e)
						uni.showModal({
							content: e.errMsg,
							showCancel:false
						})
					},
					complete:function(){
						console.log('分享操作结束!')
					}
				}
				
				switch (this.shareType){
					case 0:
						shareOPtions.summary = this.shareText;
						shareOPtions.imageUrl = this.image;
						shareOPtions.title = this.title;
						shareOPtions.href = this.href;
						break;
					case 1:
						shareOPtions.summary = this.shareText;
						break;
					case 2:
						shareOPtions.imageUrl = this.image;
						break;
					case 5:
						shareOPtions.imageUrl = this.image 
						shareOPtions.title = this.title;
						shareOPtions.miniProgram = {
							id:'gh_33446d7f7a26',
							path:'/pages/tabBar/component/component',
							webUrl:'https://uniapp.dcloud.io',
							type:0
						};
						break;
					default:
						break;
				}
				
				if(shareOPtions.type === 0 && plus.os.name === 'iOS'){//如果是图文分享，且是ios平台，则压缩图片 
					shareOPtions.imageUrl = await this.compress();
				}
				if(shareOPtions.type === 1 && shareOPtions.provider === 'qq'){//如果是分享文字到qq，则必须加上href和title
					shareOPtions.href = this.href;
					shareOPtions.title = this.title;
				}
				uni.share(shareOPtions);
			},
			compress(){//压缩图片 图文分享要求分享图片大小不能超过20Kb
				console.log('开始压缩');
				let img = this.image;
				return new Promise((res) => {
					var localPath = plus.io.convertAbsoluteFileSystem(img.replace('file://', ''));
					console.log('after' + localPath);
					// 压缩size
					plus.io.resolveLocalFileSystemURL(localPath, (entry) => {
						entry.file((file) => {// 可通过entry对象操作图片 
							console.log('getFile:' + JSON.stringify(file));
							if(file.size > 20480) {// 压缩后size 大于20Kb
								plus.zip.compressImage({
									src: img,
									dst: img.replace('.jpg', '2222.jpg').replace('.JPG', '2222.JPG'),
									width: '10%',
									height: '10%',
									quality: 1,
									overwrite: true
								}, (event) => {
									console.log('success zip****' + event.size);
									let newImg = img.replace('.jpg', '2222.jpg').replace('.JPG', '2222.JPG');
									res(newImg);
								}, function(error) {
									uni.showModal({
										content:'分享图片太大,需要请重新选择图片!',
										showCancel:false
									})
								});
							}
						});
					}, (e) => {
						console.log('Resolve file URL failed: ' + e.message);
						uni.showModal({
							content:'分享图片太大,需要请重新选择图片!',
							showCancel:false
						})
					});
				})
			},
			upshow(){
				this.$emit('upshow')
			}
		}
	}
</script>

<style scoped>
.more-share{
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: #FFFFFF;
	z-index: 1000;
}
.more-share-title,.more-share-bottom{
	font-size: 35upx;
	padding: 25upx;
}
.more-share-body{
	display: flex;
	white-space: nowrap;
	width: 100%;
	height: 200upx;
	border-bottom: 1upx solid #EEEEEE;
	line-height: 200upx;
	display: flex;
}
.more-share-hover{
	background-color: #EEEEEE;
}
.more-share-item{
	width: 25%;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	height: 100%;
}
.more-share-item>view:first-child{
	width: 100upx;
	height: 100upx;
	border-radius: 100%;
	color: #FFFFFF;
	font-size: 55upx;
}
.more-share-item>view:last-child{
	color: #7a7a7a;
}
.more-share-model{
	position: fixed;
	z-index: 10;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	background-color: rgba(51,51,51,.62);
}
.more-share-wx{
	background-color: #2ad19b;
}
.more-share-pyq{
	background-color: #514d4c;
}
.more-share-wb{
	background-color: #ee5e5e;
}
.more-share-qq{
	background-color: #4a73ba;
}	
</style>
