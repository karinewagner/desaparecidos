export default function Footer() {
  return (
    <footer className="relative bottom-0 flex justify-center gap-2 items-center text-white p-4 mt-2 sm:mt-4 lg:mt-6 lg:gap-6 bg-gradient-to-r from-indigo-950/80 to-blue-700/70">
      <span className="text-xs lg:text-xl">
        Desenvolvido por Karine Wagner - 2025
      </span>
        <a
          href="https://www.linkedin.com/in/karinedwagner/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-[10px] sm:text-sm md:text-base underline text-black hover:text-blue-200 hover:cursor-pointer"
        >
          Linkedin
        </a>
        <a
          href="https://github.com/karinewagner/desaparecidos"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-[10px] sm:text-sm md:text-base underline text-black hover:text-blue-200 hover:cursor-pointer"
        >
          GitHub
        </a>
    </footer>
  );
}
