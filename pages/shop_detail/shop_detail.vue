<template>
	<view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

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
					sid : '62828',
					source : options.source
				},
				success: (res) => {
					console.log(res)
				},
				complete: (res) => {
				}
			})
		}
	}
</script>

<style lang="scss">

</style>
