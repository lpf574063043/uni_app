<template>
	<view>		
		<template v-if="list.length>0">
			<uni-list>
				<block v-for="(item,index) in list" :key="index">
					<uni-list-item :title="item.title" @tap="opendetail(item)" :thumb="item.titlepic"></uni-list-item>
				</block>
			</uni-list>
		</template>
		<template v-else-if="!firstload">
			<view style="font-size: 50upx;font-weight: bold;color: #CCCCCC;
						padding-top: 100upx;" class="u-f-ajc">Loading
				...</view>
		</template>
		<template v-else>
			<!-- 无内容默认 -->
			<no-thing></no-thing>
		</template>
	</view>
</template>

<script>
	import uniNavBar from "../../components/uni-nav-bar/uni-nav-bar.vue"

	import uniListItem from '../../components/uni-list-item/uni-list-item.vue'
	import uniList from "../../components/uni-list/uni-list.vue"
	import noThing from '../../components/common/no-thing.vue'
	export default {
		components: {
			uniListItem,
			uniList,
			noThing,
			uniNavBar
		},
		data() {
			return {
				firstload: false,
				list: []
			}
		},
		onLoad() {
			this.getlist()
		},
		onNavigationBarButtonTap(e) {
			if(e.index==0){
				this.clear()
			}
			
		},
		methods: {
			clickRight() {
				this.clear()
			},
			clear() {
				uni.showModal({
					title: '提示',
					content: '是否要清除浏览历史？',
					success: res => {
						if (res.confirm) {
							this.user.clearHistory();
							this.list = [];
							uni.showToast({
								title: '清除成功'
							});
						}
					}
				});
			},
			getlist() {
				try {
					let list = uni.getStorageSync('HistoryList_' + this.user.userinfo.id);
					this.list = list ? JSON.parse(list) : [];
				} catch (e) {
					uni.showToast({
						title: '加载失败~',
						icon: 'none'
					});
				}
				this.firstload = true;
			},
			opendetail(res) {
				uni.navigateTo({
					url: "../detail/detail?Data=" + JSON.stringify(res)
				})
			}
		}
	}
</script>

<style>

</style>
