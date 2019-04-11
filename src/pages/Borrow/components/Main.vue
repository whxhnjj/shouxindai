<template>
  <div>
    <div class="header">
      <div class="title">借多少</div>
      <div class="num">
        <span>¥</span>
        <input type="number" value=""  v-model="amount" oninput="if(value.length > 6)value = value.slice(0, 6)" placeholder="请输入你的借款金额"/>
      </div>
    </div>
    <div class="main">
      <div class="use" @click="usepopup">
        <span class="name">借款用途</span>
        <span class="info">{{purposes}}</span>
      </div>
      <div class="use" @click="stagesPop">
        <span class="name">分期期数</span>
        <span class="info">{{installmentNumber}}个月</span>
      </div>
      <div class="use">
        <span class="name">还款方式</span>
        <span class="info">{{interestType}}</span>
      </div>
      <div class="plan" @click="routerTo">
        <div class="plan-name">还款计划</div>
        <div class="money">{{Monthlysupply}}元</div>
        <div class="time">{{repaymenttime}}</div>
      </div>
      <div class="tip">试算结果仅供参考，具体以您签署的借款文件</div>
    </div>
    <!--收款账户-->
    <div class="main" @click="routerToBack">
      <div class="card">
        <img :src="isbankimg">
        <div class="card-info">
          <div class="card-name">收款账户<span>（{{isbankName}}{{isbanknum}}）</span></div>
          <div class="card-time">预计两小时到账</div>
        </div>
      </div>
    </div>

    <div class="info-tip">
      <img v-if="!isRadioimg" @click="radioimg" src="../../../assets/image/radio-t.png">
      <img v-if="isRadioimg" @click="radioimg" src="../../../assets/image/radio-f.png">
      <div>我已详细阅读并同意<span>《爱尚平台服务及合同》</span></div>
    </div>
    <!--<router-link class="button"  to="/code">确定</router-link>-->
    <div class="button" @click="clickSubmitInfo">确定</div>

    <!--借款用途弹出框-->
    <div class="Popup-bg" v-if="popup">
      <div class="box-pop-bg">
        <div class="box-pop">
          <div class="title">请选择实际资金用途</div>
          <ul>
            <li v-for="(data,index) in arrData" :key="index"  @click="getDataId(data)">{{data}}</li>
          </ul>
        </div>
        <div class="cancel" @click="cancel">取消</div>
      </div>
    </div>
    <!--分期弹出框-->
    <div class="Popup-bg" v-if="strpopup">
      <transition>
        <div class="box-pop-bg">
          <div class="box-pop">
            <div class="title">选择任意期限都可以提前还</div>
            <ul>
              <li v-for="(data,index) in stagesData" :key="index"  @click="getDatastages(data)">{{data}}个月</li>
            </ul>
          </div>
          <div class="cancel" @click="strcancel">取消</div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      isRadioimg: true,
      arrData: [],
      popup: false,
      stagesData: [],
      strpopup: false,
      amount: '1000',
      purposes: '个人日常消费',
      installmentNumber: '12',
      reimbursementMeans: '4',
      repaymentPlan: '5',
      bankCard: '6',
      Monthlysupply: '',
      repaymenttime: '',
      banckMain: '',
      interestType: '等额本息',
      isbankName: '', // 默认银行卡
      isbankid: '',
      isbanknum: '',
      isbankimg: ''
    }
  },
  watch: {
    '$route': 'getPathBack',
    // 如果 `amount` 发生改变，这个函数就会运行
    amount: function () {
      if (this.amount === '') {
        this.$toast.center('请输入借款金额')
        return
      }
      // this.Monthlysupply = parseFloat(parseFloat(this.amount * 1.35 / this.installmentNumber.replace(/[\u4e00-\u9fa5]/g, '')).toFixed(2))
      this.axios.defaults.headers.post['Content-Type'] = 'application/json'
      this.axios.defaults.headers.post['token'] = this.GLOBAL.Token
      this.axios.post(this.GLOBAL.axIosUrl + 'api/repaymentPlan', {
        amount: this.amount,
        installmentNumber: this.installmentNumber,
        reimbursementMeans: '等额本息'
      })
        .then(this.amountInfosucc)
        .catch(this.amountInfoerror)
    }
  },
  methods: {
    getPathBack () {
      this.isbankName = this.$route.query.bankName
      this.isbankid = this.$route.query.bankId
      this.isbanknum = this.$route.query.bankCardNumberSuffix
      this.isbankimg = this.$route.query.bankLogo
    },
    // 读取Input输入框金额
    amountInfosucc (res) {
      res = res.data.data
      this.Monthlysupply = res.amount
      this.repaymenttime = res.dateList[0]
    },
    amountInfoerror (res) {
      this.$toast.center('网络错误')
    },
    // 读取还款金额
    moneyInfo () {
      this.axios.defaults.headers.post['Content-Type'] = 'application/json'
      this.axios.defaults.headers.post['token'] = this.GLOBAL.Token
      this.axios.post(this.GLOBAL.axIosUrl + 'api/repaymentPlan', {
        amount: this.amount,
        installmentNumber: this.installmentNumber,
        reimbursementMeans: '等额本息'
      })
        .then(this.moneyInfosucc)
        .catch(this.moneyInfoerror)
    },
    moneyInfosucc (res) {
      res = res.data.data
      this.Monthlysupply = res.amount
      this.repaymenttime = res.dateList[0]
    },
    moneyInfoerror (res) {
      this.$toast.center('网络错误')
    },
    // 读取默认银行卡号
    readInfo () {
      this.axios.defaults.headers.post['Content-Type'] = 'application/json'
      this.axios.defaults.headers.post['token'] = this.GLOBAL.Token
      this.axios.post(this.GLOBAL.axIosUrl + 'api/bankNoList', {
      })
        .then(this.readInfoSucc)
        .catch(this.readInfoerror)
    },
    readInfoSucc (res) {
      res = res.data.data
      this.isbankName = res[0].bankName
      this.isbankid = res[0].id
      this.isbanknum = res[0].bankCardNumberSuffix
      this.isbankimg = res[0].logo
    },
    readInfoerror (res) {
      this.$toast('网络错误')
    },
    // 更换收款银行卡
    routerToBack () {
      this.$router.push({path: '/account'})
    },
    // 提交借款数据
    clickSubmitInfo () {
      if (this.isRadioimg === true) {
        this.$toast.center('请阅读并勾选爱尚平台服务及合同')
        return
      }
      this.axios.defaults.headers.post['Content-Type'] = 'application/json'
      this.axios.defaults.headers.post['token'] = this.GLOBAL.Token
      this.axios.post(this.GLOBAL.axIosUrl + 'api/borrowsing', {
        bankId: this.isbankid,
        bankName: this.isbankName,
        interestType: this.interestType,
        loadMoney: this.amount,
        loadUse: this.purposes,
        periods: this.installmentNumber,
        repaymentPlan: this.repaymentPlan
      })
        .then(this.getMainInfoSucc)
        .catch(this.getMaininfoerror)
    },
    getMainInfoSucc (res) {
      console.log(res)
      res = res.data
      this.$toast.center(res.msg)
      if (res.code === 200) {
        this.$router.push({path: '/Code', query: {orderNo: res.data.orderNo, phone: res.data.phone}})
      }
    },
    getMaininfoerror (res) {
      this.$toast('网络错误')
    },
    // 选取radio
    radioimg () {
      if (this.isRadioimg === true) {
        this.isRadioimg = false
      } else {
        this.isRadioimg = true
      }
    },
    // 开启弹出框
    usepopup () {
      this.popup = true
    },
    // 关闭弹出框
    cancel () {
      this.popup = false
    },
    // 选取借款用途
    getDataId (name) {
      this.purposes = name
      this.popup = false
    },
    // 分期弹框
    stagesPop () {
      this.strpopup = true
    },
    strcancel () {
      this.strpopup = false
    },
    getDatastages (name) {
      this.installmentNumber = name
      this.strpopup = false
      this.moneyInfo()
    },
    // /*借款用途条件*/
    loanUsageInfo () {
      this.axios.defaults.headers.get['Content-Type'] = 'application/json'
      this.axios.defaults.headers.get['token'] = this.GLOBAL.Token
      this.axios.get(this.GLOBAL.axIosUrl + 'api/borrowsingPurposes', {
      })
        .then(this.loanUsageInfoSucc)
        .catch(this.loanUsageInfoerror)
    },
    loanUsageInfoSucc (res) {
      res = res.data
      this.arrData = res.data
    },
    loanUsageInfoerror (res) {
      this.$toast('网络错误')
    },
    // 分期期数
    installmentsInfo () {
      this.axios.defaults.headers.get['Content-Type'] = 'application/json'
      this.axios.defaults.headers.get['token'] = this.GLOBAL.Token
      this.axios.get(this.GLOBAL.axIosUrl + 'api/installmentNumber', {
      })
        .then(this.installmentsInfoSucc)
        .catch(this.installmentsInfoerror)
    },
    installmentsInfoSucc (res) {
      res = res.data
      this.stagesData = res.data
    },
    installmentsInfoerror (res) {
      this.$toast('网络错误')
    },
    // 还款计划跳转
    routerTo () {
      this.$router.push({path: '/repayment', query: {Num: this.amount, fish: parseInt(this.installmentNumber)}})
    }
  },
  mounted () {
    // this.Monthlysupply = parseFloat(parseFloat(this.amount * 1.35 / this.installmentNumber.replace(/[\u4e00-\u9fa5]/g, '')).toFixed(2))
    this.loanUsageInfo()
    this.installmentsInfo()
    this.readInfo()
    this.moneyInfo()
  }
}
</script>

