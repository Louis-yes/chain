const links = require('../plugins/links')()
const fs = require('fs')
const site = JSON.parse(fs.readFileSync('site.json'))

const footer = require('./footer.js')
const header = require('./header.js')

module.exports = body

function _cfl(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const components = {
  link: function (ll) {
      return `
        <a
          class="link"
          href="${ll.href}"
          title="${ll.title}"
          data-tags="${ll.tags.join(',')}">
          ${_cfl(ll.title)} - ${ll.href.replace('https://','').replace('www.','').replace(/\/$/,'')}
        </a>
      `
  },
  tag: function(tt) {
    const href = tt
    return `<a href="${href}" class="
      tag link
    ">${tt}</a>`
  }
}

function body () {
  return `
  <body class="">
    <main>
      ${header()}
      <section class="link-of-the-day">
         <!-- <p>Link of the day is: </p> -->
      </section>
      <section id="tags" class="
        tags
        "
      >
        ${links.tags.map(tt => components.tag(tt)).join('')}
      </section>
      <section class="
        links-section
        "
      >
        <label for="search" class="label search"> search </label><input type="text" name="search" id="search" />
        <label for"sort-by" class="label sort-by"> sort by </label>
        <select name="sort-by" id="sort-by" value="3">
          <option value="1">A-Z</option>
          <option value="2">Z-A</option>
          <option value="3" selected>newest</option>
          <option value="4">oldest</option>
          <option value="5">who cares</option>
        </select>
        <span id="active-tags" class="active-tags">${links.links.length} links</span>
        <div id="links" class="links">
          ${links.links.reverse().map(ll => {
             return components.link(ll)
          }).join('')}
        </div>
      </section>
      ${footer()}
    </main>
    <script>
      var links = ${JSON.stringify(links.links, null, 2)};
      var tags = ${JSON.stringify(links.tags, null, 2)};
    </script>
    <!-- <script src="./assets/scripts.js?v=${site.cache}"></script> -->
    <script src="./assets/thegoods.js?v=${site.cache}"></script>
  </body>
  `
}
