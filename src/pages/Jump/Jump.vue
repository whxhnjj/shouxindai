<template>
  <div></div>
</template>

<script>
export default {
  name: 'Jump',
  mounted () {
    document.title = this.$route.query.title
  }
}
</script>

<style scoped>

</style>
