import { useState } from "react";

const T = {
  dark: {
    bg: "#0F0B1E",
    surface: "#1A1430",
    card: "#211A3A",
    border: "#3A2F5E",
    borderLight: "#2D2450",
    accent: "#A78BFA",
    accentDeep: "#7C3AED",
    accentMid: "#8B5CF6",
    lavender: "#C4B5FD",
    lavenderFaint: "#2A2048",
    text: "#F3F0FF",
    textSub: "#A89EC0",
    textMuted: "#6B5F8A",
    good: { bg: "#14291E", border: "#1F4D35", text: "#4ADE80", label: "#86EFAC" },
    warn: { bg: "#2A1F08", border: "#4D3A10", text: "#FCD34D", label: "#FDE68A" },
    bad:  { bg: "#2A0F0F", border: "#4D1A1A", text: "#F87171", label: "#FCA5A5" },
    boost: { bg: "#0E1F2E", border: "#1B3D5C", text: "#7DD3FC", label: "#38BDF8", accent: "#0EA5E9" },
    scoreBar: ["#A78BFA","#818CF8","#60A5FA","#34D399","#F472B6"],
    scoreBg:  ["#2A2048","#1E2044","#1A2A44","#143322","#2A1330"],
  },
  light: {
    bg: "#F5F3FF",
    surface: "#EDE9FE",
    card: "#FFFFFF",
    border: "#C4B5FD",
    borderLight: "#DDD6FE",
    accent: "#7C3AED",
    accentDeep: "#5B21B6",
    accentMid: "#8B5CF6",
    lavender: "#7C3AED",
    lavenderFaint: "#F5F3FF",
    text: "#1E1040",
    textSub: "#4C3D7A",
    textMuted: "#7C6EA0",
    good: { bg: "#ECFDF5", border: "#6EE7B7", text: "#065F46", label: "#047857" },
    warn: { bg: "#FFFBEB", border: "#FCD34D", text: "#92400E", label: "#B45309" },
    bad:  { bg: "#FEF2F2", border: "#FCA5A5", text: "#991B1B", label: "#DC2626" },
    boost: { bg: "#EFF6FF", border: "#BAE6FD", text: "#0369A1", label: "#0284C7", accent: "#0EA5E9" },
    scoreBar: ["#7C3AED","#6366F1","#3B82F6","#10B981","#EC4899"],
    scoreBg:  ["#EDE9FE","#E0E7FF","#DBEAFE","#D1FAE5","#FCE7F3"],
  },
};

const SCORES = ["Engagement", "Readability", "Hashtag Quality", "Hook Strength", "CTA Clarity"];

function Logo({ t }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{
        width: 34, height: 34, borderRadius: 10,
        background: `linear-gradient(135deg, ${t.accentDeep}, ${t.accent})`,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
        </svg>
      </div>
      <div>
        <div style={{ fontSize: 16, fontWeight: 700, color: t.accent, letterSpacing: "-0.02em", lineHeight: 1 }}>PostPulse</div>
        <div style={{ fontSize: 10, color: t.textMuted, letterSpacing: "0.1em", textTransform: "uppercase" }}>AI</div>
      </div>
    </div>
  );
}

function ScoreBar({ label, score, color, bg, t }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={{ fontSize: 13, color: t.textSub, fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color }}>{score}/10</span>
      </div>
      <div style={{ background: bg, borderRadius: 99, height: 7, overflow: "hidden" }}>
        <div style={{ width: `${score * 10}%`, height: "100%", background: color, borderRadius: 99, transition: "width 1s cubic-bezier(.4,0,.2,1)" }} />
      </div>
    </div>
  );
}

function HashtagPill({ tag, quality, t }) {
  const s = t[quality === "good" ? "good" : quality === "weak" ? "bad" : "warn"];
  return (
    <span style={{
      display: "inline-block", background: s.bg, color: s.text,
      border: `1px solid ${s.border}`, borderRadius: 99,
      fontSize: 12, padding: "3px 10px", marginRight: 6, marginBottom: 6, fontWeight: 500,
    }}>{tag}</span>
  );
}

