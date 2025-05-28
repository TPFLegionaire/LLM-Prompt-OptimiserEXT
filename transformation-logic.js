/**
 * Core transformation logic for converting user requests to optimized prompts
 */

// Main function to transform user request into optimized prompt
function transformRequest(request, promptType, llmType) {
  // Basic validation
  if (!request || request.trim() === "") {
    return "Please enter a request to optimize.";
  }
  
  // Clean up the request
  const cleanRequest = request.trim();
  
  // Get the appropriate templates
  const template = promptTemplates[promptType] || promptTemplates.general;
  const llmAdjustment = llmAdjustments[llmType] || llmAdjustments.general;
  
  // Analyze request to determine specific enhancements needed
  const enhancements = analyzeRequest(cleanRequest);
  
  // Build the optimized prompt
  let optimizedPrompt = buildPrompt(cleanRequest, template, llmAdjustment, enhancements);
  
  return optimizedPrompt;
}

// Analyze the request to determine what enhancements are needed
function analyzeRequest(request) {
  const enhancements = {
    needsContext: false,
    needsSpecificity: false,
    needsOutputFormat: false,
    isComplex: false
  };
  
  // Check if request is very short (likely needs context)
  if (request.split(" ").length < 7) {
    enhancements.needsContext = true;
  }
  
  // Check if request contains vague terms that need specificity
  const vagueTerms = ["good", "best", "better", "nice", "great", "interesting", "detailed"];
  if (vagueTerms.some(term => request.toLowerCase().includes(term))) {
    enhancements.needsSpecificity = true;
  }
  
  // Check if request mentions output but doesn't specify format
  if (request.toLowerCase().includes("output") || 
      request.toLowerCase().includes("format") || 
      request.toLowerCase().includes("result")) {
    if (!request.toLowerCase().includes("format as") && 
        !request.toLowerCase().includes("in the form") &&
        !request.toLowerCase().includes("structured as")) {
      enhancements.needsOutputFormat = true;
    }
  }
  
  // Check if request is complex (contains multiple questions/tasks)
  if (request.includes(",") && 
      (request.includes("and") || request.includes("also") || request.includes("additionally"))) {
    enhancements.isComplex = true;
  }
  
  return enhancements;
}

// Build the prompt using templates and enhancements
function buildPrompt(request, template, llmAdjustment, enhancements) {
  // Start with the role prompt
  let optimizedPrompt = template.rolePrompt + "\n\n";
  
  // Add the task prefix and the original request
  optimizedPrompt += template.prefix + "\n" + request + "\n\n";
  
  // Add context enhancement if needed
  if (enhancements.needsContext) {
    optimizedPrompt += "Please provide comprehensive information about this topic, including relevant context, background, and current developments.\n\n";
  }
  
  // Add specificity enhancement if needed
  if (enhancements.needsSpecificity) {
    optimizedPrompt += "Be specific and precise in your response, with concrete examples and evidence where appropriate.\n\n";
  }
  
  // Add formatting guidelines
  optimizedPrompt += "Output format:\n" + template.formatGuide + "\n\n";
  
  // Add thinking prompt
  optimizedPrompt += template.thinkingPrompt + "\n\n";
  
  // Add LLM-specific adjustments
  optimizedPrompt += llmAdjustment.additionalPrompts + "\n";
  optimizedPrompt += llmAdjustment.formatPreference;
  
  // Add complexity handling if needed
  if (enhancements.isComplex) {
    optimizedPrompt += "\n\nSince this is a complex request with multiple components, please address each part systematically and ensure all aspects are covered.";
  }
  
  return optimizedPrompt;
}
