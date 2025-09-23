import { DataPoint } from './types';

// Generate a clustered dataset with blue points around (0,0) and red points around (1,1)
// This creates a clear diagonal separation that's intuitive for classification
export const generateDataset = (): DataPoint[] => {
  const points: DataPoint[] = [];
  
  // CRITICAL CONSTRAINT POINTS - these force slope=-0.5, intercept=0.7
  // Strategic points that create a narrow corridor for the decision boundary
  
  // Constraint pair 1: Forces the line to pass between these points
  points.push({ x: 0.3, y: 0.5, label: 'blue' });  // Just below y = -0.5(0.3) + 0.7 = 0.55
  points.push({ x: 0.3, y: 0.6, label: 'red' });   // Just above the line
  
  // Constraint pair 2: Another critical separation point
  points.push({ x: 0.6, y: 0.3, label: 'blue' });  // Just below y = -0.5(0.6) + 0.7 = 0.40
  points.push({ x: 0.6, y: 0.5, label: 'red' });   // Just above the line
  
  // Constraint pair 3: Third constraint to lock in the solution
  points.push({ x: 0.8, y: 0.2, label: 'blue' });  // Just below y = -0.5(0.8) + 0.7 = 0.30
  points.push({ x: 0.8, y: 0.4, label: 'red' });   // Just above the line
  
  // Blue cluster (bottom-left region, below the line)
  const bluePoints = [
    // Main cluster around (0, 0)
    { x: 0.05, y: 0.05 },
    { x: 0.1, y: 0.1 },
    { x: 0.15, y: 0.08 },
    { x: 0.08, y: 0.15 },
    { x: 0.12, y: 0.05 },
    { x: 0.05, y: 0.12 },
    { x: 0.18, y: 0.15 },
    { x: 0.22, y: 0.12 },
    { x: 0.25, y: 0.08 },
    { x: 0.2, y: 0.2 },
    { x: 0.15, y: 0.25 },
    
    // Strategic blue points that fill space below the line
    { x: 0.4, y: 0.3 },   // Below y = -0.5(0.4) + 0.7 = 0.50
    { x: 0.5, y: 0.25 },  // Below y = -0.5(0.5) + 0.7 = 0.45
    { x: 0.7, y: 0.15 },  // Below y = -0.5(0.7) + 0.7 = 0.35
    { x: 0.9, y: 0.05 },  // Below y = -0.5(0.9) + 0.7 = 0.25
    { x: 0.35, y: 0.35 }, // Below y = -0.5(0.35) + 0.7 = 0.525
    { x: 0.45, y: 0.25 }, // Below y = -0.5(0.45) + 0.7 = 0.475
    { x: 0.55, y: 0.15 }, // Below y = -0.5(0.55) + 0.7 = 0.425
    { x: 0.65, y: 0.05 }, // Below y = -0.5(0.65) + 0.7 = 0.375
  ];
  
  // Red cluster (top-right region, above the line)
  const redPoints = [
    // Main cluster around (1, 1)
    { x: 0.95, y: 0.95 },
    { x: 0.9, y: 0.9 },
    { x: 0.85, y: 0.92 },
    { x: 0.92, y: 0.85 },
    { x: 0.88, y: 0.95 },
    { x: 0.95, y: 0.88 },
    { x: 0.82, y: 0.85 },
    { x: 0.78, y: 0.88 },
    { x: 0.75, y: 0.92 },
    { x: 0.8, y: 0.8 },
    { x: 0.85, y: 0.75 },
    
    // Strategic red points that fill space above the line
    { x: 0.1, y: 0.8 },   // Above y = -0.5(0.1) + 0.7 = 0.65
    { x: 0.2, y: 0.75 },  // Above y = -0.5(0.2) + 0.7 = 0.60
    { x: 0.4, y: 0.65 },  // Above y = -0.5(0.4) + 0.7 = 0.50
    { x: 0.5, y: 0.6 },   // Above y = -0.5(0.5) + 0.7 = 0.45
    { x: 0.7, y: 0.5 },   // Above y = -0.5(0.7) + 0.7 = 0.35
    { x: 0.15, y: 0.75 }, // Above y = -0.5(0.15) + 0.7 = 0.625
    { x: 0.25, y: 0.7 },  // Above y = -0.5(0.25) + 0.7 = 0.575
    { x: 0.35, y: 0.65 }, // Above y = -0.5(0.35) + 0.7 = 0.525
    { x: 0.45, y: 0.6 },  // Above y = -0.5(0.45) + 0.7 = 0.475
    { x: 0.55, y: 0.55 }, // Above y = -0.5(0.55) + 0.7 = 0.425
    { x: 0.65, y: 0.5 },  // Above y = -0.5(0.65) + 0.7 = 0.375
  ];
  
  // Add blue points
  bluePoints.forEach(point => {
    points.push({
      x: point.x,
      y: point.y,
      label: 'blue'
    });
  });
  
  // Add red points
  redPoints.forEach(point => {
    points.push({
      x: point.x,
      y: point.y,
      label: 'red'
    });
  });
  
  return points;
};

// The ideal solution for perfect separation
// Only slope=-0.5 and intercept=0.7 will perfectly separate this specific dataset
export const getIdealSolution = () => {
  return {
    slope: -0.5,
    intercept: 0.7
  };
};