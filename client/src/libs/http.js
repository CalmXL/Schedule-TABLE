import axios from 'axios';
import qs from 'qs';

axios.defaults.baseURL = 'http://localhost:3000';

export function httpGet (url) {
  return new Promise((resolve, reject) => {
    axios(url).then((res) => {
      const { code, msg, data } = res.data;

      if (code === 0) {
        resolve(data);
      } else {
        reject(msg);
      }
        
    }).catch((err) => {
      reject(err);
    })
  })
} 

export function httpPost (url, body) {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(body)).then((res) => {
      const { code, msg, data } = res.data;

      if (code === 0) {
        resolve(data);
      } else {
        reject(msg);
      }
    }).catch((err) => {
      reject(err);
    })
   
  }) 
}