const path = require('path')
const fs = require('fs')
require('dotenv').config()

console.log("This is a quick and dirty file for modifying the are.na channel -", process.env.CHANNEL_SLUG, "!!!!!!")

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
//

let blocks = []
let pp = 1
let per = 100

function getBlocks(){
  arena
    .channel(process.env.CHANNEL_SLUG)
    .contents({page: pp, per: per})
    .then(contents => {
      contents.map(cc => {
        blocks.push(cc);
      })
      console.log("per:", per)
      console.log("blocks:", contents.length)
      if(contents.length < per){
        writeNewCSV(blocks);
      } else {
        pp ++
        getBlocks()
      }
  })
  .catch(err => console.log(err));
}

function writeNewCSV(aa){

  let csv = aa.map(b => {

    if(b.source && b.source.url){
      let tags = b.description.split(" | Tags:")[1].trim()
      let desc = b.description.split(" | Tags:")[0]
      return `"${b.source.url}","${desc}","${tags}"`
    } else {
      console.log("No usable data for this block:", b);
    }
  })
  fs.writeFileSync("../links.csv",csv.join("\n"),"utf8")
}

getBlocks();



// We are going to want to pull all contents from the channel down
// to create a new links.csv. This will require a loop through each channel page
// Then do something like
// if (data.length < perPage) {
//                             setupContent(data)
//                             conclude()
//                             page = false
//                             return false
//
// refer to https://scoby.page/

// This is to loop through the links.csv and create blocks.
// We wont need this again unless we scorched-earth the current channel
// links_.map(ll => {
//   arena.block().create(process.env.CHANNEL_SLUG, {
//     content: ll.source,
//     source: ll.source,
//     description: ll.contents
//   })
//   console.log("created block for", ll.source)
// })
