import axios from 'axios';

const config = {
  baseUrl: 'https://api.hnpwa.com/v0/',
}

function fetchNewsList() {
  // ex5 
  // return axios.get(config.baseUrl + 'news/1.json'); 

  // ex6 
  return axios.get(`${config.baseUrl}news/1.json`); 
}

function fetchJobsList() {
  return axios.get(`${config.baseUrl}jobs/1.json`); 
}

async function fetchAskList() {
  try {
    // return await axios.get(`${config.baseUrl}ask/1.json`);
    const response = await axios.get(`${config.baseUrl}ask/1.json`);
    return response;
  } catch (error) {
    console.log(error);
  }
}

function fetchList(pageName) {
  return axios.get(`${config.baseUrl}${pageName}/1.json`);
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