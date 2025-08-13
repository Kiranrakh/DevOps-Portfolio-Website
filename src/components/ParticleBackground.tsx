import React, { useEffect, useRef } from 'react';

interface DevOpsNode {
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  type: 'server' | 'cloud' | 'container' | 'pipeline' | 'monitor';
  color: string;
  pulsePhase: number;
  connections: number[];
}

interface DataFlow {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  progress: number;
  speed: number;
  color: string;
  opacity: number;
}

interface CodeBlock {
  x: number;
  y: number;
  dx: number;
  dy: number;
  width: number;
  height: number;
  opacity: number;
  lines: string[];
}

interface ParticleBackgroundProps {
  isDarkMode: boolean;
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ isDarkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<DevOpsNode[]>([]);
  const dataFlowsRef = useRef<DataFlow[]>([]);
  const codeBlocksRef = useRef<CodeBlock[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createElements = () => {
      nodesRef.current = [];
      dataFlowsRef.current = [];
      codeBlocksRef.current = [];
      
      // Professional DevOps color schemes
      const darkColors = {
        primary: ['rgba(59, 130, 246, 0.8)', 'rgba(99, 102, 241, 0.8)', 'rgba(139, 92, 246, 0.8)'], // Blues/Purples
        secondary: ['rgba(16, 185, 129, 0.7)', 'rgba(34, 197, 94, 0.7)', 'rgba(59, 130, 246, 0.7)'], // Greens/Blues
        accent: ['rgba(245, 158, 11, 0.6)', 'rgba(249, 115, 22, 0.6)', 'rgba(239, 68, 68, 0.6)'], // Oranges/Reds
        grid: 'rgba(59, 130, 246, 0.15)',
        background: 'rgba(15, 23, 42, 0.95)'
      };

      const lightColors = {
        primary: ['rgba(59, 130, 246, 0.9)', 'rgba(99, 102, 241, 0.9)', 'rgba(139, 92, 246, 0.9)'],
        secondary: ['rgba(16, 185, 129, 0.8)', 'rgba(34, 197, 94, 0.8)', 'rgba(59, 130, 246, 0.8)'],
        accent: ['rgba(245, 158, 11, 0.7)', 'rgba(249, 115, 22, 0.7)', 'rgba(239, 68, 68, 0.7)'],
        grid: 'rgba(59, 130, 246, 0.25)',
        background: 'rgba(248, 250, 252, 0.95)'
      };

      const colors = isDarkMode ? darkColors : lightColors;
      const allColors = [...colors.primary, ...colors.secondary, ...colors.accent];

      // Create DevOps infrastructure nodes
      const nodeCount = 12;
      for (let i = 0; i < nodeCount; i++) {
        const types: DevOpsNode['type'][] = ['server', 'cloud', 'container', 'pipeline', 'monitor'];
        nodesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          dx: (Math.random() - 0.5) * 0.8,
          dy: (Math.random() - 0.5) * 0.8,
          size: Math.random() * 40 + 30,
          type: types[Math.floor(Math.random() * types.length)],
          color: allColors[Math.floor(Math.random() * allColors.length)],
          pulsePhase: Math.random() * Math.PI * 2,
          connections: [],
        });
      }

      // Create data flows between nodes
      for (let i = 0; i < 8; i++) {
        const sourceNode = nodesRef.current[Math.floor(Math.random() * nodesRef.current.length)];
        const targetNode = nodesRef.current[Math.floor(Math.random() * nodesRef.current.length)];
        
        if (sourceNode !== targetNode) {
          dataFlowsRef.current.push({
            x: sourceNode.x,
            y: sourceNode.y,
            targetX: targetNode.x,
            targetY: targetNode.y,
            progress: 0,
            speed: Math.random() * 0.02 + 0.01,
            color: allColors[Math.floor(Math.random() * allColors.length)],
            opacity: Math.random() * 0.8 + 0.4,
          });
        }
      }

      // Create floating code blocks
      const codeSnippets = [
        ['apiVersion: v1', 'kind: Pod', 'metadata:', '  name: app'],
        ['FROM node:alpine', 'COPY . /app', 'RUN npm install', 'EXPOSE 3000'],
        ['pipeline {', '  agent any', '  stages {', '    stage("Build")'],
        ['resource "aws_instance"', 'ami = "ami-12345"', 'instance_type = "t3.micro"'],
        ['prometheus:', '  scrape_configs:', '  - job_name: "app"', '    targets: ["app:3000"]'],
      ];

