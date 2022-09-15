import axios from 'axios';

const config = {
  baseUrl: 'https://hacker-news.firebaseio.com/v0/',
}

async function fetchGet(pageName) {
  try {
    let itemId = [];
    const response = await axios.get(`${config.baseUrl}${pageName}stories.json?print=pretty`);
    itemId = response.data;
    return itemId;
  } catch (error) {
    console.log(error);
  }
}

async function fetchList(pageName) {
  let items = [];
  fetchGet(pageName).then(itemId => {
    itemId.slice(0,20).forEach(id => {
      axios.get(`${config.baseUrl}item/${id}.json`).then( res => {
        items.push(res.data);
      });
    });
  });
  return items;
}

function fetchUserInfo(username) {
  return axios.get(`${config.baseUrl}user/${username}.json`);
}

function fetchItemInfo(id) {
  return axios.get(`${config.baseUrl}item/${id}.json`);
}


export {
  fetchList,
  fetchGet,
  fetchUserInfo,
  fetchItemInfo,
}