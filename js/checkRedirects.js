const https  = require('follow-redirects').https;
module.exports = {
  checkRedirects: (url, protocol) => {
    return new Promise((resolve, reject) => {
      if (protocol == 'https') {
        https.get(`https://`+url, response => {
          console.log(response.headers);
          resolve({
            "responseURL": response.responseUrl,
          });
        }).on('error', err => {
          console.error(err);
          reject({ "error": "some error occured while checking for redirects" });
        });
      }
      else {
        http.get(url, response => {
          resolve({
            "responseURL": response.responseUrl,
            "cookies": response.headers['set-cookie'].length
          })
          console.log(response.headers['set-cookie'].length, response.responseUrl);
        }).on('error', err => {
          console.error(err);
          reject({ "error": "some error occured while checking for redirects" })
        });
      }
    })
  }
}