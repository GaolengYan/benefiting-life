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
							<block v-else>
								<block v-if="item.type==2">
									<view class="text">限时秒杀</view>
								</block>
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
	export default {
		name: "my-card",
		data() {
			return {
				tabId: 0,
				coupons: [{
					"name": "美团外卖红包",
					"bannerPic": "/static/coupon/meituan_banner.png",
					"icon": "/static/coupon/meituan.png",
					"minapp": {
						"appid": "wxde8ac0a21135c07d",
						"path": "/index/pages/h5/h5?lch=cps:waimai:5:65c5f4b9271221c79eae104d969a48a3:62828jutuikexiaochengxu:33:85459&weburl=https%3A%2F%2Fdpurl.cn%2FRKKyFJnz&f_userId=1&f_token=1"
					},
					"sort": 99,
					"tabId": 1,
					"type": 1,
					"needLocation": false
				}, {
					"name": "饿了么红包",
					"bannerPic": "/static/coupon/ele_banner.png",
					"icon": "/static/coupon/ele.png",
					"minapp": {
						"appid": "wxece3a9a4c82f58c9",
						"path": "taoke/pages/shopping-guide/index?scene=GabHMMu"
					},
					"sort": 100,
					"tabId": 1,
					"type": 1,
					"needLocation": true
				}, {
					"name": "美团生鲜",
					"bannerPic": "/static/coupon/meituanshengxian_banner.jpg",
					"icon": "/static/coupon/meituan.png",
					"minapp": {
						"appid": "wxde8ac0a21135c07d",
						"path": "/index/pages/h5/h5?lch=cps:waimai:5:65c5f4b9271221c79eae104d969a48a3:62828jutuikemeituan:4:85459&weburl=https%3A%2F%2Fdpurl.cn%2FYekwWAgz&f_userId=1&f_token=1"
					},
					"sort": 100,
					"tabId": 1,
					"type": 1,
					"needLocation": false
				}, {
					"name": "饿了么生鲜",
					"bannerPic": "/static/coupon/elemeshengxian_banner.jpeg",
					"icon": "/static/coupon/ele.png",
					"minapp": {
						"appid": "wxece3a9a4c82f58c9",
						"path": "pages/sharePid/web/index?scene=https://s.click.ele.me/05S6wLu"
					},
					"sort": 100,
					"tabId": 1,
					"type": 1,
					"needLocation": true
				}, {
					"name": "花小猪打车",
					"bannerPic": "/static/coupon/hxz_banner.png",
					"icon": "/static/coupon/huaxiaozhu_logo.jpeg",
					"minapp": {
						"appid": "wxd98a20e429ce834b",
						"path": "/pages/chitu/index?scene=KGo9oqp&source_id=62828jutuikehuaxiaozhu"
					},
					"sort": 101,
					"tabId": 2,
					"type": 1,
					"needLocation": true
				}, {
					"name": "滴滴打车",
					"bannerPic": "/static/coupon/didi_banner.png",
					"icon": "/static/coupon/didi_logo.jpg",
					"minapp": {
						"appid": "wxaf35009675aa0b2a",
						"path": "/pages/index/index?scene=MvGg333&source_id=62828jutuikedidi"
					},
					"sort": 101,
					"tabId": 2,
					"type": 1,
					"needLocation": true
				}],
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
