
// Array of random captions to use for images
export const imageCaptions = [
  "Visualization of project data",
  "Conceptual representation",
  "Research findings illustration",
  "Visual output from analysis",
  "Project workflow diagram",
  "Generated sample result",
  "Algorithm in action",
  "Field observation capture",
  "Experimental output",
  "Pattern recognition example"
];

// Function to get a random caption
export const getRandomCaption = () => {
  const randomIndex = Math.floor(Math.random() * imageCaptions.length);
  return imageCaptions[randomIndex];
};
