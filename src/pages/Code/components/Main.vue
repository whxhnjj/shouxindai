<template>
  <div class="main">
    <div class="title">提现验证码</div>
    <div class="inputs">
      <div v-for="(item,index) in inputList" :key="index">
        <input type="number" v-model="item.val" class="border-input" @keyup="nextFocus($event,index)" @keydown="changeValue(index, item)" />
      </div>
    </div>
    <div class="code-time" v-show="sendAuthCode"  @click="getAuthCode">重新发送</div>
    <div class="code-time" v-show="!sendAuthCode">重新发送<span class="code-time-text">({{code_num}}s)</span></div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      inputList: [{val: ''}, {val: ''}, {val: ''}, {val: ''}, {val: ''}, {val: ''}],
      sendAuthCode: true,
      code_num: 0,
      codenum: '',
      code: []
    }
  },
  methods: {
    // 获取短信验证码
    getCodeInfo () {
      this.axios.defaults.headers.post['Content-Type'] = 'application/json'
      this.axios.defaults.headers.post['spreadType'] = 'CASH_LOAN'
      this.axios.defaults.headers.post['token'] = this.GLOBAL.Token
      this.axios.post('ms/sendSms?type=1&mobile=' + this.$route.query.phone, {
      })
        .then(this.getCodeInfoSucc)
        .catch(this.getCodeInfoerror)
    },
    getCodeInfoSucc (res) {
      res = res.data
      if (res.code === 200) {
        this.$toast.center(res.msg)
      } else {
        this.$toast.center(res.msg)
      }
    },
    getCodeInfoerror (res) {
      console.log(res)
      this.$toast.center('网络错误')
    },
    // 验证短信接口是否正确
    getcodePro () {
      var bustr = ''
      this.code.forEach(function (value, index, array) {
        console.log(value.val)
        bustr += value.val
      })
      this.axios.defaults.headers.post['Content-Type'] = 'application/json'
      this.axios.defaults.headers.post['token'] = this.GLOBAL.Token
      this.axios.post('api/borrowsing/auth', {
        mobile: this.$route.query.phone,
        orderNo: this.$route.query.orderNo,
        smsCode: bustr
      })
        .then(this.getcodeProInfoSucc)
        .catch(this.getcodeProInfoerror)
    },
    getcodeProInfoSucc (res) {
      console.log(res)
      res = res.data
      if (res.code === 200) {
        this.$toast.center('验证成功')
      }
    },
    getcodeProInfoerror () {
      this.$toast.center('网络错误')
    },
    // 对焦到下一个input框去
    nextFocus (el, index) {
      let dom = document.getElementsByClassName('border-input')
      let currInput = dom[index]
      let nextInput = dom[index + 1]
      let lastInput = dom[index - 1]
      if (el.keyCode !== 8) {
        if (index < (this.inputList.length - 1)) {
          nextInput.focus()
        } else {
          // 6位验证码输入完成
          this.getcodePro()
          currInput.blur()
        }
      } else {
        if (index !== 0) {
          lastInput.focus()
        }
      }
    },
    changeValue (index, val) {
      this.code.push(val)
      this.inputList[index].val = ''
    },
    // 短信倒计时
    getAuthCode: function () {
      this.getCodeInfo()
      this.sendAuthCode = false
      this.code_num = 60
      let timefun = setInterval(() => {
        this.code_num--
        if (this.code_num <= 0) {
          this.sendAuthCode = true
          clearInterval(timefun)
        }
      }, 1000)
    }
  },
  created () {
    this.getAuthCode()
  }
}
</script>
<style scoped>
  .main{
    margin:2.8rem .4rem;
    height: 300px;
  }
  .title{
    text-align: center;
    font-size: .36rem;
    margin-bottom: .5rem;
    font-weight:400;
    line-height:50px;
    color: #373737;
  }
  .border-input {
    background: #ffffff;
    width: 16.3%;
    font-size: .32rem;
    height: 1rem;
    float: left;
    text-align: center;
    border: .01rem solid #cccccc;
  }
  .code-time{
    text-align: right;
    font-size: .28rem;
    color: #333333;
    float: right;
    margin-top: .25rem;
    font-weight:400;
  }
  .code-time-text{
    color: #FF6332;
  }
</style>
