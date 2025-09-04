import { useState } from "react";

import type { IMissingPersonList } from "../../types/home";

interface Props {
  onFilter: (filters: IMissingPersonList) => void;
}

export default function SearchForm({ onFilter }: Props) {
  const [form, setForm] = useState<IMissingPersonList>({
    nome: "",
    faixaIdadeInicial: 0,
    faixaIdadeFinal: 0,
    sexo: "",
    status: "DESAPARECIDO",
    pagina: 0,
    porPagina: 10,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "sexo") {
      setForm({ ...form, sexo: value as "MASCULINO" | "FEMININO" | "" });
    } else if (name === "status") {
      setForm({ ...form, status: value as "DESAPARECIDO" | "LOCALIZADO" });
    } else if (name === "faixaIdadeInicial" || name === "faixaIdadeFinal") {
      setForm({ ...form, [name]: Number(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const clearFilter = () => {
    const reseted: IMissingPersonList = {
      nome: "",
      faixaIdadeInicial: 0,
      faixaIdadeFinal: 0,
      sexo: "",
      status: "DESAPARECIDO",
      pagina: 0,
      porPagina: 10,
    };
    setForm(reseted);
    onFilter(reseted);
  };

  const sendFilters = () => {
    onFilter(form);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendFilters();
      }}
      className="p-4 rounded-md shadow-md flex flex-col bg-gray-50"
    >
      <div className="flex flex-col text-center mb-4">
        <h2 className="text-lg md:text-2xl font-semibold">FAÇA SUA BUSCA</h2>
        <span className="text-sm md:text-base text-gray-500">
          Os dados abaixo ajudam a tornar sua busca mais específica!
        </span>
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Nome</label>
        <input
          type="text"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          placeholder="Digite um nome"
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-4 mb-4">
        <div className="flex-1">
          <p className="font-semibold mb-2">Faixa Etária</p>
          <div className="flex gap-2">
            <input
              type="number"
              name="faixaIdadeInicial"
              min="0"
              max="99"
              placeholder="Idade mínima"
              value={form.faixaIdadeInicial}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="number"
              name="faixaIdadeFinal"
              min="0"
              max="99"
              placeholder="Idade máxima"
              value={form.faixaIdadeFinal}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div className="flex-1">
          <p className="font-semibold mb-2">Sexo</p>
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                name="sexo"
                value="MASCULINO"
                checked={form.sexo === "MASCULINO"}
                onChange={handleChange}
              />{" "}
              Masculino
            </label>
            <label>
              <input
                type="radio"
                name="sexo"
                value="FEMININO"
                checked={form.sexo === "FEMININO"}
                onChange={handleChange}
              />{" "}
              Feminino
            </label>
          </div>
        </div>

        <div className="flex-1">
          <p className="font-semibold mb-2">Status</p>
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                name="status"
                value="DESAPARECIDO"
                checked={form.status === "DESAPARECIDO"}
                onChange={handleChange}
              />{" "}
              Desaparecido
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="LOCALIZADO"
                checked={form.status === "LOCALIZADO"}
                onChange={handleChange}
              />{" "}
              Localizado
            </label>
          </div>
        </div>
      </div>

      <div className="flex gap-2 justify-center">
        <button
          type="button"
          onClick={clearFilter}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Limpar
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}
