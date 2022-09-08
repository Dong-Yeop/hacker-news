import axios from 'axios';

const config = {
  baseUrl: 'https://hacker-news.firebaseio.com/v0/',
}

async function fetchGetNews(pageName) {
  try {
    let itemId = [];
    const response = await axios.get(`${config.baseUrl}${pageName}stories.json?print=pretty`);
    itemId = response.data.slice(0,20);
    return itemId;
  } catch (error) {
    console.log(error);
  }
}

async function fetchNewsList(pageName) {
  let items = [];
  fetchGetNews(pageName).then(itemId => {
    itemId.forEach(id => {
      axios.get(`${config.baseUrl}item/${id}.json`).then( res => {
        items.push(res.data);
      });
    });
  });
  return items;
}

async function fetchJobsList() {
  try {
    const response = await axios.get(`${config.baseUrl}jobs/1.json`);
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function fetchAskList() {
  try {
    const response = await axios.get(`${config.baseUrl}ask/1.json`);
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function fetchList(pageName) {
  try {
    const response = await axios.get(`${config.baseUrl}${pageName}/1.json`);
    return response;
  } catch (error) {
    console.log(error);
  }
}

function fetchUserInfo(username) {
  return axios.get(`${config.baseUrl}user/${username}.json`);
}

function fetchItemInfo(id) {
  return axios.get(`${config.baseUrl}item/${id}.json`);
}


export {
  fetchNewsList,
  fetchJobsList,
  fetchAskList,
  fetchList,
  fetchUserInfo,
  fetchItemInfo,
  fetchGetNews,
}