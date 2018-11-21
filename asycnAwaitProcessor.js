const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

const makeHTTPRequest = (url) => {
  return new Promise((resolve => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        resolve(xhr.responseText)
      }
    }
    xhr.send()
  }))
}

const getUrlFromJSON = (json) => {
  return new Promise(resolve => {
    const nextUrl = JSON.parse(json).url
    resolve(nextUrl)
  })
}

const asyncGetBookJSON = async (url) => {
  const libraryJSON = await makeHTTPRequest(url)
  const bookshelfUrl = await getUrlFromJSON(libraryJSON.toString())
  const bookshelfJSON = await makeHTTPRequest(bookshelfUrl.toString())
  const bookUrl = await getUrlFromJSON(bookshelfJSON.toString())
  const bookJSON = await makeHTTPRequest(bookUrl.toString())
  console.log(bookJSON.toString())
}

asyncGetBookJSON('http://localhost:8001/library')