function ScoreBadge({ score, t }) {
  const color = score >= 8 ? t.good : score >= 5 ? t.warn : t.bad;
  return (
    <div style={{
      width: 44, height: 44, borderRadius: "50%", background: color.bg,
      border: `2px solid ${color.border}`,
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    }}>
      <span style={{ fontSize: 15, fontWeight: 700, color: color.text }}>{score}</span>
    </div>
  );
}

function BoostStrategySection({ strategy, t }) {
  if (!strategy) return null;
  const b = t.boost;

  return (
    <div style={{
      background: b.bg, border: `1px solid ${b.border}`, borderRadius: 14,
      padding: "1.1rem 1.25rem", marginBottom: "1.25rem",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1rem" }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: `linear-gradient(135deg, #0369A1, #0EA5E9)`,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
        </div>
        <span style={{ fontSize: 13, fontWeight: 700, color: b.label, letterSpacing: "0.04em", textTransform: "uppercase" }}>
          Reach Maximiser
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>

        {/* Rewrite tips */}
        {strategy.rewriteTips?.length > 0 && (
          <div style={{ background: "rgba(14,165,233,0.08)", border: `1px solid ${b.border}`, borderRadius: 10, padding: "0.85rem" }}>
            <p style={{ margin: "0 0 8px", fontSize: 11, fontWeight: 700, color: b.accent, textTransform: "uppercase", letterSpacing: "0.08em" }}>✏ What to Rewrite</p>
            {strategy.rewriteTips.map((tip, i) => (
              <div key={i} style={{ display: "flex", gap: 7, marginBottom: 6, alignItems: "flex-start" }}>
                <span style={{ color: b.accent, flexShrink: 0, fontSize: 13 }}>→</span>
                <span style={{ fontSize: 12, color: b.text, lineHeight: 1.5 }}>{tip}</span>
              </div>
            ))}
          </div>
        )}

        {/* What to avoid */}
        {strategy.avoidThese?.length > 0 && (
          <div style={{ background: "rgba(239,68,68,0.07)", border: `1px solid rgba(239,68,68,0.25)`, borderRadius: 10, padding: "0.85rem" }}>
            <p style={{ margin: "0 0 8px", fontSize: 11, fontWeight: 700, color: "#F87171", textTransform: "uppercase", letterSpacing: "0.08em" }}>🚫 What Not to Use</p>
            {strategy.avoidThese.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 7, marginBottom: 6, alignItems: "flex-start" }}>
                <span style={{ color: "#F87171", flexShrink: 0, fontSize: 13 }}>✕</span>
                <span style={{ fontSize: 12, color: "#FCA5A5", lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        )}

        {/* Best time to post */}
        {strategy.postingTips?.length > 0 && (
          <div style={{ background: "rgba(52,211,153,0.07)", border: `1px solid rgba(52,211,153,0.25)`, borderRadius: 10, padding: "0.85rem" }}>
            <p style={{ margin: "0 0 8px", fontSize: 11, fontWeight: 700, color: "#34D399", textTransform: "uppercase", letterSpacing: "0.08em" }}>📅 Posting Strategy</p>
            {strategy.postingTips.map((tip, i) => (
              <div key={i} style={{ display: "flex", gap: 7, marginBottom: 6, alignItems: "flex-start" }}>
                <span style={{ color: "#34D399", flexShrink: 0, fontSize: 13 }}>◆</span>
                <span style={{ fontSize: 12, color: "#86EFAC", lineHeight: 1.5 }}>{tip}</span>
              </div>
            ))}
          </div>
        )}

        {/* Image suggestion */}
        {strategy.imageSuggestion && (
          <div style={{ background: "rgba(251,191,36,0.07)", border: `1px solid rgba(251,191,36,0.25)`, borderRadius: 10, padding: "0.85rem" }}>
            <p style={{ margin: "0 0 8px", fontSize: 11, fontWeight: 700, color: "#FCD34D", textTransform: "uppercase", letterSpacing: "0.08em" }}>🖼 Image to Generate</p>
            <span style={{ fontSize: 12, color: "#FDE68A", lineHeight: 1.6 }}>{strategy.imageSuggestion}</span>
          </div>
        )}
      </div>

      {/* Top hashtags row */}
      {strategy.topHashtags?.length > 0 && (
        <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${b.border}` }}>
          <p style={{ margin: "0 0 8px", fontSize: 11, fontWeight: 700, color: b.label, textTransform: "uppercase", letterSpacing: "0.08em" }}># Best Hashtags for Maximum Reach</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {strategy.topHashtags.map((tag, i) => (
              <span key={i} style={{
                background: "rgba(14,165,233,0.15)", color: b.text,
                border: `1px solid ${b.border}`, borderRadius: 99,
                fontSize: 12, padding: "3px 10px", fontWeight: 500,
              }}>{tag}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AnalyzerView({ t, onSave }) {
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const wordCount = post.trim().split(/\s+/).filter(Boolean).length;
  const charCount = post.length;
  const hashtags = [...new Set((post.match(/#\w+/g) || []))];

  async function analyze() {
    if (!post.trim()) return;
    setLoading(true); setError(null); setResult(null);

    const prompt = `You are a brutally honest LinkedIn post expert with deep knowledge of platform algorithms and content strategy. Analyze the following post with GENUINE, DIFFERENTIATED scores — no filler 6s. Score each dimension on its actual merit:

- A 1-3 is truly bad (generic, no hook, walls of text, irrelevant hashtags)
- A 4-6 is mediocre but passable
- A 7-8 is genuinely good
- A 9-10 is exceptional and rare

Be STRICT. Most posts should score 3–7. Only award high scores if truly earned. The individual scores MUST differ from each other reflecting the actual relative strengths/weaknesses of THIS specific post.

Post:
"""
${post}
"""

Respond ONLY with a valid JSON object. No markdown fences. No preamble. No trailing text.

{
  "overallScore": <integer 1-10, honest weighted average>,
  "summary": "<2 direct sentences — what this post is and whether it will perform>",
  "scores": {
    "Engagement": <integer 1-10 — will people comment, share, react? consider emotion, controversy, relatability>,
    "Readability": <integer 1-10 — formatting, sentence length, whitespace, skim-ability>,
    "Hashtag Quality": <integer 1-10 — relevance, reach potential, specificity vs. spam. If no hashtags, give 2>,
    "Hook Strength": <integer 1-10 — does the first line make you stop scrolling? be very harsh here>,
    "CTA Clarity": <integer 1-10 — is there a clear call to action? is it compelling? no CTA = max 4>
  },
  "strengths": ["<genuine strength 1>", "<genuine strength 2>", "<genuine strength 3 — can say 'none' if truly none>"],
  "improvements": ["<specific actionable improvement 1>", "<specific actionable improvement 2>", "<specific actionable improvement 3>"],
  "hashtags": [
    { "tag": "#example", "quality": "good|ok|weak", "reason": "<why this hashtag works or doesn't>" }
  ],
  "suggestedHashtags": ["#tag1", "#tag2", "#tag3"],
  "rewrittenHook": "<a genuinely stronger opening line — make it compelling, not generic>",
  "boostStrategy": {
    "rewriteTips": [
      "<specific sentence or phrase from the post that needs rewriting and what to change>",
      "<another specific rewrite suggestion>",
      "<a third rewrite suggestion>"
    ],
    "avoidThese": [
      "<something in this post or commonly done that kills reach — e.g. vague opener, hashtag spam, passive voice>",
      "<another avoid>",
      "<a third avoid>"
    ],
    "postingTips": [
      "<best day/time to post this type of content on LinkedIn>",
      "<engagement tip like: ask a question in comments, reply to every comment in first hour>"
    ],
    "imageSuggestion": "<detailed description of the ideal image or graphic to generate for this post — describe style, subject, mood, colors. If no image is needed, explain why text-only works better>",
    "topHashtags": ["#hashtag1", "#hashtag2", "#hashtag3", "#hashtag4", "#hashtag5", "#hashtag6", "#hashtag7", "#hashtag8"]
  }
}`;

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Analysis failed");
      const parsed = JSON.parse(data.raw);
      setResult(parsed);
      onSave({
        post: post.slice(0, 120) + (post.length > 120 ? "…" : ""),
        score: parsed.overallScore,
        summary: parsed.summary,
        date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
        full: parsed,
      });
    } catch (e) {
      setError("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 700, color: t.text }}>Analyze a Post</h2>
        <p style={{ margin: 0, fontSize: 14, color: t.textSub }}>Paste your LinkedIn post below — get scores, a reach strategy, hashtag audit, and rewrite suggestions.</p>
      </div>

      <div style={{ position: "relative", marginBottom: 10 }}>
        <textarea
          value={post}
          onChange={e => setPost(e.target.value)}
          placeholder="Paste your LinkedIn post here, hashtags and all…"
          style={{
            width: "100%", minHeight: 160, resize: "vertical", fontSize: 14, lineHeight: 1.7,
            padding: "12px 14px", boxSizing: "border-box", borderRadius: 12,
            border: `1px solid ${t.border}`, background: t.card, color: t.text,
            fontFamily: "inherit", outline: "none", transition: "border-color 0.2s",
          }}
          onFocus={e => e.target.style.borderColor = t.accent}
          onBlur={e => e.target.style.borderColor = t.border}
        />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: t.textMuted, marginTop: 4, padding: "0 2px" }}>
          <span>{hashtags.length} hashtag{hashtags.length !== 1 ? "s" : ""} detected</span>
          <span>{wordCount} words · {charCount} chars</span>
        </div>
      </div>

      <button onClick={analyze} disabled={loading || !post.trim()} style={{
        width: "100%", padding: "11px 0", borderRadius: 10,
        background: post.trim() && !loading ? `linear-gradient(135deg, ${t.accentDeep}, ${t.accentMid})` : t.lavenderFaint,
        color: post.trim() && !loading ? "#fff" : t.textMuted,
        border: "none", fontSize: 14, fontWeight: 600,
        cursor: post.trim() && !loading ? "pointer" : "not-allowed",
        transition: "all 0.2s", letterSpacing: "0.01em", fontFamily: "inherit",
      }}>
        {loading ? "Analyzing…" : "✦ Analyze Post"}
      </button>

      {error && <p style={{ color: "#F87171", fontSize: 13, marginTop: 10 }}>{error}</p>}

      {result && (
        <div style={{ marginTop: "2rem" }}>

          {/* Overall score */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, background: t.lavenderFaint, border: `1px solid ${t.border}`, borderRadius: 14, padding: "1rem 1.25rem", marginBottom: "1.25rem" }}>
            <div style={{ width: 70, height: 70, borderRadius: "50%", background: t.card, border: `3px solid ${t.accent}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 26, fontWeight: 800, color: t.accent }}>{result.overallScore}</span>
            </div>
            <div>
              <p style={{ margin: "0 0 3px", fontSize: 11, color: t.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>Overall score</p>
              <p style={{ margin: 0, fontSize: 14, color: t.text, lineHeight: 1.55 }}>{result.summary}</p>
            </div>
          </div>

          {/* ── BOOST STRATEGY (new section) ── */}
          <BoostStrategySection strategy={result.boostStrategy} t={t} />

          {/* Score bars */}
          <div style={{ background: t.card, border: `1px solid ${t.borderLight}`, borderRadius: 14, padding: "1rem 1.25rem", marginBottom: "1.25rem" }}>
            <p style={{ margin: "0 0 1rem", fontSize: 13, fontWeight: 600, color: t.lavender }}>Score breakdown</p>
            {SCORES.map((s, i) => (
              <ScoreBar key={s} label={s} score={result.scores[s] ?? 0} color={t.scoreBar[i]} bg={t.scoreBg[i]} t={t} />
            ))}
          </div>

          {/* Strengths + Improvements */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: "1.25rem" }}>
            <div style={{ background: t.good.bg, border: `1px solid ${t.good.border}`, borderRadius: 14, padding: "1rem 1.25rem" }}>
              <p style={{ margin: "0 0 10px", fontSize: 13, fontWeight: 600, color: t.good.label }}>What's working</p>
              {result.strengths.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 7, alignItems: "flex-start" }}>
                  <span style={{ color: t.good.text, fontSize: 14, marginTop: 1, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 13, color: t.good.text, lineHeight: 1.5 }}>{s}</span>
                </div>
              ))}
            </div>
            <div style={{ background: t.warn.bg, border: `1px solid ${t.warn.border}`, borderRadius: 14, padding: "1rem 1.25rem" }}>
              <p style={{ margin: "0 0 10px", fontSize: 13, fontWeight: 600, color: t.warn.label }}>Improvements</p>
              {result.improvements.map((tip, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 7, alignItems: "flex-start" }}>
                  <span style={{ color: t.warn.text, fontSize: 14, marginTop: 1, flexShrink: 0 }}>→</span>
                  <span style={{ fontSize: 13, color: t.warn.text, lineHeight: 1.5 }}>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hashtag audit */}
          {result.hashtags?.length > 0 && (
            <div style={{ background: t.card, border: `1px solid ${t.borderLight}`, borderRadius: 14, padding: "1rem 1.25rem", marginBottom: "1.25rem" }}>
              <p style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, color: t.lavender }}>Hashtag audit</p>
              <div style={{ marginBottom: 12 }}>{result.hashtags.map((h, i) => <HashtagPill key={i} tag={h.tag} quality={h.quality} t={t} />)}</div>
              <div style={{ borderTop: `1px solid ${t.borderLight}`, paddingTop: 10 }}>
                {result.hashtags.map((h, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 12, color: t.accent, minWidth: 100, fontWeight: 500 }}>{h.tag}</span>
                    <span style={{ fontSize: 12, color: t.textSub, lineHeight: 1.5 }}>{h.reason}</span>
                  </div>
                ))}
              </div>
              {result.suggestedHashtags?.length > 0 && (
                <div style={{ marginTop: 12, paddingTop: 10, borderTop: `1px solid ${t.borderLight}` }}>
                  <p style={{ fontSize: 12, color: t.textMuted, margin: "0 0 8px" }}>Suggested additions</p>
                  {result.suggestedHashtags.map((tag, i) => <HashtagPill key={i} tag={tag} quality="good" t={t} />)}
                </div>
              )}
            </div>
          )}

          {/* Hook rewrite */}
          {result.rewrittenHook && (
            <div style={{ background: t.lavenderFaint, border: `1px solid ${t.border}`, borderRadius: 14, padding: "1rem 1.25rem" }}>
              <p style={{ margin: "0 0 8px", fontSize: 11, color: t.accent, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>✦ Stronger opening line</p>
              <p style={{ margin: 0, fontSize: 14, color: t.lavender, lineHeight: 1.6, fontStyle: "italic" }}>"{result.rewrittenHook}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function HistoryView({ t, history, onView }) {
  if (history.length === 0) return (
    <div style={{ textAlign: "center", padding: "4rem 0" }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>📊</div>
      <p style={{ color: t.textMuted, fontSize: 15 }}>No analyses yet. Go analyze your first post!</p>
    </div>
  );

  const avg = Math.round(history.reduce((a, h) => a + h.score, 0) / history.length);
  const best = Math.max(...history.map(h => h.score));

  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 700, color: t.text }}>History</h2>
        <p style={{ margin: 0, fontSize: 14, color: t.textSub }}>All your analyzed posts in one place.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: "1.5rem" }}>
        {[
          { label: "Posts analyzed", val: history.length },
          { label: "Average score", val: avg + "/10" },
          { label: "Best score", val: best + "/10" },
        ].map(({ label, val }) => (
          <div key={label} style={{ background: t.lavenderFaint, border: `1px solid ${t.border}`, borderRadius: 12, padding: "0.85rem 1rem" }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: t.accent, marginBottom: 2 }}>{val}</div>
            <div style={{ fontSize: 12, color: t.textMuted }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[...history].reverse().map((item, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 14,
            background: t.card, border: `1px solid ${t.borderLight}`, borderRadius: 12,
            padding: "0.85rem 1.1rem", cursor: "pointer", transition: "border-color 0.2s",
          }}
            onClick={() => onView(item)}
            onMouseEnter={e => e.currentTarget.style.borderColor = t.accent}
            onMouseLeave={e => e.currentTarget.style.borderColor = t.borderLight}
          >
            <ScoreBadge score={item.score} t={t} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: "0 0 3px", fontSize: 13, color: t.text, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.post}</p>
              <p style={{ margin: 0, fontSize: 12, color: t.textMuted }}>{item.date}</p>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={t.textMuted} strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
        ))}
      </div>
    </div>
  );
}

