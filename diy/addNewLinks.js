const path = require('path')
const fs = require('fs')
require('dotenv').config()

console.log("This is a quick and dirty file for modifying the are.na channel -", process.env.CHANNEL_SLUG, "!!!!!!")

const Arena = require("are.na");
const arena = new Arena({accessToken: process.env.ACCESS_TOKEN});
const links = fs.readFileSync(path.join(__dirname, '../newlinks.csv'), 'utf8')

let links_ = links.split("\n").filter(a => a.length).map(ll => {
  const r = /\"(.*?)\"/g
  const mm =  ll.match(r).map(m => m.replace(/\"/g,""))
  return {
    source: mm[0],
    contents: mm[1] + ' | Tags: ' +  mm[2].trim()
  }
})


// This is to loop through the links and create blocks.
links_.map(ll => {
  arena.block().create(process.env.CHANNEL_SLUG, {
    content: ll.source,
    source: ll.source,
    description: ll.contents
  })
  console.log("created block for", ll.source)
})
