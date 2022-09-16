<template>
  <div class="container" @scroll="onScroll" ref="scroll-list">
    <ul class="news-list" :class="className">
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
          <small class="link-text" v-if="item.type === 'story'">
            {{ item.score }} points | by
            <router-link v-bind:to="`/user/${item.by}`" class="link-text">
              {{ item.by }}
            </router-link> |
            {{ item.time | timeAgo }} ago
          </small>
          <small class="link-text" v-else>
            {{ item.time | timeAgo }} ago 
            <span v-if="item.url"> | {{ item.url | host }}</span>
          </small>
        </div>
      </li>
    </ul>
    <i class="fa-regular fa-circle-up top" :class="className" @click="scrollMoveTop"></i>
  </div>
</template>

<script>
import { timeAgo, host } from '../utils/filters.js';
import axios from 'axios';

const baseUrl = 'https://hacker-news.firebaseio.com/v0/';

export default {
  data() {
    return {
      pageBefore: 20,
      pageAfter: 40,
      list: [],
    }
  },
  computed: {
    listItems() {
      const name = this.$route.name;
      if (name === 'new') {
        return this.$store.state.new;
      } else if (name === 'ask') {
        return this.$store.state.ask;
      } else {
        return this.$store.state.job;
      }
    },
    className() {
      return this.$route.name;
    },
  },
  methods: {
    scrollMoveTop() {
      this.$refs["scroll-list"].scroll({ top: 0, behavior: "smooth" });
    },
    onScroll(e) {
      const { scrollHeight, scrollTop, clientHeight } = e.target;
      const isAtTheBottom = scrollHeight === scrollTop + clientHeight;
      setTimeout(() => {if (isAtTheBottom) this.handleLoadMore();},150);
    },
    handleLoadMore() {
      const name = this.$route.name;
      const dln = this.$store.state.listId.length;
      let dn = this.$store.state.new.length;
      let setName;

      if (name === 'new') {
        dn = this.$store.state.new.length;
        setName = 'SET_PUSH_NEWS';
      } else if (name === 'ask') {
        dn = this.$store.state.ask.length;
        setName = 'SET_PUSH_ASK';
      } else if (name === 'job') {
        dn = this.$store.state.job.length;
        setName = 'SET_PUSH_JOBS';
      }

      if(dln > dn){
        
        this.$store.state.listId.slice(this.pageBefore, this.pageAfter).forEach(id => {
          axios.get(`${baseUrl}item/${id}.json`).then( ({data}) => {
            this.$store.commit(setName, data);
          });
        });

        this.pageBefore += 20;
        this.pageAfter += 20;
      } else {
        console.log('end');
      }
    }
  },
  filters: {
    host,
    timeAgo,
    indexPlus(tn) {
      return tn + 1;
    }
  }
}
</script>

<style scoped>
.container {
  scroll-behavior: smooth;
  overflow:auto;
  height:calc(100vh - 60px);
  padding-top:20px;
  padding-bottom:20px;
}
.news-list {
  max-width:800px;
  margin:0 auto;
  background:#fff;
  box-shadow: 0 0 20px 0px rgb(0,0,0,.08);
}
.post {
  list-style:none;
  display:flex;
  align-items:center;
  border-bottom:1px solid #eee;
  padding:3px 10px 3px 0;
}
.points {
  flex-shrink: 0;
  width:10%; height:60px;
  max-width:80px;
  min-width:50px;
  display:flex;
  align-items:center;
  justify-content:center;
  color:#42b883;
  font-weight:700;
}
.news-list.ask .points,
.news-list.ask a:hover {color:#f60}
.news-list.job .points,
.news-list.job a:hover {color:#990000}
.news-title {
  margin:0;
}
.link-text {
  color:#020202;
}
.link-text a:hover {
  color:#42b883;
}
.top {
  position:fixed; bottom:40px; right:40px;
  color:#42b883;
  font-size:40px;
  cursor:pointer;
  transition:color 1s ease;
}
.top.ask {color:#f60;}
.top.job {color:#990000;}

@media screen and (max-width:1024px){
  .container {
    padding-left:15px;
    padding-right:15px;
  }
}
</style>