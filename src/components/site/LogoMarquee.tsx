import { clientLogos } from "@/content/site";

/**
 * Client strip. A CSS marquee rather than a carousel — no JS, no hydration, and
 * it pauses on hover so a visitor can actually read a name they recognise.
 */
export function LogoMarquee() {
  const doubled = [...clientLogos, ...clientLogos];

  return (
    <div className="group relative overflow-hidden" aria-label="Selected clients">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-mist-50 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-mist-50 to-transparent"
      />
      <ul
        className="flex w-max items-center gap-12 group-hover:[animation-play-state:paused]"
        style={{ animation: "as-marquee 42s linear infinite" }}
      >
        {doubled.map((logo, index) => (
          <li
            key={`${logo}-${index}`}
            aria-hidden={index >= clientLogos.length}
            className="whitespace-nowrap font-serif text-lg text-mist-500"
          >
            {logo}
          </li>
        ))}
      </ul>
    </div>
  );
}
