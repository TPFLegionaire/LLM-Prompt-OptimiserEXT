# LLM Prompt Optimizer Chrome Extension

A Chrome extension that transforms basic user requests into well-crafted prompts for Large Language Models (LLMs).

## Features

- Convert simple requests into structured, effective prompts
- Customize prompts for specific LLMs (GPT-4, Claude, Gemini)
- Choose prompt types based on your needs (General, Analysis, Creative, Coding, Summary)
- Easy copy-to-clipboard functionality

## Installation

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top-right corner
4. Click "Load unpacked" and select the extension directory
5. The extension icon should appear in your Chrome toolbar

## How to Use

1. Click the extension icon in the Chrome toolbar
2. Enter your basic request in the input field
3. Select your target LLM and prompt type
4. Click "Optimize Prompt"
5. The optimized prompt will appear in the output field
6. Click "Copy to Clipboard" to use the prompt with your preferred LLM

## Prompt Transformation Logic

The extension transforms your basic requests by:

1. Adding appropriate structure and context
2. Enhancing clarity and specificity
3. Including best practices for prompt engineering
4. Tailoring the format to work well with your chosen LLM
5. Adding appropriate output formatting instructions

## Examples

### Basic Request:
```
Tell me about climate change
```

### Optimized Prompt (GPT-4, General):
```
You are a knowledgeable expert with comprehensive understanding of diverse topics.

I need detailed and accurate information about the following topic:
Tell me about climate change

Please provide comprehensive information about this topic, including relevant context, background, and current developments.

Output format:
- Clear definitions of key terms
- Important context and background
- Current understanding or state of knowledge
- Different perspectives or viewpoints where relevant
- Practical applications or implications
- Sources or references where appropriate

Think step by step and provide a comprehensive response.

Take a deep breath and work on this step by step.
Markdown formatting preferred.
```

## License

[MIT License](LICENSE)
