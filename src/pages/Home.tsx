import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getMissingPersonList } from "../services";
import type { IContent, IMissingPersonList } from "../types/home";
import { isApiError } from "../types/apiError";

import PersonCard from "../components/home/PersonCard";
import SearchForm from "../components/home/SearchForm";
import Pagination from "../components/home/Pagination";
import Alert from "../components/common/Alert";

const fromSearch = (sp: URLSearchParams): IMissingPersonList => ({
  nome: sp.get("nome") ?? "",
  faixaIdadeInicial: Number(sp.get("faixaIdadeInicial") ?? 0),
  faixaIdadeFinal: Number(sp.get("faixaIdadeFinal") ?? 0),
  sexo: (sp.get("sexo") as "" | "MASCULINO" | "FEMININO") ?? "",
  status: (sp.get("status") as "DESAPARECIDO" | "LOCALIZADO") ?? "DESAPARECIDO",
  pagina: Number(sp.get("pagina") ?? 0),
  porPagina: Number(sp.get("porPagina") ?? 10),
});

const toSearch = (f: IMissingPersonList) => {
  const sp = new URLSearchParams();
  if (f.nome) sp.set("nome", f.nome);
  if (f.faixaIdadeInicial) sp.set("faixaIdadeInicial", String(f.faixaIdadeInicial));
  if (f.faixaIdadeFinal) sp.set("faixaIdadeFinal", String(f.faixaIdadeFinal));
  if (f.sexo) sp.set("sexo", f.sexo);
  if (f.status) sp.set("status", f.status);
  sp.set("pagina", String(f.pagina));
  sp.set("porPagina", String(f.porPagina));
  return sp;
};

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState<IMissingPersonList>(() => fromSearch(searchParams));

  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState<IContent[]>([]);
  const [length, setLength] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [alert, setAlert] = useState<string | null>(null);

  useEffect(() => {
    setSearchParams(toSearch(filters), { replace: true });
  }, [filters, setSearchParams]);

  useEffect(() => {
    const urlFilters = fromSearch(searchParams);

    if (JSON.stringify(urlFilters) !== JSON.stringify(filters)) {
      setFilters(urlFilters);
    }

  }, [searchParams]);

  useEffect(() => {
    const ac = new AbortController();

    (async () => {
      setIsLoading(true);
      try {
        const data = await getMissingPersonList(filters, { signal: ac.signal });
        if (ac.signal.aborted) return;

        setPeople(data.content);
        setLength(data.totalElements);
        setPageIndex(data.pageable.pageNumber);
        setPageSize(data.pageable.pageSize);

        const listSection = document.getElementById("list");
        if (listSection) listSection.scrollIntoView({ behavior: "smooth", block: "start" });
      } catch (err: any) {
        if (err?.code === "ERR_CANCELED" || ac.signal.aborted) return;
        const msg = isApiError(err) ? err.message : "Erro inesperado ao buscar dados.";
        setAlert(msg);
      } finally {
        if (!ac.signal.aborted) setIsLoading(false);
      }
    })();

    return () => ac.abort();
  }, [filters]);

  const handlePageChange = (page: number, size: number) => {
    setFilters({ ...filters, pagina: page - 1, porPagina: size });
  };

  return (
    <div className="flex flex-col max-w-7xl mx-auto gap-2 sm:gap-4 lg:gap-6 px-2">
      <div className="-mt-20 lg:-mt-30 relative z-10">
        <div className="rounded-xl shadow-xl bg-white/95 backdrop-blur-sm">
          <SearchForm onFilter={setFilters} initialValues={filters} />
        </div>
      </div>

      <div className="w-full" id="list">
        {isLoading ? (
          <div className="flex flex-col gap-2 justify-center items-center w-full bg-white p-4 rounded-md shadow-md">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <span>Carregando, aguarde...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 min-[425px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 lg:gap-6">
            {people.map((person) => (
              <PersonCard key={person.id} missingPerson={person} />
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-center rounded-md shadow-md bg-gray-50 px-2">
        <Pagination
          currentPage={pageIndex + 1}
          pageSize={pageSize}
          totalItems={length}
          pageSizeOptions={[10, 15, 20, 30]}
          onPageChange={(page) => handlePageChange(page, pageSize)}
          onPageSizeChange={(size) => handlePageChange(1, size)}
        />
      </div>

      {alert && <Alert message={alert} type="error" onClose={() => setAlert(null)} />}
    </div>
  );
}
