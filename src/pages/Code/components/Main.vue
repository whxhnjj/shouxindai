<template>
  <div class="main">
    <div class="title">提现验证码</div>
    <div class="inputs">
      <div v-for="(item,index) in inputList" :key="index">
        <input type="number" v-model="item.val" class="border-input" @keyup="nextFocus($event,index)" @keydown="changeValue(index)" />
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
      code_num: 0
    }
  },
  methods: {
    // 对焦到下一个input框去
    nextFocus (el, index) {
      console.log(el)
      let dom = document.getElementsByClassName('border-input')
      let currInput = dom[index]
      let nextInput = dom[index + 1]
      let lastInput = dom[index - 1]
      if (el.keyCode !== 8) {
        if (index < (this.inputList.length - 1)) {
          nextInput.focus()
        } else {
          // 6位验证码输入完成
          currInput.blur()
        }
      } else {
        if (index !== 0) {
          lastInput.focus()
        }
      }
    },
    changeValue (index) {
      this.inputList[index].val = ''
    },
    // 短信倒计时
    getAuthCode: function () {
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
