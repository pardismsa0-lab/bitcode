import { useMemo, useState } from "react";
import { LANG_LABEL, highlightCode } from "../lib/highlight";
import { fa } from "../lib/hooks";

export default function CodeBlock({ code, lang, title }: { code: string; lang: string; title?: string }) {
  const lines = useMemo(() => highlightCode(code, lang), [code, lang]);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="rounded-md border border-linec bg-night-950/80 overflow-hidden my-6" dir="ltr">
      <div className="flex items-center gap-2 px-4 h-9 border-b border-linec bg-night-800/80">
        <span className="w-2.5 h-2.5 rounded-full bg-coral/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-teal/70" />
        <span className="font-code text-[11px] text-dim ml-2 truncate">{title ?? LANG_LABEL[lang] ?? lang}</span>
        <span className="font-code text-[10px] text-faint ml-auto hidden sm:block">{LANG_LABEL[lang] ?? lang}</span>
        <button
          onClick={copy}
          className={`font-code text-[10px] rounded px-2.5 py-1 border transition-all duration-300 ${
            copied
              ? "text-teal border-teal/50 bg-teal/10"
              : "text-faint border-linec hover:text-amber hover:border-amber/50"
          }`}
        >
          {copied ? "✓ copied" : "copy"}
        </button>
      </div>
      <div className="overflow-x-auto py-4 font-code text-[12.5px] leading-[1.95]">
        {lines.map((line, li) => (
          <div key={li} className="flex px-3 hover:bg-night-800/40">
            <span className="w-8 shrink-0 text-right pr-3 text-faint/50 select-none">{fa(li + 1)}</span>
            <span className="whitespace-pre pr-6">
              {line.length === 0 ? " " : line.map((tok, ti) => (
                <span key={ti} className={tok.cls}>{tok.t}</span>
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
