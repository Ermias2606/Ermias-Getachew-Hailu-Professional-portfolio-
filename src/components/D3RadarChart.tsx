import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Skill } from '../types';

interface D3RadarChartProps {
  skills: Skill[];
  selectedDomain: string;
}

export const D3RadarChart: React.FC<D3RadarChartProps> = ({ skills, selectedDomain }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Filter or group skills based on selectedDomain
    const domainMapping: { [key: string]: string } = {
      'cash-vault': 'Cash & Vault',
      'core-banking': 'Core Banking',
      'compliance-aml': 'AML & Compliance',
      'accounting-settlement': 'Settlement & GL',
      'risk-management': 'Risk & Strategy',
    };

    // Prepare data points for radar axes
    const categories = Object.keys(domainMapping);
    const data = categories.map((catKey) => {
      const domainSkills = skills.filter((s) => s.domain === catKey);
      const avgPct =
        domainSkills.length > 0
          ? Math.round(domainSkills.reduce((acc, s) => acc + s.pct, 0) / domainSkills.length)
          : 75;

      const isHighlighted = selectedDomain === 'all' || selectedDomain === catKey;
      return {
        axis: domainMapping[catKey],
        value: isHighlighted ? avgPct : Math.round(avgPct * 0.4), // Fade out non-selected domains
        realValue: avgPct,
        key: catKey,
      };
    });

    const width = 360;
    const height = 360;
    const radius = Math.min(width, height) / 2 - 40;
    const center = { x: width / 2, y: height / 2 };

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const g = svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .append('g')
      .attr('transform', `translate(${center.x}, ${center.y})`);

    // Circular Grid Levels (0%, 25%, 50%, 75%, 100%)
    const levels = 5;
    const rScale = d3.scaleLinear().domain([0, 100]).range([0, radius]);

    // Draw Grid Circles
    for (let i = 1; i <= levels; i++) {
      const r = (radius / levels) * i;
      g.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', r)
        .attr('fill', 'none')
        .attr('stroke', '#cbd5e1')
        .attr('stroke-dasharray', '3 3')
        .attr('stroke-width', i === levels ? 1.5 : 0.75)
        .attr('opacity', 0.6);

      // Level percentage labels
      g.append('text')
        .attr('x', 4)
        .attr('y', -r + 4)
        .attr('fill', '#64748b')
        .attr('font-size', '9px')
        .attr('font-family', 'sans-serif')
        .text(`${(100 / levels) * i}%`);
    }

    // Angle scale
    const angleSlice = (Math.PI * 2) / data.length;

    // Draw Axis Lines & Labels
    data.forEach((d, i) => {
      const angle = angleSlice * i - Math.PI / 2;
      const lineCoordinates = {
        x2: radius * Math.cos(angle),
        y2: radius * Math.sin(angle),
      };

      // Axis line
      g.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', lineCoordinates.x2)
        .attr('y2', lineCoordinates.y2)
        .attr('stroke', '#94a3b8')
        .attr('stroke-width', 1)
        .attr('opacity', 0.5);

      // Label positioning
      const labelFactor = 1.25;
      const labelX = radius * labelFactor * Math.cos(angle);
      const labelY = radius * labelFactor * Math.sin(angle);

      g.append('text')
        .attr('class', 'radar-label')
        .attr('x', labelX)
        .attr('y', labelY)
        .attr('dy', '0.35em')
        .attr('text-anchor', labelX < -10 ? 'end' : labelX > 10 ? 'start' : 'middle')
        .attr('fill', d.key === selectedDomain ? '#0d7668' : '#334155')
        .attr('font-size', '11px')
        .attr('font-weight', d.key === selectedDomain ? '800' : '600')
        .text(d.axis);
    });

    // Radar Line Generator
    const radarLine = d3
      .radialLine<{ axis: string; value: number; realValue: number; key: string }>()
      .angle((_, i) => i * angleSlice)
      .d((d) => rScale(d.value))
      .curve(d3.curveLinearClosed);

    // Initial Path for transition animation
    const initialData = data.map((d) => ({ ...d, value: 0 }));
    const initialPath = radarLine(initialData);

    const targetPath = radarLine(data);

    // Radar Area Polygon with D3 Smooth Transition
    const polygon = g
      .append('path')
      .datum(initialData)
      .attr('d', initialPath)
      .attr('fill', '#0d7668')
      .attr('fill-opacity', 0.35)
      .attr('stroke', '#0d7668')
      .attr('stroke-width', 2.5);

    // Transition animation to target values
    polygon
      .transition()
      .duration(900)
      .ease(d3.easeElasticOut.amplitude(1).period(0.6))
      .attrTween('d', function () {
        const interpolate = d3.interpolateArray(initialData, data);
        return function (t) {
          return radarLine(interpolate(t)) || '';
        };
      });

    // Draw Interactive Data Points with D3 Transition
    const points = g
      .selectAll('.radar-point')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'radar-point')
      .attr('cx', (_, i) => {
        const angle = angleSlice * i - Math.PI / 2;
        return rScale(0) * Math.cos(angle);
      })
      .attr('cy', (_, i) => {
        const angle = angleSlice * i - Math.PI / 2;
        return rScale(0) * Math.sin(angle);
      })
      .attr('r', 5)
      .attr('fill', '#ffffff')
      .attr('stroke', '#0d7668')
      .attr('stroke-width', 2.5);

    points
      .transition()
      .duration(900)
      .delay((_, i) => i * 80)
      .ease(d3.easeBackOut.overshoot(1.5))
      .attr('cx', (d, i) => {
        const angle = angleSlice * i - Math.PI / 2;
        return rScale(d.value) * Math.cos(angle);
      })
      .attr('cy', (d, i) => {
        const angle = angleSlice * i - Math.PI / 2;
        return rScale(d.value) * Math.sin(angle);
      });

    // Tooltip interactivity on points
    points
      .on('mouseover', function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', 8)
          .attr('fill', '#0d7668');

        // Append tooltip group
        const angle = angleSlice * data.indexOf(d) - Math.PI / 2;
        const x = (rScale(d.value) + 20) * Math.cos(angle);
        const y = (rScale(d.value) + 20) * Math.sin(angle);

        const tip = g.append('g').attr('id', 'radar-tooltip').attr('transform', `translate(${x}, ${y})`);

        tip
          .append('rect')
          .attr('x', -40)
          .attr('y', -18)
          .attr('width', 80)
          .attr('height', 24)
          .attr('rx', 6)
          .attr('fill', '#0f172a')
          .attr('stroke', '#334155');

        tip
          .append('text')
          .attr('x', 0)
          .attr('y', -3)
          .attr('text-anchor', 'middle')
          .attr('fill', '#ffffff')
          .attr('font-size', '10px')
          .attr('font-weight', 'bold')
          .text(`${d.axis}: ${d.realValue}%`);
      })
      .on('mouseout', function () {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', 5)
          .attr('fill', '#ffffff');

        g.select('#radar-tooltip').remove();
      });

  }, [skills, selectedDomain]);

  return (
    <div className="w-full h-80 flex items-center justify-center relative">
      <svg ref={svgRef} className="w-full h-full max-w-[360px] max-h-[360px] overflow-visible" />
    </div>
  );
};
