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
      <div className="flex justify-between items-center p-4 mb-2 sm:mb-4 lg:mb-6">

      <div className="flex flex-1 items-center">
        <img
          src="/assets/img/coat-of-arms.svg"
          alt="Brasão da polícia civil"
          className="h-12 sm:h-16 md:h-20 mr-3 cursor-pointer"
          onClick={() => (window.location.href = "/")}
        />
        <span className="text-md sm:text-xl md:text-2xl lg:text-3xl font-semibold">
          Pessoas Desaparecidas
        </span>
      </div>

      <div className="hidden sm:flex flex-1 flex-col items-center justify-center gap-2">
        <h2 className="p-1 sm:w-45 md:w-50 lg:w-65 text-center font-semibold rounded-xl">
          LOCALIZADOS: {statistics.quantPessoasEncontradas}
        </h2>
        <h2 className="p-1 sm:w-45 md:w-50 lg:w-65 text-center font-semibold rounded-xl">
          DESAPARECIDOS: {statistics.quantPessoasDesaparecidas}
        </h2>
      </div>

      <div className="flex flex-1 flex-col items-end sm:gap-0.5 md:gap-1">
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
            src="/assets/icons/github.png"
            alt="Ícone do Github"
            className="w-3 sm:w-4 md:w-5 lg:w-7 h-3 sm:h-4 md:h-5 lg:h-7"
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
