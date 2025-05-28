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
  
  // Chrome API fallback for debugging
  const chromeStorageFallback = {
    sync: {
      get: function(keys, callback) {
        // Fallback implementation that just returns empty object
        callback({});
      },
      set: function(items) {
        // Fallback implementation that does nothing
        console.log('Storage set (fallback):', items);
      }
    }
  };
  
  // Use Chrome API if available, otherwise use fallback
  const storage = typeof chrome !== 'undefined' && chrome.storage ? 
                 chrome.storage : chromeStorageFallback;
  
  // Add debug logging
  console.log('DOM Content Loaded');
  console.log('Elements found:', {
    userRequestInput: !!userRequestInput,
    optimizedPromptOutput: !!optimizedPromptOutput,
    optimizeButton: !!optimizeButton,
    copyButton: !!copyButton,
    copyStatus: !!copyStatus,
    llmTypeSelect: !!llmTypeSelect,
    promptTypeSelect: !!promptTypeSelect
  });
  
  // Load any saved preferences from storage
  try {
    storage.sync.get(['llmType', 'promptType'], function(result) {
      console.log('Loaded preferences:', result);
      if (result.llmType) {
        llmTypeSelect.value = result.llmType;
      }
      if (result.promptType) {
        promptTypeSelect.value = result.promptType;
      }
    });
  } catch (e) {
    console.error('Error loading preferences:', e);
  }
  
  // Handle optimize button click
  optimizeButton.addEventListener('click', function() {
    console.log('Optimize button clicked');
    const userRequest = userRequestInput.value;
    const promptType = promptTypeSelect.value;
    const llmType = llmTypeSelect.value;
    
    console.log('Inputs:', { userRequest, promptType, llmType });
    
    // Save preferences
    try {
      storage.sync.set({ 
        llmType: llmType,
        promptType: promptType 
      });
    } catch (e) {
      console.error('Error saving preferences:', e);
    }
    
    // Transform the request
    try {
      console.log('Transforming request...');
      const optimizedPrompt = transformRequest(userRequest, promptType, llmType);
      console.log('Transformation result length:', optimizedPrompt ? optimizedPrompt.length : 0);
      
      // Display the result
      optimizedPromptOutput.value = optimizedPrompt;
    } catch (e) {
      console.error('Error in transformation:', e);
      optimizedPromptOutput.value = 'Error: ' + e.message;
    }
  });
  
  // Handle copy button click
  copyButton.addEventListener('click', function() {
    console.log('Copy button clicked');
    // Copy to clipboard
    optimizedPromptOutput.select();
    
    try {
      const success = document.execCommand('copy');
      console.log('Copy result:', success);
      
      // Show confirmation
      copyStatus.classList.remove('hidden');
      
      // Hide confirmation after 2 seconds
      setTimeout(function() {
        copyStatus.classList.add('hidden');
      }, 2000);
    } catch (e) {
      console.error('Error copying to clipboard:', e);
    }
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
    console.log('Initializing with existing value');
    optimizeButton.click();
  }
  
  // Add test button for debugging
  const container = document.querySelector('.container');
  const testButton = document.createElement('button');
  testButton.textContent = 'Run Test Transform';
  testButton.style.marginTop = '10px';
  testButton.addEventListener('click', function() {
    const testRequest = "tell me about UFO";
    userRequestInput.value = testRequest;
    optimizeButton.click();
  });
  container.appendChild(testButton);
});
