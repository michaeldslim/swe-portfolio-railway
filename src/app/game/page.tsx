import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Code in Life | JavaScript Game",
  description: "Play the JavaScript carrot-saving game.",
};

export default function GamePage() {
  return (
    <main className="h-screen bg-background text-foreground flex items-center justify-center overflow-hidden p-0">
      <div className="relative w-full max-w-5xl h-[80vh] rounded-xl border border-accent-soft/30 bg-accent-soft/10 shadow-inner shadow-black/40">
        <div className="absolute inset-x-3 top-2 flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
        </div>
        <div className="absolute inset-1 bottom-1 top-4 overflow-hidden rounded-lg border border-white/15 bg-black/60">
          <iframe
            src="/js-game/index.html"
            title="JavaScript Game"
            className="w-full h-full border-0"
            scrolling="no"
            style={{ overflow: "hidden" }}
          />
        </div>
      </div>
    </main>
  );
}