      for (let i = 0; i < 6; i++) {
        codeBlocksRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          dx: (Math.random() - 0.5) * 0.3,
          dy: (Math.random() - 0.5) * 0.3,
          width: 200,
          height: 80,
          opacity: Math.random() * 0.4 + 0.2,
          lines: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
        });
      }
    };

    const drawDevOpsNode = (ctx: CanvasRenderingContext2D, node: DevOpsNode) => {
      const { x, y, size, type, color, pulsePhase } = node;
      
      const pulseScale = 1 + Math.sin(pulsePhase) * 0.2;
      const nodeSize = size * pulseScale;
      
      ctx.save();
      ctx.translate(x, y);
      
      // Outer glow
      ctx.shadowColor = color;
      ctx.shadowBlur = 20;
      ctx.globalAlpha = 0.8;
      
      // Node background
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, nodeSize/2);
      gradient.addColorStop(0, color);
      gradient.addColorStop(0.7, color.replace(/[\d\.]+\)$/g, '0.4)'));
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, nodeSize/2, 0, Math.PI * 2);
      ctx.fill();
      
      // Node icon representation
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      
      switch (type) {
        case 'server':
          // Server rack representation
          for (let i = 0; i < 3; i++) {
            ctx.strokeRect(-nodeSize/4, -nodeSize/4 + i * 6, nodeSize/2, 4);
          }
          break;
        case 'cloud':
          // Cloud shape
          ctx.beginPath();
          ctx.arc(-nodeSize/6, 0, nodeSize/6, 0, Math.PI * 2);
          ctx.arc(nodeSize/6, 0, nodeSize/6, 0, Math.PI * 2);
          ctx.arc(0, -nodeSize/8, nodeSize/5, 0, Math.PI * 2);
          ctx.stroke();
          break;
        case 'container':
          // Container box
          ctx.strokeRect(-nodeSize/4, -nodeSize/4, nodeSize/2, nodeSize/2);
          ctx.strokeRect(-nodeSize/6, -nodeSize/6, nodeSize/3, nodeSize/3);
          break;
        case 'pipeline':
          // Pipeline arrows
          ctx.beginPath();
          ctx.moveTo(-nodeSize/4, 0);
          ctx.lineTo(nodeSize/4, 0);
          ctx.moveTo(nodeSize/6, -nodeSize/8);
          ctx.lineTo(nodeSize/4, 0);
          ctx.lineTo(nodeSize/6, nodeSize/8);
          ctx.stroke();
          break;
        case 'monitor':
          // Monitor screen
          ctx.strokeRect(-nodeSize/4, -nodeSize/6, nodeSize/2, nodeSize/3);
          ctx.strokeRect(-nodeSize/5, nodeSize/6, nodeSize/2.5, nodeSize/8);
          break;
      }
      
      ctx.restore();
    };

    const drawDataFlow = (ctx: CanvasRenderingContext2D, flow: DataFlow) => {
      const { x, y, targetX, targetY, progress, color, opacity } = flow;
      
      const currentX = x + (targetX - x) * progress;
      const currentY = y + (targetY - y) * progress;
      
      // Data packet
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 10;
      
      ctx.beginPath();
      ctx.arc(currentX, currentY, 4, 0, Math.PI * 2);
      ctx.fill();
      
      // Trail effect
      for (let i = 1; i <= 5; i++) {
        const trailProgress = Math.max(0, progress - i * 0.05);
        const trailX = x + (targetX - x) * trailProgress;
        const trailY = y + (targetY - y) * trailProgress;
        
        ctx.globalAlpha = opacity * (1 - i * 0.2);
        ctx.beginPath();
        ctx.arc(trailX, trailY, 4 - i * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.restore();
    };

    const drawCodeBlock = (ctx: CanvasRenderingContext2D, block: CodeBlock) => {
      const { x, y, width, height, opacity, lines } = block;
      
      ctx.save();
      ctx.globalAlpha = opacity;
      
      // Code block background
      const bgColor = isDarkMode ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.9)';
      ctx.fillStyle = bgColor;
      ctx.fillRect(x, y, width, height);
      
      // Border
      ctx.strokeStyle = isDarkMode ? 'rgba(59, 130, 246, 0.5)' : 'rgba(59, 130, 246, 0.7)';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, width, height);
      
      // Code lines
      ctx.fillStyle = isDarkMode ? 'rgba(148, 163, 184, 0.8)' : 'rgba(51, 65, 85, 0.8)';
      ctx.font = '10px monospace';
      
      lines.forEach((line, index) => {
        ctx.fillText(line, x + 8, y + 16 + index * 14);
      });
      
      ctx.restore();
    };

    const animate = () => {
      const time = Date.now() * 0.001;
      
      // Professional gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width/2 + Math.sin(time * 0.2) * 100, 
        canvas.height/2 + Math.cos(time * 0.15) * 80, 
        0,
        canvas.width/2, 
        canvas.height/2, 
        Math.max(canvas.width, canvas.height) * 0.8
      );
      
      if (isDarkMode) {
        gradient.addColorStop(0, 'rgba(15, 23, 42, 0.98)');
        gradient.addColorStop(0.3, 'rgba(30, 41, 59, 0.95)');
        gradient.addColorStop(0.6, 'rgba(51, 65, 85, 0.92)');
        gradient.addColorStop(1, 'rgba(15, 23, 42, 0.98)');
      } else {
        gradient.addColorStop(0, 'rgba(248, 250, 252, 0.98)');
        gradient.addColorStop(0.3, 'rgba(241, 245, 249, 0.95)');
        gradient.addColorStop(0.6, 'rgba(226, 232, 240, 0.92)');
        gradient.addColorStop(1, 'rgba(248, 250, 252, 0.98)');
      }
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Professional grid pattern
      const colors = isDarkMode ? 
        { grid: 'rgba(59, 130, 246, 0.12)' } : 
        { grid: 'rgba(59, 130, 246, 0.18)' };
      
      ctx.strokeStyle = colors.grid;
      ctx.lineWidth = 0.5;
      
      const gridSize = 120;
      const offsetX = (time * 10) % gridSize;
      const offsetY = (time * 8) % gridSize;
      
      // Vertical lines
      for (let x = -gridSize + offsetX; x < canvas.width + gridSize; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let y = -gridSize + offsetY; y < canvas.height + gridSize; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Update and draw code blocks
      codeBlocksRef.current.forEach((block) => {
        block.x += block.dx;
        block.y += block.dy;
        
        // Wrap around edges
        if (block.x < -block.width) block.x = canvas.width;
        if (block.x > canvas.width) block.x = -block.width;
        if (block.y < -block.height) block.y = canvas.height;
        if (block.y > canvas.height) block.y = -block.height;
        
        drawCodeBlock(ctx, block);
      });

      // Update and draw DevOps nodes
      nodesRef.current.forEach((node) => {
        node.x += node.dx;
        node.y += node.dy;
        node.pulsePhase += 0.03;
        
        // Wrap around edges
        if (node.x < -node.size) node.x = canvas.width + node.size;
        if (node.x > canvas.width + node.size) node.x = -node.size;
        if (node.y < -node.size) node.y = canvas.height + node.size;
        if (node.y > canvas.height + node.size) node.y = -node.size;
        
        drawDevOpsNode(ctx, node);
      });

      // Update and draw data flows
      dataFlowsRef.current.forEach((flow, index) => {
        flow.progress += flow.speed;
        
        if (flow.progress >= 1) {
          // Reset flow with new random nodes
          const sourceNode = nodesRef.current[Math.floor(Math.random() * nodesRef.current.length)];
          const targetNode = nodesRef.current[Math.floor(Math.random() * nodesRef.current.length)];
          
          if (sourceNode !== targetNode) {
            flow.x = sourceNode.x;
            flow.y = sourceNode.y;
            flow.targetX = targetNode.x;
            flow.targetY = targetNode.y;
            flow.progress = 0;
          }
        }
        
        drawDataFlow(ctx, flow);
      });

      // Draw connections between nearby nodes
      nodesRef.current.forEach((node, i) => {
        nodesRef.current.slice(i + 1).forEach((otherNode) => {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 200) {
            const gradient = ctx.createLinearGradient(
              node.x, node.y, 
              otherNode.x, otherNode.y
            );
            gradient.addColorStop(0, node.color);
            gradient.addColorStop(1, otherNode.color);
            
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            
            const connectionOpacity = (isDarkMode ? 0.2 : 0.3) * (1 - distance / 200);
            ctx.globalAlpha = connectionOpacity;
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createElements();
    animate();

    const handleResize = () => {
      resizeCanvas();
      createElements();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.85 }}
    />
  );
};