var links = window.links;
var tags = window.tags;
var activeTags = [];

var linksElement = document.querySelector("#links");
var tagsElement = document.querySelector("#tags");
var activeTagsElement = document.querySelector("#active-tags");

document.body.addEventListener('click', function(e){
    if(e.target.classList.contains('tag')){
      tagClickHandler(e);
    }
})

function tagClickHandler(e) {
  var tag = e.target.innerText;
  var index = activeTags.indexOf(tag);
  if(index < 0){
    activeTags.push(tag)
    e.target.classList.add("active")
  } else {
    activeTags.splice(index,1);
    e.target.classList.remove("active")
  }
  renderLinks();
}

const templates = {
  link: function (ll) {
    return `
      <a class="link" href="${ll.href}"
          data-tags="${ll.tags.join(',')}" title="${ll.title}" >
        ${_cfl(ll.title)} - ${ll.href.replace('https://','').replace('www.','').replace(/\/$/,'')}
      </a>
      `
  },
  tag: function(tt) {
    const href = tt;
    return `<button class="tag ${activeTags.indexOf(tt) != -1 ? "active" : ""}" data-href="${href}" tabindex="0">${tt}</button>`
  }
}

function renderLinks () {
  lll = activeTags.length ? filterLinks(activeTags) : links;
  activeTagsElement.innerHTML = activeTags.join(" and ")
  // lll = searchLinks(lll);
  linksElement.innerHTML = "";
  lll.forEach((link, i) => {
    linksElement.innerHTML += templates.link(link)
  });
}

function renderTags (filter) {
  ttt = filter ? filterTags(filter) : tags;
  tagsElement.innerHTML = "";
  ttt.forEach((tag, i) => {
    tagsElement.innerHTML += templates.tag(tag)
  });
}

function filterLinks (filters) {
  return links.filter(ll => {
    var isMatched = true;
    for(var i = 0; i < filters.length; i++){
      if( ll.tags.indexOf(filters[i]) < 0 ) {
        isMatched = false;
      }
    }
    return isMatched
  })
}

function filterTags (filter) {
  return tags.filter(tt => {
    return tt.includes(filter)
  })
}

function _cfl(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

renderLinks();
renderTags();
