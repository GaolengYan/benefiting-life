<template>
	<!-- 回到页面顶端 -->
	<my-fab :scrollTop="scrollTop"></my-fab>
	<!-- 搜索框 -->
	<view class="searchBar">
		<view class="changeSourceBtn">
			<button size="mini" plain="true" type="default" @click="showDrawer('showLeft')" style="border: none;">
				<uni-icons type="bottom" size="13" />
				<text class="word-btn-white">{{' '+sourceList[sourceIndex].name}}</text>
			</button>
			<uni-drawer ref="showLeft" mode="left" :width="120">
				<button v-for="(item, index) in sourceList" :key="index" @click="changeSource(index, 'showLeft')"
					plain="true" style="border: none;">
					<text class="word-btn-white">{{item.name}}</text>
				</button>
			</uni-drawer>
		</view>
		<uni-search-bar v-model="searchValue" cancelButton="none" @confirm="getShopList" @input="" radius="20"
			bgColor="#EEEEEE" placeholder="商品搜索" />
	</view>
	<view class="cardcontainer">
		<view class="leftcardcontainer">
			<view v-for="(item, index) in left_list" class="card" @click="showDetail(item)">
				<image class="cardImg" :src="item.goodsThumbUrl" mode="widthFix" />
				<view class="cardText">
					<view class="cardTitle">{{item.goodsName}}</view>
					<view class="cardTags">{{item.shopName}}</view>
				</view>
				<view class="cardBtm">
					<view class="cardPrice">{{item.price}}
						<text>{{item.marketPrice}}</text>
					</view>
					<!-- <view class="cardSales">已售5000+</view> -->
				</view>
			</view>
		</view>
		<view class="rightcardcontainer">
			<view v-for="(item, index) in right_list" class="card" @click="showDetail(item)">
				<image class="cardImg" :src="item.goodsThumbUrl" mode="widthFix" />
				<view class="cardText">
					<view class="cardTitle">{{item.goodsName}}</view>
					<view class="cardTags">{{item.shopName}}</view>
				</view>
				<view class="cardBtm">
					<view class="cardPrice">{{item.price}}
						<text>{{item.marketPrice}}</text>
					</view>
					<!-- <view class="cardSales">已售5000+</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollTop: 0, // 下滑距离，大于0显示置顶按钮
				searchValue: '', // 搜索内容
				sourceList: [{ // 电商平台
					name: '拼多多',
					source: 'pdd',
				}, {
					name: '淘宝',
					source: 'taobao',
				}, {
					name: '京东',
					source: 'jd',
				}, ],
				sourceIndex: 0, // 当前选择电商index
				nowSourceIndex: 0, // 记录当前页面数据是哪个平台，每次刷新后更新
				left_list: [],
				right_list: [],
				isLoading: false, // 是否正在请求数据中
				page: 1 // 当前请求页面
			};
		},
		onLoad() {
			this.left_list = []
			this.right_list = []
			this.page = 1
			this.getShopList()
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.left_list = []
			this.right_list = []
			this.page = 1
			this.getShopList()
		},
		// 上拉加载
		onReachBottom() {
			this.page = this.page + 1
			this.getShopList()
		},
		//监听页面滚动
		onPageScroll(res) {
			this.scrollTop = res.scrollTop
		},
		methods: {
			// 获取商品数据
			getShopList(e) {
				if (this.isLoading) {
					return
				}
				this.isLoading = true
				uni.showLoading({
					title: '数据加载中'
				})
				if (this.searchValue == '') {
					uni.request({
						url: 'https://api.act.jutuike.com/union/jingxuan',
						method: 'POST',
						data: {
							pub_id: '62828',
							source: this.sourceList[this.sourceIndex].source,
							type: '1',
							page: this.page,
							pageSize: 10
						},
						success: (res) => {
							this.addResToShopList(res)
						},
						complete: (res) => {
							uni.hideLoading()
							this.isLoading = false
							this.nowSourceIndex = this.sourceIndex
						}
					})
				} else {
					if (e != undefined) {
						// 有内容说明是从搜索框点的，需要清理数据
						this.left_list = []
						this.right_list = []
						this.page = 1
					}
					uni.request({
						url: "https://api.act.jutuike.com/union/search",
						method: 'POST',
						data: {
							pub_id: '62828',
							sid: '62828',
							keyword: this.searchValue,
							source: this.sourceList[this.sourceIndex].source,
							page: this.page,
							pageSize: 10
						},
						success: (res) => {
							this.addResToShopList(res)
						},
						complete: (res) => {
							uni.hideLoading()
							this.isLoading = false
							this.nowSourceIndex = this.sourceIndex
						}
					})
				}
			},
			// 将返回的数据添加到商品列表
			addResToShopList(res) {
				for (let i = 0; i < res.data.data.length; i++) {
					if (i % 2 == 0) {
						this.left_list = [...this.left_list, ...[res.data.data[i]]]
					} else {
						this.right_list = [...this.right_list, ...[res.data.data[i]]]
					}
				}
			},
			// 打开窗口
			showDrawer(e) {
				this.$refs[e].open()
			},
			// 关闭窗口
			closeDrawer(e) {
				this.$refs[e].close()
			},
			// 修改平台
			changeSource(sourceIndex, e) {
				this.sourceIndex = sourceIndex
				this.closeDrawer(e)
			},
			// 回到页面顶端
			toTop() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				});
			},
			// 去商品详情
			showDetail(goodsItem) {
				uni.navigateTo({
					url: '/pages/shop_detail/shop_detail?goodsId=' + goodsItem.goodsId + '&shopName=' + goodsItem
						.shopName + '&source=' + this.sourceList[this.nowSourceIndex].source + '&sourceName=' +
						this.sourceList[this.nowSourceIndex].name
				})
			}
		}
	}
