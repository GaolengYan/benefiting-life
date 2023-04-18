<template>
	<view class="container">
		<view data-ref="coupon" class="coupon vue-ref">
			<view v-for="(item, index) in coupons" :key="index" v-show="tabId === 0 || item.tabId === tabId">
				<view @click="toCoupon(index)" class="item">
					<view class="top">
						<view class="left">
							<view class="content">
								<image class="icon" :src="item.icon" mode="widthFix"></image>
								<view class="name">{{item.name}}</view>
							</view>
							<block v-if="item.type==1">
								<view class="text">天天可领</view>
							</block>
							<block v-else-if="item.type==2">
								<view class="text">限时秒杀</view>
							</block>
							<block v-else-if="item.type==3">
								<view class="text">首单优惠</view>
							</block>
						</view>
						<view class="right">免费领取</view>
					</view>
					<view class="bottom">
						<image :src="item.bannerPic" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {config} from '@/common/config.js'
	export default {
		name: "my-card",
		data() {
			return {
				tabId: 0,
				coupons: config.coupons,
			};
		},
		methods: {
			toCoupon(i) {
				let minappId = this.coupons[i].minapp.appid
				let minpath = this.coupons[i].minapp.path
				if (this.coupons[i].needLocation) { // 如果是需要定位的，检测是否开启了定位
					uni.getSystemInfoAsync({
						success(res) {
							if (res.locationEnabled == false) {
								uni.showToast({
									title: '请开启手机定位',
									icon: 'none'
								})
							} else {
								// 跳转
								uni.navigateToMiniProgram({
									appId: minappId,
									path: minpath,
									success: function success(res) {
										// 打开成功
									}
								})
							}
						}
					})
				} else {
					// 跳转
					uni.navigateToMiniProgram({
						appId: minappId,
						path: minpath,
						success: function success(res) {
							// 打开成功
						}
					})
				}
			},
			changeTabId(tabId) {
				this.tabId = tabId
				console.log(this.tabId)
			}
		}
	}
</script>

<style lang="scss">
	.container {
		margin-top: 0;
		font-size: 14px;
		line-height: 24px;
		position: relative;
	}

	.container .coupon {
		width: 90%;
		padding-bottom: 10rpx;
	}

	.container .coupon .item {
		background-color: #ffffff;
		margin: 30rpx 0rpx;
		border-radius: 10rpx;
		padding: 0rpx 30rpx 30rpx 30rpx;
	}

	.container .coupon .item .top {
		height: 116rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.container .coupon .item .top .left {
		height: 116rpx;
		width: 400rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.container .coupon .item .top .left .content {
		width: 100%;
	}

	.container .coupon .item .top .left .icon {
		display: inline-block;
		vertical-align: bottom;
		width: 52rpx;
		height: auto;
	}

	.container .coupon .item .top .left .name {
		text-align: left;
		display: inline-block;
		vertical-align: bottom;
		font-size: 34rpx;
		color: #000;
		line-height: 50rpx;
		font-weight: bold;
		margin-left: 15rpx;
	}

	.container .coupon .item .top .left .text {
		width: 150rpx;
		height: 38rpx;
		line-height: 38rpx;
		text-align: center;
		font-size: 24rpx;
		color: #61300e;
		background: linear-gradient(90deg, #f9db8d, #f8d98a);
		border-radius: 6rpx;
	}

	.container .coupon .item .top .right {
		width: 170rpx;
		height: 60rpx;
		border-radius: 30rpx;
		background: linear-gradient(90deg, #ec6f43, #ea4a36);
		color: #fff;
		font-size: 28rpx;
		line-height: 60rpx;
		text-align: center;
	}

	.container .coupon .item .bottom {
		height: auto;
		width: 100%;
	}

	.container .coupon .item .bottom image {
		display: block;
		width: 100%;
		height: auto;
	}
</style>
