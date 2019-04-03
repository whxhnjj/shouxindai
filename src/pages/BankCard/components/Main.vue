<template>
  <div>
    <div class="main">
      <div class="list" v-for="(data,index) in arrData" :key="index" @click="getDataUrl(data.bankName)">
        <img :src="data.bankLogo" />
        <span>{{data.bankName}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      arrData: []
    }
  },
  methods: {
    readInfo () {
      this.axios.defaults.headers.get['Content-Type'] = 'application/json'
      this.axios.defaults.headers.get['token'] = this.GLOBAL.Token
      this.axios.get(this.GLOBAL.axIosUrl + 'api/credit/repayment/api/getBankList', {
      })
        .then(this.getMainInfoSucc)
        .catch(this.getMaininfoerror)
    },
    getMainInfoSucc (res) {
      console.log(res)
      res = res.data.data
      this.arrData = res
    },
    getMaininfoerror (res) {
      this.$toast('网络错误')
    },
    getDataUrl (card) {
      this.$router.push({
        name: 'Addcard',
        params: {
          card: card
        }
      })
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
    overflow: hidden;
    padding: 0 .4rem;
    background: #FFFFFF;
    margin-top: .16rem;
  }
  .list{
    height: 100%;
    overflow: hidden;
    border-bottom: 0.01rem solid #E7E7E7;
    padding: .26rem 0;
  }
  .list:last-child{
    border-bottom: 0 solid transparent;
  }
  .list img{
    width: .6rem;
    height: .6rem;
    margin-right: .2rem;
    display: block;
    float: left;
  }
  .list span{
    width: 82%;
    display: block;
    float: left;
    height: .6rem;
    color: #333333;
    font-size: .28rem;
    line-height: .6rem;
  }
</style>
