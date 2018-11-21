const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

const makeHTTPRequest = (url, callback) => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(xhr.responseText)
    }
  }

  xhr.send()
}

const getUrlFromJSON = (json, callback) => {
  const nextUrl = JSON.parse(json).url
  callback(nextUrl)
}

makeHTTPRequest('http://localhost:8001/library', json => {
  getUrlFromJSON(json, url => {
    makeHTTPRequest(url, json => {
      getUrlFromJSON(json, url => {
        makeHTTPRequest(url, json => {
          console.log(json)
        })
      })
    })
  })
})




