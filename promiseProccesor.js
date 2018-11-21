const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

const makeHTTPRequestPromise = (url) => {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        resolve(xhr.responseText)
      }
    }
    xhr.send()
  })
}

const getUrlFromJSONPromise = (json) => {
  return new Promise((resolve) => {
    const nextUrl = JSON.parse(json).url
    resolve(nextUrl)
  })
}

makeHTTPRequestPromise('http://localhost:8001/library')
  .then(json => getUrlFromJSONPromise(json))
  .then(url => makeHTTPRequestPromise(url))
  .then(json => getUrlFromJSONPromise(json))
  .then(url => makeHTTPRequestPromise(url))
  .then(json => console.log(json))
