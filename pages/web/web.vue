<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:''
			};
		},
		onLoad: function(option) {
			console.log(option.url)
			this.url = option.url
		}
	}
</script>

<style lang="scss">

</style>
