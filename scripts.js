/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "duckduckgo"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"WlsJ8BcdgzJ5o4DC","label":"reddit","bookmarks":[{"id":"3BzdunAQJDG7GgTz","label":"r/startpages","url":"https://www.reddit.com/r/unixporn/"},{"id":"V0kGrOXU1lePli7m","label":"r/Fing memes","url":"https://www.reddit.com/r/FingMemes/"},{"id":"edyf8lez8pbwQqDW","label":"r/programming","url":"https://www.reddit.com/r/programming/"}]},{"id":"HDvGTIA9nIsTjnWa","label":"Social","bookmarks":[{"id":"5N9K9n5b1HAyQZv6","label":"Whatsapp","url":"https://web.whatsapp.com/"},{"id":"vDxHTtYt8np05LLz","label":"Github","url":"https://github.com"},{"id":"ND4CLvVU8gk6QEdY","label":"4chan","url":"https://www.4channel.org/"}]},{"id":"BtMAA0BwIXn80GZ3","label":"Media","bookmarks":[{"id":"IBrTbZLaT2bdXImR","label":"Youtube","url":"https://www.youtube.com"},{"id":"eV9N9s60Su6lXEFc","label":"Aniwatch","url":"https://www.aniwatch.to/home"},{"id":"ztl4HDRD568HJAAA","label":"Netflix","url":"https://www.netflix.com"}]},{"id":"FdgD5AG54qrWEG4H","label":"University","bookmarks":[{"id":"ACiNRFgomCM9bCa2","label":"Student Panel","url":"https://iums.kuk.ac.in/aflsDashBoard.htm"}]},{"id":"vW9g277JRuKKZmRj","label":"Music","bookmarks":[{"id":"dxa3Sc3VTr21eYS5","label":"Spotify","url":"https://www.spotify.com"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
