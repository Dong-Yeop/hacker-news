import { fetchList, fetchUserInfo, fetchItemInfo, fetchGet } from '../api/index.js';

export default {
  async FETCH_NEWS({ commit }, pageName) {
    const response = await fetchList(pageName);
    const response2 = await fetchGet(pageName);
    commit('SET_NEWS', response);
    commit('SET_LIST_ID', response2);
    return response;
  },
  async FETCH_ASK({ commit }, pageName) {
    const response = await fetchList(pageName);
    const response2 = await fetchGet(pageName);
    commit('SET_ASK', response);
    commit('SET_LIST_ID', response2);
    return response;
  },
  async FETCH_JOBS({ commit }, pageName) {
    const response = await fetchList(pageName);
    const response2 = await fetchGet(pageName);
    commit('SET_JOBS', response);
    commit('SET_LIST_ID', response2);
    return response;
  },
  FETCH_USER({ commit }, name ){
    return fetchUserInfo(name)
      .then( ({data}) => {
        commit('SET_USER', data);
      })
      .catch(error => {
        console.log(error)
      });
  },
  FETCH_ITEM({ commit }, id){
    return fetchItemInfo(id)
      .then( ({data}) => {
        commit('SET_ITEM', data);
      })
      .catch(error => {
        console.log(error)
      });
  },
}