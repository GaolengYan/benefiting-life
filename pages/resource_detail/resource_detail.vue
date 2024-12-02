<template>
	<view v-show="loadFinish" style="padding-bottom:70rpx">
		<uni-notice-bar single text="资源由互联网用户上传, 本网站不进行传播与存储." />

		<uni-section title="资源名" type="line">
			<uni-group mode="card">
				<view> {{data.title}} </view>
			</uni-group>
		</uni-section>

		<uni-section title="资源内容" type="line">
			<uni-group mode="card">
				<view v-for="(item, index) in data.items" :key="index">
					<text style="word-wrap: break-word;">{{item}}</text>
				</view>
			</uni-group>
		</uni-section>

		<uni-section title="网盘链接" type="line">
			<uni-group mode="card">
				<view> {{data.quark_url}} </view>
			</uni-group>
		</uni-section>

		<view class="footer">
			<view class="footer-left">
				<button plain="true" size="mini" open-type="share">
					<text>分享给好友</text>
				</button>
			</view>
			<view class="footer-right">
				<button @click="click" plain="true">
					<text>点击保存链接</text>
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
				data: {},
			}
		},
		onLoad(options) {
			this.loadFinish = false
			// 请求商品详情
			uni.request({
				url: "https://yanweifan.top/api/detail",
				method: 'GET',
				data: {
					detail_url: options.url
				},
				success: (res) => {
					// console.log(res.data)
					this.data = res.data
				},
				complete: (res) => {
					this.loadFinish = true
				}
			})
		},
		onShareAppMessage() {
			return {
				title: '好友分享了一份网盘资源',
				imageUrl: '/static/预览.jpg'
			}
		},
		onShareTimeline() {
			return {
				title: '好友分享了一份网盘资源',
				imageUrl: '/static/预览.jpg'
			}
		},
		methods: {
			click() {
				console.info(this.data.quark_url)
				uni.setClipboardData({
					data: this.data.quark_url,
				});
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
		border: 1px solid black;
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

	.footer-left button {
		width: 100%;
		font-size: 35rpx;
		border: none;
	}

	.footer-right {
		display: flex;
		width: 60%;
	}

	.footer-right button {
		width: 100%;
		font-size: 35rpx;
		border: none;
	}
</style>