/*
  Louis Links Page
  TODO
  - frontend
  - rewrite front-end js to be a little cleaner
  - write styling properly, in css
  - add some info to page, add some ｡･:*:･ﾟ★,｡･:*:･ﾟ☆ d e s i g n ｡･:*:･ﾟ★,｡･:*:･ﾟ☆

  - backend
  - write generator for subdirectories and include in build script
  - create basic cachebusting
  - turn this into a template I can use for other sites
*/

const fs = require('fs')

const head = require('./components/head.js')
const footer = require('./components/footer.js')
const body = require('./components/body.js')

function main () {
  return `
  <!DOCTYPE html>
  <html lang="en">
    ${head()}
    ${body()}
    ${footer()}
  </html>
  `
}

fs.writeFile('index.html', main(), 'utf8', function(){
  console.log('index.html written')
})
