chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
        console.log(tabId, changeInfo.url, tab);
        if (!tab.url.startsWith('https://www.youtube.com/watch?v=')) {
            return;
        }
        const url = new URL(tab.url);
        const videoID = url.searchParams.get('v');
        const data = {
            videoID: videoID,
        }
        console.log(data);
        fetch('http://localhost:9000/watch',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
                keepalive: true
            }).then((response) => {
            console.log(response);
            }).catch((e) => {
                console.log(e);
        });
        setTimeout(function () {
            chrome.tabs.get(tabId, function (tab) {
                if (!tab.audible) {
                    return;
                }
                chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    func: function () {
                        console.log('click button play');
                        document.querySelector('.ytp-play-button').click();
                    }
                });
            });
        }, 5000);
    }
});
