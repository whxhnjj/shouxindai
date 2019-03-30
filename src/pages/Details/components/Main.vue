<template>
  <div>
    <div class="header">
      <span class="money">66666.555</span>
      <span class="text">待还总额(元)</span>
    </div>
    <div class="main">
      <!--卡片列表-->
      <div  v-for="(item,index) in productList"  :key="item.index">
        <div class="list">
          <span class="radio" @click='item.select=!item.select' :class="{'check-true':item.select}"></span>
          <div @click="clickItem(index)">
            <div class="list-date">
              <span class="fish"><i>{{item.sun}}</i>/{{item.num}}期</span>
              <span class="date">还款日 {{item.date}}</span>
            </div>
            <div class="list-state">
              <span class="state-money">{{item.money}}</span>
              <span class="state-repayment">已还款</span>
            </div>
          </div>
        </div>
        <div class="card-info-money" v-show="index==limit">
          <div class="dir">
            <span class="dir-tit">月供</span>
            <span class="dir-num">￥833.33</span>
          </div>
          <div class="dir">
            <span class="dir-tit">逾期费</span>
            <span class="dir-num">￥833.33</span>
          </div>
          <div class="dir">
            <span class="dir-tit">其他费用</span>
            <span class="dir-num">￥833.33</span>
          </div>
          <div class="dir">
            <span class="dir-tit">实际还款日</span>
            <span class="dir-num">8018-10-20</span>
          </div>
        </div>
      </div>
      <!--卡片结束-->
    </div>
    <div class="footer">
      <div class="accounts-mon">共<i>{{getTotal.totalPrice}}</i>元</div>
      <div class="repayment" v-show="getTotal.isMentnum ===0">还款</div>
      <div class="repayment isrepayment-bg" v-show="getTotal.isMentnum === 1">还款</div>
      <div class="repayment isrepayment-bg" v-show="getTotal.isMentnum === 2">结清</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      productList: [
        {
          money: '800',
          date: '2018-10-20',
          num: '6',
          sun: '1',
          Number: '1'
        },
        {
          money: '245',
          date: '2018-10-20',
          num: '6',
          sun: '2',
          Number: '1'
        },
        {
          money: '365',
          date: '2018-10-20',
          num: '6',
          sun: '3',
          Number: '1'
        },
        {
          money: '122',
          date: '2018-10-20',
          num: '6',
          sun: '4',
          Number: '1'
        },
        {
          money: '122',
          date: '2018-10-20',
          num: '6',
          sun: '4',
          Number: '1'
        }
      ],
      limit: -1
    }
  },
  methods: {
    clickItem (index) {
      if (index === this.limit) {
        this.limit = -1
      } else {
        this.limit = index
      }
    }
  },
  computed: {
    // 获取总价和产品总数
    getTotal: function () {
      let _proList = this.productList.filter(function (val) {
          return val.select
        }),
        totalPrice = 0,
        isMentnum = 0
      for (var i = 0; i < _proList.length; i++) {
        // 总价累加
        totalPrice += _proList[i].Number * _proList[i].money
      }
      if (_proList.length === 0) {
        isMentnum = 0
      }
      if (_proList.length > 0 && _proList.length < this.productList.length) {
        isMentnum = 1
      }
      if (this.productList.length === _proList.length) {
        isMentnum = 2
      }
      // 选择产品的件数就是_proList.lenth，总价就是totalPrice
      return {
        totalNum: _proList.length,
        totalPrice: totalPrice,
        isMentnum: isMentnum
      }
    }
  },
  mounted: function () {
    var _this = this
    this.productList.map(function (item) {
      _this.$set(item, 'select', false)
    })
  }
}
</script>

<style scoped>
  .header{
    height: 2.5rem;
    background:linear-gradient(339deg,rgba(255,190,123,1) 0%,rgba(255,113,90,1) 100%);
  }
  .money{
    font-size: .64rem;
    color: #FFFFFF;
    display: block;
    padding-top: .4rem;
    text-align: center;
    font-weight:500;
    height: .9rem;
    line-height: .9rem;
  }
  .text{
    color: #FFFFFF;
    font-size: .28rem;
    font-weight:400;
    height: .4rem;
    display: block;
    text-align: center;
    line-height: .4rem;
  }
  .main{
    height: 100%;
    overflow: hidden;
  }
  .list{
    border-bottom: 0.01rem solid #E7E7E7;
    padding: .35rem .57rem .4rem .25rem;
    height: 1.1rem;
    background: #FFFFFF url("../../../assets/image/borrow-jiantou.png") no-repeat right .25rem center;
    background-size: .38rem;
    overflow: hidden;
  }
  .list:last-child{
    border-bottom: 0 solid transparent;
  }
  .list .radio{
    width: .42rem;
    height: .42rem;
    display: block;
    float: left;
    margin: .37rem .37rem .32rem 0;
    background: url("../../../assets/image/radio-f.png") no-repeat center center;
    background-size: .42rem;
  }
  .list .radio.check-true{
    background: url("../../../assets/image/radio-t.png") no-repeat center center;
    background-size: .42rem;
  }
  .list-date{
    display: block;
    overflow: hidden;
    height: .5rem;
    line-height: .5rem;
    padding-right: .16rem;
  }
  .list-date .fish{
    color: #999999;
    font-size: .28rem;
    font-weight:400;
    line-height: .5rem;
    float: left;
  }
  .list-date .fish i{
    color: #666666;
    font-size: .36rem;
  }
  .list-date .date{
    color: #666666;
    font-size: .26rem;
    font-weight:400;
    line-height: .5rem;
    float: right;
  }
  .list-state{
    overflow: hidden;
    height: .5rem;
    line-height: .5rem;
    padding-right: .16rem;
  }
  .state-money{
    color: #333333;
    font-size: .32rem;
    font-weight:500;
    line-height: .5rem;
    float: left;
  }
  .state-repayment{
    color: #999999;
    font-size: .26rem;
    font-weight:400;
    line-height: .5rem;
    float: right;
  }
  /*还款展开列表*/
  .card-info-money{
    height: 100%;
    padding: .21rem .79rem .1rem 1.41rem;
    overflow: hidden;
    background: #F4F4F4;
  }
  .dir{
    height: .37rem;
    line-height: .37rem;
    margin-bottom: .16rem;
    overflow: hidden;
  }
  .dir span{
    color: #999999;
    font-size: .26rem;
    font-weight:400;
    line-height: .37rem;
  }
  .dir-tit{
    float: left;
    text-align: left;
  }
  .dir-num{
    float: right;
    text-align: right;
  }
  /*底部*/
  .footer{
    width: 100%;
    height: 1rem;
    background: #FFFFFF;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 9999;
    box-shadow:0px 1px 0px 0px rgba(0,0,0,0.06);
  }
  .accounts-mon{
    position: absolute;
    left: .4rem;
    bottom: 0;
    height: 1rem;
    overflow: hidden;
    line-height: 1rem;
    color: #333333;
    font-size: .3rem;
    text-align: left;
    font-weight: 400;
  }
  .accounts-mon i{
    font-size: .32rem;
    color: #FF2244;
    font-weight: bold;
  }
  .repayment{
    position: absolute;
    right: 0;
    bottom: 0;
    width: 45%;
    overflow: hidden;
    height: 1rem;
    line-height: 1rem;
    background: #DDDDDD;
    color: #999999;
    text-align: center;
    font-weight:400;
    font-size: .3rem;
  }
  .isrepayment-bg{
    background:linear-gradient(310deg,rgba(255,140,104,1) 0%,rgba(253,186,117,1) 100%);
    color: #FFFFFF;
  }
</style>
