<template>
  <div class="item-container">
    <div class="info">
      <h2>{{ fetchedItem.title }}</h2>
      <small>
        {{ fetchedItem.score }} points | by
        <router-link v-bind:to="`/user/${fetchedItem.by}`" class="link-text">
          {{ fetchedItem.by }}
        </router-link> |
        {{ fetchedItem.time | timeAgo }} ago
      </small>
      <p v-html="fetchedItem.text"></p>
    </div>
  </div>
</template>

<script>
import { timeAgo } from '../utils/filters.js';
import { mapGetters } from 'vuex';
import bus from '../utils/bus';

export default {
  computed: {
    ...mapGetters(['fetchedItem'])
  },
  mounted() {
    bus.$emit('end:spinner');
  },
  filters: {
    timeAgo,
  }
}
</script>

<style scoped>
.item-container {
  max-width:800px;
  margin:0 auto;
  background:#fff;
  box-shadow: 0 2px 5px 0 rgb(0,0,0,.08);
  padding: 25px 4%;
}
.info h2 {
  margin:0;
  color:#34495e;
  margin-bottom:6px;
  font-size:22px;
}
.info small {
  font-size:15px;
  color:#828282;
}
.info small a {
  color:inherit;
}
.info small a:hover {color:#42b883;}
.info p {
  font-size:16px;
  line-height: 160%;
  margin-top:20px;
}
</style>