<template>
	<view class="container">
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="5000" :duration="1000"
			circular="true">
			<swiper-item v-for="item in swiperList">
				<image class="swiper-item" :src="item.imgUrl" mode="" />
			</swiper-item>
		</swiper>
	</view>
	<my-menu class="my-menu" :menu="menuList"></my-menu>
	<my-card></my-card>

</template>

<script>
	export default {
		data() {
			return {
				swiperList: [{
					imgUrl: "/static/banner/huiyuankaquan_banner.png",
					url: ""
				}, {
					imgUrl: "/static/banner/eleme_banner.png",
					url: ""
				}, {
					imgUrl: "/static/banner/meituan_banner.png",
					url: ""
				}, ],
				menuList: [{
					image: "/static/coupon/meituan.png",
					name: "美团",
					navigationType: 'miniProgram'
				}, {
					image: "/static/coupon/ele.png",
					name: "饿了么",
					navigationType: 'miniProgram'
				}, {
					image: "/static/all.png",
					name: "低价会员",
					url: "https://kzurl02.cn/ZTJfO",
					navigationType: 'webView'
				}, ]
			};
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
			}
		}
	}
</script>

<style lang="scss">
	.container {
		margin-top: 50rpx;
		display: flex;
		justify-content: center;
	}

	.swiper {
		width: 670rpx;
		height: 280rpx;
		overflow: hidden;
		border-radius: 15rpx;
	}

	.swiper image {
		width: 100%;
		height: 100%;
	}
</style>
