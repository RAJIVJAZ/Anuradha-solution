import type { ArticleSection } from "@/content/types";

/**
 * Renders authored article sections in document order. Deliberately a small
 * fixed vocabulary — paragraphs, bullets, numbered steps, a pull-quote and a
 * table — because an editorial system with unlimited block types produces
 * inconsistent pages.
 */
export function ArticleBody({ sections }: { sections: ArticleSection[] }) {
  return (
    <div className="prose-editorial max-w-none">
      {sections.map((section, index) => (
        <section key={section.heading ?? `section-${index}`}>
          {section.heading ? (
            <h2 id={slugify(section.heading)} className="scroll-mt-28">
              {section.heading}
            </h2>
          ) : null}

          {section.body?.map((paragraph) => <p key={paragraph.slice(0, 40)}>{paragraph}</p>)}

          {section.bullets ? (
            <ul>
              {section.bullets.map((item) => (
                <li key={item.slice(0, 40)}>{item}</li>
              ))}
            </ul>
          ) : null}

          {section.numbered ? (
            <ol>
              {section.numbered.map((item) => (
                <li key={item.slice(0, 40)}>{item}</li>
              ))}
            </ol>
          ) : null}

          {section.table ? (
            <div className="my-8 overflow-x-auto rounded-panel border border-mist-200">
              <table className="w-full min-w-md text-left text-sm">
                <thead className="bg-mist-50">
                  <tr>
                    {section.table.columns.map((column) => (
                      <th
                        key={column}
                        scope="col"
                        className="px-5 py-3.5 font-sans text-[0.68rem] font-semibold uppercase tracking-wider text-mist-600"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-mist-200 bg-paper">
                  {section.table.rows.map((row) => (
                    <tr key={row.join("|")}>
                      {row.map((cell, cellIndex) => (
                        <td
                          key={`${cell}-${cellIndex}`}
                          className={`px-5 py-4 align-top ${
                            cellIndex === 0 ? "font-medium text-ink-900" : "text-mist-700"
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}

          {section.quote ? <blockquote>{section.quote}</blockquote> : null}
        </section>
      ))}
    </div>
  );
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/** In-page table of contents, built from the article's own section headings. */
export function ArticleToc({ sections }: { sections: ArticleSection[] }) {
  const headings = sections
    .map((section) => section.heading)
    .filter((heading): heading is string => Boolean(heading));

  if (headings.length < 3) return null;

  return (
    <nav aria-label="On this page" className="rounded-panel border border-mist-200 bg-mist-50 p-6">
      <p className="font-mono text-[0.68rem] uppercase tracking-wider text-mist-500">
        On this page
      </p>
      <ol className="mt-4 space-y-2.5">
        {headings.map((heading, index) => (
          <li key={heading} className="flex gap-3 text-[0.88rem] leading-snug">
            <span className="font-mono text-[0.72rem] text-mist-400">
              {String(index + 1).padStart(2, "0")}
            </span>
            <a
              href={`#${slugify(heading)}`}
              className="text-mist-700 transition-colors hover:text-brand-700"
            >
              {heading}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
