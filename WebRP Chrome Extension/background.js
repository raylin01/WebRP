chrome.tabs.onActivated.addListener(function(activeInfo){
	chrome.tabs.get(activeInfo.tabId, function(tab){
		if(tab.status === "complete"){
			//console.log("activated",tab);
			sendToDatabase(tab);
		}
	});
})
	
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	if(tab.status === "complete"){
		//console.log("updated",tab);
		sendToDatabase(tab);
	}
});

function sendToDatabase(tab){
	manifestData = chrome.runtime.getManifest();
	if(manifestData.userID == "<INSERTIDHERE>"){
		alert("Please change your userID in manifest.json");
		return;
	}
	let data = {};
	data._id = manifestData.userID;
	data.title = tab.title;
	data.url = tab.url;
	$.post( "https://raylin3.web.illinois.edu/webrp/runrequest", data, function(data,status) {
	});
}