const css_hidden = ".post-header.fixed {visibility: hidden}";
const css_visible = ".post-header.fixed {visibility: visible}";
const TITLE_UNFIXED = "Unfixed";
const TITLE_FIXED = "Fixed";
const APPLICABLE_PROTOCOLS = ["http:", "https:"];

function toggleCSS(tab) {

  function gotTitle(title) {
      if (title === TITLE_UNFIXED) {
        browser.pageAction.setIcon({tabId: tab.id, path: "icons/on.svg"});
        browser.pageAction.setTitle({tabId: tab.id, title: TITLE_FIXED});
        browser.tabs.removeCSS({code: css_visible});
        browser.tabs.insertCSS({code: css_hidden});
      } else {
        browser.pageAction.setIcon({tabId: tab.id, path: "icons/off.svg"});
        browser.pageAction.setTitle({tabId: tab.id, title: TITLE_UNFIXED});
        browser.tabs.removeCSS({code: css_hidden});
        browser.tabs.insertCSS({code: css_visible});
      }
  }

  var gettingTitle = browser.pageAction.getTitle({tabId: tab.id});
  gettingTitle.then(gotTitle);
}

/*
Returns true only if the URL's protocol is in APPLICABLE_PROTOCOLS.
*/
function protocolIsApplicable(url) {
  var anchor =  document.createElement('a');
  anchor.href = url;
  return APPLICABLE_PROTOCOLS.includes(anchor.protocol);
}

/*
Initialize the page action: set icon and title, then show.
Only operates on tabs whose URL's protocol is applicable.
*/
function initializePageAction(tab) {
  // if (APPLICABLE_URI.match(url)) {
  if (protocolIsApplicable(tab.url)) {
    browser.pageAction.setIcon({tabId: tab.id, path: "icons/off.svg"});
    browser.pageAction.setTitle({tabId: tab.id, title: TITLE_UNFIXED});
    browser.pageAction.show(tab.id);
  }
}

/*
When first loaded, initialize the page action for all tabs.
*/
var gettingAllTabs = browser.tabs.query({});
gettingAllTabs.then((tabs) => {
  for (tab of tabs) {
    initializePageAction(tab);
  }
});

/*
Each time a tab is updated, reset the page action for that tab.
*/
browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
  initializePageAction(tab);
});

/*
Toggle CSS when the page action is clicked.
*/
browser.pageAction.onClicked.addListener(toggleCSS);
