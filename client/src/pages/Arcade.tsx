/**
 * Pizza Catcher Arcade — Umberto's Family Pizzeria
 * v3: PHOTOREALISTIC sprites, WOW-level glow effects, kitchen background,
 *     image-based pizza box catcher, particle explosions
 */
import { useEffect, useRef, useState, useCallback } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { Trophy, Share2, Camera, Instagram, Twitter, Copy, X, ArrowRight } from "lucide-react";

// ─── Sprite image URLs ────────────────────────────────────────────────────────
const SPRITE_URLS: Record<string, string> = {
  grandma: "https://d2xsxph8kpxj0f.cloudfront.net/310519663344373217/jmpiuJS8ib9jTtFU9zpWCD/arcade-grandma-slice-UAKSpsVUBiGuCDwXRe9eNX.webp",
  round:   "https://d2xsxph8kpxj0f.cloudfront.net/310519663344373217/jmpiuJS8ib9jTtFU9zpWCD/arcade-round-pizza-ED5gWdbJoTYQH9ErD3beUx.webp",
  slice:   "https://d2xsxph8kpxj0f.cloudfront.net/310519663344373217/jmpiuJS8ib9jTtFU9zpWCD/arcade-pizza-slice-e2hs3iwCtn3rRdUEiENJRc.webp",
  pepperoni: "https://d2xsxph8kpxj0f.cloudfront.net/310519663344373217/jmpiuJS8ib9jTtFU9zpWCD/arcade-pepperoni-topping-6ofkYj4vd5bsWjstfiiKHQ.webp",
  box:     "https://d2xsxph8kpxj0f.cloudfront.net/310519663344373217/jmpiuJS8ib9jTtFU9zpWCD/arcade-pizza-box-4iTDpmnPfkPzATgNwCNtiD.webp",
};

// Preload all sprites
const SPRITES: Record<string, HTMLImageElement> = {};
Object.entries(SPRITE_URLS).forEach(([key, url]) => {
  const img = new Image();
  img.src = url;
  SPRITES[key] = img;
});

// ─── Canvas dimensions ────────────────────────────────────────────────────────
const CW = 480;
const CH = 600;
const BOX_W = 80;
const BOX_H = 22;
const BOX_Y = CH - 44;
const BOX_SPEED = 8;
const INITIAL_LIVES = 3;
const LOGO_POINTS = 100;
const LOGO_CHANCE = 0.06; // 6% chance per spawn

// ─── Types ────────────────────────────────────────────────────────────────────
type ItemType = "grandma" | "round" | "slice" | "pepperoni" | "logo" | "bomb";
type Item = {
  x: number; y: number; speed: number; type: ItemType;
  rot: number; rotSpeed: number; radius: number; wobble: number; wobbleSpeed: number;
};
type Particle = {
  x: number; y: number; vx: number; vy: number;
  life: number; color: string; size: number; shape: "circle" | "star";
};
type FloatText = { x: number; y: number; text: string; color: string; life: number; vy: number };

const ITEM_POINTS: Record<ItemType, number> = {
  grandma: 50, round: 20, slice: 30, pepperoni: 15, logo: 100, bomb: 0,
};

// ─── Sprite drawing helper ───────────────────────────────────────────────────
function drawSprite(ctx: CanvasRenderingContext2D, key: string, r: number, glowColor?: string) {
  const img = SPRITES[key];
  if (!img || !img.complete || img.naturalWidth === 0) {
    ctx.fillStyle = glowColor || "#cc3311";
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fill();
    return;
  }
  const size = r * 2.4;
  if (glowColor) {
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 22;
  }
  ctx.drawImage(img, -size / 2, -size / 2, size, size);
  ctx.shadowBlur = 0;
  ctx.shadowColor = "transparent";
}

