import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './modules/financial-data/presentation/pages/HomePage';
import { FinancialDataCreatePage } from './modules/financial-data/presentation/pages/FinancialDataCreatePage';
import { FinancialDataListPage } from './modules/financial-data/presentation/pages/FinancialDataListPage';
import { FinancialDataSummaryPage } from './modules/financial-data/presentation/pages/FinancialDataSummaryPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<FinancialDataListPage />} />
        <Route path="/dashboard/create" element={<FinancialDataCreatePage />} />
        <Route path="/dashboard/summary" element={<FinancialDataSummaryPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
