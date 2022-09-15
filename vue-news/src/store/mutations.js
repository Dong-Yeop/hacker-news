export default {
  SET_NEWS(state, data){
    state.new = data;
  },
  SET_ASK(state, data){
    state.ask = data;
  },
  SET_JOBS(state, data){
    state.job = data;
  },
  SET_LIST_ID(state, data){
    state.listId = data;
  },
  SET_PUSH_NEWS(state, data){
    state.new.push(data);
  },
  SET_PUSH_ASK(state, data){
    state.ask.push(data);
  },
  SET_PUSH_JOBS(state, data){
    state.job.push(data);
  },
  SET_USER(state, user){
    state.user = user;
  },
  SET_ITEM(state, item){
    state.item = item;
  },
}