/*
  Louis Links Page
  TODO

  - frontend
  - link of the day
  - color tags based on how often they're used
  - highlight links on tag hover

  - backend
  - write generator for subdirectories and include in build script
  - turn this into a template I can use for other sites
*/

const fs = require('fs') // this is the node module for interacting with my local directories

const site = JSON.parse(fs.readFileSync('site.json'))

const head = require('./components/head.js')
const body = require('./components/body.js')

function main () {
  return `
  <!DOCTYPE html>
  <html lang="en">
    ${head()}
    ${body()}
  </html>
  `
}

// this writes the index.html
fs.writeFile('index.html', main(), 'utf8', function(){
  site.cache ++
  fs.writeFileSync('site.json', JSON.stringify(site,null,2), 'utf8')
  console.log('index.html written')
})
