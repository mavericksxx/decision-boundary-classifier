import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { DataPoint, DecisionBoundary } from '../types';

interface VisualizationProps {
  data: DataPoint[];
  boundary: DecisionBoundary;
  width: number;
  height: number;
}

const Visualization: React.FC<VisualizationProps> = ({ 
  data, 
  boundary, 
  width, 
  height 
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create scales
    const xScale = d3.scaleLinear()
      .domain([0, 1])
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, 1])
      .range([innerHeight, 0]); // Flip Y axis

    // Create SVG container
    const svg = d3.select(svgRef.current);
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add background
    g.append('rect')
      .attr('width', innerWidth)
      .attr('height', innerHeight)
      .attr('fill', '#f8f9fa')
      .attr('stroke', '#e9ecef')
      .attr('stroke-width', 1);

    // Draw decision boundary line
    const x1 = 0;
    const y1 = boundary.slope * 0 + boundary.intercept;
    const x2 = 1;
    const y2 = boundary.slope * 1 + boundary.intercept;

    // Only draw line if it intersects with the visible area
    if ((y1 >= 0 && y1 <= 1) || (y2 >= 0 && y2 <= 1) || (y1 < 0 && y2 > 1) || (y1 > 1 && y2 < 0)) {
      g.append('line')
        .attr('x1', xScale(x1))
        .attr('y1', yScale(Math.max(0, Math.min(1, y1))))
        .attr('x2', xScale(x2))
        .attr('y2', yScale(Math.max(0, Math.min(1, y2))))
        .attr('stroke', '#6c757d')
        .attr('stroke-width', 3)
        .attr('stroke-dasharray', '5,5');
    }

    // Draw data points
    g.selectAll('.point')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'point')
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('r', 8)
      .attr('fill', d => d.label === 'blue' ? '#007bff' : '#dc3545')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    // Add axes
    const xAxis = d3.axisBottom(xScale).ticks(5);
    const yAxis = d3.axisLeft(yScale).ticks(5);

    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis)
      .selectAll('text')
      .style('font-size', '12px');

    g.append('g')
      .call(yAxis)
      .selectAll('text')
      .style('font-size', '12px');

  }, [data, boundary, width, height]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      style={{
        maxWidth: '100%',
        height: 'auto',
        border: '1px solid #dee2e6',
        borderRadius: '8px'
      }}
    />
  );
};

export default Visualization;