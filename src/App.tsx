import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const FinancialDataDashboardPage = () => {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Financial Data Dashboard</h1>
        <p className="text-sm text-gray-600">
          Gestiona y visualiza los datos financieros de los países con valores consolidados en USD.
        </p>
      </header>
      <section className="rounded-lg border border-dashed border-gray-300 bg-white p-6 text-sm text-gray-500">
        Vista principal del dashboard de datos financieros. Aquí se mostrará la tabla de países,
        acciones para crear nuevos registros y el acceso al resumen consolidado.
      </section>
    </main>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FinancialDataDashboardPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
