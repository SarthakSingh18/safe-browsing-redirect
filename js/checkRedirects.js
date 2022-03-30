const https  = require('follow-redirects').https;
module.exports = {
  checkRedirects: (url) => {
    return new Promise((resolve, reject) => {
      try{
        let arr = url.split(" ");
        console.log(arr[0], arr[1]);
        https.get(`https://`+arr[0]+arr[1], response => {
          console.log(response.req._redirectable.Writable.redirectCount);
           resolve({
            "responseURL": response.responseUrl,
          });
        }).on('error', err => {
          console.error(err);
          reject({ "error": "some error occurred while checking for redirects" });
        });
      }
      catch(e){
        console.log(e);
        reject({"error":"some error occurred in checking redirects"});
      }
    })
  }
}