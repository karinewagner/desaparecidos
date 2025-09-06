import { useEffect, useState } from "react";
import type { IStatisticsData } from "../../types/header";
import { getStatisticsData } from "../../services";
import Alert from "../common/Alert";
import CountUp from "../common/CountUp";

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
      <div className="relative">
        <div
          className="h-60 lg:h-80 bg-center bg-cover"
          style={{ backgroundImage: "url('/assets/img/header-background.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/80 to-blue-700/70" />

        <div className="absolute inset-0 flex flex-col md:flex-row md:grid md:grid-cols-3 pt-2 md:pt-8 lg:pt-12 items-start">
          <div className="max-w-7xl mx-auto px-4 py-1 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src="/assets/img/coat-of-arms.svg"
                alt="Brasão da polícia civil"
                className="h-10 sm:h-12 md:h-16 lg:h-20 cursor-pointer"
                onClick={() => (window.location.href = "/")}
              />
              <div className="text-xl sm:text-xl md:text-2xl lg:text-3xl text-white font-semibold leading-tight">
                Portal Desaparecidos
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-2 pb-4 grid grid-cols-2 gap-4 text-white">
            <div className="col-span-1 flex flex-row md:flex-col gap-2 items-center">
              <div className="text-sm lg:text-base opacity-90">Desaparecidos</div>
              <CountUp
                value={statistics.quantPessoasDesaparecidas}
                duration={1300}
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tabular-nums drop-shadow"
              />
            </div>
            <div className="col-span-1 flex flex-row md:flex-col gap-2 items-center">
              <div className="text-sm lg:text-base opacity-90">Localizados</div>
              <CountUp
                value={statistics.quantPessoasEncontradas}
                duration={1300}
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tabular-nums drop-shadow"
              />
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-2 pb-2 flex md:flex-col gap-4 md:gap-1 text-white">
            <p className="flex items-center text-xs sm:text-xl md:text-2xl">Karine Wagner</p>
            <p className="flex items-center text-[10px] sm:text-xs md:text-sm lg:text-base">Seletivo Desenvolve MT</p>
            <a
              href="https://github.com/karinewagner/desaparecidos"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-[10px] sm:text-sm md:text-base underline text-blue-400 hover:text-blue-200 hover:cursor-pointer"
            >
              Repositório GitHub
            </a>
          </div>
        </div>
      </div>

      {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
    </>
  );
}
