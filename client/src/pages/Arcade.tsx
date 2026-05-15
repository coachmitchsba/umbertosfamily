/*
 * Pizza Arcade — Umberto's Family Pizzeria
 * Design: Retro arcade game — pizza catcher / Pac-Man style
 * Player moves a pizza box left/right to catch falling pizza slices
 * Lives system, score, levels, high score, discount code reveal
 */
import { useEffect, useRef, useState, useCallback } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { ArrowRight, Trophy, Heart, Gamepad2, RotateCcw, Home } from "lucide-react";

const CANVAS_W = 480;
const CANVAS_H = 560;
const BOX_W = 72;
const BOX_H = 18;
const BOX_Y = CANVAS_H - 36;
const BOX_SPEED = 7;
const PIZZA_RADIUS = 16;
const INITIAL_LIVES = 3;
const DISCOUNT_SCORE = 500;

type Pizza = { x: number; y: number; speed: number; type: "grandma" | "round" | "slice"; rot: number; rotSpeed: number };
type Particle = { x: number; y: number; vx: number; vy: number; life: number; color: string; size: number };

const PIZZA_TYPES: Pizza["type"][] = ["grandma", "round", "slice"];
const PIZZA_COLORS: Record<Pizza["type"], string> = {
  grandma: "#e8a020",
  round: "#cc3311",
  slice: "#f5c842",
};
const PIZZA_POINTS: Record<Pizza["type"], number> = {
  grandma: 30,
  round: 10,
  slice: 20,
};

