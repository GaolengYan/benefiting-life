<template>
	<view>
		<view style="padding-bottom:50rpx">
			<swiper :indicator-dots="true" :autoplay="true" :duration="1000" style="height: 770rpx;">
				<swiper-item v-for="(item, index) in goods.goodsCarouselPictures" :key="index">
					<view class="swiper-item">
						<image :src="item" mode="widthFix" />
					</view>
				</swiper-item>
			</swiper>
			<view class="goodsName">
				<text>{{goods.goodsName}}</text>
				<button plain="true" size="mini" open-type="share">
					<view class="shareIcon">
						<uni-icons type="upload"></uni-icons>
						<text style="font-size: 20rpx;">分享</text>
					</view>
				</button>
			</view>
			<!-- <view class="shopName">
				<text>{{shopName}}</text>
			</view> -->
			<view class="shop-detail">
				<image v-for="(item, index) in goods.goodsDetailPictures" :src="item" mode="widthFix"></image>
			</view>
		</view>
		<view class="footer">
			<button @click="click">
				<text>点击领取{{this.goods.discount}}元优惠券</text>
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shopName: '', // 店家名字
				sourceName: '', // 平台名
				goods: {}
			};
		},
		onLoad: function(options) {
			// 请求商品详情
			uni.request({
				url: "https://api.act.jutuike.com/union/convert",
				method: 'POST',
				data: {
					pub_id: '62828',
					goodsId: options.goodsId,
					sid: '62828',
					source: options.source
				},
				success: (res) => {
					this.shopName = options.shopName
					this.sourceName = options.sourceName
					this.goods = res.data.data
					console.log(this.goods)
					console.log(this.sourceName)
				},
				complete: (res) => {}
			})
		},
		methods: {
			click() {
				if (this.goods.we_app_info && this.goods.we_app_info.app_id != '') {
					uni.navigateToMiniProgram({
						appId: this.goods.we_app_info.app_id,
						path: this.goods.we_app_info.page_path
					})
				} else if (this.goods.tkl != '') {
					console.log(this.goods.tkl)
					uni.setClipboardData({
						data: this.goods.tkl,
						showToast: false,
						complete: (res) => {
							uni.showToast({
								icon: 'none',
								title: '已复制优惠券信息，请打开' + this.sourceName + 'APP领取',
								duration: 3000
							})
						}
					})
				} else {
					uni.navigateTo({
						url: '/pages/shop_detail_web/shop_detail_web?url=' + this.goods.short_click_url
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.swiper-item {
		display: flex;
		justify-content: center;
	}

	.footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		line-height: var(--footer-height);
		color: #fff;
	}

	.goodsName {
		display: flex;
		justify-content: center;
		margin-left: 3%;
		margin-bottom: 3%;
	}

	.goodsName text {
		margin-right: 3%;
	}

	.goodsName button {
		border: none;
		overflow: hidden;
		box-sizing: border-box;
		padding-left: 0;
		padding-right: 0;
		width: 30%;
	}

	.goodsName .shareIcon {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	
	.goodsName .shareIcon uni-icons {
		height: 50rpx;
	}
	
	.shop-detail image{
		display: block;
		margin: 0 auto;
	}
</style>
