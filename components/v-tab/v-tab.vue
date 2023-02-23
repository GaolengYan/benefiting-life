<template>
	<view class="v-tab">
		<view :class="index===selectIndex?'action':''" v-for="(item,index) in data" :key="index" @click="changeTab(item, index)">
			{{item.name}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectIndex:0,
			};
		},
		props:['data'],
		methods: {
			changeTab(item, index) {
				this.selectIndex=index
				this.$parent.changeTab(item)
			}
		}
	}
</script>

<style lang="scss">
	
	.v-tab{
		height: 80upx;
		line-height: 80upx;
		color: black;
		background: white;
		box-shadow: 0 2upx 5upx white;
		display: flex;
		justify-content: space-around;
		align-items: stretch;
		font-size: 35upx;
		
		.action {
			font-weight: bold;
			border-bottom: 4upx solid #ff5500;
		}
	}
	
	
</style>