function drawPizza(ctx: CanvasRenderingContext2D, p: Pizza) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rot);

  if (p.type === "grandma") {
    // Square grandma slice
    ctx.fillStyle = "#e8a020";
    ctx.fillRect(-14, -14, 28, 28);
    ctx.fillStyle = "#cc3311";
    ctx.fillRect(-11, -11, 22, 22);
    ctx.fillStyle = "#f5f0e0";
    ctx.beginPath();
    ctx.arc(-4, -4, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(4, 4, 3, 0, Math.PI * 2);
    ctx.fill();
    // Border
    ctx.strokeStyle = "#c47800";
    ctx.lineWidth = 2;
    ctx.strokeRect(-14, -14, 28, 28);
  } else if (p.type === "round") {
    // Round pizza
    ctx.fillStyle = "#e8a020";
    ctx.beginPath();
    ctx.arc(0, 0, PIZZA_RADIUS, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#cc3311";
    ctx.beginPath();
    ctx.arc(0, 0, PIZZA_RADIUS - 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#f5f0e0";
    for (let i = 0; i < 3; i++) {
      const angle = (i / 3) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(Math.cos(angle) * 6, Math.sin(angle) * 6, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.strokeStyle = "#c47800";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, PIZZA_RADIUS, 0, Math.PI * 2);
    ctx.stroke();
  } else {
    // Triangle slice
    ctx.fillStyle = "#e8a020";
    ctx.beginPath();
    ctx.moveTo(0, -PIZZA_RADIUS);
    ctx.lineTo(PIZZA_RADIUS * 0.85, PIZZA_RADIUS * 0.6);
    ctx.lineTo(-PIZZA_RADIUS * 0.85, PIZZA_RADIUS * 0.6);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#cc3311";
    ctx.beginPath();
    ctx.moveTo(0, -PIZZA_RADIUS + 5);
    ctx.lineTo(PIZZA_RADIUS * 0.65, PIZZA_RADIUS * 0.4);
    ctx.lineTo(-PIZZA_RADIUS * 0.65, PIZZA_RADIUS * 0.4);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#f5f0e0";
    ctx.beginPath();
    ctx.arc(0, 0, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#c47800";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, -PIZZA_RADIUS);
    ctx.lineTo(PIZZA_RADIUS * 0.85, PIZZA_RADIUS * 0.6);
    ctx.lineTo(-PIZZA_RADIUS * 0.85, PIZZA_RADIUS * 0.6);
    ctx.closePath();
    ctx.stroke();
  }
  ctx.restore();
}

function drawBox(ctx: CanvasRenderingContext2D, x: number) {
  // Pizza box
  ctx.fillStyle = "#cc3311";
  ctx.fillRect(x, BOX_Y, BOX_W, BOX_H);
  ctx.fillStyle = "#a82200";
  ctx.fillRect(x, BOX_Y, BOX_W, 5);
  ctx.fillStyle = "#fff";
  ctx.font = "bold 7px 'Bebas Neue', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("UMBERTO'S", x + BOX_W / 2, BOX_Y + 13);
  ctx.strokeStyle = "#8a1a00";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(x, BOX_Y, BOX_W, BOX_H);
}

function createParticles(x: number, y: number, color: string): Particle[] {
  return Array.from({ length: 8 }, () => ({
    x, y,
    vx: (Math.random() - 0.5) * 6,
    vy: (Math.random() - 0.5) * 6 - 2,
    life: 1,
    color,
    size: Math.random() * 5 + 2,
  }));
}

export default function Arcade() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    boxX: CANVAS_W / 2 - BOX_W / 2,
    pizzas: [] as Pizza[],
    particles: [] as Particle[],
    score: 0,
    lives: INITIAL_LIVES,
    level: 1,
    gameOver: false,
    won: false,
    running: false,
    keys: { left: false, right: false },
    spawnTimer: 0,
    spawnInterval: 90,
    frameCount: 0,
    highScore: parseInt(localStorage.getItem("umbertos_hiscore") || "0"),
  });

  const [uiState, setUiState] = useState({
    score: 0, lives: INITIAL_LIVES, level: 1,
    gameOver: false, won: false, running: false,
    highScore: parseInt(localStorage.getItem("umbertos_hiscore") || "0"),
  });

  const animRef = useRef<number>(0);

  const spawnPizza = useCallback(() => {
    const s = stateRef.current;
    const type = PIZZA_TYPES[Math.floor(Math.random() * PIZZA_TYPES.length)];
    const speed = 2.2 + s.level * 0.6 + Math.random() * 1.2;
    s.pizzas.push({
      x: PIZZA_RADIUS + Math.random() * (CANVAS_W - PIZZA_RADIUS * 2),
      y: -PIZZA_RADIUS,
      speed,
      type,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.08,
    });
  }, []);

  const resetGame = useCallback(() => {
    const s = stateRef.current;
    s.boxX = CANVAS_W / 2 - BOX_W / 2;
    s.pizzas = [];
    s.particles = [];
    s.score = 0;
    s.lives = INITIAL_LIVES;
    s.level = 1;
    s.gameOver = false;
    s.won = false;
    s.running = true;
    s.spawnTimer = 0;
    s.spawnInterval = 90;
    s.frameCount = 0;
    setUiState({ score: 0, lives: INITIAL_LIVES, level: 1, gameOver: false, won: false, running: true, highScore: s.highScore });
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const s = stateRef.current;
      if (e.type === "keydown") {
        if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") s.keys.left = true;
        if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") s.keys.right = true;
        if ((e.key === "Enter" || e.key === " ") && !s.running) resetGame();
      }
      if (e.type === "keyup") {
        if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") s.keys.left = false;
        if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") s.keys.right = false;
      }
    };
    window.addEventListener("keydown", handleKey);
    window.addEventListener("keyup", handleKey);
    return () => { window.removeEventListener("keydown", handleKey); window.removeEventListener("keyup", handleKey); };
  }, [resetGame]);

  // Touch/swipe controls
  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchMove = (e: React.TouchEvent) => {
    const s = stateRef.current;
    if (!s.running) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    s.boxX = Math.max(0, Math.min(CANVAS_W - BOX_W, s.boxX + dx * 0.8));
    touchStartX.current = e.touches[0].clientX;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const loop = () => {
      const s = stateRef.current;
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

      // Background — checkered retro
      for (let row = 0; row < CANVAS_H / 40; row++) {
        for (let col = 0; col < CANVAS_W / 40; col++) {
          ctx.fillStyle = (row + col) % 2 === 0 ? "#fff8f0" : "#fff2e4";
          ctx.fillRect(col * 40, row * 40, 40, 40);
        }
      }

      // Ground line
      ctx.strokeStyle = "#cc3311";
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.moveTo(0, BOX_Y - 6);
      ctx.lineTo(CANVAS_W, BOX_Y - 6);
      ctx.stroke();
      ctx.setLineDash([]);

      if (!s.running) {
        // Title screen
        ctx.fillStyle = "rgba(255,248,240,0.92)";
        ctx.fillRect(40, 80, CANVAS_W - 80, CANVAS_H - 160);
        ctx.strokeStyle = "#cc3311";
        ctx.lineWidth = 3;
        ctx.strokeRect(40, 80, CANVAS_W - 80, CANVAS_H - 160);

        ctx.fillStyle = "#cc3311";
        ctx.font = "bold 38px 'Bebas Neue', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("PIZZA CATCHER!", CANVAS_W / 2, 148);

        ctx.fillStyle = "#333";
        ctx.font = "14px DM Sans, sans-serif";
        ctx.fillText("Catch the falling pizza slices!", CANVAS_W / 2, 178);
        ctx.fillText("Use ← → arrow keys or A/D to move", CANVAS_W / 2, 200);
        ctx.fillText("Swipe left/right on mobile", CANVAS_W / 2, 220);

        // Draw example pizzas
        const demoTypes: Pizza["type"][] = ["grandma", "round", "slice"];
        demoTypes.forEach((t, i) => {
          drawPizza(ctx, { x: 140 + i * 80, y: 280, type: t, speed: 0, rot: 0, rotSpeed: 0 });
        });
        ctx.fillStyle = "#666";
        ctx.font = "11px DM Sans, sans-serif";
        ctx.fillText("Grandma +30", 140, 310);
        ctx.fillText("Round +10", 220, 310);
        ctx.fillText("Slice +20", 300, 310);

        ctx.fillStyle = "#cc3311";
        ctx.font = "bold 16px 'Bebas Neue', sans-serif";
        ctx.fillText(`HIGH SCORE: ${s.highScore}`, CANVAS_W / 2, 350);

        ctx.fillStyle = "#fff";
        ctx.fillRect(CANVAS_W / 2 - 90, 370, 180, 42);
        ctx.strokeStyle = "#cc3311";
        ctx.lineWidth = 2;
        ctx.strokeRect(CANVAS_W / 2 - 90, 370, 180, 42);
        ctx.fillStyle = "#cc3311";
        ctx.font = "bold 20px 'Bebas Neue', sans-serif";
        ctx.fillText(s.gameOver ? "PLAY AGAIN!" : "PRESS ENTER TO PLAY", CANVAS_W / 2, 397);

        if (s.gameOver) {
          ctx.fillStyle = "#333";
          ctx.font = "14px DM Sans, sans-serif";
          ctx.fillText(`Final Score: ${s.score}`, CANVAS_W / 2, 440);
          if (s.score >= DISCOUNT_SCORE) {
            ctx.fillStyle = "#cc3311";
            ctx.font = "bold 14px DM Sans, sans-serif";
            ctx.fillText("🎉 Use code PIZZA10 for 10% off!", CANVAS_W / 2, 465);
          }
        }

        animRef.current = requestAnimationFrame(loop);
        return;
      }

      // === GAME LOOP ===
      s.frameCount++;

      // Move box
      if (s.keys.left) s.boxX = Math.max(0, s.boxX - BOX_SPEED);
      if (s.keys.right) s.boxX = Math.min(CANVAS_W - BOX_W, s.boxX + BOX_SPEED);

      // Spawn
      s.spawnTimer++;
      if (s.spawnTimer >= s.spawnInterval) {
        spawnPizza();
        s.spawnTimer = 0;
        s.spawnInterval = Math.max(28, s.spawnInterval - 0.5);
      }

      // Level up every 100 points
      const newLevel = Math.floor(s.score / 100) + 1;
      if (newLevel !== s.level) s.level = newLevel;

      // Update pizzas
      s.pizzas = s.pizzas.filter((p) => {
        p.y += p.speed;
        p.rot += p.rotSpeed;

        // Catch check
        if (p.y + PIZZA_RADIUS >= BOX_Y && p.y - PIZZA_RADIUS <= BOX_Y + BOX_H && p.x >= s.boxX - PIZZA_RADIUS && p.x <= s.boxX + BOX_W + PIZZA_RADIUS) {
          s.score += PIZZA_POINTS[p.type];
          s.particles.push(...createParticles(p.x, BOX_Y, PIZZA_COLORS[p.type]));
          if (s.score > s.highScore) {
            s.highScore = s.score;
            localStorage.setItem("umbertos_hiscore", String(s.highScore));
          }
          return false;
        }

        // Missed
        if (p.y > CANVAS_H + PIZZA_RADIUS) {
          s.lives--;
          s.particles.push(...createParticles(p.x, CANVAS_H - 20, "#ff4444"));
          if (s.lives <= 0) {
            s.running = false;
            s.gameOver = true;
            setUiState((prev) => ({ ...prev, score: s.score, lives: 0, gameOver: true, running: false, highScore: s.highScore }));
          } else {
            setUiState((prev) => ({ ...prev, lives: s.lives }));
          }
          return false;
        }
        return true;
      });

      // Update particles
      s.particles = s.particles.filter((pt) => {
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.vy += 0.2;
        pt.life -= 0.04;
        return pt.life > 0;
      });

      // Draw particles
      s.particles.forEach((pt) => {
        ctx.globalAlpha = pt.life;
        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // Draw pizzas
      s.pizzas.forEach((p) => drawPizza(ctx, p));

      // Draw box
      drawBox(ctx, s.boxX);

      // HUD
      ctx.fillStyle = "#cc3311";
      ctx.font = "bold 18px 'Bebas Neue', sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(`SCORE: ${s.score}`, 12, 24);
      ctx.textAlign = "right";
      ctx.fillText(`BEST: ${s.highScore}`, CANVAS_W - 12, 24);
      ctx.textAlign = "center";
      ctx.fillText(`LEVEL ${s.level}`, CANVAS_W / 2, 24);

      // Lives (pizza icons)
      ctx.textAlign = "left";
      ctx.font = "16px sans-serif";
      for (let i = 0; i < s.lives; i++) {
        ctx.fillText("🍕", 10 + i * 24, 46);
      }

      // Score target bar
      const progress = Math.min(s.score / DISCOUNT_SCORE, 1);
      ctx.fillStyle = "#e8d5c0";
      ctx.fillRect(12, CANVAS_H - 18, CANVAS_W - 24, 8);
      ctx.fillStyle = "#cc3311";
      ctx.fillRect(12, CANVAS_H - 18, (CANVAS_W - 24) * progress, 8);
      ctx.fillStyle = "#666";
      ctx.font = "9px DM Sans, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`Catch ${DISCOUNT_SCORE} pts for a discount code!`, CANVAS_W / 2, CANVAS_H - 22);

      // Update UI
      setUiState((prev) => {
        if (prev.score !== s.score || prev.level !== s.level) {
          return { ...prev, score: s.score, level: s.level, highScore: s.highScore };
        }
        return prev;
      });

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [spawnPizza]);

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.015_80)]">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="section-label">Interactive Fun</span>
          <span className="red-line mx-auto" />
          <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] text-[oklch(0.20_0.025_60)] leading-tight">
            PIZZA CATCHER ARCADE
          </h1>
          <p className="font-body text-[oklch(0.48_0.03_60)] mt-2 max-w-lg mx-auto">
            Catch the falling Umberto's pizza slices with your pizza box! Score {DISCOUNT_SCORE}+ points to unlock a real discount code.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Game canvas */}
          <div className="flex flex-col items-center">
            <canvas
              ref={canvasRef}
              width={CANVAS_W}
              height={CANVAS_H}
              className="border-4 border-[oklch(0.46_0.22_25)] shadow-2xl max-w-full"
              style={{ imageRendering: "pixelated", touchAction: "none", cursor: "none" }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onClick={() => { if (!stateRef.current.running) resetGame(); }}
              aria-label="Pizza Catcher Arcade Game — use arrow keys to move the pizza box"
              role="application"
            />

            {/* Mobile buttons */}
            <div className="flex gap-4 mt-4 lg:hidden">
              <button
                onTouchStart={() => { stateRef.current.keys.left = true; }}
                onTouchEnd={() => { stateRef.current.keys.left = false; }}
                onMouseDown={() => { stateRef.current.keys.left = true; }}
                onMouseUp={() => { stateRef.current.keys.left = false; }}
                className="w-16 h-16 bg-[oklch(0.46_0.22_25)] text-white font-display text-2xl flex items-center justify-center active:bg-[oklch(0.38_0.20_25)] select-none"
                aria-label="Move left"
              >←</button>
              {!uiState.running && (
                <button onClick={resetGame} className="px-6 h-16 bg-[oklch(0.46_0.22_25)] text-white font-display text-sm tracking-wider uppercase flex items-center gap-2">
                  <RotateCcw size={16} /> {uiState.gameOver ? "Retry" : "Play"}
                </button>
              )}
              <button
                onTouchStart={() => { stateRef.current.keys.right = true; }}
                onTouchEnd={() => { stateRef.current.keys.right = false; }}
                onMouseDown={() => { stateRef.current.keys.right = true; }}
                onMouseUp={() => { stateRef.current.keys.right = false; }}
                className="w-16 h-16 bg-[oklch(0.46_0.22_25)] text-white font-display text-2xl flex items-center justify-center active:bg-[oklch(0.38_0.20_25)] select-none"
                aria-label="Move right"
              >→</button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-56 space-y-4">
            {/* Score card */}
            <div className="bg-white border-2 border-[oklch(0.46_0.22_25)] p-5">
              <div className="flex items-center gap-2 mb-3">
                <Trophy size={18} className="text-[oklch(0.68_0.13_75)]" />
                <span className="font-display text-[oklch(0.20_0.025_60)] tracking-wider text-sm">SCOREBOARD</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-body text-xs text-[oklch(0.48_0.03_60)]">Score</span>
                  <span className="font-display text-[oklch(0.46_0.22_25)] text-lg">{uiState.score}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-body text-xs text-[oklch(0.48_0.03_60)]">Best</span>
                  <span className="font-display text-[oklch(0.68_0.13_75)] text-lg">{uiState.highScore}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-body text-xs text-[oklch(0.48_0.03_60)]">Level</span>
                  <span className="font-display text-[oklch(0.20_0.025_60)] text-lg">{uiState.level}</span>
                </div>
                <div className="flex items-center gap-1 pt-1">
                  {[1,2,3].map((i) => (
                    <Heart key={i} size={16} className={i <= uiState.lives ? "text-[oklch(0.46_0.22_25)] fill-[oklch(0.46_0.22_25)]" : "text-[oklch(0.80_0.015_80)]"} />
                  ))}
                </div>
              </div>
            </div>

            {/* How to play */}
            <div className="bg-[oklch(0.95_0.018_80)] border border-[oklch(0.88_0.015_80)] p-4">
              <h3 className="font-display text-[oklch(0.20_0.025_60)] tracking-wider text-sm mb-3">HOW TO PLAY</h3>
              <ul className="space-y-1.5">
                {[
                  { icon: "⌨️", text: "← → Arrow keys or A/D" },
                  { icon: "📱", text: "Swipe left/right on mobile" },
                  { icon: "🍕", text: "Catch slices with the box" },
                  { icon: "💛", text: "3 lives — don't miss!" },
                  { icon: "⭐", text: "Grandma slice = 30 pts" },
                  { icon: "🔴", text: "Round pizza = 10 pts" },
                  { icon: "🟡", text: "Triangle slice = 20 pts" },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-2 font-body text-xs text-[oklch(0.38_0.03_60)]">
                    <span>{item.icon}</span> {item.text}
                  </li>
                ))}
              </ul>
            </div>

            {/* Discount */}
            <div className="bg-[oklch(0.46_0.22_25)] p-4">
              <p className="font-display text-white text-sm tracking-wider mb-1">🎉 SCORE {DISCOUNT_SCORE}+ POINTS</p>
              <p className="font-body text-white/80 text-xs leading-relaxed">Unlock a 10% discount code for your next Umberto's order!</p>
              {uiState.score >= DISCOUNT_SCORE && (
                <div className="mt-3 bg-white p-2 text-center">
                  <p className="font-display text-[oklch(0.46_0.22_25)] text-lg tracking-widest">PIZZA10</p>
                  <p className="font-body text-xs text-[oklch(0.48_0.03_60)]">10% off your next order</p>
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="space-y-2">
              <Link href="/order" className="btn-red text-sm w-full justify-center">Order Now <ArrowRight size={14} /></Link>
              <Link href="/" className="btn-outline-red text-sm w-full justify-center"><Home size={14} /> Back to Home</Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
