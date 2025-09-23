import React from 'react';
import { DecisionBoundary } from '../types';

interface ControlsProps {
  boundary: DecisionBoundary;
  onBoundaryChange: (boundary: DecisionBoundary) => void;
}

const Controls: React.FC<ControlsProps> = ({ boundary, onBoundaryChange }) => {
  const handleSlopeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const slope = parseFloat(e.target.value);
    onBoundaryChange({ ...boundary, slope });
  };

  const handleInterceptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const intercept = parseFloat(e.target.value);
    onBoundaryChange({ ...boundary, intercept });
  };

  return (
    <div className="controls">
      <div className="control-group">
        <label htmlFor="slope-slider">
          Slope: {boundary.slope.toFixed(2)}
        </label>
        <input
          id="slope-slider"
          type="range"
          min="-1"
          max="1"
          step="0.01"
          value={boundary.slope}
          onChange={handleSlopeChange}
          className="slider"
        />
      </div>
      
      <div className="control-group">
        <label htmlFor="intercept-slider">
          Intercept: {boundary.intercept.toFixed(2)}
        </label>
        <input
          id="intercept-slider"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={boundary.intercept}
          onChange={handleInterceptChange}
          className="slider"
        />
      </div>
    </div>
  );
};

export default Controls;