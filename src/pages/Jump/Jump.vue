<template>
  <div></div>
</template>

<script>
export default {
  name: 'Jump',
  mounted () {
    // 跳转APP首页中转页
    document.title = this.$route.query.title
  }
}
</script>

<style scoped>

</style>
