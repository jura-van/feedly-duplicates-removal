chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

        if (request.message === "clicked_feedly_unique") {

            var uniqueTitles = new Array();
            var unreadItemsOnPage = document.getElementsByClassName("unread");
            var unreadItemsIndex = 0;

            function continueProcessing() {

                for (unreadItemsIndex; unreadItemsIndex < unreadItemsOnPage.length; unreadItemsIndex++) {

                    if (unreadItemsOnPage[unreadItemsIndex].getAttribute("data-title") != null) {
                        var currentTitle = unreadItemsOnPage[unreadItemsIndex].getAttribute("data-title").trim().toLowerCase();
                        var existsAlready = false;

                        for (var j = 0; j < uniqueTitles.length; j++) {
                            if (uniqueTitles[j] == currentTitle) {
                                existsAlready = true;
                                break;
                            }
                        }

                        if (!existsAlready) {
                            uniqueTitles.push(currentTitle);
                        } else {
                            unreadItemsOnPage[unreadItemsIndex].getElementsByClassName("icon condensed-toolbar-icon icon-fx-cross-ios-sm-black")[0].click();
                            // do not send too many requests to Feedly at once - remove just approx. 8 links per second
                            setTimeout(continueProcessing, 125);
                            break;
                        }
                    }
                }
            }

            setTimeout(continueProcessing, 0);
        }
    }
);