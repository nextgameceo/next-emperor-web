"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";

/** ページを移動したとき、黒い幕がすっと上がって新しいページが現れる */
export default function PageCurtain() {
  const pathname = usePathname();
  const first = useRef(true);
  const [n, setN] = useState(0);

  useLayoutEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setN((v) => v + 1);
  }, [pathname]);

  return n > 0 ? <div key={n} aria-hidden className="page-curtain" /> : null;
}
