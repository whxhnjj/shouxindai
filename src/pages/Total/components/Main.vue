<template>
  <div>
    <div class="header">
      <div class="title">待还总额(元)</div>
      <div class="num">{{Totalmon}}</div>
      <div class="sun">共<i>{{count}}</i>笔</div>
    </div>
    <div class="main">
      <div class="list"  v-for="item of main" :key="item.index">
        <div class="money">{{item.waitAmountPayableSum}}</div>
        <span class="left">待还总额</span>
        <span class="right">剩余<i>{{item.remainingPeriods}}</i>期</span>
        <div class="list-tip">{{item.insertTime}} 借款{{item.principal}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      main: [],
      Totalmon: '',
      count: ''
    }
  },
  methods: {
    readInfo () {
      this.axios.defaults.headers.post['Content-Type'] = 'application/json'
      this.axios.defaults.headers.post['token'] = this.GLOBAL.Token
      this.axios.post(this.GLOBAL.axIosUrl + 'api/repaymentPlan' + '/1', {
      })
        .then(this.getMainInfoSucc)
        .catch(this.getMaininfoerror)
    },
    getMainInfoSucc (res) {
      console.log(res)
      res = res.data
      this.Totalmon = res.data.waitTotalNumber
      this.main = res.data.wantToRepaymentList
      this.count = res.data.waitAmountPayableSumTotal
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
    padding: .4rem 0 .3rem 0;
    background: #FFFFFF;
    text-align: center;
  }
  .title{
    color: #999999;
    height: .4rem;
    font-size: .28rem;
    line-height: .4rem;
  }
  .num{
    color: #FF6332;
    font-size: .64rem;
    font-weight:500;
    height: .9rem;
    line-height: .9rem;
  }
  .sun{
    text-align: center;
    color: #666666;
    font-size: .28rem;
    height: .4rem;
    line-height: .4rem;
  }
  .sun i{
    color: #FF6332;
  }
  .main{
    margin:.24rem .2rem .94rem .2rem;
  }
  .list{
    padding: .2rem .32rem 0 .32rem;
    height: 100%;
    overflow: hidden;
    background: #FFFFFF;
    margin-bottom: .2rem;
  }
  .money{
    height: .45rem;
    line-height: .45rem;
    color: #333333;
    font-size: .32rem;
    font-weight:500;
  }
  .left{
    height: .56rem;
    line-height: .56rem;
    color: #999999;
    font-size: .26rem;
    font-weight:400;
    float: left;
  }
  .right{
    height: .56rem;
    color: #999999;
    font-size: .26rem;
    font-weight:400;
    float: right;
  }
  .right i{
    font-size: .45rem;
    color: #666666;
  }
  .list-tip{
    width: 100%;
    float: left;
    height: .7rem;
    line-height: .7rem;
    color: #999999;
    font-size: .24rem;
    font-weight:400;
    border-top: 0.01rem solid #E7E7E7;
  }
</style>
