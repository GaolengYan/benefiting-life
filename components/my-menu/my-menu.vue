<template>
	<view>
		<swiper class="menuSwiper" @change='change'>
			<swiper-item v-for="(item,index) in db" :key="index" class="swiperItem">
				<view v-for="(ite,ind) in item" :key='ind' @click="toMovie(ite)">
					<image :src="ite.image" mode="widthFix"></image>
					<text>{{ite.name}}</text>
				</view>
			</swiper-item>
		</swiper>
		<view class="silder">
			<text v-for="(item,index) in db" :key='index' :class="current == index?'active':''"></text>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['menu'],
		data() {
			return {
				db: [],
				current: 0
			};
		},
		mounted() {
			let menuDb = this.menu
			let arr = []
			for (let i = 0; i < menuDb.length; i += 10) {
				arr.push(menuDb.slice(i, i + 10))
			}
			this.db = arr
		},
		methods: {
			change(e) {
				this.current = e.detail.current
			},
			toMovie(menuItem) {
				if (menuItem.navigationType == 'miniProgram') {
					uni.navigateToMiniProgram({
						appId: 'wx89752980e795bfde',
						path: '/pages/movie/cinemas?pub_id=62828&sid=xiaochengxu&source=jutuike',
						success(res) {
							console.log(res)
						}
					})
				} else if (menuItem.navigationType == 'webView') {
					// uni.navigateTo({
					// 	url: '/pages/web/web?url=' + menuItem.url
					// })
				}

			}
		}
	}
</script>

<style lang="scss">
	.menuSwiper {
		width: 90%;
		height: 120rpx;
		margin: 30rpx auto 10rpx;
		font-size: 24rpx;
	}

	.swiperItem {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-gap: 16rpx;
	}

	.swiperItem>view {
		display: flex;
		flex-direction: column;
		align-items: center;

		image {
			width: 80rpx;
			height: 80rpx;
		}
	}

	.silder {
		display: flex;
		justify-content: center;

		text {
			display: inline-block;
			width: 10rpx;
			height: 10rpx;
			border-radius: 10rpx;
			background-color: red;
			margin-right: 10rpx;
			transition: width .2s linear;

			&.active {
				width: 20rpx;
			}
		}
	}
</style>
