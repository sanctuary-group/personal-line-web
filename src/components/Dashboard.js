import React from 'react';

const Dashboard = ({ onNavigate }) => {
  const stats = [
    { label: '友だち数', value: '12,453', trend: '+234' },
    { label: '今月の配信数', value: '28', trend: '+12' },
    { label: '開封率', value: '67.8%', trend: '+2.3%' },
    { label: 'クリック率', value: '23.4%', trend: '+1.8%' }
  ];

  const recentDeliveries = [
    { id: 1, title: '新商品のお知らせ', type: '一斉配信', date: '2024-01-15', status: '配信完了', recipients: 12453 },
    { id: 2, title: 'ウェルカムメッセージ', type: 'ステップ配信', date: '2024-01-14', status: '進行中', recipients: 234 },
    { id: 3, title: 'キャンペーン情報', type: '一斉配信', date: '2024-01-13', status: '配信完了', recipients: 11892 },
    { id: 4, title: 'フォローアップ', type: 'ステップ配信', date: '2024-01-12', status: '進行中', recipients: 567 }
  ];

  return (
    <div className="page-container">
      <h1 className="page-title">ダッシュボード</h1>
      
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-number">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-trend">{stat.trend}</div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h2 className="card-title">クイックアクション</h2>
          <div className="quick-actions">
            <button 
              className="action-btn broadcast"
              onClick={() => onNavigate('broadcast')}
            >
              <div className="action-icon">📢</div>
              <div className="action-text">
                <h3>一斉配信</h3>
                <p>全友だちにメッセージを送信</p>
              </div>
            </button>
            
            <button 
              className="action-btn step"
              onClick={() => onNavigate('step')}
            >
              <div className="action-icon">🔄</div>
              <div className="action-text">
                <h3>ステップ配信</h3>
                <p>自動シナリオを作成・管理</p>
              </div>
            </button>
            
            <button 
              className="action-btn individual"
              onClick={() => onNavigate('individual')}
            >
              <div className="action-icon">💬</div>
              <div className="action-text">
                <h3>個別対応</h3>
                <p>友だちとの個別メッセージ</p>
              </div>
            </button>
            
            <button 
              className="action-btn settings"
              onClick={() => onNavigate('settings')}
            >
              <div className="action-icon">⚙️</div>
              <div className="action-text">
                <h3>設定</h3>
                <p>アカウント・システム設定</p>
              </div>
            </button>
          </div>
        </div>

        <div className="card">
          <h2 className="card-title">最近の配信履歴</h2>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>タイトル</th>
                  <th>種類</th>
                  <th>配信日</th>
                  <th>ステータス</th>
                  <th>配信数</th>
                </tr>
              </thead>
              <tbody>
                {recentDeliveries.map((delivery) => (
                  <tr key={delivery.id}>
                    <td>{delivery.title}</td>
                    <td>{delivery.type}</td>
                    <td>{delivery.date}</td>
                    <td>
                      <span className={`status-badge ${delivery.status === '配信完了' ? 'status-active' : 'status-progress'}`}>
                        {delivery.status}
                      </span>
                    </td>
                    <td>{delivery.recipients.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card-footer">
            <button className="btn btn-outline">すべての履歴を見る</button>
          </div>
        </div>
      </div>

      <div className="dashboard-charts">
        <div className="card">
          <h2 className="card-title">配信パフォーマンス</h2>
          <div className="chart-placeholder">
            <div className="chart-info">
              <p>📊 グラフ表示エリア</p>
              <small>実装時にChart.jsなどのライブラリを使用してグラフを表示</small>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          margin-bottom: 30px;
        }

        .quick-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 20px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          background: white;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }

        .action-btn:hover {
          border-color: #00b900;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,185,0,0.15);
        }

        .action-icon {
          font-size: 24px;
        }

        .action-text h3 {
          margin: 0 0 5px 0;
          color: #333;
          font-size: 16px;
        }

        .action-text p {
          margin: 0;
          color: #666;
          font-size: 13px;
        }

        .stat-trend {
          color: #00b900;
          font-size: 14px;
          font-weight: 500;
          margin-top: 5px;
        }

        .status-progress {
          background-color: #fff3cd;
          color: #856404;
        }

        .table-container {
          overflow-x: auto;
        }

        .card-footer {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #e0e0e0;
          text-align: center;
        }

        .dashboard-charts {
          margin-top: 30px;
        }

        .chart-placeholder {
          height: 300px;
          background: #f8f9fa;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px dashed #dee2e6;
        }

        .chart-info {
          text-align: center;
          color: #6c757d;
        }

        .chart-info p {
          margin: 0 0 10px 0;
          font-size: 18px;
        }

        .chart-info small {
          font-size: 12px;
        }

        @media (max-width: 768px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
          
          .quick-actions {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;