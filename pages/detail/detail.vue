<template>
	<view>
		<detail-info @changeevent='updateguanzhu' :item="detail" />

		<view class="u-comment-title">最新评论 {{comment.count}}</view>
		<view class="uni-comment u-comment">
			<block v-for="(item,index) in comment.list" :key="index">
				<comment-list :item="item" :index="index" @reply="reply"></comment-list>
			</block>
		</view>


		<view style="height: 120upx;"></view>
		<user-chat-bottom :focus="focus" @blur="blur" @submit="submit" />

		<more-share :isshow="isshow" @upshow="upshow" :sharedata="sharedata" />

	</view>
</template>

<script>
	import tiem from "../../common/time.js"
	import detailInfo from "../../components/detail/detail-info.vue"
	import commentList from "../../components/detail/comment-list.vue"
	import userChatBottom from "../../components/user-chat/user-chat-bottom.vue"
	import moreShare from "../../components/common/more-share.vue"
	export default {
		components: {
			detailInfo,
			commentList,
			userChatBottom,
			moreShare
		},
		data() {
			return {
				focus: false,
				reply_id: 0,
				sharedata: {
					title: '',
					url: '',
					titlepic: '',
					shareType: 0,
					content: ''
				},
				isshow: false,
				comment: {
					count: 20,
					list: []
				},
				// detail:{//图文
				// 	userpic:"../../static/imges1/20170617202755_vasTA.jpeg",
				// 	username:'张三',
				// 	sex:1,
				// 	age:25,
				// 	isguanzhu:false,
				// 	title:'标题图文',
				// 	titlepic:'../../static/imges1/15361977_214857628142_2.jpg',
				// 	morepic:['../../static/imges1/15361977_214857628142_2.jpg',
				// 	'../../static/imges1/15361977_214857628142_2.jpg',
				// 	'../../static/imges1/15361977_214857628142_2.jpg'],
				// 	video:false,
				// 	share:false,
				// 	path:'重庆 江北',
				// 	sharenum:20,
				// 	goodnum:20,
				// 	commentnum:50
				// }
				detail: { //图文
					userpic: "",
					username: '',
					sex: 0,
					age: 0,
					isguanzhu: false,
					content: '',
					title: '',
					titlepic: '',
					morepic: [],
					video: false,
					share: false,
					path: '',
					sharenum: 0,
					goodnum: 0,
					commentnum: 0,
					create_time: 0
				}
			}
		},
		methods: {
			reply(id) {
				this.reply_id = id
				this.focus = true
			},
			blur() {
				this.focus = false,
				this.reply_id = 0
			},
			updateguanzhu(res) {
				this.detail.isguanzhu = true
			},
			upshow() {
				this.isshow = !this.isshow
			},
			// 发布评论
			async submit(data) {
				uni.showLoading({
					title: '评论中...',
					mask: false
				});
				let reply_id = this.reply_id;
				let [err, res] = await this.$http.post('/post/comment', {
					post_id: this.detail.id,
					fid: reply_id,
					data: data
				}, {
					token: true,
				});
				// 错误处理
				if (err || res.data.errorCode) {
					let msg = res.data.errorCode ? res.data.msg : '发送失败，请检查网络~';
					uni.hideLoading();
					return uni.showToast({
						title: msg,
						icon: "none"
					});
				}
				// 发送成功
				uni.hideLoading();
				uni.showToast({
					title: "发送成功~"
				});
				let result = {
					id: res.data.data.id,
					fid: reply_id,
					userpic: uni.getStorageSync('userinfo').userpic,
					username: this.user.userinfo.username,
					time: tiem.gettime.gettime(new Date().getTime()),
					data: data,
				};
				// 评论数+1
				this.comment.count++;
				this.detail.commentnum++;
				// 一级评论
				if (reply_id === 0) {
					return this.comment.list.push(result);
				}
				// 二级评论
				// 找出被评论id的索引
				let index = this.comment.list.findIndex((val) => {
					return val.id === reply_id;
				});
				if (index > -1) {
					// 中间插入
					this.comment.list.splice(index + 1, 0, result);
				}
				// 通知首页更新评论数，通知会员中心更新评论数
				uni.$emit('updatedata', {
					type: 'updateComment',
					post_id: this.detail.id
				});
			},
			async getcomment() {// 获取评论
				let [err, res] = await this.$http.get(`/post/${this.detail.id}/comment`)
				if (!this.$http.errorcheck(err, res)) return
				let list = res.data.data.list
				this.comment.list = this.comment.list.concat(this.__Arrsot(list))
				// for(var i=0;i<list.length;i++){
				// 	list[i].tiem=tiem.gettime.gettime(list[i].tiem)
				// }
				// this.comment.list=list
			},
			__Arrsot(arr, id = 0) {
				var temp = [],
					lev = 0
				var forfun = function(arr, id, lev) {
					for (var i = 0; i < arr.length; i++) {
						var item = arr[i]
						if (item.fid == id) {
							item.lev = lev
							temp.push({
								id: item.id,
								fid: item.fid,
								userid: item.user.id,
								userpic: item.user.userpic,
								username: item.user.username,
								time: item.create_time,
								data: item.data
							})
							forfun(arr, item.id, lev + 1)
						}
					}
				}
				forfun(arr, id, lev)
				return temp;
			},
			__initshare(obj) {
				this.sharedata = {
					title: obj.title,
					content: obj.title,
					url: "http://dishaxy.com/",
					titlepic: obj.titlepic ? obj.titlepic : "https://img-cdn-qiniu.dclod.net.cn/uniapp/app/share-logo@.png",
					shareType: 0
				}
			},
			initdata(obj) {
				uni.setNavigationBarTitle({
					title: obj.title
				})
				this.__initshare(obj)
				uni.showLoading({
					title: "loading",
					mask: true
				})
				obj.morepic = []
				obj.content = ''
				obj.goodnum = obj.infonum.dingnum
				this.detail = obj
				this.comment.count = obj.commentnum
				//请求服务器
				this.getdetail()
				if (this.comment.count) {
					this.getcomment()
				}
			},
			async getdetail() {
				let [err, res] = await this.$http.get(`/post/${this.detail.id}`)
				let arror = this.$http.errorcheck(err, res, () => {
					uni.hideLoading()
				}, () => {
					uni.hideLoading()
				})
				if (!arror) {
					return
				}
				let data = res.data.data.detail
				this.detail.content = data.content
				let images = []
				for (var i = 0; i < data.images.length; i++) {
					images.push(data.images[i].url)
				}
				this.detail.morepic = images
				this.detail.age = data.user.userinfo.age
				this.detail.sex = data.user.userinfo.sex
				this.detail.create_time = data.create_time
				uni.hideLoading()

			}
		},
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				this.isshow = !this.isshow
			}
		},
		onLoad(e) {
			this.initdata(JSON.parse(e.Data))
			// console.log(e.Data.title)
			// uni.setNavigationBarTitle({
			// 	title:JSON.parse(e.Data.title)
			// })
			// this.getcomment()
		}
	}
</script>

<style>
/* 评论 */	
.u-comment{
	padding: 0 20upx;
}
.u-comment-title{
	padding: 20upx;
	font-size: 30upx;
	font-weight: bold;
}
</style>
