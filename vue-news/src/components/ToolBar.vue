<template>
  <header :class="className">
    <nav class="inner">
      <h1 class="logo">
        <a href="/"><span>hacker news</span></a>
      </h1>
      <router-link to="/News">News</router-link>
      <router-link to="/Ask">Ask</router-link>
      <router-link to="/Jobs">Jobs</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    className() {
      return this.$route.name;
    },
  },
}
</script>

<style scoped>
header {
  color:#fff;
  background:#42b883;
  transition:background 1s ease;
}
header.ask {background:#f60;}
header.job {background:#990000;}
header .inner {
  display:flex;
  height:60px; padding:0;
  align-items: center;
  box-sizing:border-box;
  max-width:800px;
  margin:0 auto;
}
header a {
  color:#fff;
  text-decoration:none;
  opacity: .7;
}
header a.router-link-exact-active {
  opacity: 1;
  font-weight:700;
}
header .logo {
  width:30px; height:30px;
  background:url(@/assets/images/logo.svg) no-repeat 0 0 / cover;
  margin-right:5%;
}
header .logo a {display:block; width:100%; height:100%;}
header .logo a span {position:absolute; top:-9999px; left:-9999px;}
header .inner > a {
  margin-right:30px;
}
</style>