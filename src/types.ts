export interface DataPoint {
  x: number;
  y: number;
  label: 'blue' | 'red';
}

export interface DecisionBoundary {
  slope: number;
  intercept: number;
}

export interface ClassificationResult {
  totalPoints: number;
  misclassified: number;
  isPerfectSeparation: boolean;
}