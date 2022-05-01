function watchUrlToId(url) {
    url = new URL(url);
    if (!url.hostname.endsWith("youtube.com")) {
        return;
    }
    return url.searchParams.get("v");
}
/**
  * Get the play/pause button and click it to pause the active video
  */
function pause(tab) {
    // This is just a placeholder for now.
    // In the future the video of tab should be paused
    return
}

function createNewEmbedTab(activeTab, url) {
    activeTab = activeTab[0];
    var isMuted = false;
    if (activeTab.mutedInfo) {
        isMuted = activeTab.mutedInfo.muted;
    }
    // If the video in the current tab is audible playing, hit k to pause it.
    if (activeTab.audible && !isMuted) {
        pause(activeTab);
    }
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
function handleContext(obj, tab) {
    createNewEmbedTab([tab], obj.linkUrl);
}

// Handle Action in Toolbar
browser.pageAction.onClicked.addListener(handleToolbar);
// Handle Action on Rightclick
browser.contextMenus.create({
    id: "context-embed",
    title: browser.i18n.getMessage("contextMenuEmbed"),
    contexts: ["link"],
}, () => {});
browser.contextMenus.onClicked.addListener(handleContext);
