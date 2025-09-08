import { useEffect, useState } from "react";
import type { IMissingPersonList } from "../../types/home";

interface Props {
  initialValues: IMissingPersonList;
  onFilter: (filters: IMissingPersonList) => void;
}

export default function SearchForm({ initialValues, onFilter }: Props) {
  const [form, setForm] = useState<IMissingPersonList>(initialValues);

  useEffect(() => {
    setForm(initialValues);
  }, [initialValues]);

  const toNumber = (v: string) => {
    if (v === "" || v === undefined || v === null) return 0;
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  };

  const normalize = (f: IMissingPersonList): IMissingPersonList => {
    let min = toNumber(String(f.faixaIdadeInicial));
    let max = toNumber(String(f.faixaIdadeFinal));
    if (min && max && min > max) [min, max] = [max, min];

    return {
      ...f,
      faixaIdadeInicial: min,
      faixaIdadeFinal: max,
      pagina: 0,
      porPagina: f.porPagina || initialValues.porPagina || 10,
      sexo: (f.sexo || "") as "" | "MASCULINO" | "FEMININO",
      status: (f.status || "DESAPARECIDO") as "DESAPARECIDO" | "LOCALIZADO",
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    if (name === "sexo") {
      setForm((s) => ({ ...s, sexo: value as "" | "MASCULINO" | "FEMININO" }));
      return;
    }
    if (name === "status") {
      setForm((s) => ({ ...s, status: value as "DESAPARECIDO" | "LOCALIZADO" }));
      return;
    }
    if (name === "faixaIdadeInicial" || name === "faixaIdadeFinal") {
      setForm((s) => ({ ...s, [name]: toNumber(value) }));
      return;
    }
    if (type === "number") {
      setForm((s) => ({ ...s, [name]: toNumber(value) }));
      return;
    }
    setForm((s) => ({ ...s, [name]: value }));
  };

  const clearFilter = () => {
    const reseted: IMissingPersonList = {
      ...initialValues,
      nome: "",
      faixaIdadeInicial: 0,
      faixaIdadeFinal: 0,
      sexo: "",
      status: "DESAPARECIDO",
      pagina: 0,
    };
    setForm(reseted);
    onFilter(normalize(reseted));
  };

  const sendFilters = () => {
    onFilter(normalize(form));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendFilters();
      }}
      className="p-4 md:p-6 lg:px-10 rounded-md shadow-md flex flex-col bg-transparent"
    >
      <div className="flex flex-col text-center mb-2 md:mb-4">
        <h2 className="text-lg md:text-2xl font-semibold">FAÇA SUA BUSCA</h2>
        <span className="text-sm md:text-base text-gray-500">
          Os dados abaixo ajudam a tornar sua busca mais específica!
        </span>
      </div>

      <div className="mb-2 md:mb-4">
        <label className="block font-semibold mb-1" htmlFor="nome">Nome</label>
        <input
          id="nome"
          type="text"
          name="nome"
          value={form.nome || ""}
          onChange={handleChange}
          placeholder="Digite um nome"
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-2 md:gap-4 mb-2 md:mb-4">
        <div className="flex-1">
          <p className="font-semibold mb-1 md:mb-2">Faixa Etária</p>
          <div className="flex gap-2">
            <input
              type="number"
              name="faixaIdadeInicial"
              min={0}
              max={120}
              placeholder="Idade mínima"
              value={form.faixaIdadeInicial ?? 0}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="number"
              name="faixaIdadeFinal"
              min={0}
              max={120}
              placeholder="Idade máxima"
              value={form.faixaIdadeFinal ?? 0}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div className="flex-1 lg:pl-4">
          <p className="font-semibold mb-1 md:mb-2">Sexo</p>
          <div className="flex gap-3 md:gap-4 items-center">
            <label className="inline-flex items-center gap-1">
              <input
                type="radio"
                name="sexo"
                value=""
                checked={form.sexo === ""}
                onChange={handleChange}
                className="cursor-pointer"
              />
              Todos
            </label>
            <label className="inline-flex items-center gap-1">
              <input
                type="radio"
                name="sexo"
                value="MASCULINO"
                checked={form.sexo === "MASCULINO"}
                onChange={handleChange}
                className="cursor-pointer"
              />
              Masculino
            </label>
            <label className="inline-flex items-center gap-1">
              <input
                type="radio"
                name="sexo"
                value="FEMININO"
                checked={form.sexo === "FEMININO"}
                onChange={handleChange}
                className="cursor-pointer"
              />
              Feminino
            </label>
          </div>
        </div>

        <div className="flex-1 lg:pl-4">
          <p className="font-semibold mb-1 md:mb-2">Status</p>
          <div className="flex gap-3 md:gap-4 items-center">
            <label className="inline-flex items-center gap-1">
              <input
                type="radio"
                name="status"
                value="DESAPARECIDO"
                checked={form.status === "DESAPARECIDO"}
                onChange={handleChange}
                className="cursor-pointer"
              />
              Desaparecido
            </label>
            <label className="inline-flex items-center gap-1">
              <input
                type="radio"
                name="status"
                value="LOCALIZADO"
                checked={form.status === "LOCALIZADO"}
                onChange={handleChange}
                className="cursor-pointer"
              />
              Localizado
            </label>
          </div>
        </div>

        <div className="flex flex-1 gap-2 justify-center items-end lg:items-center">
          <button
            type="button"
            onClick={clearFilter}
            className="cursor-pointer border border-red-600 text-red-600 hover:text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Limpar
          </button>
          <button
            type="submit"
            className="cursor-pointer border border-blue-600 text-blue-600 hover:text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Buscar
          </button>
        </div>
      </div>
    </form>
  );
}
