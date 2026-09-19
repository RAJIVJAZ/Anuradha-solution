"use client";

import { useEffect } from "react";

/**
 * One observer for the whole document.
 *
 * Server components opt into motion declaratively — `data-reveal` for entrance
 * animations, `data-chart` for staged data marks — and this mounts once in the
 * root layout to flip `data-shown` when the element reaches the viewport. No
 * animation library, no per-component client boundary, and anything rendered
 * later (route change, modal, chat panel) is picked up by the MutationObserver.
 */
export function ScrollReveal() {
  useEffect(() => {
    const selector = "[data-reveal],[data-chart]";

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
        el.dataset.shown = "true";
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.shown = "true";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    const register = (root: ParentNode) => {
      const nodes = [
        ...(root instanceof Element && root.matches(selector) ? [root] : []),
        ...root.querySelectorAll(selector),
      ];
      for (const node of nodes) {
        const el = node as HTMLElement;
        if (el.dataset.shown === "true" || el.dataset.observed === "true") continue;
        el.dataset.observed = "true";
        observer.observe(el);
      }
    };

    register(document);

    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) register(node as Element);
        });
      }
    });

    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
}
