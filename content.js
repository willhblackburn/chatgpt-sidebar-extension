// content.js

// Function to toggle the sidebar visibility
function toggleSidebar() {
  const sidebar = document.querySelector('.dark.overflow-x-hidden.bg-gray-900');
  
  if (sidebar) {
    if (sidebar.style.display === 'none') {
      sidebar.style.display = '';
    } else {
      sidebar.style.display = 'none';
    }
  }
}

// Listener for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggleSidebar') {
    toggleSidebar();
  }
});

// Function to create and append the hamburger button to the BODY CONTENT div
function createHamburgerButton() {
  const button = document.createElement('button');
  button.id = 'hamburgerButton';
  button.innerHTML = '&#9776;';
  
  const bodyContentDiv = document.querySelector('.flex.h-full.max-w-full.flex-1.flex-col');
  if (bodyContentDiv) {
    bodyContentDiv.appendChild(button);
  }
  
  // Add an event listener to detect when a new conversation is selected
  document.addEventListener('click', function(event) {
    // wait 1 second before adding the button to the new conversation
    setTimeout(() => {
      const conversationDiv = document.querySelector('.flex.h-full.max-w-full.flex-1.flex-col');
  
      // If a conversation is selected, add the button to its div
      if (conversationDiv) {
        conversationDiv.appendChild(button);
      }
    }, 2000);
  });
}

createHamburgerButton();

// CSS styles for the hamburger button and BODY CONTENT div
const buttonStyle = `
  .flex.h-full.max-w-full.flex-1.flex-col {
    position: relative;
  }
  #hamburgerButton {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 9999;
    font-size: 24px;
    padding: 5px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 15%;
    opacity: 0.8;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3);
  }
`;

// Function to inject the CSS styles into the page
function addStyles() {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = buttonStyle;
  document.head.appendChild(styleElement);
}

addStyles();

// Function to add a click event listener to the hamburger button
function addHamburgerClickListener() {
  const hamburgerButton = document.getElementById('hamburgerButton');
  if (hamburgerButton) {
    hamburgerButton.addEventListener('click', toggleSidebar);
  }
}

addHamburgerClickListener();

// Function to update the hamburger button visibility based on the window width
function updateHamburgerButtonVisibility() {
  const hamburgerButton = document.getElementById('hamburgerButton');

  if (hamburgerButton) {
    if (window.innerWidth < 768) {
      console.log("hiding!");
      hamburgerButton.style.display = 'none';
    } else {
      console.log("showing!");
      hamburgerButton.style.display = 'block';
    }
  }
}

// Initial visibility update
updateHamburgerButtonVisibility();

// Update visibility on window resize
window.addEventListener('resize', updateHamburgerButtonVisibility);
