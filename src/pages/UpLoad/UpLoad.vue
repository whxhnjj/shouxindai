<template>
<div>
  <form>
    <input class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="update"/>
  </form>
</div>
</template>

<script>
export default {
  name: 'UpLoad',
  data () {
    return {
    }
  },
  methods: {
    update (e) {
      let file = e.target.files[0]
      let param = new FormData()
      param.append('moduleName', 'H5')
      param.append('version', '3.0')
      param.append('file', file)
      let config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      this.axios.post('http://fileserver.test.api.aishangjinrong.com/attachment/v1.4', param, config)
        .then(response => {
          console.log(response.data)
        })
    }
  }
}
</script>

<style scoped>
  .button{
    margin: .32rem .4rem 2rem .4rem;
    display: block;
    background: url("../../assets/image/borrow-botton.png") no-repeat center center;
    background-size:100% .88rem;
    height: .88rem;
    color: #FFFFFF;
    line-height: .88rem;
    font-size: .32rem;
    text-align: center;
  }
</style>
