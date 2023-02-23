<template>
	<view class="content">
		
		<vTab 
			:data="[{name:'图像技术',path:''},{name:'人脸与人体识别',path:''},{name:'语言技术',path:''},{name:'知识与语义',path:''},]"
			@select="onSelect"
		></vTab>
		
	</view>
</template>

<script>
	import vTab from '../../components/v-tab/v-tab.vue'
	export default {
		components:{vTab},
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			//vTab选择事件
			onSelect:function(params){
				console.log(params)
			},
		}
	}
</script>

<style>

</style>
