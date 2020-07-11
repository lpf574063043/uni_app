<template>
	<view>
		<scroll-view scroll-y="true" :scroll-top="scolltop" :scroll-with-animation="true" :style="{height:style.contentH+'px'}"
		 id="scroll">
			<view class="u-f-ajc chat-load-more" hover-class="chat-load-more-hover" @tap="loadmore">{{loadtext}}</view>
			<block v-for="(item,index) in list" :key="index">
				<user-chat-list :item="item" :index="index" />
			</block>
		</scroll-view>


		<!-- 底部输入框 -->
		<user-chat-bottom :text="text" @submit="submit"></user-chat-bottom>

	</view>
</template>

<script>
	import userChatList from "../../components/user-chat/user-chat-list.vue"
	import time from '../../common/time.js'
	import userChatBottom from "../../components/user-chat/user-chat-bottom.vue"
	export default {
		components: {
			userChatBottom,
			userChatList
		},
		data() {
			return {
				scolltop: 0,
				style: {
					contentH: 0,
					itemH: 0
				},
				text: "",
				list: [],
				page: 1,
				loadtext: '点击加载更多'
			}
		},
		onLoad() {
			this.getdata()
			this.initdata()
		},
		onReady() {
			this.pagetobottom()
		},
		methods: {
			initdata() {
				try {
					const res = uni.getSystemInfoSync()
					this.style.contentH = res.windowHeight - uni.upx2px(120)
				} catch (e) {}
			},
			//输入类容过多时自动滑动到底部
			pagetobottom() {
				let query = uni.createSelectorQuery()
				query.select('#scroll').boundingClientRect() //获取节点的各个参数
				query.selectAll('.user-chat-item').boundingClientRect()
				query.exec((res) => {
					// res[1].forEach((ret)=>{
					// 	this.style.itemH+=ret.height
					// });
					for (var req of res[1]) {
						this.style.itemH += req.height
					}
				})
				if (this.style.itemH > this.style.contentH) {
					this.scolltop = this.style.itemH
				}
				console.log(this.scolltop)
			},
			async submit(data) {
				let [err, res] = await this.$http.post('/feedback', {
					data: data
				}, {
					token: true,
					checktoken: true
				});
				// 错误处理
				if (!this.$http.errorcheck(err, res)) return;
				// 成功处理
				// 构建数据
				let now = new Date().getTime();
				let gstime = time.gettime.getChatTime(now, this.list.length > 0 ? this.list[this.list.length - 1].time : 0);
				this.list.push({
					isme: true,
					userpic: this.user.userinfo.userpic,
					type: "text",
					data: data,
					time: now,
					gstime: gstime
				});
				this.pagetobottom();
				uni.showToast({
					title: '反馈成功'
				});
			},
			// 获取用户反馈记录
			async getdata() {
				let url = `/feedbacklist/${this.page}`;
				let [err, res] = await this.$http.get(url, {}, {
					token: true,
					checktoken: true
				});
				// 错误处理
				if (!this.$http.errorcheck(err, res)) return;
				// 成功
				let list = res.data.data.list;
				let arr = [];
				for (let i = 0; i < list.length; i++) {
					if (list[i].from_id == this.user.userinfo.id || list[i].to_id == this.user.userinfo.id) { //判断是不是当前用户跟客户交流
						let isme = list[i].from_id == this.user.userinfo.id; //判断是用户还是客户
						arr.push({
							isme: isme,
							userpic: isme ? this.user.userinfo.userpic : "../../static/imges1/d267eb8e8c5494eea10687cf2af5e0fe98257e7e.jpg",
							type: "text",
							data: list[i].data,
							time: list[i].create_time,
							gstime: time.gettime.getChatTime(list[i].create_time, i > 0 ? list[i - 1].create_time : 0)
						});
					}
				}
				this.loadtext = list.length < 10 ? "没有更多数据了" : "点击加载更多";
				arr.reverse()
				this.list = [...arr, ...this.list];

				if (this.page === 1 && this.list.length > 0) {
					this.pagetobottom(true);
				}
			},
			loadmore() {
				if (this.loadtext !== '点击加载更多') {
					return
				}
				this.loadtext = '加载中...'
				this.page++
				this.getdata()
			}
		}
	}
</script>

<style>
	.chat-load-more {
		padding: 15upx 0;
		color: #BBBBBB;
	}

	.chat-load-more-hover {
		background: #F4F4F4;
	}
</style>
