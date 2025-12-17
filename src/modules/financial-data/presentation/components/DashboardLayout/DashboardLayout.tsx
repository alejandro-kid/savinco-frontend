import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

export interface DashboardEntity {
  id: string;
  label: string;
  icon?: ReactNode;
  path: string;
  badge?: number;
}

export interface DashboardLayoutProps {
  entities: Array<DashboardEntity>;
  children: ReactNode;
  currentEntityPath?: string;
  onCreateClick?: () => void;
  createButtonLabel?: string;
}

export const DashboardLayout = ({
  entities,
  children,
  onCreateClick,
  createButtonLabel = 'Agregar',
}: DashboardLayoutProps) => {
  const location = useLocation();
  // Detectar la entidad activa basándose en el path completo
  // Compara con el path base de cada entidad
  const currentPath = location.pathname;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col border-r border-gray-200 bg-white shadow-lg">
        {/* Logo/Header */}
        <div className="flex h-16 items-center justify-center border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-600">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 text-lg font-bold text-white transition-opacity hover:opacity-90"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Logo Savinco"
            >
              <title>Logo Savinco</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <span>Savinco</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Entidades
          </div>
          <ul className="space-y-1">
            {entities.map((entity) => {
              // Una entidad está activa si el path actual comienza con su path base
              const isActive = currentPath.startsWith(entity.path) || currentPath === entity.path;
              return (
                <li key={entity.id}>
                  <Link
                    to={entity.path}
                    className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                    }`}
                  >
                    {entity.icon ? (
                      <span
                        className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-blue-600'}`}
                      >
                        {entity.icon}
                      </span>
                    ) : (
                      <span
                        className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded text-xs font-bold ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-gray-200 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600'
                        }`}
                      >
                        {entity.label.charAt(0)}
                      </span>
                    )}
                    <span className="flex-1">{entity.label}</span>
                    {entity.badge !== undefined && entity.badge > 0 ? (
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-gray-200 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600'
                        }`}
                      >
                        {entity.badge}
                      </span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-blue-600"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Ir al inicio"
            >
              <title>Ir al inicio</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span>Ir al Inicio</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Bar with Create Button */}
        {onCreateClick ? (
          <div className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
              <span className="text-gray-400">•</span>
              <span className="text-sm text-gray-600">Gestión de datos</span>
            </div>
            <button
              type="button"
              onClick={onCreateClick}
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg active:scale-95"
            >
              <svg
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Agregar"
              >
                <title>Agregar</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              {createButtonLabel}
            </button>
          </div>
        ) : null}

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">{children}</main>
      </div>
    </div>
  );
};
