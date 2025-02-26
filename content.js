console.log("Content script is loaded!");
let isCommandPressed = false;

function sendMessage(messageContent) {
  chrome.runtime.sendMessage(
    { action: messageContent }, // The message body, with the action containing your passed message
    function(response) {
      console.log("Response from background:", response);
    }
  );
}


window.addEventListener("keydown", (e) => {
  if (e.key === "Meta" || e.key === "Control") {
    console.log("Command or Ctrl key pressed!");
    isCommandPressed = true;
    sendMessage("command-press"); // Send message to background script
    showCloseButton(); // Show the close button when Command key is pressed
  }
});

window.addEventListener("keyup", (e) => {
  if (e.key === "Meta" || e.key === "Control") {
    console.log("Command or Ctrl key released!");
    isCommandPressed = false;
    sendMessage("command-release"); // Send message to background script
    hideCloseButton(); // Hide the close button when Command key is released
  }
});

// Create the close button when content script is loaded
const createCloseButton = () => {
  const closeButton = document.createElement("button");
  closeButton.classList.add("tab-close-button");
  closeButton.textContent = "X"; // A simple "X" to represent the close button
  closeButton.style.position = "absolute";
  closeButton.style.top = "5px";
  closeButton.style.right = "5px";
  closeButton.style.display = "none"; // Hidden by default
  closeButton.style.zIndex = "9999"; // Ensure it's on top
  closeButton.style.backgroundColor = "#ff0000"; // Red background
  closeButton.style.color = "#fff"; // White text
  closeButton.style.border = "none";
  closeButton.style.borderRadius = "50%";
  closeButton.style.padding = "5px";
  closeButton.style.cursor = "pointer";
  closeButton.style.fontSize = "16px";

  document.body.appendChild(closeButton);

  closeButton.addEventListener("click", () => {
    window.close(); // Close the current tab when the button is clicked
  });
};

// Show the close button when Command key is pressed
const showCloseButton = () => {
  const closeButton = document.querySelector(".tab-close-button");
  if (closeButton && isCommandPressed) {
    closeButton.style.display = "block"; // Show the button
  }
};

// Hide the close button when Command key is released
const hideCloseButton = () => {
  const closeButton = document.querySelector(".tab-close-button");
  if (closeButton) {
    closeButton.style.display = "none"; // Hide the button
  }
};

// Call createCloseButton when the content script loads
createCloseButton();
