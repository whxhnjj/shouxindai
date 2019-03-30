<template>
<div>
  <div class="header">
    <div class="state">{{data.orderStatus}}</div>
    <div class="header-info">订单状态</div>
  </div>
  <div class="box">
    <div class="list">
      <span class="name">订单编号</span>
      <span class="list-val">{{data.orderNo}}</span>
    </div>
    <div class="list">
      <span class="name">借款金额</span>
      <span class="list-val">{{data.principal}}</span>
    </div>
    <div class="list">
      <span class="name">借款申请时间</span>
      <span class="list-val">{{data.insertDate1}}</span>
    </div>
    <div class="list">
      <span class="name">评估创建时间</span>
      <span class="list-val">{{data.insertDate2}}</span>
    </div>
    <div class="list">
      <span class="name">还款方式</span>
      <span class="list-val">等额本息</span>
    </div>
    <div class="list">
      <span class="name">还款期数</span>
      <span class="list-val">{{data.installmentNumber}}期</span>
    </div>
    <div class="list">
      <span class="name">提现银行卡</span>
      <span class="list-val">{{data.reimbursementMeans}} </span>
    </div>
    <div class="list">
      <span class="name">借款用途</span>
      <span class="list-val">{{data.purposes}}</span>
    </div>
    <div class="list">
      <span class="name">借款合同</span>
      <span class="list-val">爱尚协议支付及合同</span>
    </div>
  </div>
  <div class="title">借款明细</div>
  <!--借款明细列表-->
  <div class="main">
    <!--卡片开始-->
    <div class="main-list" v-for="item of main" :key="item.index">
      <div class="main-info">
        <span class="periods">{{item.borrowingAmount}}</span>
        <span class="main-mon">{{item.amount}}元</span>
      </div>
      <div class="main-date">{{item.settleDate}}</div>
    </div>
  </div>
  <!--默认扣款账户-->
  <div class="footer">
    <span class="footer-title">默认扣款账户</span>
    <span class="bank">浦发银行（5656)</span>
  </div>
</div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      data: {},
      main: []
    }
  },
  methods: {
    readInfo () {
      this.axios.defaults.headers.post['Content-Type'] = 'application/json'
      this.axios.post(this.GLOBAL.axIosUrl + 'api/jxck/app/credit/api/borrowDetail', {
      })
        .then(this.getMainInfoSucc)
        .catch(this.getMaininfoerror)
    },
    getMainInfoSucc (res) {
      res = res.data
      this.data = res.data
      this.main = res.data.borrowDetail
    },
    getMaininfoerror (res) {
      this.$toast('网络错误')
    }
  },
  mounted () {
    this.readInfo()
  }
}
</script>

<style scoped>
  .header{
    height: 100%;
    background: #FFFFFF;
    margin-bottom: .16rem;
    padding: .4rem 0;
    overflow: hidden;
  }
  .state{
    text-align: center;
    font-size: .4rem;
    font-weight:400;
    color: #333333;
    height: .6rem;
    line-height: .6rem;
  }
  .header-info{
    color: #999999;
    font-size: .24rem;
    text-align: center;
    height: .4rem;
    line-height: .4rem;
    font-weight:400;
  }
  .box{
    height: 100%;
    overflow: hidden;
    background: #FFFFFF;
    padding: .3rem .4rem .3rem .4rem;
  }
  .list{
    height: .45rem;
    line-height: .45rem;
    margin-bottom: .15rem;
  }
  .list .name{
    color: #999999;
    font-size: .26rem;
    font-weight:400;
    float: left;
  }
  .list .list-val{
    color: #333333;
    font-size: .26rem;
    font-weight:400;
    float: right;
  }
  /*借款明细*/
  .title{
    height: .74rem;
    line-height: .74rem;
    color: #333333;
    font-size: .3rem;
    font-weight:400;
    padding-left: .4rem;
  }
  .main{
    padding: 0 .4rem;
    height: 100%;
    margin-bottom: 1.2rem;
    overflow: hidden;
    background: #FFFFFF;
  }
  .main-list{
    height: 1.4rem;
    border-bottom: 0.01rem solid #EEEEEE;
  }
  .main-list:last-child{
    border-bottom: 0 solid transparent;
  }
  .main-info{
    float: left;
    padding: .24rem 0;
  }
  .periods{
    color: #999999;
    font-size: .26rem;
    font-weight:400;
    height: .42rem;
    line-height: .42rem;
    display: block;
  }
  .periods i{
    color: #333333;
  }
  .main-mon{
    color: #333333;
    font-size: .3rem;
    font-weight:400;
    height: .42rem;
    line-height: .5rem;
    display: block;
  }
  .main-date{
    color: #666666;
    height: 1.4rem;
    line-height: 1.4rem;
    float: right;
    font-size: .26rem;
  }
  /*默认扣款账户*/
  .footer{
    padding: 0 .4rem;
    width: calc(100% - .8rem);
    height: .88rem;
    line-height: .88rem;
    background:rgba(255,255,255,1) url("../../../assets/image/borrow-jiantou.png") no-repeat right center;
    background-size: .44rem;
    box-shadow:0px -1px 0px 0px rgba(214,223,227,1);
    position: fixed;
    bottom: 0;
    left: 0;
    overflow: hidden;
  }
  .footer-title{
    color: #333333;
    letter-spacing:1px;
    text-align: left;
    font-size: .3rem;
    float: left;
  }
  .bank{
    color: #999999;
    letter-spacing:1px;
    text-align: right;
    font-size: .28rem;
    float: right;
  }
</style>
