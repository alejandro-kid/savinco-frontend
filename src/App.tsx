import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { FinancialDataCreatePage } from './modules/financial-data/presentation/pages/FinancialDataCreatePage';
import { FinancialDataEditPage } from './modules/financial-data/presentation/pages/FinancialDataEditPage';
import { FinancialDataSummaryPage } from './modules/financial-data/presentation/pages/FinancialDataSummaryPage';
import { HomePage } from './modules/financial-data/presentation/pages/HomePage';
import { ErrorBoundary } from './shared/analytics';
import { getAllEntities } from './shared/dashboard';

const App = () => {
  const entities = getAllEntities();

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          {/* Rutas dinámicas basadas en la configuración de entidades */}
          {entities.map((entity) => (
            <Route
              key={entity.id}
              path={entity.basePath}
              element={<entity.ListPageComponent />}
            />
          ))}

          {/* Rutas específicas de financial-data (mantener compatibilidad) */}
          <Route path="/dashboard/financial-data/create" element={<FinancialDataCreatePage />} />
          <Route path="/dashboard/financial-data/edit/:countryCode" element={<FinancialDataEditPage />} />
          <Route path="/dashboard/financial-data/summary" element={<FinancialDataSummaryPage />} />
          
          {/* Redirección legacy: /dashboard -> /dashboard/financial-data */}
          <Route path="/dashboard" element={<Navigate to="/dashboard/financial-data" replace />} />
          <Route path="/dashboard/create" element={<Navigate to="/dashboard/financial-data/create" replace />} />
          <Route path="/dashboard/edit/:countryCode" element={<Navigate to="/dashboard/financial-data/edit/:countryCode" replace />} />
          <Route path="/dashboard/summary" element={<Navigate to="/dashboard/financial-data/summary" replace />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
