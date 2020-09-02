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

const fs = require('fs') // this is the node module for interacting with my local directories

const site = JSON.parse(fs.readFileSync('site.json'))

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

// as the name suggests, this writes the index.html
fs.writeFile('index.html', main(), 'utf8', function(){
  site.cache ++
  fs.writeFileSync('site.json', JSON.stringify(site), 'utf8')
  console.log('index.html written')
})
