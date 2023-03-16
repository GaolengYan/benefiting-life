<template>
	<view v-show="loadFinish">
		<view style="padding-bottom:70rpx">
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
			<view class="shop-detail">
				<image v-for="(item, index) in goods.goodsDetailPictures" :src="item" mode="widthFix"></image>
			</view>
		</view>
		<view class="footer">
			<view class="footer-left">
				<text>券后价:{{goods.price}}元</text>
			</view>
			<view class="footer-right">
				<button @click="click" plain="true">
					<text v-if="discountType === 'ratio'">点击领取{{(this.goods.discount * 10).toFixed(1)}}折优惠券</text>
					<text v-else>点击领取{{this.goods.discount}}元优惠券</text>
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loadFinish: false,
				shopName: '', // 店家名字
				sourceName: '', // 平台名
				discountType: '', // 折扣类型，金额，折扣比例
				goods: {},
			};
		},
		onLoad: function(options) {
			this.loadFinish = false
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
					this.discountType = options.discountType
					this.goods = res.data.data
					console.log(this.goods)
				},
				complete: (res) => {
					this.loadFinish = true
				}
			})
		},
		onShareAppMessage() {},
		onShareTimeline() {},
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
		display: flex;
		position: fixed;
		bottom: 0;
		width: 100%;
		line-height: var(--footer-height);
		background-color: #ff5500;
		color: #fff;
	}

	.footer-left {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 40%;
		background-color: #ff7f17;
	}

	.footer-left text {
		color: black;
		padding-left: 15%;
		font-size: 30rpx;
	}

	.footer-right {
		display: flex;
		width: 60%;
	}

	.footer-right button {
		border-radius: 0;
		width: 100%;
		font-size: 35rpx;
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

	.shop-detail image {
		display: block;
		margin: 0 auto;
	}
</style>
