chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(['enabled'], (result) => {
    const extensionEnabled = result.enabled !== false;

    chrome.storage.local.set({ enabled: extensionEnabled });
  });
});

chrome.action.onClicked.addListener((tab) => {
  chrome.storage.local.get(['enabled'], (result) => {
    const extensionEnabled = result.enabled !== false;

    chrome.storage.local.set({ enabled: !extensionEnabled }, () => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: setExtensionStatus,
        args: [!extensionEnabled]
      });
    });
  });
});

function setExtensionStatus(enabled) {
  window.localStorage.setItem('extensionEnabled', enabled);
}
