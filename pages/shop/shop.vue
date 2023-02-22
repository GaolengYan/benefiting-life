<template>
	<view class="cardcontainer">
		<view class="leftcardcontainer">
			<view v-for="(item, index) in left_list" class="card" @click="showDetail">
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
			<view v-for="(item, index) in right_list" class="card" @click="showDetail">
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
				left_list: [],
				right_list: [],
				showDetail: false
			};
		},
		onLoad() {
			this.left_list = []
			this.right_list = []
			this.getShopList()
		},
		methods: {
			// 获取商品数据
			getShopList() {
				uni.showLoading({
					title: '数据加载中'
				})
				uni.request({
					url: "https://api.act.jutuike.com/union/jingxuan",
					method: 'POST',
					data: {
						pub_id: '62828',
						source: 'taobao',
						type: '1'
					},
					success: (res) => {
						console.log(res)
						for (let i = 0; i < res.data.data.length; i++) {
							if (i % 2 == 0) {
								this.left_list = [...this.left_list, ...[res.data.data[i]]]
							} else {
								this.right_list = [...this.right_list, ...[res.data.data[i]]]
							}
						}
					}
				})
				uni.hideLoading()
			}
		}
	}
</script>

<style lang="scss">
.cardcontainer{
  display: flex;
  background-color: #f0f0f0;
}
.leftcardcontainer,.rightcardcontainer{
  margin-top: 8px;
  width: 50%;
  height: auto;
  background-color: #f0f0f0;
  box-sizing: border-box;
  flex-wrap: wrap;
}
.leftcardcontainer{
  flex-grow: 1;
  margin-left: 8px;
  margin-right: 4px;
  /* flex-direction:row-reverse; */
}
.rightcardcontainer{
  margin-left: 4px;
  margin-right: 8px;
}
.card{
  width: 100%;
  height: auto;
  box-shadow: #ffffff;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 8px;
  padding: auto;
}
.card+.card{
  margin-top: 10px;
}
.cardImg{
  position: relative;
  width: 100%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.cardText{
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
  padding-left: 4px; 
  box-sizing: border-box;
  margin-top: 4px;
  margin-bottom: 4px;
}
.cardTags{
  box-sizing: border-box;
  background-color: #47ade7;
  color: hsl(0, 84%, 50%);
  border-radius: 5px;
  font-size: 13px;
}
.cardTitle{
  font-size:14px ;
  font-weight: bold;
  padding-left: 1px;
  padding-bottom: 4px;
}
.cardBtm{
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding-left: 4px; 
  display: flex;
  box-sizing: border-box;
  margin-bottom: 5px;
  align-items: flex-end;
  margin-top: 3px;
  padding-bottom: 8px;
}
.cardPrice{
  color: red;
  font-size: 18px;
  flex:1;
}
.cardPrice text{
  font-size: 12px;
  color: #000000;
  padding-left: -1px;
  text-decoration:line-through;
}
.cardSales{
  font-size:12px;
  
}
</style>
