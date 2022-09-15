<template>
  <div class="container" @scroll="onScroll">
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
            {{ item.score }} points |
            {{ item.time | timeAgo }} ago | by
            <router-link v-bind:to="`/user/${item.by}`" class="link-text">
              {{ item.by }}
            </router-link>
          </small>
          <small class="link-text" v-else>
            {{ item.time | timeAgo }} ago 
            <span v-if="item.url"> | {{ item.url | host }}</span>
          </small>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { timeAgo, host } from '../utils/filters.js';
import axios from 'axios';
import bus from '../utils/bus';

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
    infiniteHandler() {
      const name = this.$route.name;
      if (name === 'new') {
        console.log(name)
      } else if (name === 'ask') {
        console.log(name)
      } else if (name === 'job') {
        console.log(name)
      }
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
  overflow:auto;
  height:calc(100vh - 60px);
  background:#F2F3F5;
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
}
.points {
  width:80px; height:60px;
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
</style>