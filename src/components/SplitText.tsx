import { Children, Fragment, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";

/**
 * 文字を1文字ずつに分けるための部品（見出しのアニメーション用）
 * ・英単語は単語の途中で改行されないよう、単語ごとにまとめます
 * ・class="metal-gold" の部分は、1文字ずつ金色（char-gold）にします
 * ・読み上げソフト向けに、元の文章を隠しテキストとして残します
 */

type Counter = { i: number };

function textOf(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement(node)) {
    const el = node as ReactElement<{ children?: ReactNode }>;
    if (el.type === "br") return " ";
    return textOf(el.props.children);
  }
  return "";
}

const TOKEN = /([A-Za-z0-9'’.,!?&\-]+|\s+|.)/gu;

function splitString(str: string, c: Counter, gold: boolean, keyBase: string): ReactNode[] {
  const out: ReactNode[] = [];
  const tokens = str.match(TOKEN) ?? [];
  const charCls = `char${gold ? " char-gold" : ""}`;
  tokens.forEach((tok, t) => {
    if (/^\s+$/.test(tok)) {
      out.push(" ");
    } else if (tok.length > 1) {
      out.push(
        <span key={`${keyBase}-w${t}`} className="word">
          {Array.from(tok).map((ch, k) => (
            <span key={k} className={charCls} style={{ "--i": c.i++ } as React.CSSProperties}>
              {ch}
            </span>
          ))}
        </span>,
      );
    } else {
      out.push(
        <span key={`${keyBase}-c${t}`} className={charCls} style={{ "--i": c.i++ } as React.CSSProperties}>
          {tok}
        </span>,
      );
    }
  });
  return out;
}

function splitNode(node: ReactNode, c: Counter, gold: boolean, keyBase: string): ReactNode {
  if (node == null || typeof node === "boolean") return node;
  if (typeof node === "string" || typeof node === "number") return splitString(String(node), c, gold, keyBase);
  if (Array.isArray(node)) return node.map((n, i) => <Fragment key={`${keyBase}-${i}`}>{splitNode(n, c, gold, `${keyBase}-${i}`)}</Fragment>);
  if (isValidElement(node)) {
    const el = node as ReactElement<{ children?: ReactNode; className?: string }>;
    if (el.type === "br") return el;
    if (el.type === Fragment) return splitNode(Children.toArray(el.props.children), c, gold, keyBase);
    const cls = el.props.className ?? "";
    const isGold = /\bmetal-gold\b/.test(cls);
    const newCls = isGold ? cls.replace(/\bmetal-gold\b/, "").replace(/\bshimmer\b/, "").trim() : cls;
    return cloneElement(el, { className: newCls || undefined }, splitNode(el.props.children, c, gold || isGold, `${keyBase}-e`));
  }
  return node;
}

export default function SplitText({ children }: { children: ReactNode }) {
  const c: Counter = { i: 0 };
  return (
    <>
      <span className="sr-only">{textOf(children)}</span>
      <span aria-hidden>{splitNode(children, c, false, "s")}</span>
    </>
  );
}
