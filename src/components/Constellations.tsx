import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

interface ConstellationsProps {
  isVisible: boolean;
}

export default function Constellations({ isVisible }: ConstellationsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialise nodes
    nodesRef.current = [];
    for (let i = 0; i < 50; i++) {
      nodesRef.current.push({
        x: Math.random() * canvas.width, // initialise at a random position
        y: Math.random() * canvas.height, // then go somewhere randomly
        vx: (Math.random() - 0.5) * 0.4, // that little factor is the velocity
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
      });
    }

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Only draw if visible
      if (isVisible) {
        // Update and draw nodes
        nodesRef.current.forEach(node => {
          // Update position
          node.x += node.vx;
          node.y += node.vy;

          // Bounce off edges
          if (node.x <= 0 || node.x >= canvas.width) {
            node.vx = -node.vx;
            node.x = Math.max(0, Math.min(canvas.width, node.x));
          }
          if (node.y <= 0 || node.y >= canvas.height) {
            node.vy = -node.vy;
            node.y = Math.max(0, Math.min(canvas.height, node.y));
          }

          // Draw node
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(245, 158, 11, 0.6)'; // Amber color
          ctx.fill();
        });

        // Draw connections
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.2)';
        ctx.lineWidth = 1;

        for (let i = 0; i < nodesRef.current.length; i++) {
          for (let j = i + 1; j < nodesRef.current.length; j++) {
            const nodeA = nodesRef.current[i];
            const nodeB = nodesRef.current[j];
            const distance = Math.sqrt(
              Math.pow(nodeA.x - nodeB.x, 2) + Math.pow(nodeA.y - nodeB.y, 2)
            );

            // They only connect if they are close enough
            if (distance < 150) {
              ctx.beginPath();
              ctx.moveTo(nodeA.x, nodeA.y);
              ctx.lineTo(nodeB.x, nodeB.y);
              ctx.stroke();
            }
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
