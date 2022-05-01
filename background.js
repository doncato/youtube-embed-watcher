function watchUrlToId(url) {
    url = new URL(url);
    if (!url.hostname.endsWith("youtube.com")) {
        return;
    }
    return url.searchParams.get("v");
}

function info(txt) {
    console.log(txt);
}
function err(txt) {
    alert (txt);
    console.error(txt);
}

function createNewEmbedTab(activeTab) {
    activeTab = activeTab[0];
    let videoId = watchUrlToId(activeTab.url);
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

function handleEmbed() {
    browser.tabs.query({active: true, currentWindow: true})
        .then(createNewEmbedTab)
        .catch(alert);
}

browser.browserAction.onClicked.addListener(handleEmbed);
