import { DataPoint, DecisionBoundary, ClassificationResult } from './types';

export const classifyPoint = (
  point: DataPoint, 
  boundary: DecisionBoundary
): 'blue' | 'red' => {
  // Line equation: y = mx + b
  // Point is above line (red) if: y > mx + b
  // Point is below line (blue) if: y < mx + b
  const lineY = boundary.slope * point.x + boundary.intercept;
  return point.y > lineY ? 'red' : 'blue';
};

export const evaluateClassification = (
  points: DataPoint[], 
  boundary: DecisionBoundary
): ClassificationResult => {
  let misclassified = 0;
  
  points.forEach(point => {
    const predicted = classifyPoint(point, boundary);
    if (predicted !== point.label) {
      misclassified++;
    }
  });
  
  return {
    totalPoints: points.length,
    misclassified,
    isPerfectSeparation: misclassified === 0
  };
};