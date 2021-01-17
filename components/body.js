const links = require('../plugins/links')()
const fs = require('fs')
const site = JSON.parse(fs.readFileSync('site.json'))

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
  <body class="pa3">
    <div id="tags" class="
      tags fixed overflow-scroll
      top-0 h-50
      top-0-ns left-0-ns bottom-0-ns w-50-ns h-100-ns
      "
    >
      ${links.tags.map(tt => components.tag(tt)).join('')}
    </div>
    <div class="
      links fixed overflow-scroll
      bottom-0 h-50 pa2 lh-copy
      top-0-ns right-0-ns bottom-0-ns h-100-ns w-50-ns
      "
    >
      <span id="active-tags" class="active-tags"></span>
      <div id="links">
        ${links.links.reverse().map(ll => {
           return components.link(ll)
        }).join('')}
      </div>
    </div>
    <script>
      var links = ${JSON.stringify(links.links, null, 2)};
      var tags = ${JSON.stringify(links.tags, null, 2)};
    </script>
    <!-- <script src="./assets/scripts.js?v=${site.cache}"></script> -->
    <script src="./assets/thegoods.js?v=${site.cache}"></script>
  </body>
  `
}
