<!-- 滑动切换选项卡演示(标准写法) -->
<template>
	
</template>

<script>
	export default {
		data() {
			return {
				tabList: ['测试1','测试2','测试3','测试4'],
				current: 0, // tabs组件的current值，表示当前活动的tab选项
			};
		},
		methods: {
			//tabs通知swiper切换
			tabsChange(index) {
				this.current = index;
			},
			//swiper滑动中
			swiperTransition(e) {
				this.$refs.tabs.setDx(e.detail.dx);
			},
			//swiper滑动结束
			swiperAnimationfinish(e) {
				this.current = e.detail.current;
				this.$refs.tabs.unlockDx();
			}
		}
	}
</script>

<style>
	.swiper {
		height: 100%;
	}
</style>

