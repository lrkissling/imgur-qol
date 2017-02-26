const css_hidden = ".post-header.fixed {visibility: hidden}";
const css_visible = ".post-header.fixed {visibility: visible}";
const TITLE_HIDDEN = "Hidden";
const TITLE_VISIBLE = "Visible";
const target = "*://imgur.com/a/*"

function toggleCSS(tab) {

  function gotTitle(title) {
      if (title === TITLE_HIDDEN) {
        browser.pageAction.setIcon({tabId: tab.id, path: "icons/on.svg"});
        browser.pageAction.setTitle({tabId: tab.id, title: TITLE_VISIBLE});
        browser.tabs.removeCSS({code: css_visible});
        browser.tabs.insertCSS({code: css_hidden});
      } else {
        browser.pageAction.setIcon({tabId: tab.id, path: "icons/off.svg"});
        browser.pageAction.setTitle({tabId: tab.id, title: TITLE_HIDDEN});
        browser.tabs.removeCSS({code: css_hidden});
        browser.tabs.insertCSS({code: css_visible});
      }
  }

  var gettingTitle = browser.pageAction.getTitle({tabId: tab.id});
  gettingTitle.then(gotTitle);
}


/*
Initialize the page action: set icon and title, then show.
*/
function initializePageAction(responseDetails) {
    browser.pageAction.setIcon({tabId: responseDetails.tabId, path: "icons/off.svg"});
    browser.pageAction.setTitle({tabId: responseDetails.tabId, title: TITLE_HIDDEN});
    browser.pageAction.show(responseDetails.tabId);
}

/*
Calls initializePageAction upon completion of page load for
imgur.com/a/* urls.
*/
browser.webRequest.onCompleted.addListener(
  initializePageAction,
  {urls: [target]}
);

/*
Toggle CSS when the page action is clicked.
*/
browser.pageAction.onClicked.addListener(toggleCSS);
