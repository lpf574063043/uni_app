<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.user.__init()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import url("./common/uni.css");
	@import url("./common/icon.css");
	@import url("./common/animate.css");
	@import url("./common/flex.css");
</style>
