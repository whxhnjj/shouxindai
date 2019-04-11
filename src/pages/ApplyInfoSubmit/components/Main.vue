<template>
  <div>
    <div class="main">
      <div class="img"><img :src="msg" /></div>
      <div class="tip">{{Tip}}</div>
      <span>恭喜你，完成了信用提交</span>
    </div>
    <div class="button" @click="clickSubmitInfo()">返回({{count}})</div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      count: '',
      msg: require('../../../assets/image/success.png'),
      Tip: '提交成功'
    }
  },
  methods: {
    getFaceId () {
      this.axios.defaults.headers.post['Content-Type'] = 'application/json'
      this.axios.defaults.headers.post['token'] = this.GLOBAL.Token
      this.axios.post('api/assess/getFace/' + localStorage.getItem('bizId'), {
      })
        .then(this.getFaceIdInfoSucc)
        .catch(this.getFaceIdInfoerror)
    },
    getFaceIdInfoSucc (res) {
      alert(JSON.stringify(res))
      res = res.data.data
      if (res.data === 'PASS') {
        this.msg = require('../../../assets/image/success.png')
        this.Tip = '提交成功'
      } else {
        this.msg = require('../../../assets/image/error.png')
        this.Tip = '提交失败'
      }
    },
    getFaceIdInfoerror (res) {
      this.$toast.center('网络错误')
    },
    clickSubmitInfo () {
      this.$router.push({path: '/Jump', query: {title: document.title}})
    },
    goGrdoupRecor () {
      const TIME_COUNT = 3
      if (!this.timer) {
        this.count = TIME_COUNT
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            clearInterval(this.timer)
            this.timer = null
            // 跳转的页面写在此处
            // this.$router.push({path: '/Jump', query: {title: document.title}})
          }
        }, 1000)
      }
    }
  },
  created () {
    // 根据需求确定在哪里调用
    this.goGrdoupRecor()
    this.getFaceId()
  }
}
</script>

<style scoped>
  .main{
    height: 3.95rem;
    background: #FFFFFF;
    overflow: hidden;
  }
  .img{
    width: 1.3rem;
    height: 1.3rem;
    margin: .8rem auto .3rem;
  }
  .img img{
    width: 1.3rem;
    height: 1.3rem;
  }
  .tip{
    color: #333333;
    font-size: .4rem;
    font-weight: 500;
    height: .6rem;
    line-height: .6rem;
    text-align: center;
  }
  span{
    display: block;
    color:#999999;
    font-size: .28rem;
    font-weight: 400;
    height: .4rem;
    line-height: .4rem;
    text-align: center;
  }
  .button{
    margin: .4rem .4rem 2rem .4rem;
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
