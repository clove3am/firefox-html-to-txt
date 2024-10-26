// HTML to TXT: https://www.w3.org/services/html2txt
// Example code: https://github.com/MitchellMarkGeorge/EmailThisPage
// Text icons created by edt.im - Flaticon.com

browser.runtime.onInstalled.addListener(function ({ reason }) {
	if (reason === "install") {
		createContextMenu();
	} else {
		browser.menus.removeAll().then(() => {
			createContextMenu();
		});
	}
});

browser.menus.onClicked.addListener(function (info, tab) {
	if (info.menuItemId === "html2txtThisPage" && info.pageUrl) {
		html2txtLink(info.pageUrl, tab.index);
	} else if (info.menuItemId === "html2txtThisLink" && info.linkUrl) {
		html2txtLink(info.linkUrl, tab.index);
	}
});

browser.browserAction.onClicked.addListener(function (tab) {
	if (tab) {
		if (tab.url) {
			html2txtLink(tab.url, tab.index);
		} else if (tab.pendingUrl) {
			html2txtLink(tab.pendingUrl, tab.index);
		}
	}
});

function html2txtLink(url, index) {
	let html2txtURL = new URL("https://www.w3.org/services/html2txt");
	html2txtURL.searchParams.set("url", url);
	html2txtURL.searchParams.set("noinlinerefs", "on");
	html2txtURL.searchParams.set("endrefs", "on");
	browser.tabs.create({ url: html2txtURL.toString(), index: index + 1 });
}

function createContextMenu() {
	browser.menus.create({
		id: "html2txtThisPage",
		title: "View page as txt",
		type: "normal",
	});

	browser.menus.create({
		id: "html2txtThisLink",
		title: "View link as txt",
		type: "normal",
		contexts: ["link"],
	});
}
