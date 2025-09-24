import React, { useState, useEffect } from 'react';
import { ClassificationResult, DecisionBoundary } from '../types';
import { getIdealSolution } from '../dataGenerator';

interface ResultsProps {
  result: ClassificationResult;
  boundary: DecisionBoundary;
}

const Results: React.FC<ResultsProps> = ({ result, boundary }) => {
  const [showPopup, setShowPopup] = useState(false);
  const ideal = getIdealSolution();
  
  // Check if solution achieves perfect separation AND is very close to the mathematical ideal
  // With the constraint points, only slope≈-0.5 and intercept≈0.7 should achieve perfect separation
  const isExactSolution = result.isPerfectSeparation && 
    Math.abs(boundary.slope - ideal.slope) < 0.002 &&
    Math.abs(boundary.intercept - ideal.intercept) < 0.002;

  // Show popup when exact solution is found
  useEffect(() => {
    if (isExactSolution) {
      setShowPopup(true);
    }
  }, [isExactSolution]);

  return (
    <div className="results">
      {/* Solution Key Popup */}
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>Congratulations!</h2>
            <p className="solution-key"><strong>The solution key is GDG{"{1in3ar_c1assifi3r}"}</strong></p>
            <button onClick={() => setShowPopup(false)} className="popup-close">
              Close
            </button>
          </div>
        </div>
      )}
      
      <div className="stats">
        <div className="stat-item">
          <span className="stat-label">Total Points:</span>
          <span className="stat-value">{result.totalPoints}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Misclassified:</span>
          <span className={`stat-value ${result.misclassified === 0 ? 'success' : 'error'}`}>
            {result.misclassified}
          </span>
        </div>
      </div>
      
      {isExactSolution && (
        <div className="success-message">
          <h3>Congratulations! You've found the solution.</h3>
        </div>
      )}
      
      {!result.isPerfectSeparation && (
        <div className="hint">
          <p>💡 Adjust the slope and intercept to separate all blue points from red points!</p>
          <p className="hint-detail">Target: Find the line y = mx + b that perfectly divides the classes</p>
        </div>
      )}
    </div>
  );
};

export default Results;