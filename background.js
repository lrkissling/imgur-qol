const css_hidden = ".post-header.fixed {visibility: hidden}";
const target = "*://imgur.com/*"

/**
* Inserts css to the appropriate tab to hide the post header.
*/
function hidePostHeader(responseDetails) {
  // Get user option for whether or not to hide post header
  browser.storage.sync.get(['hide_post_header'], function(item) {
    // If no option set, defaults to true
    if (item.hide_post_header == null || item.hide_post_header) {
      browser.tabs.insertCSS(responseDetails.tabId, {code: css_hidden});
    }
  });
}

// Calls hidePostHeader upon completion of page load for imgur.com/* urls.
browser.webRequest.onCompleted.addListener(hidePostHeader,{urls: [target]});