// ─── Drawing helpers ──────────────────────────────────────────────────────────
function drawGrandmaSlice(ctx: CanvasRenderingContext2D, r: number) {
  drawSprite(ctx, "grandma", r, "rgba(255,160,30,0.9)");
}
function _drawGrandmaSliceLegacy(ctx: CanvasRenderingContext2D, r: number) {
  const s = r * 1.2;
  // Crust (golden brown)
  ctx.fillStyle = "#c8860a";
  ctx.beginPath();
  ctx.roundRect(-s, -s, s * 2, s * 2, 3);
  ctx.fill();
  // Dough (lighter)
  ctx.fillStyle = "#e8a830";
  ctx.beginPath();
  ctx.roundRect(-s + 3, -s + 3, s * 2 - 6, s * 2 - 6, 2);
  ctx.fill();
  // Sauce
  ctx.fillStyle = "#c0321a";
  ctx.beginPath();
  ctx.roundRect(-s + 5, -s + 5, s * 2 - 10, s * 2 - 10, 2);
  ctx.fill();
  // Cheese blobs
  const cheesePts = [[-4, -4], [4, -4], [-4, 4], [4, 4], [0, 0]];
  ctx.fillStyle = "#f5e8a0";
  cheesePts.forEach(([cx, cy]) => {
    ctx.beginPath();
    ctx.ellipse(cx * (s / 14), cy * (s / 14), (s / 4.5), (s / 5), 0.3, 0, Math.PI * 2);
    ctx.fill();
  });
  // Pepperoni
  ctx.fillStyle = "#8b1a0a";
  [[-5, -5], [5, 5], [-5, 5], [5, -5]].forEach(([px, py]) => {
    ctx.beginPath();
    ctx.arc(px * (s / 14), py * (s / 14), s / 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#a02010";
    ctx.beginPath();
    ctx.arc(px * (s / 14) + 1, py * (s / 14) - 1, s / 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#8b1a0a";
  });
  // Crust outline
  ctx.strokeStyle = "#9a6200";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(-s, -s, s * 2, s * 2, 3);
  ctx.stroke();
  // "GRANDMA" label
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.font = `bold ${s * 0.35}px 'Bebas Neue', sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("GRANDMA", 0, s * 0.55);
}

function drawRoundPizza(ctx: CanvasRenderingContext2D, r: number) {
  drawSprite(ctx, "round", r, "rgba(255,120,20,0.8)");
}
function _drawRoundPizzaLegacy(ctx: CanvasRenderingContext2D, r: number) {
  // Crust
  ctx.fillStyle = "#c8860a";
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill();
  // Dough ring
  ctx.fillStyle = "#e8a830";
  ctx.beginPath();
  ctx.arc(0, 0, r - 2, 0, Math.PI * 2);
  ctx.fill();
  // Sauce
  ctx.fillStyle = "#c0321a";
  ctx.beginPath();
  ctx.arc(0, 0, r - 5, 0, Math.PI * 2);
  ctx.fill();
  // Cheese
  ctx.fillStyle = "#f5e8a0";
  ctx.beginPath();
  ctx.arc(0, 0, r - 7, 0, Math.PI * 2);
  ctx.fill();
  // Cheese texture blobs
  ctx.fillStyle = "#f0d870";
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    ctx.beginPath();
    ctx.ellipse(Math.cos(a) * (r * 0.45), Math.sin(a) * (r * 0.45), r * 0.22, r * 0.18, a, 0, Math.PI * 2);
    ctx.fill();
  }
  // Pepperoni
  const pepPos = [[0, -r * 0.5], [r * 0.43, r * 0.25], [-r * 0.43, r * 0.25], [0, r * 0.1]];
  pepPos.forEach(([px, py]) => {
    ctx.fillStyle = "#8b1a0a";
    ctx.beginPath();
    ctx.arc(px, py, r * 0.18, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#a02010";
    ctx.beginPath();
    ctx.arc(px + r * 0.02, py - r * 0.02, r * 0.11, 0, Math.PI * 2);
    ctx.fill();
  });
  // Crust outline
  ctx.strokeStyle = "#9a6200";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.stroke();
}

function drawSlice(ctx: CanvasRenderingContext2D, r: number) {
  drawSprite(ctx, "slice", r, "rgba(255,100,20,0.8)");
}
function _drawSliceLegacy(ctx: CanvasRenderingContext2D, r: number) {
  // Realistic triangle slice
  const tip = -r * 1.1;
  const base = r * 0.7;
  const bw = r * 0.95;
  // Crust
  ctx.fillStyle = "#c8860a";
  ctx.beginPath();
  ctx.moveTo(0, tip);
  ctx.lineTo(bw, base);
  ctx.lineTo(-bw, base);
  ctx.closePath();
  ctx.fill();
  // Sauce
  ctx.fillStyle = "#c0321a";
  ctx.beginPath();
  ctx.moveTo(0, tip + 4);
  ctx.lineTo(bw - 4, base - 2);
  ctx.lineTo(-bw + 4, base - 2);
  ctx.closePath();
  ctx.fill();
  // Cheese
  ctx.fillStyle = "#f5e8a0";
  ctx.beginPath();
  ctx.moveTo(0, tip + 8);
  ctx.lineTo(bw - 8, base - 4);
  ctx.lineTo(-bw + 8, base - 4);
  ctx.closePath();
  ctx.fill();
  // Cheese blobs
  ctx.fillStyle = "#f0d870";
  ctx.beginPath();
  ctx.ellipse(-r * 0.2, 0, r * 0.2, r * 0.15, -0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(r * 0.2, r * 0.1, r * 0.18, r * 0.14, 0.3, 0, Math.PI * 2);
  ctx.fill();
  // Pepperoni
  ctx.fillStyle = "#8b1a0a";
  ctx.beginPath();
  ctx.arc(0, -r * 0.1, r * 0.17, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#a02010";
  ctx.beginPath();
  ctx.arc(r * 0.03, -r * 0.13, r * 0.1, 0, Math.PI * 2);
  ctx.fill();
  // Crust outline
  ctx.strokeStyle = "#9a6200";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, tip);
  ctx.lineTo(bw, base);
  ctx.lineTo(-bw, base);
  ctx.closePath();
  ctx.stroke();
  // Crust top line
  ctx.strokeStyle = "#c8860a";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-bw + 2, base - 1);
  ctx.lineTo(bw - 2, base - 1);
  ctx.stroke();
}

function drawPepperoniSlice(ctx: CanvasRenderingContext2D, r: number) {
  drawSprite(ctx, "pepperoni", r, "rgba(200,40,10,0.8)");
}
function _drawPepperoniSliceLegacy(ctx: CanvasRenderingContext2D, r: number) {
  // Just a big pepperoni disc
  ctx.fillStyle = "#8b1a0a";
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill();
  // Texture
  ctx.fillStyle = "#a02010";
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + 0.5;
    ctx.beginPath();
    ctx.arc(Math.cos(a) * r * 0.4, Math.sin(a) * r * 0.4, r * 0.2, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = "#c03020";
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#6a0e04";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.stroke();
}

function drawLogoBonus(ctx: CanvasRenderingContext2D, r: number) {
  // Umberto's logo bonus — golden star with "U"
  // Glowing aura
  const grad = ctx.createRadialGradient(0, 0, r * 0.3, 0, 0, r * 1.4);
  grad.addColorStop(0, "rgba(255, 220, 50, 0.6)");
  grad.addColorStop(1, "rgba(255, 180, 0, 0)");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, r * 1.4, 0, Math.PI * 2);
  ctx.fill();
  // Star shape
  ctx.fillStyle = "#f5c800";
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const angle = (i * Math.PI) / 5 - Math.PI / 2;
    const rad = i % 2 === 0 ? r : r * 0.45;
    if (i === 0) ctx.moveTo(Math.cos(angle) * rad, Math.sin(angle) * rad);
    else ctx.lineTo(Math.cos(angle) * rad, Math.sin(angle) * rad);
  }
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "#c89000";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  // "U" letter
  ctx.fillStyle = "#8b1a0a";
  ctx.font = `bold ${r * 0.9}px 'Bebas Neue', sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("U", 0, r * 0.05);
  // "+100" label
  ctx.fillStyle = "#fff";
  ctx.font = `bold ${r * 0.45}px 'Bebas Neue', sans-serif`;
  ctx.fillText("+100", 0, r * 0.85);
}

function drawBomb(ctx: CanvasRenderingContext2D, r: number) {
  // Bomb — avoid this!
  ctx.fillStyle = "#222";
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill();
  // Shine
  ctx.fillStyle = "#444";
  ctx.beginPath();
  ctx.arc(-r * 0.25, -r * 0.3, r * 0.25, 0, Math.PI * 2);
  ctx.fill();
  // Fuse
  ctx.strokeStyle = "#c8860a";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(r * 0.3, -r * 0.7);
  ctx.quadraticCurveTo(r * 0.7, -r * 1.1, r * 0.5, -r * 1.3);
  ctx.stroke();
  // Spark
  ctx.fillStyle = "#ff8800";
  ctx.beginPath();
  ctx.arc(r * 0.5, -r * 1.3, r * 0.15, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ffdd00";
  ctx.beginPath();
  ctx.arc(r * 0.5, -r * 1.3, r * 0.08, 0, Math.PI * 2);
  ctx.fill();
  // "AVOID" label
  ctx.fillStyle = "#ff4444";
  ctx.font = `bold ${r * 0.38}px 'Bebas Neue', sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("AVOID!", 0, r * 0.5);
}

function drawItem(ctx: CanvasRenderingContext2D, item: Item) {
  ctx.save();
  ctx.translate(item.x, item.y);
  ctx.rotate(item.rot);
  // Wobble effect
  const wobbleScale = 1 + Math.sin(item.wobble) * 0.04;
  ctx.scale(wobbleScale, wobbleScale);
  switch (item.type) {
    case "grandma": drawGrandmaSlice(ctx, item.radius); break;
    case "round": drawRoundPizza(ctx, item.radius); break;
    case "slice": drawSlice(ctx, item.radius); break;
    case "pepperoni": drawPepperoniSlice(ctx, item.radius); break;
    case "logo": drawLogoBonus(ctx, item.radius); break;
    case "bomb": drawBomb(ctx, item.radius); break;
  }
  ctx.restore();
}

function drawBox(ctx: CanvasRenderingContext2D, x: number, level: number) {
  const img = SPRITES["box"];
  // Drop shadow for depth
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(x + 5, BOX_Y + 6, BOX_W, BOX_H + 4);
  if (img && img.complete && img.naturalWidth > 0) {
    const glowColors = ["#ff6622","#ff6622","#ff8800","#ff6622","#cc00ff","#ff6622","#2266ff","#ff6622","#ffcc00","#ff4400"];
    ctx.shadowColor = glowColors[Math.min(level - 1, 9)];
    ctx.shadowBlur = 14 + level * 1.8;
    ctx.drawImage(img, x, BOX_Y - 6, BOX_W, BOX_H + 10);
    ctx.shadowBlur = 0;
    ctx.shadowColor = "transparent";
  } else {
    ctx.fillStyle = "#cc3311";
    ctx.beginPath();
    ctx.roundRect(x, BOX_Y, BOX_W, BOX_H, 4);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.font = "bold 8px 'Bebas Neue', sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("UMBERTO'S", x + BOX_W / 2, BOX_Y + 11);
  }
}

function createParticles(x: number, y: number, color: string, count = 12): Particle[] {
  return Array.from({ length: count }, () => ({
    x, y,
    vx: (Math.random() - 0.5) * 12,
    vy: (Math.random() - 0.5) * 12 - 4,
    life: 1,
    color,
    size: Math.random() * 9 + 3,
    shape: Math.random() > 0.5 ? "circle" : "star" as "circle" | "star",
  }));
}

function drawParticle(ctx: CanvasRenderingContext2D, pt: Particle) {
  ctx.globalAlpha = pt.life;
  ctx.fillStyle = pt.color;
  if (pt.shape === "star") {
    ctx.save();
    ctx.translate(pt.x, pt.y);
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = (i * Math.PI) / 3;
      const r = i % 2 === 0 ? pt.size : pt.size * 0.45;
      if (i === 0) ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r);
      else ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  } else {
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Level config
const LEVEL_CONFIG = [
  { name: "Slice Starter",    spawnInterval: 95, bombChance: 0,    speedMult: 1.0, target: 100  },
  { name: "Sauce Boss",       spawnInterval: 85, bombChance: 0,    speedMult: 1.1, target: 250  },
  { name: "Pepperoni Rush",   spawnInterval: 75, bombChance: 0.05, speedMult: 1.2, target: 450  },
  { name: "Grandma's Fury",   spawnInterval: 65, bombChance: 0.08, speedMult: 1.35, target: 700 },
  { name: "Double Trouble",   spawnInterval: 58, bombChance: 0.10, speedMult: 1.5, target: 1000 },
  { name: "Pizza Storm",      spawnInterval: 50, bombChance: 0.12, speedMult: 1.65, target: 1350 },
  { name: "Mozzarella Madness", spawnInterval: 44, bombChance: 0.14, speedMult: 1.8, target: 1750 },
  { name: "Sicilian Chaos",   spawnInterval: 38, bombChance: 0.16, speedMult: 2.0, target: 2200 },
  { name: "Umberto's Wrath",  spawnInterval: 32, bombChance: 0.18, speedMult: 2.2, target: 2700 },
  { name: "LEGEND",           spawnInterval: 26, bombChance: 0.20, speedMult: 2.5, target: Infinity },
];

// ─── Score card canvas renderer ───────────────────────────────────────────────
function renderScoreCard(score: number, level: number, highScore: boolean): string {
  const sc = document.createElement("canvas");
  sc.width = 480; sc.height = 280;
  const ctx = sc.getContext("2d")!;
  // Background
  const grad = ctx.createLinearGradient(0, 0, 480, 280);
  grad.addColorStop(0, "#1a0a04");
  grad.addColorStop(1, "#3a1008");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 480, 280);
  // Red border
  ctx.strokeStyle = "#cc3311";
  ctx.lineWidth = 4;
  ctx.strokeRect(6, 6, 468, 268);
  ctx.strokeStyle = "#f5c800";
  ctx.lineWidth = 1;
  ctx.strokeRect(10, 10, 460, 260);
  // Logo area
  ctx.fillStyle = "#cc3311";
  ctx.font = "bold 52px 'Bebas Neue', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText("UMBERTO'S", 240, 24);
  ctx.fillStyle = "#f5c800";
  ctx.font = "bold 18px 'Bebas Neue', sans-serif";
  ctx.fillText("PIZZA CATCHER ARCADE", 240, 78);
  // Score
  ctx.fillStyle = "#fff";
  ctx.font = "bold 80px 'Bebas Neue', sans-serif";
  ctx.textBaseline = "middle";
  ctx.fillText(String(score), 240, 160);
  ctx.fillStyle = "#aaa";
  ctx.font = "bold 16px 'Bebas Neue', sans-serif";
  ctx.fillText("POINTS", 240, 205);
  // Level badge
  ctx.fillStyle = "#cc3311";
  ctx.beginPath();
  ctx.roundRect(160, 218, 160, 32, 6);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.font = "bold 16px 'Bebas Neue', sans-serif";
  ctx.textBaseline = "middle";
  ctx.fillText(`LEVEL ${level} · ${LEVEL_CONFIG[Math.min(level - 1, 9)].name.toUpperCase()}`, 240, 234);
  if (highScore) {
    ctx.fillStyle = "#f5c800";
    ctx.font = "bold 14px 'Bebas Neue', sans-serif";
    ctx.fillText("🏆 NEW HIGH SCORE!", 240, 262);
  } else {
    ctx.fillStyle = "#888";
    ctx.font = "12px DM Sans, sans-serif";
    ctx.fillText("umbertosfamily.com", 240, 262);
  }
  return sc.toDataURL("image/png");
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Arcade() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    boxX: CW / 2 - BOX_W / 2,
    items: [] as Item[],
    particles: [] as Particle[],
    floatTexts: [] as FloatText[],
    score: 0,
    lives: INITIAL_LIVES,
    level: 1,
    gameOver: false,
    running: false,
    keys: { left: false, right: false },
    spawnTimer: 0,
    spawnInterval: LEVEL_CONFIG[0].spawnInterval,
    frameCount: 0,
    highScore: parseInt(localStorage.getItem("umbertos_hiscore") || "0"),
    levelFlash: 0,
    bombHit: 0,
    combo: 0,
    comboTimer: 0,
  });

  const [uiState, setUiState] = useState({
    score: 0, lives: INITIAL_LIVES, level: 1,
    gameOver: false, running: false,
    highScore: parseInt(localStorage.getItem("umbertos_hiscore") || "0"),
    newHighScore: false,
  });
  const [showShareModal, setShowShareModal] = useState(false);
  const [scoreCardUrl, setScoreCardUrl] = useState("");
  const [photoBonusUsed, setPhotoBonusUsed] = useState(false);
  const [copied, setCopied] = useState(false);
  const animRef = useRef<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getLevelConfig = (level: number) => LEVEL_CONFIG[Math.min(level - 1, 9)];

  const spawnItem = useCallback(() => {
    const s = stateRef.current;
    const cfg = getLevelConfig(s.level);
    const rand = Math.random();
    let type: ItemType;
    if (rand < LOGO_CHANCE) {
      type = "logo";
    } else if (rand < LOGO_CHANCE + cfg.bombChance) {
      type = "bomb";
    } else {
      const types: ItemType[] = s.level >= 3
        ? ["grandma", "round", "slice", "pepperoni", "grandma", "round"]
        : ["grandma", "round", "slice"];
      type = types[Math.floor(Math.random() * types.length)];
    }
    const radius = type === "grandma" ? 18 : type === "logo" ? 20 : type === "bomb" ? 15 : 16;
    const baseSpeed = 2.5 + (s.level - 1) * 0.4;
    const speed = (baseSpeed + Math.random() * 1.5) * cfg.speedMult;
    s.items.push({
      x: radius + Math.random() * (CW - radius * 2),
      y: -radius - 10,
      speed, type, radius,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.1,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.05 + Math.random() * 0.03,
    });
  }, []);

  const resetGame = useCallback(() => {
    const s = stateRef.current;
    s.boxX = CW / 2 - BOX_W / 2;
    s.items = [];
    s.particles = [];
    s.floatTexts = [];
    s.score = 0;
    s.lives = INITIAL_LIVES;
    s.level = 1;
    s.gameOver = false;
    s.running = true;
    s.spawnTimer = 0;
    s.spawnInterval = LEVEL_CONFIG[0].spawnInterval;
    s.frameCount = 0;
    s.levelFlash = 0;
    s.bombHit = 0;
    s.combo = 0;
    s.comboTimer = 0;
    setPhotoBonusUsed(false);
    setShowShareModal(false);
    setUiState({ score: 0, lives: INITIAL_LIVES, level: 1, gameOver: false, running: true, highScore: s.highScore, newHighScore: false });
  }, []);

  // Keyboard controls
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

  // Touch controls
  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchMove = (e: React.TouchEvent) => {
    const s = stateRef.current;
    if (!s.running) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    s.boxX = Math.max(0, Math.min(CW - BOX_W, s.boxX + dx * 0.9));
    touchStartX.current = e.touches[0].clientX;
  };

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const drawBackground = (level: number) => {
      const tier = Math.floor((level - 1) / 2);
      // Rich gradient backgrounds per tier
      const topColors = ["#fff8f0","#fff0e4","#f8e8d4","#f0d8c0","#1a0a04"];
      const botColors = ["#f5d0a0","#f0c080","#e8b870","#c89040","#3a1810"];
      const top = topColors[Math.min(tier, 4)];
      const bot = botColors[Math.min(tier, 4)];
      const grad = ctx.createLinearGradient(0, 0, 0, CH);
      grad.addColorStop(0, top);
      grad.addColorStop(1, bot);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, CW, CH);
      // Subtle checkerboard overlay for texture
      const tileSize = 40;
      ctx.globalAlpha = tier >= 4 ? 0.04 : 0.06;
      ctx.fillStyle = tier >= 4 ? "#ffffff" : "#8b4400";
      for (let row = 0; row < CH / tileSize; row++) {
        for (let col = 0; col < CW / tileSize; col++) {
          if ((row + col) % 2 === 0) ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
        }
      }
      ctx.globalAlpha = 1;
      // Decorative side strips
      if (tier < 4) {
        ctx.fillStyle = "rgba(204,51,17,0.08)";
        ctx.fillRect(0, 0, 8, CH);
        ctx.fillRect(CW - 8, 0, 8, CH);
      }
      // Ground line — glowing red dashes
      ctx.shadowColor = "#cc3311";
      ctx.shadowBlur = 6;
      ctx.strokeStyle = tier >= 4 ? "#ff4400" : "#cc3311";
      ctx.lineWidth = 2.5;
      ctx.setLineDash([8, 5]);
      ctx.beginPath();
      ctx.moveTo(0, BOX_Y - 10);
      ctx.lineTo(CW, BOX_Y - 10);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.shadowBlur = 0;
      ctx.shadowColor = "transparent";
    };

    const loop = () => {
      const s = stateRef.current;
      ctx.clearRect(0, 0, CW, CH);
      drawBackground(s.level);

      // ── Title / Game Over screen ──────────────────────────────────────────
      if (!s.running) {
        ctx.fillStyle = "rgba(255,248,240,0.94)";
        ctx.beginPath();
        ctx.roundRect(30, 60, CW - 60, CH - 120, 12);
        ctx.fill();
        ctx.strokeStyle = "#cc3311";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.roundRect(30, 60, CW - 60, CH - 120, 12);
        ctx.stroke();

        if (s.gameOver) {
          ctx.fillStyle = "#cc3311";
          ctx.font = "bold 48px 'Bebas Neue', sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          ctx.fillText("GAME OVER!", CW / 2, 82);
          ctx.fillStyle = "#333";
          ctx.font = "bold 22px 'Bebas Neue', sans-serif";
          ctx.fillText(`SCORE: ${s.score}`, CW / 2, 138);
          ctx.fillStyle = "#888";
          ctx.font = "14px DM Sans, sans-serif";
          ctx.textBaseline = "middle";
          ctx.fillText(`Level ${s.level} · ${getLevelConfig(s.level).name}`, CW / 2, 178);
          ctx.fillText(`Best: ${s.highScore}`, CW / 2, 200);
          // Play again button
          ctx.fillStyle = "#cc3311";
          ctx.beginPath();
          ctx.roundRect(CW / 2 - 100, 220, 200, 44, 8);
          ctx.fill();
          ctx.fillStyle = "#fff";
          ctx.font = "bold 22px 'Bebas Neue', sans-serif";
          ctx.textBaseline = "middle";
          ctx.fillText("PLAY AGAIN (ENTER)", CW / 2, 242);
          // Share hint
          ctx.fillStyle = "#cc3311";
          ctx.font = "bold 13px DM Sans, sans-serif";
          ctx.fillText("🏆 Share your score below!", CW / 2, 282);
        } else {
          // Start screen
          ctx.fillStyle = "#cc3311";
          ctx.font = "bold 44px 'Bebas Neue', sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          ctx.fillText("PIZZA CATCHER!", CW / 2, 80);
          ctx.fillStyle = "#555";
          ctx.font = "13px DM Sans, sans-serif";
          ctx.textBaseline = "middle";
          ctx.fillText("Catch pizzas · Dodge bombs · Grab the Umberto's star!", CW / 2, 148);
          ctx.fillText("← → arrow keys or A/D · Swipe on mobile", CW / 2, 170);
          // Demo items
          const demos: { type: ItemType; x: number; pts: string }[] = [
            { type: "grandma", x: 100, pts: "+50" },
            { type: "round", x: 180, pts: "+20" },
            { type: "slice", x: 260, pts: "+30" },
            { type: "logo", x: 340, pts: "+100" },
            { type: "bomb", x: 410, pts: "AVOID" },
          ];
          demos.forEach(({ type, x, pts }) => {
            drawItem(ctx, { x, y: 225, type, speed: 0, rot: 0, rotSpeed: 0, radius: 18, wobble: 0, wobbleSpeed: 0 });
            ctx.fillStyle = type === "bomb" ? "#cc3311" : "#333";
            ctx.font = "bold 10px 'Bebas Neue', sans-serif";
            ctx.fillText(pts, x, 255);
          });
          // 10 levels badge
          ctx.fillStyle = "#f5c800";
          ctx.beginPath();
          ctx.roundRect(CW / 2 - 80, 268, 160, 24, 6);
          ctx.fill();
          ctx.fillStyle = "#333";
          ctx.font = "bold 12px 'Bebas Neue', sans-serif";
          ctx.fillText("10 LEVELS OF CHALLENGE", CW / 2, 280);
          // High score
          ctx.fillStyle = "#cc3311";
          ctx.font = "bold 16px 'Bebas Neue', sans-serif";
          ctx.fillText(`HIGH SCORE: ${s.highScore}`, CW / 2, 312);
          // Start button
          ctx.fillStyle = "#cc3311";
          ctx.beginPath();
          ctx.roundRect(CW / 2 - 100, 328, 200, 46, 8);
          ctx.fill();
          ctx.fillStyle = "#fff";
          ctx.font = "bold 22px 'Bebas Neue', sans-serif";
          ctx.textBaseline = "middle";
          ctx.fillText("PRESS ENTER TO PLAY", CW / 2, 351);
        }
        animRef.current = requestAnimationFrame(loop);
        return;
      }

      // ── Active game ───────────────────────────────────────────────────────
      s.frameCount++;
      s.comboTimer = Math.max(0, s.comboTimer - 1);
      if (s.comboTimer === 0) s.combo = 0;
      if (s.bombHit > 0) s.bombHit--;
      if (s.levelFlash > 0) s.levelFlash--;

      // Move box
      if (s.keys.left) s.boxX = Math.max(0, s.boxX - BOX_SPEED);
      if (s.keys.right) s.boxX = Math.min(CW - BOX_W, s.boxX + BOX_SPEED);

      // Spawn
      s.spawnTimer++;
      const cfg = getLevelConfig(s.level);
      if (s.spawnTimer >= s.spawnInterval) {
        spawnItem();
        // Sometimes spawn 2 at once on higher levels
        if (s.level >= 5 && Math.random() < 0.3) spawnItem();
        if (s.level >= 8 && Math.random() < 0.2) spawnItem();
        s.spawnTimer = 0;
        s.spawnInterval = Math.max(22, cfg.spawnInterval - s.frameCount * 0.01);
      }

      // Level up
      const newLevel = Math.min(10, LEVEL_CONFIG.findIndex((c) => s.score < c.target) + 1 || 10);
      if (newLevel !== s.level) {
        s.level = newLevel;
        s.levelFlash = 90;
        // Extra life every 3 levels
        if (newLevel % 3 === 0 && s.lives < 5) {
          s.lives++;
          s.floatTexts.push({ x: CW / 2, y: CH / 2, text: "+1 LIFE!", color: "#44cc44", life: 1, vy: -1.5 });
        }
        s.floatTexts.push({ x: CW / 2, y: CH / 2 + 30, text: `LEVEL ${newLevel}: ${getLevelConfig(newLevel).name.toUpperCase()}!`, color: "#cc3311", life: 1, vy: -1 });
      }

      // Update items
      s.items = s.items.filter((item) => {
        item.y += item.speed;
        item.rot += item.rotSpeed;
        item.wobble += item.wobbleSpeed;

        // Catch check
        const hitX = item.x >= s.boxX - item.radius * 0.6 && item.x <= s.boxX + BOX_W + item.radius * 0.6;
        const hitY = item.y + item.radius * 0.7 >= BOX_Y && item.y - item.radius * 0.5 <= BOX_Y + BOX_H;
        if (hitX && hitY) {
          if (item.type === "bomb") {
            // Hit a bomb — lose a life
            s.lives--;
            s.bombHit = 30;
            s.combo = 0;
            s.particles.push(...createParticles(item.x, BOX_Y, "#ff4444", 16));
            s.floatTexts.push({ x: item.x, y: BOX_Y - 20, text: "-1 LIFE!", color: "#ff2222", life: 1, vy: -2 });
            if (s.lives <= 0) {
              s.running = false;
              s.gameOver = true;
              const newHS = s.score > s.highScore;
              if (newHS) { s.highScore = s.score; localStorage.setItem("umbertos_hiscore", String(s.score)); }
              const cardUrl = renderScoreCard(s.score, s.level, newHS);
              setScoreCardUrl(cardUrl);
              setUiState((prev) => ({ ...prev, score: s.score, lives: 0, gameOver: true, running: false, highScore: s.highScore, newHighScore: newHS }));
            } else {
              setUiState((prev) => ({ ...prev, lives: s.lives }));
            }
          } else {
            // Caught a pizza!
            s.combo++;
            s.comboTimer = 90;
            const basePoints = item.type === "logo" ? LOGO_POINTS : ITEM_POINTS[item.type];
            const comboMult = s.combo >= 5 ? 3 : s.combo >= 3 ? 2 : 1;
            const pts = basePoints * comboMult;
            s.score += pts;
            const color = item.type === "logo" ? "#f5c800" : item.type === "grandma" ? "#e8a020" : "#cc3311";
            s.particles.push(...createParticles(item.x, BOX_Y, color, item.type === "logo" ? 20 : 12));
            const label = s.combo >= 3 ? `${s.combo}x COMBO! +${pts}` : `+${pts}`;
            s.floatTexts.push({ x: item.x, y: BOX_Y - 20, text: label, color: s.combo >= 3 ? "#f5c800" : color, life: 1, vy: -2 });
            if (s.score > s.highScore) { s.highScore = s.score; localStorage.setItem("umbertos_hiscore", String(s.score)); }
          }
          return false;
        }

        // Missed (fell off bottom)
        if (item.y > CH + item.radius) {
          if (item.type !== "bomb") {
            // Only lose life for missing pizza, not bomb
            s.lives--;
            s.combo = 0;
            s.particles.push(...createParticles(item.x, CH - 20, "#ff8844", 8));
            if (s.lives <= 0) {
              s.running = false;
              s.gameOver = true;
              const newHS = s.score > s.highScore;
              if (newHS) { s.highScore = s.score; localStorage.setItem("umbertos_hiscore", String(s.score)); }
              const cardUrl = renderScoreCard(s.score, s.level, newHS);
              setScoreCardUrl(cardUrl);
              setUiState((prev) => ({ ...prev, score: s.score, lives: 0, gameOver: true, running: false, highScore: s.highScore, newHighScore: newHS }));
            } else {
              setUiState((prev) => ({ ...prev, lives: s.lives }));
            }
          }
          return false;
        }
        return true;
      });

      // Update particles
      s.particles = s.particles.filter((pt) => {
        pt.x += pt.vx; pt.y += pt.vy; pt.vy += 0.25; pt.life -= 0.035;
        return pt.life > 0;
      });
      s.floatTexts = s.floatTexts.filter((ft) => {
        ft.y += ft.vy; ft.life -= 0.025;
        return ft.life > 0;
      });

      // Bomb hit flash
      if (s.bombHit > 0) {
        ctx.fillStyle = `rgba(255,0,0,${s.bombHit / 60 * 0.3})`;
        ctx.fillRect(0, 0, CW, CH);
      }
      // Level flash
      if (s.levelFlash > 0 && s.levelFlash > 60) {
        ctx.fillStyle = `rgba(245,200,0,${(s.levelFlash - 60) / 30 * 0.2})`;
        ctx.fillRect(0, 0, CW, CH);
      }

      // Draw particles
      s.particles.forEach((pt) => drawParticle(ctx, pt));
      ctx.globalAlpha = 1;

      // Draw items
      s.items.forEach((item) => drawItem(ctx, item));

      // Draw box
      drawBox(ctx, s.boxX, s.level);

      // Float texts
      s.floatTexts.forEach((ft) => {
        ctx.globalAlpha = ft.life;
        ctx.fillStyle = ft.color;
        ctx.font = "bold 15px 'Bebas Neue', sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(ft.text, ft.x, ft.y);
      });
      ctx.globalAlpha = 1;

      // HUD
      ctx.fillStyle = "#cc3311";
      ctx.font = "bold 18px 'Bebas Neue', sans-serif";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText(`SCORE: ${s.score}`, 12, 8);
      ctx.textAlign = "right";
      ctx.fillText(`BEST: ${s.highScore}`, CW - 12, 8);
      ctx.textAlign = "center";
      ctx.fillStyle = s.levelFlash > 0 ? "#f5c800" : "#cc3311";
      ctx.fillText(`LEVEL ${s.level}`, CW / 2, 8);
      ctx.fillStyle = "#888";
      ctx.font = "10px DM Sans, sans-serif";
      ctx.fillText(getLevelConfig(s.level).name.toUpperCase(), CW / 2, 28);

      // Lives (pizza icons)
      ctx.textAlign = "left";
      ctx.font = "16px sans-serif";
      ctx.textBaseline = "middle";
      for (let i = 0; i < s.lives; i++) {
        ctx.fillText("🍕", 10 + i * 26, 46);
      }

      // Combo indicator
      if (s.combo >= 3) {
        ctx.fillStyle = "#f5c800";
        ctx.font = `bold ${14 + s.combo}px 'Bebas Neue', sans-serif`;
        ctx.textAlign = "right";
        ctx.fillText(`${s.combo}x COMBO!`, CW - 12, 46);
      }

      // Level progress bar
      const curCfg = getLevelConfig(s.level);
      const prevTarget = s.level > 1 ? getLevelConfig(s.level - 1).target : 0;
      const nextTarget = curCfg.target === Infinity ? s.score + 500 : curCfg.target;
      const progress = Math.min((s.score - prevTarget) / (nextTarget - prevTarget), 1);
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      ctx.fillRect(12, CH - 16, CW - 24, 8);
      ctx.fillStyle = "#cc3311";
      ctx.fillRect(12, CH - 16, (CW - 24) * progress, 8);
      ctx.fillStyle = "#888";
      ctx.font = "9px DM Sans, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(curCfg.target === Infinity ? "LEGEND MODE!" : `Next level: ${curCfg.target} pts`, CW / 2, CH - 24);

      // Sync UI
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
  }, [spawnItem]);

  // Photo bonus
  const handlePhotoBonus = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && !photoBonusUsed) {
      const s = stateRef.current;
      s.score += 250;
      s.floatTexts.push({ x: CW / 2, y: CH / 2, text: "+250 PHOTO BONUS!", color: "#f5c800", life: 1, vy: -1.5 });
      setPhotoBonusUsed(true);
      setUiState((prev) => ({ ...prev, score: s.score }));
    }
  };

  const handleShare = (platform: string) => {
    const text = `I scored ${uiState.score} points on Level ${uiState.level} at Umberto's Pizza Catcher! 🍕 Can you beat me? Play at umbertosfamily.com/arcade`;
    const url = "https://umbertosfamily.com/arcade";
    if (platform === "twitter") {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, "_blank");
    } else if (platform === "instagram") {
      // Instagram doesn't support direct share links — instruct user to download and post
      if (scoreCardUrl) {
        const a = document.createElement("a");
        a.href = scoreCardUrl;
        a.download = `umbertos-score-${uiState.score}.png`;
        a.click();
      }
    } else if (platform === "copy") {
      navigator.clipboard.writeText(`${text} ${url}`).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.015_80)]">
      <Navigation />

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="section-label">Interactive Fun</span>
          <span className="red-line mx-auto" />
          <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] text-[oklch(0.20_0.025_60)] leading-tight">
            PIZZA CATCHER ARCADE
          </h1>
          <p className="font-body text-[oklch(0.48_0.03_60)] mt-2 max-w-lg mx-auto">
            10 levels of pizza-catching chaos. Dodge bombs, grab the Umberto's star for 100 points, and share your score!
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Game canvas */}
          <div className="flex flex-col items-center">
            <canvas
              ref={canvasRef}
              width={CW}
              height={CH}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onClick={() => { if (!stateRef.current.running) resetGame(); }}
              className="border-2 border-[oklch(0.88_0.015_80)] shadow-xl max-w-full"
              style={{ cursor: "default", touchAction: "none" }}
            />

            {/* Mobile controls */}
            <div className="flex gap-4 mt-4 lg:hidden">
              <button
                onPointerDown={() => { stateRef.current.keys.left = true; }}
                onPointerUp={() => { stateRef.current.keys.left = false; }}
                onPointerLeave={() => { stateRef.current.keys.left = false; }}
                className="w-16 h-16 bg-[oklch(0.46_0.22_25)] text-white font-display text-2xl rounded-lg active:scale-95 select-none"
              >←</button>
              <button
                onPointerDown={() => { stateRef.current.keys.right = true; }}
                onPointerUp={() => { stateRef.current.keys.right = false; }}
                onPointerLeave={() => { stateRef.current.keys.right = false; }}
                className="w-16 h-16 bg-[oklch(0.46_0.22_25)] text-white font-display text-2xl rounded-lg active:scale-95 select-none"
              >→</button>
            </div>
          </div>

          {/* Side panel */}
          <div className="w-full lg:w-64 space-y-4">
            {/* Score card */}
            <div className="bg-white border-2 border-[oklch(0.88_0.015_80)] p-5">
              <h3 className="font-display text-[oklch(0.20_0.025_60)] tracking-wider text-sm mb-3">SCOREBOARD</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-body text-xs text-[oklch(0.55_0.03_60)]">Current Score</span>
                  <span className="font-display text-[oklch(0.46_0.22_25)] text-xl">{uiState.score}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-body text-xs text-[oklch(0.55_0.03_60)]">High Score</span>
                  <span className="font-display text-[oklch(0.68_0.13_75)] text-xl flex items-center gap-1">
                    <Trophy size={12} /> {uiState.highScore}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-body text-xs text-[oklch(0.55_0.03_60)]">Level</span>
                  <span className="font-display text-[oklch(0.20_0.025_60)] text-lg">{uiState.level} / 10</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-body text-xs text-[oklch(0.55_0.03_60)]">Lives</span>
                  <span className="text-base">{"🍕".repeat(Math.max(0, uiState.lives))}</span>
                </div>
              </div>
            </div>

            {/* How to play */}
            <div className="bg-[oklch(0.97_0.015_80)] border border-[oklch(0.88_0.015_80)] p-4">
              <h3 className="font-display text-[oklch(0.20_0.025_60)] tracking-wider text-xs mb-3">HOW TO PLAY</h3>
              <div className="space-y-1.5 font-body text-xs text-[oklch(0.48_0.03_60)]">
                <p>🍕 Catch pizzas with your box</p>
                <p>💣 Dodge the bombs (lose a life!)</p>
                <p>⭐ Grab the <strong className="text-[oklch(0.68_0.13_75)]">Umberto's star</strong> for +100!</p>
                <p>🔥 Build combos for bonus points</p>
                <p>❤️ Gain a life every 3 levels</p>
                <p>🏆 10 levels of increasing chaos</p>
              </div>
            </div>

            {/* Photo bonus */}
            {uiState.running && !photoBonusUsed && (
              <div className="bg-[oklch(0.68_0.13_75)]/10 border-2 border-[oklch(0.68_0.13_75)]/40 p-4">
                <h3 className="font-display text-[oklch(0.68_0.13_75)] tracking-wider text-xs mb-2">📸 PHOTO BONUS</h3>
                <p className="font-body text-xs text-[oklch(0.48_0.03_60)] mb-3">Upload a photo of your Umberto's meal for <strong>+250 bonus points!</strong></p>
                <input ref={fileInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handlePhotoBonus} />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2 bg-[oklch(0.68_0.13_75)] text-white font-display text-xs tracking-wider px-3 py-2.5 hover:bg-[oklch(0.60_0.13_75)] transition-colors"
                >
                  <Camera size={13} /> UPLOAD PHOTO (+250 PTS)
                </button>
              </div>
            )}
            {photoBonusUsed && (
              <div className="bg-green-50 border border-green-200 p-3 text-center">
                <p className="font-display text-green-700 text-xs tracking-wider">✅ +250 PHOTO BONUS APPLIED!</p>
              </div>
            )}

            {/* Share button — always visible after game starts */}
            {(uiState.gameOver || uiState.score > 0) && (
              <button
                onClick={() => setShowShareModal(true)}
                className="w-full flex items-center justify-center gap-2 bg-[oklch(0.46_0.22_25)] text-white font-display text-sm tracking-wider px-4 py-3.5 hover:bg-[oklch(0.38_0.22_25)] transition-colors"
              >
                <Share2 size={15} /> SHARE MY SCORE
              </button>
            )}

            {/* CTA */}
            <div className="bg-[oklch(0.46_0.22_25)] p-4 text-center">
              <p className="font-display text-white text-sm tracking-wider mb-1">HUNGRY NOW?</p>
              <p className="font-body text-white/80 text-xs mb-3">Order the real thing from Umberto's</p>
              <Link href="/order" className="inline-flex items-center gap-1.5 bg-white text-[oklch(0.46_0.22_25)] font-display text-xs tracking-wider px-4 py-2.5 hover:bg-[oklch(0.97_0.015_80)] transition-colors">
                ORDER NOW <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>

        {/* Level guide */}
        <div className="mt-10">
          <h2 className="font-display text-[oklch(0.20_0.025_60)] tracking-wider text-lg mb-4 text-center">10 LEVELS OF CHALLENGE</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {LEVEL_CONFIG.map((cfg, i) => (
              <div
                key={i}
                className={`p-3 border text-center transition-all ${uiState.level === i + 1 && uiState.running ? "border-[oklch(0.46_0.22_25)] bg-[oklch(0.46_0.22_25)]/5" : "border-[oklch(0.88_0.015_80)] bg-white"}`}
              >
                <p className="font-display text-[oklch(0.46_0.22_25)] text-lg">{i + 1}</p>
                <p className="font-body text-[oklch(0.28_0.025_60)] text-xs font-semibold">{cfg.name}</p>
                <p className="font-body text-[oklch(0.55_0.03_60)] text-[10px]">{cfg.target === Infinity ? "∞" : `${cfg.target} pts`}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white max-w-md w-full p-6 shadow-2xl relative">
            <button onClick={() => setShowShareModal(false)} className="absolute top-4 right-4 text-[oklch(0.55_0.03_60)] hover:text-[oklch(0.20_0.025_60)]">
              <X size={20} />
            </button>
            <h2 className="font-display text-[oklch(0.20_0.025_60)] text-2xl tracking-wider mb-1">SHARE YOUR SCORE!</h2>
            <p className="font-body text-sm text-[oklch(0.55_0.03_60)] mb-4">
              Brag to your friends — can they beat <strong>{uiState.score} points</strong> on Level {uiState.level}?
            </p>

            {/* Score card preview */}
            {scoreCardUrl && (
              <div className="mb-4 border border-[oklch(0.88_0.015_80)]">
                <img src={scoreCardUrl} alt="Your score card" className="w-full" />
              </div>
            )}

            <div className="space-y-2">
              {/* Instagram */}
              <button
                onClick={() => handleShare("instagram")}
                className="w-full flex items-center gap-3 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-display text-sm tracking-wider px-4 py-3.5 hover:opacity-90 transition-opacity"
              >
                <Instagram size={16} />
                DOWNLOAD FOR INSTAGRAM / SNAPCHAT
              </button>
              {/* Twitter/X */}
              <button
                onClick={() => handleShare("twitter")}
                className="w-full flex items-center gap-3 bg-black text-white font-display text-sm tracking-wider px-4 py-3.5 hover:bg-[#111] transition-colors"
              >
                <Twitter size={16} />
                SHARE ON X / TWITTER
              </button>
              {/* Copy link */}
              <button
                onClick={() => handleShare("copy")}
                className="w-full flex items-center gap-3 bg-[oklch(0.97_0.015_80)] border border-[oklch(0.88_0.015_80)] text-[oklch(0.20_0.025_60)] font-display text-sm tracking-wider px-4 py-3.5 hover:border-[oklch(0.46_0.22_25)] transition-colors"
              >
                <Copy size={16} />
                {copied ? "✅ COPIED!" : "COPY CHALLENGE LINK"}
              </button>
            </div>

            <p className="font-body text-xs text-[oklch(0.68_0.03_60)] mt-4 text-center">
              Tag <strong>@umbertosfamily</strong> on Instagram for a chance to be featured! 🍕
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
