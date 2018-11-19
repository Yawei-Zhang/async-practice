const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

const getUrlFromJSON = (url, methodType, callback) => {
  const xhr = new XMLHttpRequest()
  xhr.open(methodType, url, true)
  let nextUrl = ''
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(JSON.parse(xhr.responseText).url)
    }
  }
  xhr.send()
}

const logJSON = (url, methodType, callback) => {
  const xhr = new XMLHttpRequest()
  xhr.open(methodType, url, true)
  let json = {}
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(JSON.parse(xhr.responseText))
    }
  }
  xhr.send()
}

const getJSON = (url, methodType, callback) => {
  callback(url, methodType, getJSON)
}

const libraryUrl = 'http://localhost:8001/library'
const methodType = 'GET'

getJSON(libraryUrl, methodType, (url) => {
  getUrlFromJSON (url, methodType, (url) => {
    getJSON(url, methodType, (url) => {
      getUrlFromJSON (url, methodType, (url) => {
        getJSON(url, methodType, (url) => {
          logJSON(url, methodType, console.log)
        })
      })
    })
  })
})