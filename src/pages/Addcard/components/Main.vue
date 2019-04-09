<template>
  <div>
    <div class="main">
      <div class="list">
        <span>姓名</span>
        <input type="text" value="张三" v-model="name" placeholder="请输入姓名" readonly="readonly"/>
      </div>
      <div class="list">
        <span>身份证号</span>
        <input type="text" v-model="idCard" value="123456789110564859" placeholder="请输入身份证" readonly="readonly" />
      </div>
      <div class="list">
        <router-link to="/BankCard">
          <span>卡行</span>
          <div class="bank-card" v-if="iscard">{{card}}</div>
          <div class="bank-card-color" v-if="!iscard">{{card}}</div>
        </router-link>
      </div>
      <div class="list">
        <span>银行卡号</span>
        <input type="text" value="" v-model="bankCard" placeholder="请输入银行卡号" />
      </div>
      <div class="list">
        <span>预留手机</span>
        <input type="text" value="" v-model="phone" placeholder="请输入预留手机" />
      </div>
      <div class="list">
        <span>验证码</span>
        <i v-show="sendAuthCode" @click="getAuthCode">获取验证码</i>
        <i class="code-text" v-show="!sendAuthCode">重新发送<b>({{code_num}}s)</b></i>
        <input type="text" value="" v-model="authCode" placeholder="" />
      </div>
    </div>
    <!--<router-link class="button"  to="/code">确定</router-link>-->
    <div class="button" @click="clickSubmitInfo">确定</div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      sendAuthCode: true,
      code_num: 0,
      iscard: true,
      name: '王杰',
      idCard: '123',
      card: '',
      bankCard: '',
      phone: '',
      authCode: ''
    }
  },
  methods: {
    clickSubmitInfo () {
      this.axios.defaults.headers.post['Content-Type'] = 'application/json'
      this.axios.defaults.headers.post['token'] = this.GLOBAL.Token
      this.axios.post(this.GLOBAL.axIosUrl + 'api/addBankCard', {
        name: this.name,
        idCard: this.idCard,
        bank: this.card,
        bankCard: this.bankCard,
        phone: this.phone,
        authCode: this.authCode
      })
        .then(this.getMainInfoSucc)
        .catch(this.getMaininfoerror)
    },
    getMainInfoSucc (res) {
      console.log(res)
      res = res.data
      this.$toast(res.msg)
    },
    getMaininfoerror (res) {
      this.$toast('网络错误')
    },
    // 短信倒计时
    getAuthCode: function () {
      this.sendAuthCode = false
      this.code_num = 30
      let timefun = setInterval(() => {
        this.code_num--
        if (this.code_num <= 0) {
          this.sendAuthCode = true
          clearInterval(timefun)
        }
      }, 1000)
    }
  },
  mounted: function () {
    if (this.$route.params.card === undefined) {
      this.card = '请选择卡行'
      this.iscard = true
    } else {
      this.card = this.$route.params.card
      this.iscard = false
    }
  }
}
</script>

<style scoped>
  .main{
    margin: .16rem 0 .42rem 0;
    height: 100%;
    overflow: hidden;
    background: #FFFFFF;
    padding: 0 .4rem;
  }
  .list{
    height: 1.09rem;
    border-bottom: 0.01rem solid #E7E7E7;
  }
  .list:last-child{
    border-bottom: 0 solid transparent;
  }
  .list span{
    height: 1.09rem;
    line-height: 1.09rem;
    font-size: .28rem;
    color: #333333;
    display: block;
    float: left;
  }
  .list input{
    float: right;
    height: 1.05rem;
    line-height:1.05rem;
    text-align: right;
    display: block;
    font-size: .28rem;
    color: #333333;
    -webkit-appearance: none;
  }
  .list input::-webkit-input-placeholder {
    color: #AAA;
  }
  .list input:-moz-placeholder {
    color: #AAA;
  }
  .list input:-ms-input-placeholder {
    color: #AAA;
  }
  .list i{
    color: #FF6332;
    display: block;
    float: right;
    font-size: .28rem;
    height: 1.09rem;
    padding-left: .2rem;
    line-height: 1.09rem;
  }
  .code-text{
    color: #AAAAAA!important;
  }
  .code-text b{
    color: #FF6332;
  }
  .bank-card{
    float: right;
    height: 1.05rem;
    line-height:1.05rem;
    text-align: right;
    display: block;
    padding-right: .44rem;
    font-size: .28rem;
    color: #AAA;
    background: url("../../../assets/image/borrow-jiantou.png") no-repeat right center;
    background-size: .44rem;
  }
  .bank-card-color{
    float: right;
    height: 1.05rem;
    line-height:1.05rem;
    text-align: right;
    display: block;
    padding-right: .44rem;
    font-size: .28rem;
    color: #333333;
    background: url("../../../assets/image/borrow-jiantou.png") no-repeat right center;
    background-size: .44rem;
  }
  .button{
    margin: 0 .4rem;
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
