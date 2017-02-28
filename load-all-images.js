function onError(error) {
  console.log(`Error: ${error}`);
}

function onGot(item) {
  if (item.load_all_images == null || item.load_all_images) {
    // Click the "Load All Images" button if it exists.
    var elements = document.querySelectorAll('.post-loadall.btn.btn-action');
    if (elements.length > 0) elements[0].click();
  }
}

// Check user preferences for load_all_images option
var getting = browser.storage.sync.get("load_all_images");
getting.then(onGot, onError);
