chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

        if (request.message === "clicked_feedly_unique") {

            var uniqueTitles = new Array();
            var unreadItemsOnPage = document.getElementsByClassName("entry--unread");
            var unreadItemsIndex = 0;

            function continueProcessing() {

                for (unreadItemsIndex; unreadItemsIndex < unreadItemsOnPage.length; unreadItemsIndex++) {

                    if (unreadItemsOnPage[unreadItemsIndex].getElementsByClassName("entry__title")[0] != null) {
                        var currentTitle = unreadItemsOnPage[unreadItemsIndex].getElementsByClassName("entry__title")[0].innerHTML.trim().toLowerCase();
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
                            unreadItemsOnPage[unreadItemsIndex].getElementsByClassName("EntryHideButton icon")[0].click();
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