function DetailView({ t, item, onBack }) {
  const result = item.full;
  return (
    <div>
      <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: t.accent, fontSize: 14, fontWeight: 500, cursor: "pointer", padding: 0, marginBottom: "1.25rem", fontFamily: "inherit" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
        Back to history
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: 16, background: t.lavenderFaint, border: `1px solid ${t.border}`, borderRadius: 14, padding: "1rem 1.25rem", marginBottom: "1.25rem" }}>
        <div style={{ width: 70, height: 70, borderRadius: "50%", background: t.card, border: `3px solid ${t.accent}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontSize: 26, fontWeight: 800, color: t.accent }}>{result.overallScore}</span>
        </div>
        <div>
          <p style={{ margin: "0 0 3px", fontSize: 11, color: t.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>Overall score · {item.date}</p>
          <p style={{ margin: 0, fontSize: 14, color: t.text, lineHeight: 1.55 }}>{result.summary}</p>
        </div>
      </div>

      {/* Boost strategy in detail view too */}
      {result.boostStrategy && <BoostStrategySection strategy={result.boostStrategy} t={t} />}

      <div style={{ background: t.card, border: `1px solid ${t.borderLight}`, borderRadius: 14, padding: "1rem 1.25rem", marginBottom: "1.25rem" }}>
        <p style={{ margin: "0 0 1rem", fontSize: 13, fontWeight: 600, color: t.lavender }}>Score breakdown</p>
        {SCORES.map((s, i) => (
          <ScoreBar key={s} label={s} score={result.scores[s] ?? 0} color={t.scoreBar[i]} bg={t.scoreBg[i]} t={t} />
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: "1.25rem" }}>
        <div style={{ background: t.good.bg, border: `1px solid ${t.good.border}`, borderRadius: 14, padding: "1rem 1.25rem" }}>
          <p style={{ margin: "0 0 10px", fontSize: 13, fontWeight: 600, color: t.good.label }}>What's working</p>
          {result.strengths.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 7 }}>
              <span style={{ color: t.good.text, flexShrink: 0 }}>✓</span>
              <span style={{ fontSize: 13, color: t.good.text, lineHeight: 1.5 }}>{s}</span>
            </div>
          ))}
        </div>
        <div style={{ background: t.warn.bg, border: `1px solid ${t.warn.border}`, borderRadius: 14, padding: "1rem 1.25rem" }}>
          <p style={{ margin: "0 0 10px", fontSize: 13, fontWeight: 600, color: t.warn.label }}>Improvements</p>
          {result.improvements.map((tip, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 7 }}>
              <span style={{ color: t.warn.text, flexShrink: 0 }}>→</span>
              <span style={{ fontSize: 13, color: t.warn.text, lineHeight: 1.5 }}>{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {result.rewrittenHook && (
        <div style={{ background: t.lavenderFaint, border: `1px solid ${t.border}`, borderRadius: 14, padding: "1rem 1.25rem" }}>
          <p style={{ margin: "0 0 8px", fontSize: 11, color: t.accent, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>✦ Stronger opening line</p>
          <p style={{ margin: 0, fontSize: 14, color: t.lavender, lineHeight: 1.6, fontStyle: "italic" }}>"{result.rewrittenHook}"</p>
        </div>
      )}
    </div>
  );
}

export default function PostPulseAI() {
  const [mode, setMode] = useState("dark");
  const [tab, setTab] = useState("analyze");
  const [history, setHistory] = useState([]);
  const [detailItem, setDetailItem] = useState(null);
  const t = T[mode];

  function handleSave(item) {
    setHistory(h => [...h, item]);
  }

  function handleView(item) {
    setDetailItem(item);
    setTab("history");
  }

  const navItems = [
    { id: "analyze", label: "Analyze", icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg> },
    { id: "history", label: "History", icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
  ];

  return (
    <div style={{ display: "flex", minHeight: 600, background: t.bg, borderRadius: 16, overflow: "hidden", border: `1px solid ${t.border}`, fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* Sidebar */}
      <div style={{ width: 200, background: t.surface, borderRight: `1px solid ${t.border}`, display: "flex", flexDirection: "column", padding: "1.25rem 0", flexShrink: 0 }}>
        <div style={{ padding: "0 1.25rem 1.5rem" }}>
          <Logo t={t} />
        </div>

        <nav style={{ flex: 1, padding: "0 0.75rem" }}>
          {navItems.map(({ id, label, icon }) => (
            <button key={id} onClick={() => { setTab(id); setDetailItem(null); }} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 10,
              padding: "9px 14px", borderRadius: 10, border: "none",
              background: tab === id ? t.lavenderFaint : "transparent",
              color: tab === id ? t.accent : t.textSub,
              fontSize: 14, fontWeight: tab === id ? 600 : 400,
              cursor: "pointer", marginBottom: 2, textAlign: "left",
              transition: "all 0.15s", fontFamily: "inherit",
              borderLeft: tab === id ? `3px solid ${t.accent}` : "3px solid transparent",
            }}>
              {icon} {label}
              {id === "history" && history.length > 0 && (
                <span style={{ marginLeft: "auto", fontSize: 11, background: t.accentDeep, color: "#fff", borderRadius: 99, padding: "1px 7px", fontWeight: 700 }}>{history.length}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Theme toggle */}
        <div style={{ padding: "0.75rem 1.25rem", borderTop: `1px solid ${t.borderLight}` }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, color: t.textMuted }}>Theme</span>
            <button onClick={() => setMode(m => m === "dark" ? "light" : "dark")} style={{
              display: "flex", alignItems: "center", gap: 1,
              background: t.lavenderFaint, border: `1px solid ${t.border}`, borderRadius: 99,
              padding: "3px", cursor: "pointer",
            }}>
              {["dark","light"].map(m => (
                <span key={m} style={{
                  width: 26, height: 22, borderRadius: 99, display: "flex", alignItems: "center", justifyContent: "center",
                  background: mode === m ? t.accentMid : "transparent",
                  fontSize: 13, transition: "background 0.2s",
                }}>
                  {m === "dark" ? "🌙" : "☀️"}
                </span>
              ))}
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: "1.75rem", overflowY: "auto", minWidth: 0 }}>
        {tab === "analyze" && <AnalyzerView t={t} onSave={handleSave} />}
        {tab === "history" && !detailItem && <HistoryView t={t} history={history} onView={item => setDetailItem(item)} />}
        {tab === "history" && detailItem && <DetailView t={t} item={detailItem} onBack={() => setDetailItem(null)} />}
      </div>
    </div>
  );
}