<style scoped>
  .header{
    height: 1.5rem;
    padding: .4rem .4rem .1rem .4rem;
    background: #FFFFFF;
    margin-bottom: .16rem;
  }
  .title{
    width: 100%;
    height: .42rem;
    font-size: .3rem;
    line-height: .42rem;
    color:rgba(51,51,51,1);
  }
  .num{
    height: .9rem;
    font-weight:500;
    float: left;
  }
  .num span{
    display: block;
    width: .6rem;
    line-height: .9rem;
    float: left;
    font-size: .48rem;
    color:#333333;
  }
  .num input{
    display: block;
    width: 6rem;
    float: left;
    line-height: .9rem;
    font-size: .64rem;
    color:#333333;
  }
  .num input::-webkit-input-placeholder{
    font-size: .48rem;
    color: #CCCCCC;
  }
  .num input::-moz-placeholder{
    font-size: .48rem;
    color: #CCCCCC;
  }
  /*借款信息选择*/
  .main{
    background: #FFFFFF;
    padding: 0 .5rem;
  }
  .use{
    height: 1.1rem;
    padding-right: .5rem;
    background: url("../../../assets/image/borrow-jiantou.png") no-repeat right center;
    background-size: .44rem;
    border-bottom: 0.01rem solid #E7E7E7 ;
  }
  .name{
    display: block;
    height: 1.1rem;
    line-height: 1.1rem;
    font-size: .3rem;
    color:rgba(51,51,51,1);
    letter-spacing:1px;
    float: left;
  }
  .info{
    float: right;
    display: block;
    height: 1.1rem;
    line-height: 1.1rem;
    color:rgba(102,102,102,1);
    letter-spacing:1px;
    font-size: .3rem;
  }
  /*还款计划*/
  .plan{
    padding:.35rem .5rem .35rem 0;
    background: url("../../../assets/image/borrow-jiantou.png") no-repeat right center;
    background-size: .44rem;
    border-bottom: 0.01rem solid #E7E7E7;
    height: 100%;
    overflow: hidden;
  }
  .plan-name{
    display: block;
    font-size: .3rem;
    color:rgba(51,51,51,1);
    letter-spacing:1px;
    float: left;
  }
  .money{
    height: .42rem;
    color: #666666;
    font-size: .3rem;
    float: right;
    line-height: .42rem;
  }
  .time{
    width: 100%;
    height: .42rem;
    color: #666666;
    font-size: .3rem;
    float: right;
    line-height: .45rem;
    text-align: right;
  }
  .tip{
    color: #999999;
    height: .7rem;
    font-size: .24rem;
    line-height: .7rem;
  }
  /*收款账户*/
  .card{
    margin-top: .16rem;
    padding:.32rem .5rem .32rem 0;
    background:url("../../../assets/image/borrow-jiantou.png") no-repeat right center;
    background-size: .44rem;
    height: 100%;
    overflow: hidden;
  }
  .card img{
    width: .81rem;
    height: .81rem;
    float: left;
    display: block;
    margin-right: .3rem;
  }
  .card-info{
    float: left;
  }
  .card-name{
    color: #333333;
    font-size: .34rem;
    height: .48rem;
    line-height: .48rem;
  }
  .card-name span{
    color: #333333;
    font-size: .24rem;
  }
  .card-time{
    color: #999999;
    font-size: .3rem;
    height: .42rem;
    line-height: .42rem;
  }
  .info-tip{
    margin: .4rem 0 .24rem .41rem;
    height: .33rem;
    font-weight:400;
    color: #999999;
    line-height: .33rem;
    font-size: .24rem;
  }
  .info-tip span{
    color: #F78C62;
  }
  .info-tip div {
    float: left;
  }
  .info-tip img{
    display: block;
    float: left;
    width: .32rem;
    height: .32rem;
    line-height: .32rem;
    margin-right: .12rem;
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
  /*弹出框*/
  .Popup-bg{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(0,0,0,0.5);
  }
  .box-pop-bg{
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    overflow: hidden;
    background:rgba(244,244,244,1);
  }
  .box-pop{
    width: 90%;
    background: #FFFFFF;
    padding: 0 5%;
  }
  .box-pop ul li{
    border-bottom: 0.01rem solid #EEEEEE;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    color: #333333;
    font-size: .3rem;
  }
  .box-pop .title{
    font-size: .28rem;
    height: 1.1rem;
    line-height: 1.1rem;
    text-align: center;
    color: #999999;
    border-bottom: 0.01rem solid #EEEEEE;
  }
  .bottom-none{
    border-bottom:0.01rem solid transparent!important;
  }
  .cancel{
    margin-top: .16rem;
    height: 1rem;
    text-align: center;
    color: #333333;
    line-height: 1rem;
    font-size: .28rem;
    background: #FFFFFF;
  }
</style>
