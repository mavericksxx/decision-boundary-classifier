import React, { useState, useEffect } from 'react';
import './App.css';
import Visualization from './components/Visualization';
import Controls from './components/Controls';
import Results from './components/Results';
import { generateDataset } from './dataGenerator';
import { evaluateClassification } from './classifier';
import { DataPoint, DecisionBoundary, ClassificationResult } from './types';

function App() {
  const [data] = useState<DataPoint[]>(generateDataset());
  const [boundary, setBoundary] = useState<DecisionBoundary>({
    slope: 0.8,
    intercept: 0.1
  });
  const [result, setResult] = useState<ClassificationResult>({
    totalPoints: 0,
    misclassified: 0,
    isPerfectSeparation: false
  });
  const [dimensions, setDimensions] = useState({
    width: Math.min(600, window.innerWidth - 40),
    height: Math.min(400, window.innerHeight * 0.4)
  });

  // Update visualization dimensions on window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: Math.min(600, window.innerWidth - 40),
        height: Math.min(400, window.innerHeight * 0.4)
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Evaluate classification whenever boundary changes
  useEffect(() => {
    const newResult = evaluateClassification(data, boundary);
    setResult(newResult);
  }, [data, boundary]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Decision Boundary Designer</h1>
        <p>Adjust the slope and intercept to perfectly separate the blue and red points!</p>
      </header>
      
      <main className="App-main">
        <div className="visualization-container">
          <Visualization 
            data={data}
            boundary={boundary}
            width={dimensions.width}
            height={dimensions.height}
          />
        </div>
        
        <div className="controls-container">
          <Controls 
            boundary={boundary}
            onBoundaryChange={setBoundary}
          />
        </div>
        
        <div className="results-container">
          <Results 
            result={result}
            boundary={boundary}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
