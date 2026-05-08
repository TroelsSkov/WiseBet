import { useEffect, useRef } from "react";
import { getRouletteColor } from "./NumberHistory";

// Standard European roulette wheel order
const WHEEL = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];

const REPEATS = 8;
const STRIP = Array.from({ length: REPEATS }, () => [...WHEEL]).flat();

const TILE = 64;
const GAP = 8;
const STEP = TILE + GAP; // 72px per tile
const VISIBLE = 9;
const CENTER = Math.floor(VISIBLE / 2); // tile index 4 is center

type Props = {
    spinning: boolean;
    result: number | null;
    onSpinEnd: () => void;
};

export default function RouletteRoller({ spinning, result, onSpinEnd }: Props) {
    const trackRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number>(0);
    const posRef = useRef(-(CENTER * STEP));
    const onSpinEndRef = useRef(onSpinEnd);

    useEffect(() => { onSpinEndRef.current = onSpinEnd; });

    function applyTransform(px: number, transition = "none") {
        if (!trackRef.current) return;
        trackRef.current.style.transition = transition;
        trackRef.current.style.transform = `translateX(${px}px)`;
    }

    // Phase 1: RAF fast spin
    useEffect(() => {
        if (!spinning || result !== null) return;

        const tick = () => {
            posRef.current -= 18;
            applyTransform(posRef.current);
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);

        return () => cancelAnimationFrame(rafRef.current);
    }, [spinning, result]);

    // Phase 2: decelerate to result
    useEffect(() => {
        if (result === null) return;
        cancelAnimationFrame(rafRef.current);

        const indexInWheel = WHEEL.indexOf(result);

        // Find the first repetition (starting from rep 4) that's ahead of current pos
        let targetPos = posRef.current;
        for (let rep = 4; rep < REPEATS - 1; rep++) {
            const tileIdx = rep * WHEEL.length + indexInWheel;
            const candidate = -(tileIdx * STEP - CENTER * STEP);
            if (candidate < posRef.current) {
                targetPos = candidate;
                break;
            }
        }

        applyTransform(targetPos, "transform 3.5s cubic-bezier(0.15, 0.85, 0.1, 1)");
        posRef.current = targetPos;

        const timer = setTimeout(() => onSpinEndRef.current(), 3500);
        return () => clearTimeout(timer);
    }, [result]);

    // Reset strip after round
    useEffect(() => {
        if (!spinning && result === null) {
            const resetPos = -(CENTER * STEP);
            applyTransform(resetPos);
            posRef.current = resetPos;
        }
    }, [spinning, result]);

    const viewportW = VISIBLE * STEP - GAP;

    return (
        <div className="flex justify-center">
            <div
                className="relative overflow-hidden rounded-xl bg-[#0a0f1e]"
                style={{ width: viewportW, height: TILE + 16 }}
            >
                {/* Center highlight */}
                <div
                    className="absolute top-2 bottom-2 border-2 border-[#00ff88]/50 rounded-lg z-10 pointer-events-none"
                    style={{ left: CENTER * STEP, width: TILE }}
                />

                {/* Edge fade left */}
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0a0f1e] to-transparent z-10 pointer-events-none" />
                {/* Edge fade right */}
                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0a0f1e] to-transparent z-10 pointer-events-none" />

                {/* Scrolling track */}
                <div
                    ref={trackRef}
                    className="absolute top-2 flex gap-2"
                    style={{
                        transform: `translateX(${posRef.current}px)`,
                        willChange: "transform",
                    }}
                >
                    {STRIP.map((num, i) => {
                        const color = getRouletteColor(num);
                        return (
                            <div
                                key={i}
                                className={`w-16 h-16 rounded-lg flex items-center justify-center text-xl font-bold text-white shrink-0
                                    ${color === "green"
                                        ? "bg-green-600 shadow-[0_0_8px_rgba(22,163,74,0.5)]"
                                        : color === "red"
                                        ? "bg-red-600"
                                        : "bg-[#1c2340]"}`}
                            >
                                {num}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
