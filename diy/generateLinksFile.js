const path = require('path')
const fs = require('fs')
require('dotenv').config()

console.log("This is a quick and dirty file for making the lists csv from the are.na channel -", process.env.CHANNEL_SLUG, "!!!!!!")

const Arena = require("are.na");
const arena = new Arena();

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
