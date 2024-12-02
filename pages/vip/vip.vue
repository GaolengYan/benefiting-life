<template>
	<view>
		<!-- 搜索框 -->
		<view class="searchBar">
			<uni-search-bar v-model="searchValue" cancelButton="none" @confirm="getResourceList" @input="" radius="20"
				bgColor="#EEEEEE" placeholder="搜索内容" />
		</view>

		<view class="container">
			<view v-for="(item, index) in response" :key="index">
				<uni-card :title="item.title" @click="onClick(index)">
					<view v-for="(content_item, content_index) in item.content" :key="content_index">
						<span style="word-wrap: break-word;" v-html="content_item.replace(/\n/g, '<br>')"></span><br>
					</view>
				</uni-card>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchValue: '', // 搜索内容
				response: [],
				isLoading: false, // 是否正在请求数据中
			};
		},
		methods: {
			// 获取资源列表
			getResourceList(e) {
				if (this.isLoading) {
					return
				}
				this.isLoading = true
				uni.showLoading({
					title: '数据加载中'
				})
				if (this.searchValue == '') {

				} else {
					if (e != undefined) {
						// 有内容说明是从搜索框点的，需要清理数据
						this.left_list = []
						this.right_list = []
						this.page = 1
					}
					uni.request({
						// url: 'https://yanweifan.top/api/search',
						url: 'https://yanweifan.top/api/search',
						header: {},
						method: 'GET',
						data: {
							query: this.searchValue
						},
						success: (res) => {
							// console.info(res.data)
							this.response = res.data
						},
						complete: (res) => {
							uni.stopPullDownRefresh()
							uni.hideLoading()
							this.isLoading = false
							this.nowSourceIndex = this.sourceIndex
						}
					})
				}
			},
			convertToRichTextNodes(htmlString) {
				// 创建一个临时的div元素来解析HTML
				let tempDiv = document.createElement('div');
				tempDiv.innerHTML = htmlString.trim();

				// 创建一个nodes数组
				let nodes = [];
				let walk = function(node) {
					let type = node.nodeName.toLowerCase();
					let attr = {};
					let childNodes = [];

					// 复制节点的属性
					Array.prototype.slice.call(node.attributes).forEach(attrNode => {
						attr[attrNode.name] = attrNode.value;
					});

					// 递归处理子节点
					node = node.firstChild;
					while (node) {
						childNodes.push(walk(node));
						node = node.nextSibling;
					}

					if (type !== '#text') {
						nodes.push({
							name: type,
							attrs: attr,
							children: childNodes
						});
					} else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
						nodes.push({
							type: 'text',
							text: node.textContent.trim()
						});
					}
				};

				walk(tempDiv);
				return nodes;
			},
			onClick(index) {
				// 去商品详情
				uni.navigateTo({
					url: '/pages/resource_detail/resource_detail?url=' + this.response[index].href
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		overflow: hidden;
	}
</style>