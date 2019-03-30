<template>
  <div>
    <div class="main">
      <div class="list" v-for="(data,index) in arrData" :key="index" @click="getDataUrl(data.card)">
        <img :src="data.urlimg" />
        <span>{{data.card}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      arrData: [
        {
          card: '招商银行',
          urlimg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553677342260&di=ffe9b6c9167175f70554ed9faec0c221&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F00%2F07%2F85%2F23%2F59316cc6d4e84.png'
        },
        {
          card: '工商银行',
          urlimg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553677399728&di=015949db51393fc05d4fad2a8c0f619e&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01f2b45541ad67000001a64b30c1bf.jpg'
        },
        {
          card: '兴业银行',
          urlimg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554272142&di=f960f5c085fced47b5bb6470946ec829&imgtype=jpg&er=1&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F00%2F07%2F85%2F23%2F59316cb968940.png'
        },
        {
          card: '中国银行',
          urlimg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553677496941&di=c476c43039ab61668f2abde89da1cc40&imgtype=0&src=http%3A%2F%2Fs15.sinaimg.cn%2Fmiddle%2F4364cbcdgc2f38d6173be%26690'
        },
        {
          card: '农业银行',
          urlimg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553677444133&di=23240d641799b6ccc51b464843e9d49f&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F18%2F01%2F03%2Fd094d45f12ea3e461c05c3b4957c2cef.jpg'
        }
      ]
    }
  },
  methods: {
    getDataUrl (card) {
      this.$router.push({
        name: 'Addcard',
        params: {
          card: card
        }
      })
    }
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
