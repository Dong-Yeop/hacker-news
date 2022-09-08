<template>
  <div class="header">
    <router-link to="/News">News</router-link><span>|</span>
    <router-link to="/Ask">Ask</router-link><span>|</span>
    <router-link to="/Jobs">Jobs</router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.header {
  color:#fff;
  background:#42b883;
  display:flex;
  padding:8px;
  height:40px;
  align-items: center;
  box-sizing:border-box;
}
.header a {
  color:#fff;
  text-decoration:none;
  font-weight:700;
}
.header a.router-link-exact-active {
  color:#35495e;
}
.header span {
  margin:0 15px;
}
</style>