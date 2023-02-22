<template>
	<view :animation="animationData" class="btn-plusempty" hover-class="bottom-btn-hover" @tap="tapTop">
		<text class="my-icon plusempty-icon">&#xe66c;</text>
	</view>
</template>

<script>
	let animation = uni.createAnimation({
		timingFunction: 'ease',
	})
	export default {
		props: {
			// 页面滚动距离
			scrollTop: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				animationData: {}
			}
		},

		onLoad() {

		},
		created() {
			//默认不显示
			animation.opacity(0).step({
				duration: 0
			});

			this.animationData = animation.export()
		},
		watch: {
			scrollTop(newVal, oldVal) {
				if (newVal < 100) {
					//淡出
					animation.opacity(0).step({
						duration: 800
					})
					this.animationData = animation.export()
				} else {
					//淡入
					animation.opacity(1).step({
						duration: 800
					}) //描述动画
					this.animationData = animation.export()
				}
			}
		},
		/**
		 * 计算属性
		 */
		computed: {

		},
		methods: {
			//滚动到顶部
			tapTop() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 500
				});
			}

		}
	}
</script>

<style lang="scss">
	@font-face {
		font-family: 'wpfont';
		src: url(data:application/font-woff2;charset=utf-8;base64,d09GMgABAAAAAASIAA0AAAAACSgAAAQxAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP0ZGVE0cGh4GVgCCYhEICoVIhBgLEgABNgIkAxgEIAWEcAdsG38HyC4HeDJulEUciEDpESvGRj0+a4Tz9CoW9JPB1/nOe7sBWAinL7lU0jppHW7FTU69iTichPjE/nwjktqcIFxfaF8cXCIYymJQEg889/7unxPXjAvDpVEYxwHufXxM4EQSmoufU84sDTBJmncA/XaRF5l8/oNmVHH//7/frDxMEqHobeC1EaKon25VpRMpgUwybz7x00eI/yy0tdW8Ab1NZvTXRQAIAI8vhsQA8DJx+pf76hBADjACKIIhQrAACiBRkH3EgG7QW4BNwM+TV4yExAAliIBbmzeb3IT2g/bxEHHF5s0wOCwCAgAABrbafajKTLC/0IsDyIlR7IP2ofBl8CA/HoIADHslZLnrP+fnzLOhIQiROEAoQ8IAqH8PARwmAWEAIAYAahPbC/AfAACb9r4RDIrUppqNdrtCs0iu4yKeI2YqP3DExQ9Q0DDvjdoYxeGoOzLr8M3NBHmDK6S/1j8ZMsTP+zF/c+jCTIeOHIhwpoutQ1cQ4Ig7KvMeHJDOPTHXeHmz2bejseHMEwVNjdLdHZYpLr+DdM8jZ+8DA4l+mcJ71sZwZwbKPT59nT60c0i9v7TI54m4TaUlAXfUayguDXp5l76o2O864jHOCxgDHr1P3+Rz8V5TK0tyokTQfBrnNlaqPUdcvEETtNMR6Sw2p6PZT5ibihoznkQNBtoSa6Ea6t3b2/WN4DnZLrlpvu/nzfviU35eWFfWsVTmHP+OaMQPyd7a91xEMqF49ae/S9gsUSU6rTel0UzhwOEe6JxEWGUlhj3rr5VYayW5mB7XHs61xSZJF32MxHvNiD015thYNlZJ/NJSdMWiDRi+TWTR8LX9/wVvT3JwTYKBM+h2nso78ByOu8rBo3G7xl2gGu3m5eaecLY4T5hMJaqQs6+qBFC5r4kM+1xS9XP0fVe6l3WMU+LgdteiiL3IHt7sYwwRLMDZi8HfCwBAAAQKymlTa1X1b0kbi73CkQaimEkAYhQAENiSHVHEUKm/HbHYKGJzWAiEilOxx0JJvlgG3SoKkJICYiBo/YXSBnG2MAihPECJtAJDaAliSVtBQOYoCAndBKlhoaGHZXShpdAhUQmAoQAAIZcAlFIpMOSmIZa0EgSMbiAkdxqkSjzWywwMlcAq0QyDsFBl0AJIW0UBZUzFDlmwgvRhheqgofqpfQaYZ5IihHlzIYeBAgzOkowwg5/RNU7YDFVYgjEzJ9ClARlJabh0HWTMyNGZUKpJzVi/P8+ZW+FkLSywAlgzY4qAYQFjGDLZWACIZlhEDMpCEp545M+a2zp29uyWy1zVy72qs03db5DDQFv5o01UpaSwJYeTqDqtuAqxtmRWHcb1R4R+IMWuEgMIGqKEISwREKGwQ6hvq58mJIXZhqvHMS3O2g7aP70e88xq++/AxJyx8yWEqf1cJ69hDrMdzwEAAAA=) format('woff2');
		font-weight: normal;
		font-style: normal;
		font-display: swap;
	}

	.my-icon {
		font-family: wpfont;
	}

	.btn-plusempty {
		width: 80upx;
		height: 80upx;
		background: #0fa3fa;
		position: fixed;
		bottom: 80upx;
		right: 40upx;
		border-radius: 100%;
		overflow: hidden;
		text-align: center;
		line-height: 80upx;
		border: 4upx solid #b1def9;
	}

	.bottom-btn-hover {
		background: #0fa3fa !important;
	}

	.plusempty-icon {
		color: #fff;
		font-size: 36upx;
		font-weight: bold;
	}
</style>
