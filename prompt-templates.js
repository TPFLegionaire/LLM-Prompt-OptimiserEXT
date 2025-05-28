/**
 * Templates for different types of prompts
 * These templates will be used as the base for transforming user requests
 */
const promptTemplates = {
  // General query template
  general: {
    prefix: "I need detailed and accurate information about the following topic:",
    rolePrompt: "You are a knowledgeable expert with comprehensive understanding of diverse topics.",
    formatGuide: `Please structure your response with:
- Clear definitions of key terms
- Important context and background
- Current understanding or state of knowledge
- Different perspectives or viewpoints where relevant
- Practical applications or implications
- Sources or references where appropriate`,
    thinkingPrompt: "Think step by step and provide a comprehensive response."
  },
  
  // Analysis/research template
  analysis: {
    prefix: "Analyze the following topic in depth:",
    rolePrompt: "You are an analytical expert with skills in critical thinking and research methodology.",
    formatGuide: `Please structure your analysis with:
- Initial problem/question framing
- Methodology or approach to analysis
- Key findings with supporting evidence
- Alternative interpretations or counterarguments
- Limitations of the analysis
- Conclusions and implications
- References or sources`,
    thinkingPrompt: "Use analytical thinking and consider multiple perspectives. Evaluate evidence carefully and avoid unfounded claims."
  },
  
  // Creative writing template
  creative: {
    prefix: "Create the following type of content:",
    rolePrompt: "You are a creative writer with expertise in storytelling and engaging content creation.",
    formatGuide: `Consider including:
- Engaging hooks or openings
- Vivid descriptions and sensory details
- Well-developed characters or concepts
- Coherent narrative or logical flow
- Appropriate tone and style for the content type
- Memorable conclusion or ending`,
    thinkingPrompt: "Be imaginative while maintaining coherence and purpose. Consider what would most engage the target audience."
  },
  
  // Code/technical template
  coding: {
    prefix: "Provide code or technical assistance for the following:",
    rolePrompt: "You are an experienced software developer with expertise in multiple programming languages and technical systems.",
    formatGuide: `Please include:
- Clear explanation of the approach or solution
- Well-commented, working code examples
- Explanation of key concepts or functions
- Potential edge cases or limitations
- Best practices and optimization tips
- Resources for further learning`,
    thinkingPrompt: "Consider efficiency, readability, and best practices. Explain your reasoning for implementation choices."
  },
  
  // Summarization template
  summary: {
    prefix: "Summarize the following information:",
    rolePrompt: "You are an expert in information synthesis and clear communication.",
    formatGuide: `Your summary should include:
- Key points or main ideas
- Important supporting details
- Relationships between concepts
- Significance or implications
- Areas of uncertainty or debate (if relevant)`,
    thinkingPrompt: "Identify the most important elements while maintaining accuracy. Avoid adding information not present in the original."
  }
};

// LLM-specific adjustments
const llmAdjustments = {
  gpt4: {
    // GPT-4 responds well to detailed instructions and chain-of-thought prompting
    additionalPrompts: "Take a deep breath and work on this step by step.",
    formatPreference: "Markdown formatting preferred."
  },
  
  claude: {
    // Claude performs well with role-playing and clear formatting instructions
    additionalPrompts: "Let's think about this carefully and consider multiple perspectives.",
    formatPreference: "Use clear headings and bullet points for better readability."
  },
  
  gemini: {
    // Gemini works well with concise, clear instructions
    additionalPrompts: "Analyze the request thoroughly before providing your response.",
    formatPreference: "Structure your response with clear sections and logical progression."
  },
  
  general: {
    // General purpose adjustments that work across most LLMs
    additionalPrompts: "Consider this request carefully before responding.",
    formatPreference: "Organize your response in a clear, readable format."
  }
};
