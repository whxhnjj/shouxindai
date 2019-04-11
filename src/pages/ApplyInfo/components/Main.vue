<template>
  <div>
    <div class="title">基本信息</div>
    <div class="main">
      <!--卡片开始-->
      <div class="list">
        <span class="name">姓名</span>
        <input type="text" value="" v-model="userName" placeholder="请输入真实姓名" />
      </div>
      <div class="list">
        <span class="name">手机号码</span>
        <input type="text" value="" v-model="phone" placeholder="请输入手机号码" />
      </div>
      <div class="list">
        <span class="name">身份证号</span>
        <input type="text" value="" v-model="idCard" placeholder="请输入18位身份证号" />
      </div>
      <div class="list">
        <FamilyselectAddress @FamilyeventFromChild="FamilyeventFromChild"></FamilyselectAddress>
      </div>
      <div class="list">
        <span class="name">家庭详细地址</span>
        <input type="text" value="" v-model="residenceAddress" placeholder="请输入家庭详细地址" />
      </div>
      <div class="list">
          <selectAddress  @eventFromChild="eventFromChild"></selectAddress>
      </div>
      <div class="list">
        <span class="name">现居详细地址</span>
        <input type="text" value="" v-model="livingAddress" placeholder="请输入现居详细地址" />
      </div>
      <div class="list">
        <span class="name">备用手机号</span>
        <input type="text" value="" v-model="alternatePhone" placeholder="请输入备用手机号" />
      </div>
    </div>
    <div class="info-card-img">
      <div class="card-img-left">
        <input type="file"  accept="image/*" name="avatar" @change="changeImagePositive($event)" ref="avatarInput" capture="camera" />
        <img :src="avatar"  />
      </div>
      <div class="card-img-right">
        <input type="file" accept="image/*" name="avatar" @change="changeImageCon($event)" ref="avatarInput" capture="camera" />
        <img :src="avatarfan"  />
      </div>
    </div>
    <div class="tip-info-content">
      特别提示：和分期在为您提供相关贷款推荐等服务的过程中会采集、使用、向可能为您提供贷款的贷款人及其他必要第三方披露您的个人信息，其中身份证件号码、银行账号、财产信息、征信信息等信息属于您的个人敏感信息，请您确认您已明确知晓并同意授权我司有关您个人敏感信息的采集、使用及披露行为，并知晓提供该等授权及拒绝授权分别可能导致的不利后果，具体有关个人敏感信息授权内容以您签署的《信息授权函》或类似文件的约定为准
    </div>
    <div class="info-tip">
      <img v-if="!isRadioimg" @click="radioimg" src="../../../assets/image/radio-t.png">
      <img v-if="isRadioimg" @click="radioimg" src="../../../assets/image/radio-f.png">
      <div>我已详细阅读并同意<span>《小雨点信息授权函》</span></div>
    </div>
    <div class="info-tip">
      <img v-if="!isapplyradioimg" @click="applyradio" src="../../../assets/image/radio-t.png">
      <img v-if="isapplyradioimg" @click="applyradio" src="../../../assets/image/radio-f.png">
      <div>我已详细阅读并同意<span>《爱尚协议支付及合同》</span></div>
    </div>
    <div class="button" @click="clickSubmitInfo()">确定</div>
  </div>
</template>

