export default {
  SET_NEWS(state, news){
    state.news = news;
  },
  SET_JOBS(state, data){
    state.jobs = data;
  },
  SET_ASK(state, ask){
    state.ask = ask;
  },
  SET_USER(state, user){
    state.user = user;
  },
  SET_ITEM(state, item){
    state.item = item;
  },
  SET_LIST(state, list){
    state.list = list;
  },
  // async SET_NEWS_PUSH(state, news){
  //   let arr = news;
  //   let obj = {};
  //   await arr.forEach((element, index) => {
  //     obj['key' + index] = element;
  //   });
  //   state.news.push(obj);
  // },
}