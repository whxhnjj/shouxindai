<template>
<div>
  <div class="main">
    <!--卡片开始-->
    <div class="list" v-for="item of main" :key="item.index" @click="routerTo(item.orderNo)">
      <div class="info">
        <span class="mon">{{item.loadMoney}}</span>
        <span class="date">{{item.insertTime | time}}</span>
      </div>
      <div class="state" v-if="item.repaymentStatus === 10">未结清</div>
      <div class="state" v-if="item.repaymentStatus === 20">已结清</div>
      <div class="state" v-if="item.repaymentStatus === 30">未结清</div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      main: []
    }
  },
  // 时间戳转日期
  filters: {
    time: function time (value) {
      var d = new Date(parseInt(value))
      return (d.getFullYear()) + '年' + (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '月' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate()) + '日'
    }
  },
  methods: {
    routerTo (orderNo) {
      this.$router.push({path: '/LoanDetails', query: {orderNo: orderNo}})
    },
    readInfo () {
      this.axios.defaults.headers.post['Content-Type'] = 'application/json'
      this.axios.defaults.headers.post['token'] = this.GLOBAL.Token
      this.axios.post(this.GLOBAL.axIosUrl + 'api/borrowRecord', {
      })
        .then(this.getMainInfoSucc)
        .catch(this.getMaininfoerror)
    },
    getMainInfoSucc (res) {
      res = res.data
      this.main = res.data.arrearList
      console.log(res)
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
  height: 100%;
  background: #FFFFFF;
  padding: 0 .4rem;
  margin-top: .16rem;
}
.list{
  height: 1.48rem;
  border-bottom: #EEEEEE solid 0.01rem;
  background: url("../../../assets/image/borrow-jiantou.png") no-repeat right center;
  background-size: .44rem;
}
.list:last-child{
  border-bottom: 0 solid transparent;
}
  .info{
    padding: .28rem 0 .29rem 0;
    float: left;
  }
  .mon{
    font-weight:500;
    font-size: .32rem;
    height: .50rem;
    line-height: .50rem;
    color: #333333;
    display: block;
  }
  .date{
    color: #999999;
    font-size: .26rem;
    height: .40rem;
    line-height: .40rem;
    font-weight:400;
    display: block;
  }
  .state{
    float: right;
    color: #666666;
    height: 1.48rem;
    line-height: 1.48rem;
    font-size: .26rem;
    font-weight:400;
    padding-right: .5rem;
  }
</style>
