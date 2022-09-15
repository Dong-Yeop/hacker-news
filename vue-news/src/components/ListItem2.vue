<template>
  <div class="list-container">
    <ul class="news-list" @scroll="handleNotificationListScroll">
      <li v-for="(item, index) in listItems" class="post" :key="index">
        <!-- 포인트 영역 -->
        <div class="points">
          {{ index | indexPlus }}
        </div>
        <!-- 기타 정보 영역 -->
        <div>
          <!-- 타이틀 영역 -->
          <p class="news-title">
            <template v-if="item.url">
              <a v-bind:href="item.url" target="_blank">
                {{ item.title }}
              </a>
            </template>
            <template v-else>
              <router-link v-bind:to="`/item/${item.id}`">
                {{ item.title }}
              </router-link>
            </template>
          </p>
          <small class="link-text">
            {{ item.score }} points |
            {{ item.time | timeAgo }} ago | by
            <router-link v-if="item.by" v-bind:to="`/user/${item.by}`" class="link-text">
              {{ item.by }}
            </router-link>
            <a :href="'http://' + item.domain" target="_blank" v-else>
              {{ item.domain }}
            </a>
          </small>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { timeAgo } from '../utils/filters.js';

export default {
  data() {
    return {
      pageBefore: 0,
      pageAfter: 20,
      page: 1,
    };
  },
  computed: {
    listItems() {
      const name = this.$route.name;
      if (name === 'new') {
        return this.$store.state.news;
      } else if (name === 'ask') {
        return this.$store.state.ask;
      } else {
        return this.$store.state.jobs;
      }
    },
  },
  created() {
    this.page = 1;
  },
  methods: {
    handleNotificationListScroll(e) {
      const { scrollHeight, scrollTop, clientHeight } = e.target;
      const isAtTheBottom = scrollHeight === scrollTop + clientHeight;
      // 일정 한도 밑으로 내려오면 함수 실행
      if (isAtTheBottom) {
        setTimeout(() => this.handleLoadMore(), 500);
      }
    },
    handleLoadMore() {
      console.log('hi');
      const name = this.$route.name;

      if (name === 'new') {
        this.$store.dispatch('FETCH_NEWS_PUSH', name);
      } else if (name === 'ask') {
        this.$store.dispatch('FETCH_NEWS_PUSH', name);
      } else if (name === 'job') {
        this.$store.dispatch('FETCH_NEWS_PUSH', name);
      }
    }
  },
  filters: {
    timeAgo,
    indexPlus(tn) {
      return tn + 1;
    }
  }
}
</script>

<style scoped>
.news-list {
  margin:0; padding:0;
  overflow:auto;
  height:calc(100vh - 40px);
  box-sizing:border-box;
}
.post {
  list-style:none;
  display:flex;
  align-items:center;
  border-bottom:1px solid #eee;
}
.points {
  width:80px; height:60px;
  display:flex;
  align-items:center;
  justify-content:center;
  color:#42b883;
}
.news-title {
  margin:0;
}
.link-text {
  color:#020202;
}
.link-text a:hover {
  color:#42b883;
}
</style>