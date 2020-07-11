<template>
	<view class="common-list u-f animated bounce">
		<view class="common-list-l">
			<image @tap.stop="openSpace" :src="item.userpic" mode="widthFix" lazy-load></image>
		</view>
		<view class="common-list-r">
			<view class="u-f-ac u-f-jsb">
				<view class="u-f-ac">{{item.username}}
					<tag-sex-age :age="item.age" :sex="item.sex"/>
				</view>
				<view @tap="guanzhu" v-show="!item.isguanzhu" class="icon iconfont icon-jia">关注</view>
			</view>
			<view>{{item.title}}</view>
			<view class="u-f-ajc">
				<!-- 图片 -->
				<image 
				:src="item.titlepic" 
				mode="widthFix" 
				lazy-load
				v-if="item.titlepic"
				></image>
				<!-- 视频 -->
				<template v-if="item.video">
					<view class="common-list-play icon iconfont icon-ziyuan"></view>
					<view class="common-list-play-info">
						{{item.video.looknum}} 次播放 {{item.video.long}}
					</view>
				</template>
				
				<!-- 分享 -->
				<view class="common-list-share u-f-ac" v-if="item.share">
					<image 
					:src="item.share.titlepic" 
					mode="widthFix" lazy-load></image>
					<view>{{item.share.title}}</view>
				</view>
			</view>
			<view class="u-f-ac u-f-jsb">
				<view>{{item.path}}</view>
				<view class="u-f-ac">
					<view class="icon iconfont icon-fenxiang">{{item.sharenum}}</view>
					<view class="icon iconfont icon-xiaoxi1">{{item.commentnum}}</view>
					<view class="icon iconfont icon-dianzan">{{item.goodnum}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tagSexAge from "./tag-sex-age.vue"
	export default{
		components:{
			tagSexAge
		},
		props:{
			item:Object,
			index:Number
		},
		data(){
			return{
				isguanzhu:this.item.isguanzhu
			}
		},
		methods:{
			// 进入详情页
			opendetail(){
				uni.navigateTo({
					url: '../../pages/detail/detail?Data='+JSON.stringify(this.item),
				});
				this.user.addHistoryList(this.item)
			},
			async guanzhu(){
				try{
					let [err,res] = await this.$http.post('/follow',{
						follow_id:this.item.userid
					},{
						token:true,
						checktoken:true,
						checkAuth:true
					});
					// 错误处理
					if (!this.$http.errorcheck(err,res)) return;
					// 通知首页修改数据
					uni.showToast({ title: '关注成功' });
					let resdata = {
						type:"guanzhu",
						userid:this.item.userid,
						data:true
					};
					// 通知父组件
					this.$emit('changeevent',resdata);
					// 通知全局
					uni.$emit('updatedata',resdata);
				}catch(e){ return; }
			},
			async caozuo(type){
				let index = (type === 'ding') ? 1 : 2; // 当前操作
				let [err,res] = await this.$http.post('/support',{
					post_id:this.item.id,
					type:index-1
				},{
					token:true,
					checkToken:true,
					checkAuth:true
				});
				if (!this.$http.errorCheck(err,res)) return;
				uni.showToast({ title: "顶成功" });
				// 通知父组件
				let resdata = {
					type:"support",
					post_id:this.item.id,
					do:type
				};
				this.$emit('changeevent',resdata);
				// 通知全局
				return uni.$emit("updateData",resdata);
			},
			openSpace(){
				uni.navigateTo({
					url:"../../pages/user-space/user-space?userid="+this.item.userid
				})
			}
		}
	}
</script>

<style scoped>
@import url("../../common/list.css");
</style>
