/**
 * Popup script for handling user interactions
 */
document.addEventListener('DOMContentLoaded', function() {
  // Get elements
  const userRequestInput = document.getElementById('userRequest');
  const optimizedPromptOutput = document.getElementById('optimizedPrompt');
  const optimizeButton = document.getElementById('optimizeBtn');
  const copyButton = document.getElementById('copyBtn');
  const copyStatus = document.getElementById('copyStatus');
  const llmTypeSelect = document.getElementById('llmType');
  const promptTypeSelect = document.getElementById('promptType');
  
  // Load any saved preferences from storage
  chrome.storage.sync.get(['llmType', 'promptType'], function(result) {
    if (result.llmType) {
      llmTypeSelect.value = result.llmType;
    }
    if (result.promptType) {
      promptTypeSelect.value = result.promptType;
    }
  });
  
  // Handle optimize button click
  optimizeButton.addEventListener('click', function() {
    const userRequest = userRequestInput.value;
    const promptType = promptTypeSelect.value;
    const llmType = llmTypeSelect.value;
    
    // Save preferences
    chrome.storage.sync.set({ 
      llmType: llmType,
      promptType: promptType 
    });
    
    // Transform the request
    const optimizedPrompt = transformRequest(userRequest, promptType, llmType);
    
    // Display the result
    optimizedPromptOutput.value = optimizedPrompt;
  });
  
  // Handle copy button click
  copyButton.addEventListener('click', function() {
    // Copy to clipboard
    optimizedPromptOutput.select();
    document.execCommand('copy');
    
    // Show confirmation
    copyStatus.classList.remove('hidden');
    
    // Hide confirmation after 2 seconds
    setTimeout(function() {
      copyStatus.classList.add('hidden');
    }, 2000);
  });
  
  // Auto-resize textareas
  function autoResizeTextarea(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = (textarea.scrollHeight) + 'px';
  }
  
  userRequestInput.addEventListener('input', function() {
    autoResizeTextarea(this);
  });
  
  // Initialize with a placeholder optimization if needed
  if (userRequestInput.value) {
    optimizeButton.click();
  }
});