</script>

<style lang="scss">
	.searchBar {
		display: flex;
	}

	.searchBar uni-search-bar {
		width: 70%;
	}

	.changeSourceBtn {
		flex: auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.word-btn-white {
		font-size: 30rpx;
	}

	.cardcontainer {
		display: flex;
		background-color: #f0f0f0;
	}

	.leftcardcontainer,
	.rightcardcontainer {
		margin-top: 8px;
		width: 50%;
		height: auto;
		background-color: #f0f0f0;
		box-sizing: border-box;
		flex-wrap: wrap;
	}

	.leftcardcontainer {
		flex-grow: 1;
		margin-left: 8px;
		margin-right: 4px;
	}

	.rightcardcontainer {
		margin-left: 4px;
		margin-right: 8px;
	}

	.card {
		width: 100%;
		height: auto;
		box-shadow: #ffffff;
		box-sizing: border-box;
		background-color: #ffffff;
		border-radius: 8px;
		padding: auto;
	}

	.card+.card {
		margin-top: 10px;
	}

	.cardImg {
		width: 100%;
		border-top-left-radius: 8px;
		border-top-right-radius: 8px;
	}

	.cardText {
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		padding-left: 4px;
		box-sizing: border-box;
		margin-top: 4px;
		margin-bottom: 4px;
	}

	.cardTags {
		box-sizing: border-box;
		background-color: #47ade7;
		color: hsl(0, 84%, 50%);
		border-radius: 5px;
		font-size: 13px;
	}

	.cardTitle {
		font-size: 14px;
		font-weight: bold;
		padding-left: 1px;
		padding-bottom: 4px;
	}

	.cardBtm {
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		padding-left: 4px;
		display: flex;
		box-sizing: border-box;
		margin-bottom: 5px;
		align-items: flex-end;
		margin-top: 3px;
		padding-bottom: 8px;
	}

	.cardPrice {
		color: red;
		font-size: 18px;
		flex: 1;
	}

	.cardPrice text {
		font-size: 12px;
		color: #000000;
		padding-left: -1px;
		text-decoration: line-through;
	}

	.cardSales {
		font-size: 12px;

	}
</style>
