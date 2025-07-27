import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeEffectProps {
  type: 'fire' | 'grass';
  isActive: boolean;
}

export const FireEffect: React.FC<ThreeEffectProps> = ({ isActive }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current || !isActive) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup - wider view to cover entire card
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(0, 0, 15);
    camera.lookAt(0, 0, 0);

    // Renderer setup - larger size to fill container with better quality
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(300, 300);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Flamethrower particles - wider spread to cover entire card
    const particleCount = 250; // More particles for denser effect
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const life = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Start particles in a wider area to cover the card
      positions[i * 3] = (Math.random() - 0.5) * 8; // Wider horizontal spread
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6; // Wider vertical spread
      positions[i * 3 + 2] = -5; // Start further back

      // Fire colors - more realistic fire gradient
      const intensity = Math.random();
      const heat = Math.random();
      colors[i * 3] = 1; // Full red
      colors[i * 3 + 1] = heat * 0.9 + 0.1; // Orange to yellow based on heat
      colors[i * 3 + 2] = intensity * 0.4; // Some blue for white hot center

      // Flamethrower velocity - spread across the card
      velocities[i * 3] = (Math.random() - 0.5) * 0.2; // Wider horizontal spread
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.1; // Wider vertical spread
      velocities[i * 3 + 2] = Math.random() * 0.4 + 0.3; // Fast forward motion

      sizes[i] = Math.random() * 0.4 + 0.15; // Varied particle sizes
      life[i] = Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 0.25,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      map: createFireTexture()
    });

    const particles = new THREE.Points(geometry, material);
    particlesRef.current = particles;
    scene.add(particles);

    // Enhanced lighting for realistic fire glow
    const fireLight = new THREE.PointLight(0xff6600, 2, 20);
    fireLight.position.set(0, 0, 0);
    fireLight.castShadow = true;
    scene.add(fireLight);

    // Add ambient light for better overall illumination
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);

    // Animation
    const animate = () => {
      if (!isActive) return;

      const positions = particles.geometry.attributes.position.array as Float32Array;
      const colors = particles.geometry.attributes.color.array as Float32Array;
      const sizes = particles.geometry.attributes.size.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        // Update positions
        positions[i * 3] += velocities[i * 3];
        positions[i * 3 + 1] += velocities[i * 3 + 1];
        positions[i * 3 + 2] += velocities[i * 3 + 2];

        // Enhanced turbulence with more realistic fire physics
        const time = Date.now() * 0.001;
        positions[i * 3] += Math.sin(time * 15 + i * 0.1) * 0.03;
        positions[i * 3 + 1] += Math.cos(time * 12 + i * 0.15) * 0.02;
        positions[i * 3 + 2] += Math.sin(time * 8 + i * 0.2) * 0.01;

        // Reset particles that go too far
        if (positions[i * 3 + 2] > 8) {
          positions[i * 3] = (Math.random() - 0.5) * 8;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
          positions[i * 3 + 2] = -5;
          
          // Reset velocity for new particles
          velocities[i * 3] = (Math.random() - 0.5) * 0.2;
          velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.1;
          velocities[i * 3 + 2] = Math.random() * 0.4 + 0.3;
        }

        // More realistic color transitions
        const distance = positions[i * 3 + 2] + 5;
        const coolness = Math.min(distance / 13, 1);
        const heatVariation = Math.sin(time * 5 + i) * 0.2 + 0.8;
        
        colors[i * 3] = 1; // Keep red
        colors[i * 3 + 1] = (1 - coolness) * 0.9 * heatVariation + 0.1; // Dynamic orange to yellow
        colors[i * 3 + 2] = coolness * 0.2 + (1 - coolness) * 0.3; // Blue for cooling

        // Dynamic size animation
        sizes[i] = Math.min(sizes[i] + 0.003, 0.5);
      }

      // Dynamic light movement
      fireLight.position.z = Math.sin(Date.now() * 0.01) * 1.5;
      fireLight.intensity = 1.5 + Math.sin(Date.now() * 0.02) * 0.5;

      particles.geometry.attributes.position.needsUpdate = true;
      particles.geometry.attributes.color.needsUpdate = true;
      particles.geometry.attributes.size.needsUpdate = true;

      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isActive]);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export const GrassEffect: React.FC<ThreeEffectProps> = ({ isActive }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current || !isActive) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup - wider view to cover entire card
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(0, 0, 15);
    camera.lookAt(0, 0, 0);

    // Renderer setup - larger size to fill container with better quality
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(300, 300);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Razor Leaf particles - cover entire card area
    const particleCount = 60; // More leaves for denser effect
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const rotations = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const life = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Start leaves from the left side across the entire card height
      positions[i * 3] = -8; // Start from left edge
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8; // Full height spread
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4; // Some depth variation

      // Leaf colors - more realistic green variations
      const greenIntensity = Math.random() * 0.4 + 0.6;
      const leafType = Math.random();
      colors[i * 3] = 0.1 + leafType * 0.1; // Slight red variation
      colors[i * 3 + 1] = greenIntensity + leafType * 0.2; // Bright green with variation
      colors[i * 3 + 2] = 0.1 + leafType * 0.1; // Slight blue variation

      // Razor Leaf velocity - spread across the entire card
      velocities[i * 3] = Math.random() * 0.6 + 0.4; // Fast rightward motion
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.2; // Vertical variation
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.1; // Depth variation

      // Rotation for spinning leaves
      rotations[i * 3] = Math.random() * 0.2 - 0.1; // X rotation
      rotations[i * 3 + 1] = Math.random() * 0.4 - 0.2; // Y rotation (main spin)
      rotations[i * 3 + 2] = Math.random() * 0.2 - 0.1; // Z rotation

      sizes[i] = Math.random() * 0.8 + 0.5; // Much larger leaves
      life[i] = Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Create leaf-shaped material using custom shader
    const material = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.NormalBlending,
      sizeAttenuation: true,
      map: createEnhancedLeafTexture()
    });

    const particles = new THREE.Points(geometry, material);
    particlesRef.current = particles;
    scene.add(particles);

    // Enhanced lighting for realistic leaf appearance
    const leafLight = new THREE.DirectionalLight(0x90EE90, 1);
    leafLight.position.set(5, 5, 5);
    scene.add(leafLight);

    // Add ambient light for better overall illumination
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    // Animation
    const animate = () => {
      if (!isActive) return;

      const positions = particles.geometry.attributes.position.array as Float32Array;
      const colors = particles.geometry.attributes.color.array as Float32Array;
      const sizes = particles.geometry.attributes.size.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        // Update positions with enhanced arc motion
        positions[i * 3] += velocities[i * 3];
        positions[i * 3 + 1] += velocities[i * 3 + 1];
        positions[i * 3 + 2] += velocities[i * 3 + 2];

        // Enhanced arc motion with more realistic physics
        const progress = (positions[i * 3] + 8) / 16; // 0 to 1
        const arcHeight = Math.sin(progress * Math.PI) * 0.04;
        positions[i * 3 + 1] += arcHeight;

        // More realistic wobble with varying frequencies
        const time = Date.now() * 0.001;
        positions[i * 3] += Math.sin(time * 25 + i * 0.3) * 0.025;
        positions[i * 3 + 1] += Math.cos(time * 20 + i * 0.4) * 0.015;
        positions[i * 3 + 2] += Math.sin(time * 15 + i * 0.5) * 0.01;

        // Reset leaves that go too far right
        if (positions[i * 3] > 8) {
          positions[i * 3] = -8;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
          
          // Reset velocity with slight variation
          velocities[i * 3] = Math.random() * 0.6 + 0.4;
          velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.2;
          velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
        }

        // Enhanced color animation with more realistic leaf aging
        const distance = positions[i * 3] + 8;
        const darkening = Math.min(distance / 16, 1) * 0.3;
        const colorVariation = Math.sin(time * 3 + i) * 0.1 + 0.9;
        colors[i * 3 + 1] = Math.max(0.3, colors[i * 3 + 1] - darkening) * colorVariation;

        // Dynamic size animation with more variation
        sizes[i] = Math.max(0.4, sizes[i] - 0.003 + Math.sin(time * 2 + i) * 0.001);
      }

      // Enhanced rotation for more dynamic spinning effect
      particles.rotation.y += 0.025;
      particles.rotation.x += 0.005;

      particles.geometry.attributes.position.needsUpdate = true;
      particles.geometry.attributes.color.needsUpdate = true;
      particles.geometry.attributes.size.needsUpdate = true;

      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isActive]);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

