// @ts-nocheck
"use client";
import React, { useEffect, useRef, useState } from 'react';
import { GifReader } from 'omggif';

interface GifPlayerProps {
  src: string;
  alt?: string;
}

export default function GifPlayer({ src, alt }: GifPlayerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    let timeoutId: any = null;

    async function loadAndPlayGif() {
      try {
        const response = await fetch(src);
        if (!response.ok) {
          throw new Error(`Failed to fetch GIF from ${src}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        if (!active) return;

        const reader = new GifReader(new Uint8Array(arrayBuffer));
        const width = reader.width;
        const height = reader.height;
        const numFrames = reader.numFrames();

        if (numFrames === 0) {
          throw new Error("GIF has no frames");
        }

        // Decode frames and track their delays
        const frames: { buffer: Uint8ClampedArray; delay: number }[] = [];
        const rgbaBuffer = new Uint8ClampedArray(width * height * 4);
        let totalDuration = 0;
        const delays: number[] = [];

        for (let i = 0; i < numFrames; i++) {
          reader.decodeAndBlitFrameRGBA(i, rgbaBuffer);
          const frameInfo = reader.frameInfo(i);
          // omggif delay is in hundredths of a second
          const delay = Math.max(10, (frameInfo.delay || 10) * 10);
          
          frames.push({
            buffer: new Uint8ClampedArray(rgbaBuffer),
            delay,
          });
          delays.push(delay);
          totalDuration += delay;
        }

        if (!active) return;
        setIsLoading(false);

        // Find the start frame of the loop (last 2 seconds = 2000 ms)
        let accumulatedTime = 0;
        let loopStartIndex = 0;
        for (let i = numFrames - 1; i >= 0; i--) {
          accumulatedTime += delays[i];
          if (accumulatedTime >= 2000) {
            loopStartIndex = i;
            break;
          }
        }

        // Wait for canvas to be mounted and ready
        setTimeout(() => {
          if (!active) return;
          const canvas = canvasRef.current;
          if (!canvas) return;

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          let currentFrame = 0;

          function tick() {
            if (!active) return;
            const frame = frames[currentFrame];
            const imgData = new ImageData(frame.buffer, width, height);
            ctx.putImageData(imgData, 0, 0);

            currentFrame++;
            if (currentFrame >= numFrames) {
              currentFrame = loopStartIndex;
            }

            timeoutId = setTimeout(tick, frame.delay);
          }

          tick();
        }, 50);
      } catch (err: any) {
        console.error("GifPlayer error:", err);
        if (active) {
          setError(err.message || "Failed to load GIF");
          setIsLoading(false);
        }
      }
    }

    loadAndPlayGif();

    return () => {
      active = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [src]);

  if (isLoading) {
    return (
      <div className="browser-body-loading" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        minHeight: '200px',
        background: '#0a0a0a',
        padding: '20px',
        boxSizing: 'border-box'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          width: '80%'
        }}>
          <div style={{ height: '8px', background: '#222', borderRadius: '4px', width: '100%', animation: 'pulse 1.5s infinite ease-in-out' }} />
          <div style={{ height: '8px', background: '#222', borderRadius: '4px', width: '70%', animation: 'pulse 1.5s infinite ease-in-out' }} />
          <div style={{ height: '8px', background: '#222', borderRadius: '4px', width: '50%', animation: 'pulse 1.5s infinite ease-in-out' }} />
          <div style={{
            marginTop: '20px',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            borderTop: '2px solid #3b82f6',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            animation: 'spin 1s linear infinite'
          }} />
        </div>
        <style>{`
          @keyframes pulse {
            0% { opacity: 0.3; }
            50% { opacity: 0.6; }
            100% { opacity: 0.3; }
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        minHeight: '200px',
        color: '#ef4444',
        background: '#0a0a0a',
        fontSize: '14px',
        padding: '20px',
        textAlign: 'center'
      }}>
        Failed to load demonstration.
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        display: 'block',
      }}
      aria-label={alt}
    />
  );
}
