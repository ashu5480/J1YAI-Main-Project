const renderInline = (text, keyPrefix) =>
  text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={`${keyPrefix}-${i}`} className="font-semibold text-slate-100">{part.slice(2, -2)}</strong>
    ) : (
      part
    )
  );

const BlogContent = ({ content }) => {
  const blocks = content.split(/\n{2,}/);
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        const trimmed = block.trim();
        if (!trimmed) return null;
        if (trimmed.startsWith("### ")) {
          return <h3 key={i} className="pt-2 font-display text-xl font-semibold tracking-tight text-slate-50">{renderInline(trimmed.slice(4), `h3-${i}`)}</h3>;
        }
        if (trimmed.startsWith("## ")) {
          return <h2 key={i} className="pt-4 font-display text-2xl font-semibold tracking-tight text-slate-50">{renderInline(trimmed.slice(3), `h2-${i}`)}</h2>;
        }
        const lines = trimmed.split("\n").map((l) => l.trim()).filter(Boolean);
        if (lines.length > 0 && lines.every((l) => l.startsWith("- "))) {
          return (
            <ul key={i} className="space-y-2.5">
              {lines.map((l, j) => (
                <li key={j} className="flex items-start gap-3 text-base leading-relaxed text-slate-300">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                  <span>{renderInline(l.slice(2), `li-${i}-${j}`)}</span>
                </li>
              ))}
            </ul>
          );
        }
        return <p key={i} className="text-base leading-relaxed text-slate-300">{renderInline(trimmed, `p-${i}`)}</p>;
      })}
    </div>
  );
};

export default BlogContent;
