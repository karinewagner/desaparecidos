import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="-mt-50 flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="text-xl mt-4">Página não encontrada</p>
      <p className="text-gray-500 mt-2">
        O caminho que você tentou acessar não existe.
      </p>
      <Link
        to="/"
        className="mt-6 bg-blue-800 text-white px-6 py-2 rounded hover:bg-blue-900 transition"
      >
        Voltar para a Home
      </Link>
    </div>
  );
}
