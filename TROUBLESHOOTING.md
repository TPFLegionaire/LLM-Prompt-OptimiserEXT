# Troubleshooting Chrome Extension Installation

## "Manifest file is missing or unreadable" Error

If you encounter the error message "Manifest file is missing or unreadable" when trying to load the extension, try these fixes:

### Solution 1: Verify Directory Structure

Make sure you're selecting the correct directory that contains the manifest.json file directly:

1. After extracting the ZIP file, you should have a folder named `prompt-optimizer-extension`
2. This folder should contain files like `manifest.json`, `popup.html`, `popup.js`, etc.
3. When clicking "Load unpacked" in Chrome, select this specific folder, not its parent folder

### Solution 2: Download the Latest Version

The manifest issue has been fixed in the latest version:

1. Go to https://github.com/TPFLegionaire/LLM-Prompt-OptimiserEXT/releases
2. Download the latest ZIP file
3. Extract and try again

### Solution 3: Manual Fix

If you still have issues, you can manually fix the manifest.json file:

1. Open the `manifest.json` file in a text editor
2. Make sure it contains the following content:

```json
{
  "manifest_version": 3,
  "name": "LLM Prompt Optimizer",
  "version": "1.0.0",
  "description": "Transforms basic requests into well-crafted prompts for LLMs",
  "action": {
    "default_popup": "popup.html"
  },
  "permissions": [
    "clipboardWrite",
    "storage"
  ],
  "author": "TPFLegionaire",
  "homepage_url": "https://github.com/TPFLegionaire/LLM-Prompt-OptimiserEXT",
  "content_security_policy": {
    "extension_pages": "script-src 'self'; object-src 'self'"
  }
}
```

3. Save the file and try loading the extension again

### Solution 4: Clone from GitHub

Instead of downloading the ZIP, clone the repository directly:

```
git clone https://github.com/TPFLegionaire/LLM-Prompt-OptimiserEXT.git
```

Then load the extension from the cloned directory.

## Other Common Issues

### JavaScript Console Errors

If the extension loads but doesn't function correctly:

1. Right-click on the extension popup
2. Select "Inspect" to open Chrome DevTools
3. Check the Console tab for any error messages
4. Make sure all required files are present:
   - prompt-templates.js
   - transformation-logic.js
   - popup.js

### Permission Issues

If you see permission-related errors:

1. Make sure all the files in the extension directory have read permissions
2. Try running Chrome as administrator (on Windows) or with appropriate permissions
