import { fetchNewsList, fetchUserInfo, fetchItemInfo, fetchList } from '../api/index.js';

export default {
  async FETCH_NEWS({ commit },) {
    const response = await fetchNewsList();
    commit('SET_NEWS', response);
    return response;
  },
  // async FETCH_NEWS({ commit }, pageName) {
  //   const response = await fetchList(pageName);
  //   commit('SET_NEWS', response.data);
  //   return response;
  // },
  async FETCH_ASK({ commit }, pageName) {
    const response = await fetchList(pageName);
    commit('SET_ASK', response.data);
    return response;
  },
  async FETCH_JOBS({ commit }, pageName) {
    const response = await fetchList(pageName);
    commit('SET_JOBS', response.data);
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
  // async FETCH_LIST({ commit }, pageName) {
  //   const response = await fetchList(pageName);
  //   commit('SET_LIST', response.data);
  //   return response;
  // }
}