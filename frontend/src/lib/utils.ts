import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Calculate the score for a project
function calculateScore(project: Project) {
  // Define weights for interactions and activity
  const interactionWeight = 0.3;
  const activityWeight = 0.7;

  // Calculate score based on interactions and activity
  const score = project.popularity * interactionWeight + project.activity * activityWeight;

  return score;
}

export function shuffle(array: Project[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    // Calculate scores for projects at indices i and j
    const scoreI = calculateScore(array[i]);
    const scoreJ = calculateScore(array[j]);

    // Swap projects based on scores
    if (scoreI < scoreJ) {
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
