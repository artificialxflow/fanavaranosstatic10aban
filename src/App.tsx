/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { HeaderSwitcher } from './components/common/HeaderSwitcher';
import { ToastContainer } from './components/common/ToastContainer';
import { LandingPage } from './components/public/LandingPage';
import { BoardPanel } from './components/board/BoardPanel';
import { IndustryPanel } from './components/industry/IndustryPanel';

const AppContent: React.FC = () => {
  const { currentView } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased font-sans">
      {/* Universal Top Switcher Bar between Public, Board, and Industry views */}
      <HeaderSwitcher />

      {/* Main Dynamic View */}
      <div className="flex-1 flex flex-col">
        {currentView === 'landing' && <LandingPage />}
        {currentView === 'board' && <BoardPanel />}
        {currentView === 'industry' && <IndustryPanel />}
      </div>

      {/* Interactive Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
