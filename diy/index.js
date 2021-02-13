const path = require('path')
const fs = require('fs')
require('dotenv').config()

const Arena = require("are.na");
const arena = new Arena({accessToken: process.env.ACCESS_TOKEN});

// const links = fs.readFileSync(path.join(__dirname, '../links.csv'), 'utf8')
//
// let links_ = links.split("\n").filter(a => a.length).map(ll => {
//   const r = /\"(.*?)\"/g
//   const mm =  ll.match(r).map(m => m.replace(/\"/g,""))
//   return {
//     source: mm[0],
//     contents: mm[1] + ' | Tags: ' +  mm[2].trim()
//   }
// })

var ll = arena.channel("louis-links")
ll.contents().then(contents => {contents.map(content => console.log(content.content))})
