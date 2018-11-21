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

const bookJSONGenerator = function* () {
  const libraryUrl = 'http://localhost:8001/library'
  const libraryJSON = yield makeHTTPRequestPromise(libraryUrl)
  const bookshelfUrl = yield getUrlFromJSONPromise(libraryJSON)
  const bookshelfJSON = yield makeHTTPRequestPromise(bookshelfUrl)
  const bookUrl = yield getUrlFromJSONPromise(bookshelfJSON)
  const bookJSON = yield makeHTTPRequestPromise(bookUrl)
  console.log(bookJSON)
}

const controllor = (genFun) => {
  const gen = genFun()

  const next = (data) => {
    var result = gen.next(data);
    if (result.done) return;
    result.value.then(data => next(data))
  }

  next();
}

controllor(bookJSONGenerator)