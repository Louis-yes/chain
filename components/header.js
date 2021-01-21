const fs = require('fs')
const site = JSON.parse(fs.readFileSync('site.json'))

module.exports = header

function header() {
  return `
      <header>
        <h1 class="title">Louis links</h1>
      </header>
      <section class="description">
        <p class="about">These links are things I’ve found online that I liked</p>
      </section>
  `
}
