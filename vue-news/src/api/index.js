import axios from 'axios';

const config = {
  baseUrl: 'https://api.hnpwa.com/v0/',
  // baseUrl: 'https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty',
}

async function fetchGetNews() {
  try {
    let itemId = [];
    const response = await axios.get('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty');
    itemId = response.data;
    return itemId;
  } catch (error) {
    console.log(error);
  }
}

async function fetchNewsList() {
  let items = [];
  fetchGetNews().then(itemId => {
    itemId.forEach(id => {
      axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then( res => {
        items.push(res.data);
      });
    });   
  });
  console.log(items);
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
}