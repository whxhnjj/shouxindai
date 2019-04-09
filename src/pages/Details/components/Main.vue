<template>
  <div>
    <div class="header">
      <span class="money">{{amountPayableCount}}</span>
      <span class="text">待还总额(元)</span>
    </div>
    <div class="main">
      <!--卡片列表-->
      <div  v-for="(item,index) in productList"  :key="item.index">
        <div class="list">
          <span class="radio" @click='clickSelect(item,index,productList)' :class="{'check-true':item.select,'check-dib':item.disable}"></span>
          <div @click="clickItem(index)">
            <div class="list-date">
              <span class="fish"><i>{{item.periods}}</i>/{{item.totalperiods}}期</span>
              <span class="date">还款日 {{item.exRepaymentTime}}</span>
            </div>
            <div class="list-state">
              <span class="state-money">{{item.amountPayable}}</span>
              <span class="state-repayment stay-color" v-if="item.repaymentStatus === 10">未还款</span>
              <span class="state-repayment end-color" v-if="item.repaymentStatus === 20">已还款</span>
              <span class="state-repayment over-color" v-if="item.repaymentStatus === 30">逾期</span>
            </div>
          </div>
        </div>
        <div class="card-info-money" v-show="index==limit">
          <div class="dir">
            <span class="dir-tit">月供</span>
            <span class="dir-num">￥{{item.monthlyAmount}}</span>
          </div>
          <div class="dir">
            <span class="dir-tit">逾期费</span>
            <span class="dir-num">￥{{item.lateFree}}</span>
          </div>
          <div class="dir">
            <span class="dir-tit">其他费用</span>
            <span class="dir-num">￥{{item.otherExpenses}}</span>
          </div>
          <div class="dir">
            <span class="dir-tit">实际还款日</span>
            <span class="dir-num">{{item.acRepaymentTime}}</span>
          </div>
        </div>
      </div>
      <!--卡片结束-->
    </div>
    <div class="footer">
      <div class="accounts-mon">共<i>{{getTotal.totalPrice}}</i>元</div>
      <div class="repayment" v-show="getTotal.isMentnum ===0">还款</div>
      <div class="repayment isrepayment-bg" v-show="getTotal.isMentnum === 1" @click="repayment">还款</div>
      <div class="repayment isrepayment-bg" v-show="getTotal.isMentnum === 2" @click="repayment">结清</div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['reload'],
  name: 'Main',
  data () {
    return {
      amountPayableCount: '',
      productList: [],
      limit: -1,
      periodsSz: [], // 期数
      repaymentAmountSz: [] // 每月还款金额
    }
  },
  methods: {
    // 还款
    repayment () {
      this.axios.defaults.headers.post['Content-Type'] = 'application/json'
      this.axios.defaults.headers.post['token'] = this.GLOBAL.Token
      this.axios.post(this.GLOBAL.axIosUrl + 'api/initiativeRepayment', {
        orderNo: '1',
        periodsSz: this.periodsSz,
        repaymentAmountSz: this.repaymentAmountSz
      })
        .then(this.getRepaymentMainInfoSucc)
        .catch(this.getRepaymentMainInfoerror)
    },
    getRepaymentMainInfoSucc (res) {
      this.$toast.center(res.data.msg)
      this.reload()
    },
    getRepaymentMainInfoerror (res) {
      this.$toast.center('网络错误')
    },
    // 选择添加select
    clickSelect (item, index, productList) {
      if (index === 0) {
        if (item.disable === true) {
        }
        if (item.select === false) {
          // /*期数添加数组*/
          this.periodsSz.push(index + 1)
          // 期数金额添加数组
          this.repaymentAmountSz.push(item.amountPayable)
        }
        if (item.select === true) {
          var str = this.periodsSz.indexOf(index + 1)
          var strAmountSz = this.repaymentAmountSz.indexOf(index + 1)
          if (str > -1) {
            this.periodsSz.splice(str, 1)
            this.repaymentAmountSz.splice(strAmountSz, 1)
          }
        }
      }
      if (index !== 0) {
        if (productList[index - 1].StatusOn === false) {
        } else {
          if (item.disable === true) {
          }
          if (item.select === false) {
            // /*期数添加数组*/
            this.periodsSz.push(index + 1)
            // 期数金额添加数组
            this.repaymentAmountSz.push(item.amountPayable)
          }
          if (item.select === true) {
            var str = this.periodsSz.indexOf(index + 1)
            var strAmountSz = this.repaymentAmountSz.indexOf(index + 1)
            if (str > -1) {
              this.periodsSz.splice(str, 1)
              this.repaymentAmountSz.splice(strAmountSz, 1)
            }
          }
        }
      }
      if (item.select === false || item.select === true) {
        item.select = !item.select
        item.StatusOn = !item.StatusOn
      }
      if (index === 0) {
        // if (productList[index].StatusOn === false) {
        //   item.select = !item.select
        //   item.StatusOn = !item.StatusOn
        // }
        return
      }
      if (index !== 0) {
        if (productList[index - 1].StatusOn === false) {
          this.$toast.center('请结清上一期')
          item.select = !item.select
          item.StatusOn = !item.StatusOn
        }
      }
    },
    DetailsInfo () {
      this.axios.defaults.headers.post['Content-Type'] = 'application/json'
      this.axios.defaults.headers.post['token'] = this.GLOBAL.Token
      this.axios.post(this.GLOBAL.axIosUrl + 'api/repaymentDetail' + '/1', {
      })
        .then(this.getMainInfoSucc)
        .catch(this.getMaininfoerror)
    },
    getMainInfoSucc (res) {
      res = res.data.data
      console.log(res)
      this.amountPayableCount = res.amountPayableCount
      this.productList = res.webRepaymentDetailsResponseDTOs
      let _this = this
      this.productList.map(function (item) {
        // /*未还款*/
        if (item.repaymentStatus === 10) {
          _this.$set(item, 'select', false)
          _this.$set(item, 'StatusOn', false)
        }
        // /*已还款*/
        if (item.repaymentStatus === 20) {
          _this.$set(item, 'disable', true)
          _this.$set(item, 'StatusOn', true)
        }
        // /*逾期*/
        if (item.repaymentStatus === 30) {
          _this.$set(item, 'select', false)
          _this.$set(item, 'StatusOn', false)
        }
      })
    },
    getMaininfoerror (res) {
      this.$toast('网络错误')
    },
    // /*展开收缩*/
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
      var _proList = this.productList.filter(function (val) {
          return val.select
        }),
        totalPrice = 0,
        isMentnum = 0
      for (var i = 0; i < _proList.length; i++) {
        // 总价累加
        totalPrice += 1 * _proList[i].amountPayable
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
  mounted () {
    this.DetailsInfo()
  }
}
</script>

<style scoped>
  .header{
    height: 2.5rem;
    background:linear-gradient(339deg,rgba(255,190,123,1) 0%,rgba(255,200,123,1) 0%,rgba(255,113,90,1) 100%);
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
    margin-bottom: 1.5rem;
    overflow: hidden;
  }
  .list{
    padding: .35rem .45rem .4rem .25rem;
    height: 1.1rem;
    background: #FFFFFF url("../../../assets/image/sjy.png") no-repeat right .25rem center;
    background-size: .15rem;
    border-bottom: 0.01rem solid #E7E7E7;
    overflow: hidden;
  }
  .list:last-child{
    border-bottom: 0 solid transparent!important;
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
  .list .radio.check-dib{
    background: url("../../../assets/image/disable.png") no-repeat center center;
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
  .stay-color{
    color: #465BFF!important;
  }
  .end-color{
    color: #999999!important;
  }
  .over-color{
    color: #FE5156!important;
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
    background:linear-gradient(339deg,rgba(255,140,104,1) 0%,rgba(253,186,117,1) 100%);
    color: #FFFFFF;
  }
</style>
