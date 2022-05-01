function watchUrlToId(url) {
    url = new URL(url);
    if (!url.hostname.endsWith("youtube.com")) {
        return;
    }
    return url.searchParams.get("v");
}
function createNewEmbedTab(activeTab, url) {
    activeTab = activeTab[0];
    if (!url) {
        url = activeTab.url;
    }
    let videoId = watchUrlToId(url);
    if (!videoId) {
        throw "Current URL is not valid."
    }
    let newTab = browser.tabs.create({
        openerTabId: activeTab.id,
        index: activeTab.index + 1,
        url: `https://www.youtube.com/embed/${videoId}`
    });
    newTab.then(info, err);
}

function info(txt) {
    console.log(txt);
}
function err(txt) {
    alert (txt);
    console.error(txt);
}


function handleToolbar() {
    browser.tabs.query({active: true, currentWindow: true})
        .then(createNewEmbedTab)
        .catch(alert);
}

// Handle Action in Toolbar
browser.browserAction.onClicked.addListener(handleToolbar);
// Handle Action on Rightclick
browser.contextMenus.create({
    id: "Open in an embed",
    title:
})
