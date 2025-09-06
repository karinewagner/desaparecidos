import React from "react";
import IconButton from "../common/IconButton";
import type { PaginationProps } from "../../types/pagination";

export default function Pagination({
  currentPage,
  pageSize,
  totalItems,
  pageSizeOptions = [10, 15, 20, 30],
  onPageChange,
  onPageSizeChange,
  showFirstLast = true,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / Math.max(pageSize, 1)));

  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  const start = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = totalItems === 0 ? 0 : Math.min(start + pageSize - 1, totalItems);

  const goFirst = () => canPrev && onPageChange(1);
  const goPrev = () => canPrev && onPageChange(currentPage - 1);
  const goNext = () => canNext && onPageChange(currentPage + 1);
  const goLast = () => canNext && onPageChange(totalPages);

  return (
    <nav
      className="w-full bg-gray-50 rounded-md shadow-md p-3 flex items-center justify-between gap-3 text-sm"
      aria-label="Paginação"
    >
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <span className="text-gray-600 whitespace-nowrap">Itens por página:</span>
        <select
          className="px-2 py-1 border rounded-md bg-white disabled:opacity-50"
          value={pageSize}
          disabled={!onPageSizeChange}
          onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
          aria-label="Selecionar itens por página"
        >
          {pageSizeOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="tabular-nums text-gray-700">
        {start} – {end} de {totalItems}
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-1">
        <div className="flex gap-1">
          {showFirstLast && (
            <IconButton
              ariaLabel="Primeira página"
              disabled={!canPrev}
              onClick={goFirst}
              title="Primeira página"
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 20L9 12l10-8" /><path d="M5 19V5" />
                </svg>
              }
            />
          )}

          <IconButton
            ariaLabel="Página anterior"
            disabled={!canPrev}
            onClick={goPrev}
            title="Anterior"
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            }
          />
        </div>

        <span className="mx-2 hidden sm:inline tabular-nums text-gray-600">
          {currentPage} / {totalPages}
        </span>

        <div className="flex gap-1">
          <IconButton
            ariaLabel="Próxima página"
            disabled={!canNext}
            onClick={goNext}
            title="Próxima"
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            }
          />

          {showFirstLast && (
            <IconButton
              ariaLabel="Última página"
              disabled={!canNext}
              onClick={goLast}
              title="Última página"
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 4l10 8-10 8" /><path d="M19 5v14" />
                </svg>
              }
            />
          )}
        </div>

      </div>
    </nav>
  );
}

function IconBtn({
  children,
  onClick,
  disabled,
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      className="p-2 rounded-md border bg-white text-gray-700 hover:bg-gray-100
                 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none
                 focus-visible:ring-2 focus-visible:ring-blue-500 transition"
    >
      {children}
    </button>
  );
}
