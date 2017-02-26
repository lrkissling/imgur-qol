const css_hidden = ".post-header.fixed {visibility: hidden}";
const target = "*://imgur.com/*"

/*
Inserts css to the appropriate tab to hide the post header.
*/
function hidePostHeader(responseDetails) {
    browser.tabs.insertCSS(responseDetails.tabId, {code: css_hidden});
}

/*
Calls hidePostHeader upon completion of page load for
imgur.com/a/* urls.
*/
browser.webRequest.onCompleted.addListener(
  hidePostHeader,
  {urls: [target]}
);
