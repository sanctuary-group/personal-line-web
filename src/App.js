import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import BroadcastSend from './components/BroadcastSend';
import StepDelivery from './components/StepDelivery';
import IndividualSupport from './components/IndividualSupport';
import Settings from './components/Settings';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('dashboard');
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'broadcast':
        return <BroadcastSend onNavigate={setCurrentPage} />;
      case 'step':
        return <StepDelivery onNavigate={setCurrentPage} />;
      case 'individual':
        return <IndividualSupport onNavigate={setCurrentPage} />;
      case 'settings':
        return <Settings onNavigate={setCurrentPage} />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>個人LINE管理画面</h1>
          <button className="logout-btn" onClick={handleLogout}>
            ログアウト
          </button>
        </div>
      </header>
      <nav className="sidebar">
        <div className="nav-menu">
          <button 
            className={`nav-item ${currentPage === 'dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentPage('dashboard')}
          >
            ダッシュボード
          </button>
          <button 
            className={`nav-item ${currentPage === 'broadcast' ? 'active' : ''}`}
            onClick={() => setCurrentPage('broadcast')}
          >
            一斉配信
          </button>
          <button 
            className={`nav-item ${currentPage === 'step' ? 'active' : ''}`}
            onClick={() => setCurrentPage('step')}
          >
            ステップ配信
          </button>
          <button 
            className={`nav-item ${currentPage === 'individual' ? 'active' : ''}`}
            onClick={() => setCurrentPage('individual')}
          >
            個別対応
          </button>
          <button 
            className={`nav-item ${currentPage === 'settings' ? 'active' : ''}`}
            onClick={() => setCurrentPage('settings')}
          >
            設定
          </button>
        </div>
      </nav>
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;