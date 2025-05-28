/**
 * Test script for transformation logic
 * This script can be run in Node.js or browser console to verify transformation functionality
 */

// Sample inputs for testing
const testCases = [
  {
    name: "Simple query - GPT-4, General",
    input: "Tell me about climate change",
    promptType: "general",
    llmType: "gpt4"
  },
  {
    name: "Analysis request - Claude, Analysis",
    input: "Compare renewable energy sources",
    promptType: "analysis",
    llmType: "claude"
  },
  {
    name: "Creative request - Gemini, Creative",
    input: "Write a story about a robot discovering emotions",
    promptType: "creative",
    llmType: "gemini"
  },
  {
    name: "Code request - GPT-4, Coding",
    input: "How to implement a binary search tree in JavaScript",
    promptType: "coding",
    llmType: "gpt4"
  },
  {
    name: "Short vague request - General, General",
    input: "Explain AI",
    promptType: "general",
    llmType: "general"
  }
];

// Function to run tests
function runTransformationTests() {
  console.log("=== TRANSFORMATION LOGIC TESTS ===");
  
  testCases.forEach((testCase, index) => {
    console.log(`\nTest Case ${index + 1}: ${testCase.name}`);
    console.log(`Input: "${testCase.input}"`);
    console.log(`Prompt Type: ${testCase.promptType}`);
    console.log(`LLM Type: ${testCase.llmType}`);
    
    // Run transformation
    const result = transformRequest(
      testCase.input, 
      testCase.promptType, 
      testCase.llmType
    );
    
    // Check if transformation was successful
    if (result && result.length > testCase.input.length) {
      console.log(`✅ PASSED: Transformation successful`);
      console.log(`Output Length: ${result.length} characters`);
      
      // Check for expected components
      const checks = {
        hasRolePrompt: result.includes(promptTemplates[testCase.promptType].rolePrompt),
        hasOriginalRequest: result.includes(testCase.input),
        hasFormatGuide: result.includes("Output format"),
        hasLLMAdjustment: result.includes(llmAdjustments[testCase.llmType].additionalPrompts)
      };
      
      Object.entries(checks).forEach(([check, passed]) => {
        console.log(`${passed ? "✅" : "❌"} ${check}: ${passed}`);
      });
      
      // Display sample of transformed output
      console.log("\nSample output (first 150 chars):");
      console.log(result.substring(0, 150) + "...");
      
    } else {
      console.log(`❌ FAILED: Transformation did not produce expected output`);
      console.log(`Output: ${result}`);
    }
  });
  
  // Test edge cases
  console.log("\n=== EDGE CASE TESTS ===");
  
  // Empty input
  const emptyResult = transformRequest("", "general", "gpt4");
  console.log(`Empty input test: ${emptyResult === "Please enter a request to optimize." ? "✅ PASSED" : "❌ FAILED"}`);
  
  // Very long input
  const longInput = "Lorem ipsum dolor sit amet, ".repeat(50);
  const longResult = transformRequest(longInput, "general", "gpt4");
  console.log(`Long input test: ${longResult.includes(longInput) ? "✅ PASSED" : "❌ FAILED"}`);
  
  // Invalid prompt type
  const invalidTypeResult = transformRequest("Test input", "nonexistent", "gpt4");
  console.log(`Invalid prompt type test: ${invalidTypeResult.includes(promptTemplates.general.rolePrompt) ? "✅ PASSED" : "❌ FAILED"}`);
  
  // Invalid LLM type
  const invalidLLMResult = transformRequest("Test input", "general", "nonexistent");
  console.log(`Invalid LLM type test: ${invalidLLMResult.includes(llmAdjustments.general.additionalPrompts) ? "✅ PASSED" : "❌ FAILED"}`);
  
  console.log("\n=== TEST SUMMARY ===");
  console.log(`Total test cases: ${testCases.length + 4}`);
}

// Run tests if this is being executed directly
if (typeof window === 'undefined') {
  // Node.js environment - would need to include the transformation logic files
  console.log("This test script needs to be run in a browser environment with the transformation logic loaded");
} else {
  // Browser environment
  if (typeof transformRequest === 'function') {
    runTransformationTests();
  } else {
    console.error("Error: transformRequest function not found. Make sure transformation-logic.js is loaded.");
  }
}
