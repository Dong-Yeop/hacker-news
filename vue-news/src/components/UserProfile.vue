<template>
  <div class="user-container">
    <div>
      <i class="fa-solid fa-user"></i>
    </div>
    <div class="user-description">
      <slot name="username"></slot>
      <div class="created">
        <slot name="created"></slot>
        <slot name="karma"></slot>
      </div>
    </div>
    <slot name="about"></slot>
  </div>
</template>

<script>
export default {
  props: {
    info: Object
  },
}
</script>

<style scoped>
.user-container {
  max-width:800px;
  margin:0 auto;
  display:flex;
  align-items:center;
  flex-wrap: wrap;
  padding:25px 4%;
  background:#fff;
  color:#34495e;
}
.fa-user {
  font-size:3.5rem;
}
.user-description {
  padding-left:20px;
}
.user-description h2 {
  font-size:22px;
  margin:0;
}
.created {
  font-size:15px;
  margin-top:18px;
}
.created span {
  display:block;
  margin-bottom:2px;
}
.created span i {
  font-style: normal;
  min-width:60px;
  display:inline-block;
}
.about {
  width:100%;
  font-size:14px; 
  line-height:140%;
  margin-top:10px;
}
</style>