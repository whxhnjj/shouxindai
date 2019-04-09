<template>
  <div>
    <div class="main">
      <img src="../../../assets/image/success.png" />
      <div class="title">{{borrowStatus}}</div>
      <div class="money">{{amount}}元</div>
      <div class="tip">预计到账时间：{{insertTime}}</div>
    </div>
    <div class="button">返回(3)</div>
  </div>
</template>
<script>
export default {
  name: 'Main',
  data () {
    return {
      amount: '',
      insertTime: '',
      borrowStatus: ''
    }
  },
  methods: {
    readInfo () {
      this.axios.defaults.headers.post['Content-Type'] = 'application/json'
      this.axios.defaults.headers.post['token'] = this.GLOBAL.Token
      this.axios.post(this.GLOBAL.axIosUrl + 'api/getBorrowResult', {
      })
        .then(this.getMainInfoSucc)
        .catch(this.getMaininfoerror)
    },
    getMainInfoSucc (res) {
      res = res.data.data
      this.amount = res.amount
      this.insertTime = res.insertTime
      this.borrowStatus = res.borrowStatus
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
  .main{
    height: 4.77rem;
    background: #FFFFFF;
  }
  img{
    width: 1.3rem;
    height: 1.3rem;
    margin: .8rem 41.33% .32rem 41.33%;
  }
  .title{
    color: #333333;
    height: .5rem;
    line-height: .5rem;
    font-size: .36rem;
    text-align: center;
    font-weight: 400;
  }
  .money{
    font-size: .3rem;
    color: #666666;
    text-align: center;
    height: .42rem;
    line-height: .42rem;
    margin: .15rem 0 .48rem 0;
  }
  .tip{
    text-align: center;
    color: #999999;
    height: .4rem;
    line-height: .4rem;
    font-weight:400;
    font-size: .28rem;
  }
  .button{
    margin: .47rem .4rem;
    display: block;
    background: url("../../../assets/image/borrow-botton.png") no-repeat center center;
    background-size:100% .88rem;
    height: .88rem;
    color: #FFFFFF;
    line-height: .88rem;
    font-size: .32rem;
    text-align: center;
  }
</style>
