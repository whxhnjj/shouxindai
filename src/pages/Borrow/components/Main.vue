<template>
  <div>
    <div class="header">
      <div class="title">借多少</div>
      <div class="num">
        <span>¥</span>
        <input type="number" value="1000" placeholder="请输入你的借款金额"/>
      </div>
    </div>
    <div class="main">
      <div class="use" @click="usepopup">
        <span class="name">借款用途</span>
        <span class="info">{{usename}}</span>
      </div>
      <div class="use" @click="stagesPop">
        <span class="name">分期期数</span>
        <span class="info">{{stagesName}}</span>
      </div>
      <div class="use">
        <span class="name">还款方式</span>
        <span class="info">等额本息</span>
      </div>
      <div class="plan" >
        <router-link to="/repayment">
          <div class="plan-name">还款计划</div>
          <div class="money">359.00元</div>
          <div class="time">2019-04-04</div>
        </router-link>
      </div>
      <div class="tip">试算结果仅供参考，具体以您签署的借款文件</div>
    </div>
    <!--收款账户-->
    <div class="main">
      <div class="card">
        <img src="../../../assets/image/borrow-card.png">
        <div class="card-info">
          <div class="card-name">收款账户<span>（招商银行9731）</span></div>
          <div class="card-time">预计两小时到账</div>
        </div>
      </div>
    </div>

    <div class="info-tip">
      <img v-if="!isRadioimg" @click="radioimg" src="../../../assets/image/radio-t.png">
      <img v-if="isRadioimg" @click="radioimg" src="../../../assets/image/radio-f.png">
      <div>我已详细阅读并同意<span>《爱尚平台服务及合同》</span></div></div>
    <router-link class="button"  to="/code">确定</router-link>

    <!--借款用途弹出框-->
    <div class="Popup-bg" v-if="popup">
      <div class="box-pop-bg">
        <div class="box-pop">
          <div class="title">请选择实际资金用途</div>
          <ul>
            <li  v-for="(data,index) in arrData" :key="index"  @click="getDataId(data.name)">{{data.name}}</li>
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
              <li v-for="(data,index) in stagesData" :key="index"  @click="getDatastages(data.name)">{{data.name}}</li>
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
      usename: '个人日常消费',
      arrData: [
        {
          name: '个人日常消费'
        },
        {
          name: '装修'
        },
        {
          name: '旅游'
        },
        {
          name: '教育'
        },
        {
          name: '医疗'
        }
      ],
      popup: false,
      stagesName: '12个月',
      stagesData: [
        {
          name: '3个月'
        },
        {
          name: '9个月'
        },
        {
          name: '12个月'
        }
      ],
      strpopup: false
    }
  },
  methods: {
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
      this.usename = name
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
      this.stagesName = name
      this.strpopup = false
    }
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
