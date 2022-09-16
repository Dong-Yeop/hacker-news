<template>
  <div>
    <UserProfile :info="userInfo">
      <div slot="username"><h2>User : {{ userInfo.id }}</h2></div>
      <span slot="created"><i>Created:</i>{{ userInfo.created | timeAgo }} ago</span>
      <span slot="karma"><i>Karma:</i>{{ userInfo.karma }}</span>
      <p v-if="userInfo.about" v-html="userInfo.about" slot="about" class="about"></p>
    </UserProfile>
  </div>
</template>

<script>
import { timeAgo } from '../utils/filters.js';
import UserProfile from '../components/UserProfile.vue';
import bus from '../utils/bus';

export default {
  components: {
    UserProfile,
  },
  computed: {
    userInfo() {
      return this.$store.state.user;
    }
  },
  mounted() {
    bus.$emit('end:spinner');
  },
  filters: {
    timeAgo,
  }
}
</script>

<style>

</style>