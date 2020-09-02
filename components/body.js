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
    <div class="
      tags
      fixed
      top-0 h-50
      top-0-ns left-0-ns bottom-0-ns w-50-ns h-100-ns
      overflow-scroll
      "
    >
      ${links.tags.map(tt => components.tag(tt)).join('')}
    </div>
    <div class="
      links
      fixed pa2
      bottom-0 h-50
      top-0-ns right-0-ns bottom-0-ns h-100-ns w-50-ns
      lh-copy
      overflow-scroll
      "
    >
      <span id="active-tags" class="active-tags"></span>
      ${links.links.map(ll => {
         return components.link(ll)
      }).join('')}
    </div>
    <script src="./assets/scripts.js?v=${site.cache}"></script>
  </body>
  `
}
