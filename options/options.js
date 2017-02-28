/**
* Save the checbox checked values to local storage
*/
function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    hide_post_header: document.querySelector("#cbox-post-header").checked,
    load_all_images: document.querySelector("#cbox-load-all-images").checked
  });
}

// Invoke saveOptions whenever a checkbox is changed
document.querySelector("#cbox-post-header").addEventListener("change", saveOptions);
document.querySelector("#cbox-load-all-images").addEventListener("change", saveOptions);

function restoreOptions() {
  /**
  * Set the checkbox according to user option, default to checked if null
  */
  function setHidePostHeader(result) {
    if (result.hide_post_header != null) {
      document.querySelector("#cbox-post-header").checked = result.hide_post_header;
    } else {
      document.querySelector("#cbox-post-header").checked = true;
    }
  }

  /**
  * Set the checkbox according to user option, default to checked if null
  */
  function setLoadAllImages(result) {
    if (result.load_all_images != null) {
      document.querySelector("#cbox-load-all-images").checked = result.load_all_images;
    } else {
      document.querySelector("#cbox-load-all-images").checked = true;
    }
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  // Retrieve promises of options from local storage and send to handler functions
  var getting = browser.storage.sync.get("hide_post_header");
  getting.then(setHidePostHeader, onError);

  getting = browser.storage.sync.get("load_all_images");
  getting.then(setLoadAllImages, onError);
}

// Populate the options page with stored settings after DOM is loaded
document.addEventListener("DOMContentLoaded", restoreOptions);
