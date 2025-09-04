import { useEffect, useState } from "react";

import type { IStatisticsData } from "../../types/header";

import { getStatisticsData } from "../../services";

import Alert from "../common/Alert";

export default function Header() {
  const [statistics, setStatistics] = useState<IStatisticsData>({
    quantPessoasDesaparecidas: 0,
    quantPessoasEncontradas: 0,
  });

  const [alert, setAlert] = useState<{ message: string; type: "error" | "success" | "info" } | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getStatisticsData();
        setStatistics(data);
      } catch (err: any) {
        setAlert({ message: "Erro ao buscar estatísticas", type: "error" });
      }
    };
    fetchStats();
  }, []);

  return (
  <>
      <div className="flex flex-col md:flex-row justify-around items-center gap-3 p-4 md:mb-2 lg:mb-6 
      lg:w-10/12 mx-auto ">

        <div className="flex md:flex-1 items-center text-white ">
          <img
            src="/assets/img/coat-of-arms.svg"
            alt="Brasão da polícia civil"
            className="h-10 sm:h-12 md:h-16 mr-3 cursor-pointer"
            onClick={() => (window.location.href = "/")}
          />
          <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
            Pessoas Desaparecidas
          </span>
        </div>

        <div className="flex md:flex-1 flex-row md:flex-col items-center justify-center gap-2">
          <h2 className="p-2 sm:w-45 md:w-50 lg:w-65 text-center font-semibold bg-blue-200 rounded-xl">
            LOCALIZADOS: {statistics.quantPessoasEncontradas}
          </h2>
          <h2 className="p-2 sm:w-45 md:w-50 lg:w-65 text-center font-semibold bg-orange-300 rounded-xl">
            DESAPARECIDOS: {statistics.quantPessoasDesaparecidas}
          </h2>
        </div>

        <div className="hidden md:flex md:flex-1 flex-row md:flex-col md:items-center lg:items-end gap-2 text-white">
          <h3 className="text-xs sm:text-xl md:text-2xl lg:text-3xl">
            Karine Wagner
          </h3>
          <span className="text-[10px] sm:text-xs md:text-sm lg:text-lg">
            Seletivo Desenvolve MT
          </span>
          <a
            href="https://github.com/karinewagner/desaparecidos"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] sm:text-sm md:text-base lg:text-xl underline text-blue-400 flex gap-1 md:gap-2"
          >
            <img
              src="/assets/icons/github.svg"
              alt="Ícone do Github"
              className="w-6 lg:w-7 h-6 lg:h-7"
            />
            Repositório GitHub
          </a>
        </div>

      </div>

      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
    </>
  );
}
