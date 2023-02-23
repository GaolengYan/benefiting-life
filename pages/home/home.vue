<template>
	<v-tab :data="tabs" ref="tabs"></v-tab>
	<my-card ref="card"></my-card>

</template>

<script>
	export default {
		data() {
			return {
				tabs: [{
					name: '全部',
					tabId: 0
				},{
					name: '外卖',
					tabId: 1
				}, {
					name: '出行',
					tabId: 2
				}]
			};
		},
		onShareAppMessage(){
		},
		onShareTimeline() {
		},
		methods: {
			toMovie(event) {
				console.log(event)
				uni.navigateToMiniProgram({
					appId: 'wx89752980e795bfde',
					path: '/pages/movie/cinemas?pub_id=62828&sid=xiaochengxu&source=jutuike',
					success(res) {
						console.log(res)
					}
				})
			},
			changeTab(tabItem) {
				this.$refs.card.changeTabId(tabItem.tabId)
			}
		}
	}
</script>

<style lang="scss">
	.container {
		margin-top: 30rpx;
		display: flex;
		justify-content: center;
	}

	.swiper {
		width: 660rpx;
		height: 220rpx;
		overflow: hidden;
		border-radius: 15rpx;
	}

	.swiper image {
		width: 100%;
		height: 100%;
	}
</style>