// Helper function to create a fire texture
function createFireTexture(): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d')!;

  // Create fire particle with gradient
  const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)'); // White hot center
  gradient.addColorStop(0.3, 'rgba(255, 200, 100, 0.8)'); // Yellow
  gradient.addColorStop(0.6, 'rgba(255, 100, 50, 0.6)'); // Orange
  gradient.addColorStop(1, 'rgba(255, 50, 0, 0)'); // Red to transparent

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 32, 32);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Helper function to create an enhanced leaf texture
function createEnhancedLeafTexture(): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  // Create leaf shape with more detail
  ctx.fillStyle = 'rgba(0, 0, 0, 0)';
  ctx.fillRect(0, 0, 64, 64);

  // Draw leaf outline with more realistic shape
  ctx.strokeStyle = '#2E7D32';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(32, 32, 20, 10, Math.PI / 6, 0, 2 * Math.PI);
  ctx.stroke();

  // Fill leaf with gradient
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 25);
  gradient.addColorStop(0, '#4CAF50');
  gradient.addColorStop(0.7, '#66BB6A');
  gradient.addColorStop(1, '#81C784');
  ctx.fillStyle = gradient;
  ctx.fill();

  // Add detailed leaf veins
  ctx.strokeStyle = '#2E7D32';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(32, 22);
  ctx.lineTo(32, 42);
  ctx.stroke();

  // Add side veins
  ctx.lineWidth = 1;
  for (let i = 0; i < 3; i++) {
    const y = 26 + i * 4;
    ctx.beginPath();
    ctx.moveTo(32, y);
    ctx.lineTo(25, y - 2);
    ctx.moveTo(32, y);
    ctx.lineTo(39, y + 2);
    ctx.stroke();
  }

  // Add leaf texture details
  ctx.fillStyle = 'rgba(76, 175, 80, 0.3)';
  for (let i = 0; i < 8; i++) {
    const x = 20 + Math.random() * 24;
    const y = 20 + Math.random() * 24;
    ctx.beginPath();
    ctx.arc(x, y, 1, 0, 2 * Math.PI);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
} 