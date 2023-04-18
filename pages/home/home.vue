<template>
	<v-tab :data="tabs" ref="tabs"></v-tab>
	<my-card ref="card"></my-card>
</template>

<script>
	import {config} from '@/common/config.js'
	export default {
		data() {
			return {
				tabs: config.tabs
			};
		},
		onShareAppMessage(){
		},
		onShareTimeline() {
		},
		methods: {
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
