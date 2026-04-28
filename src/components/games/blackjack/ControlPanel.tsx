import BetPanel from "./BetPanel";

type Props = {
  onBet: (data: { amount: number }) => void;
  onHit: () => void;
  onStand: () => void;
  betDisabled: boolean;
  canAct: boolean;
};

export default function ControlPanel({
  onBet,
  onHit,
  onStand,
  betDisabled,
  canAct,
}: Props) {
  return (
    <div className="w-[280px] bg-[#1c2340] rounded-2xl p-4 flex flex-col gap-6">
      <BetPanel onBet={onBet} disabled={betDisabled} />

      <button
        disabled={!canAct}
        onClick={onStand}
        className="w-full py-4 rounded-xl bg-[#5a5a5a] text-white font-bold disabled:opacity-50"
      >
        Stand
      </button>

      <button
        disabled={!canAct}
        onClick={onHit}
        className="w-full py-4 rounded-xl bg-[#4caf50] text-white font-bold hover:bg-[#43a047]"
      >
        Hit
      </button>
    </div>
  );
}
``