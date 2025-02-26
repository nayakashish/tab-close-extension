let isCommandPressed = false;

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Background received message:", message);

  if (message.type === "command-press") {
    isCommandPressed = true;
    sendResponse({ success: true });
  }

  if (message.type === "command-release") {
    isCommandPressed = false;
    sendResponse({ success: true });
  }

  return true;
});

// Log when the extension is installed and running
chrome.runtime.onInstalled.addListener(() => {
  console.log("Service worker installed and running.");
});
