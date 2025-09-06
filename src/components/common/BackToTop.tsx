import { useEffect, useState } from "react";

type Props = {
  threshold?: number;
};

export default function BackToTop({ threshold = 0.5 }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const doc = document.documentElement;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const scrollTop = window.scrollY || doc.scrollTop || 0;
        const maxScroll = Math.max(doc.scrollHeight - window.innerHeight, 0);
        const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;
        setVisible(progress > threshold);
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  const handleClick = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Voltar ao topo"
      title="Voltar ao topo"
      className={`fixed right-4 md:right-6 bottom-2 2xl:bottom-20 z-50 rounded-2xl shadow-lg bg-blue-700 text-white
                  p-3 md:p-3.5 hover:bg-blue-900 focus:outline-none focus-visible:ring-2
                  focus-visible:ring-blue-300 transition duration-300
                  ${visible ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none translate-y-3"}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 md:h-6 md:w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