<script>
import FamilyselectAddress from './FamilyselectAddress'
import selectAddress from './selectAddress'
export default {
  name: 'Main',
  components: {
    FamilyselectAddress,
    selectAddress
  },
  data () {
    return {
      userName: '王杰',
      phone: '18829225381',
      idCard: '612423199408291056',
      residenceProvince: '户籍陕西省',
      residenceCity: '户籍西安市',
      residenceDistrict: '户籍莲湖区',
      residenceAddress: '户籍详细地址',
      livingProvince: '现居住陕西省',
      livingCity: '现居住西安市',
      livingDistrict: '现居住莲湖区',
      livingAddress: '现居住详细地址',
      alternatePhone: '15529561324',
      idCardBackImg: '',
      idCardFrontImg: '',
      isRadioimg: true,
      isapplyradioimg: true,
      avatar: require('../../../assets/image/ic_zheng.png'),
      avatarfan: require('../../../assets/image/ic_fan.png'),
      iccardzheng: ''
    }
  },
  methods: {
    // 上传身份证正面
    changeImagePositive (e) {
      var file = e.target.files[0]
      let param = new FormData()
      param.append('moduleName', 'H5')
      param.append('version', '3.0')
      param.append('file', file, file.name)
      let config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      this.axios.post('http://fileserver.test.api.aishangjinrong.com/attachment/v1.4', param, config)
        .then(response => {
          if (response.data.success === false) {
            this.$toast('身份证照片过大！')
            return
          }
          this.avatar = response.data.data[0].filePath
          this.idCardBackImg = response.data.data[0].filePath
          this.avatar = response.data.data[0].filePath
          this.$toast('身份证正面上传成功')
        })
        .catch(response => {
          this.$toast('网络错误')
          console.log(response)
        })
    },
    // 上传身份证反面
    changeImageCon (e) {
      var file = e.target.files[0]
      let param = new FormData()
      param.append('moduleName', 'H5')
      param.append('version', '3.0')
      param.append('file', file, file.name)
      let config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      this.axios.post('http://fileserver.test.api.aishangjinrong.com/attachment/v1.4', param, config)
        .then(response => {
          console.log(response.data)
          if (response.data.success === false) {
            this.$toast('身份证照片过大！')
            return
          }
          this.avatarfan = response.data.data[0].filePath
          this.idCardFrontImg = response.data.data[0].filePath
          this.$toast('身份证反面上传成功')
        })
        .catch(response => {
          this.$toast('网络错误')
          alert(response)
        })
    },
    // 获取家庭子组件传来选中的省市区
    FamilyeventFromChild (data) {
      this.residenceProvince = data.sheng
      this.residenceCity = data.shi
      this.residenceDistrict = data.qu
    },
    // 获取现居住子组件传来选中的省市区
    eventFromChild (data) {
      this.livingProvince = data.sheng
      this.livingCity = data.shi
      this.livingDistrict = data.qu
    },
    // 选取radio
    radioimg () {
      if (this.isRadioimg === true) {
        this.isRadioimg = false
      } else {
        this.isRadioimg = true
      }
    },
    // 选取radio
    applyradio () {
      if (this.isapplyradioimg === true) {
        this.isapplyradioimg = false
      } else {
        this.isapplyradioimg = true
      }
    },
    clickSubmitInfo () {
      // if (this.idCardBackImg === '' || this.idCardFrontImg === '') {
      //   this.$toast.center('请上传身份证正反面！')
      //   return
      // }
      if (this.isRadioimg === true) {
        this.$toast.center('请勾选《小雨点信息授权函》')
        return
      }
      if (this.isapplyradioimg === true) {
        this.$toast.center('请勾选《爱尚协议支付及合同》')
        return
      }
      this.axios.defaults.headers.post['Content-Type'] = 'application/json'
      this.axios.defaults.headers.post['token'] = this.GLOBAL.Token
      this.axios.post(this.GLOBAL.axIosUrl + 'api/assess/application', {
        userName: this.userName,
        phone: this.phone,
        idCard: this.idCard,
        residenceProvince: this.residenceProvince,
        residenceCity: this.residenceCity,
        residenceDistrict: this.residenceDistrict,
        residenceAddress: this.residenceAddress,
        livingProvince: this.livingProvince,
        livingCity: this.livingCity,
        livingDistrict: this.livingDistrict,
        livingAddress: this.livingAddress,
        alternatePhone: this.alternatePhone,
        idCardPositiveUrl: '11', // 正面  this.idCardBackImg
        idCardBackUrl: '222' // 反面 this.idCardFrontImg
      })
        .then(this.getMainInfoSucc)
        .catch(this.getMaininfoerror)
    },
    getMainInfoSucc (res) {
      res = res.data
      this.$toast(res.msg)
      if (res.code === 200) {
        console.log(res.data.bizId)
        localStorage.setItem('bizId', res.data.bizId)
        window.location.href = 'https://api.megvii.com/faceid/lite/do' + '?token=' + res.data.token
      }
    },
    getMaininfoerror (res) {
      this.$toast('网络错误')
    }
  }
}
</script>

<style scoped>
.title{
  color: #666666;
  font-size: .26rem;
  font-weight:400;
  height: .64rem;
  line-height: .64rem;
  background: #F6F6F6;
  padding-left: .3rem;
}
.main{
  padding: 0 .2rem;
  background: #FFFFFF;
  height: 100%;
  overflow: hidden;
}
  .list{
    height: 1rem;
    line-height: 1rem;
    border-bottom: 0.01rem solid #E6E6E6;
  }
  .list:last-child{
    border-bottom: 0 solid transparent;
  }
  .list span{
    color: #333333;
    font-size: .28rem;
    font-weight:400;
    line-height: 1rem;
    float: left;
  }
  .list input{
    float: right;
    color: #333333;
    font-size: .28rem;
    font-weight:400;
    text-align: right;
    line-height: .95rem;
    height: .95rem;
    padding-right: .45rem;
  }
  .list input::-webkit-input-placeholder {
    color: #999999;
    font-size: .28rem;
  }
  .list input:-moz-placeholder {
    color: #999999;
    font-size: .28rem;
  }
  .list input:-ms-input-placeholder {
    color: #999999;
    font-size: .28rem;
  }
  .info-card-img{
    background: #FFFFFF;
    padding: .35rem .3rem;
    height: 100%;
    overflow: hidden;
    margin-top: .25rem;
  }
  .card-img-left{
    width: 3.13rem;
    height: 2.12rem;
    float: left;
    position: relative;
  }
  .card-img-left img{
    width: 3.13rem;
    height: 2.12rem;
    position: absolute;
    left: 0;
  }
  .card-img-left input{
    width: 3.13rem;
    height: 2.12rem;
    opacity: 0;
    position: absolute;
    left: 0;
    z-index: 999;
  }
  .card-img-right{
    width: 3.13rem;
    height: 2.12rem;
    float: right;
    position: relative;
  }
  .card-img-right img{
    width: 3.13rem;
    height: 2.12rem;
    position: absolute;
    right: 0;
  }
  .card-img-right input{
    width: 3.13rem;
    height: 2.12rem;
    opacity: 0;
    position: absolute;
    right: 0;
    z-index: 999;
  }
  .tip-info-content{
    padding: .34rem .32rem;
    font-size: .24rem;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height: .33rem;
    letter-spacing: 1px;
  }
  .info-tip{
   margin:0 0 .24rem .4rem;
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
    margin: .32rem .4rem 2rem .4rem;
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
