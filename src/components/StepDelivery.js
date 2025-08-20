import React, { useState } from 'react';

const StepDelivery = ({ onNavigate }) => {
  const [currentView, setCurrentView] = useState('list'); // list, create, edit, progress
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [newScenario, setNewScenario] = useState({
    name: '',
    description: '',
    trigger: 'registration',
    steps: [
      {
        id: 1,
        name: 'ウェルカムメッセージ',
        delay: 0,
        delayUnit: 'minutes',
        messageType: 'text',
        content: '',
        condition: null
      }
    ]
  });

  const existingScenarios = [
    {
      id: 1,
      name: 'ウェルカムシーケンス',
      description: '新規登録者向けの導入メッセージ',
      status: 'active',
      totalSteps: 3,
      activeUsers: 234,
      completionRate: '78%',
      createdAt: '2024-01-10'
    },
    {
      id: 2,
      name: '商品紹介シリーズ',
      description: '主力商品の段階的紹介',
      status: 'active',
      totalSteps: 5,
      activeUsers: 156,
      completionRate: '65%',
      createdAt: '2024-01-08'
    },
    {
      id: 3,
      name: '離脱防止フォロー',
      description: '非アクティブユーザー向けメッセージ',
      status: 'draft',
      totalSteps: 2,
      activeUsers: 0,
      completionRate: '-',
      createdAt: '2024-01-15'
    }
  ];

  const handleAddStep = () => {
    const newStep = {
      id: newScenario.steps.length + 1,
      name: `ステップ ${newScenario.steps.length + 1}`,
      delay: 1,
      delayUnit: 'days',
      messageType: 'text',
      content: '',
      condition: null
    };
    setNewScenario(prev => ({
      ...prev,
      steps: [...prev.steps, newStep]
    }));
  };

  const handleUpdateStep = (stepId, field, value) => {
    setNewScenario(prev => ({
      ...prev,
      steps: prev.steps.map(step =>
        step.id === stepId ? { ...step, [field]: value } : step
      )
    }));
  };

  const handleDeleteStep = (stepId) => {
    if (newScenario.steps.length > 1) {
      setNewScenario(prev => ({
        ...prev,
        steps: prev.steps.filter(step => step.id !== stepId)
      }));
    }
  };

  if (currentView === 'progress') {
    return (
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">進行中のシナリオ管理</h1>
          <button className="btn btn-outline" onClick={() => setCurrentView('list')}>
            一覧に戻る
          </button>
        </div>

        <div className="progress-stats">
          <div className="stat-card">
            <div className="stat-number">432</div>
            <div className="stat-label">進行中ユーザー</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">89</div>
            <div className="stat-label">今日完了</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">72%</div>
            <div className="stat-label">平均完了率</div>
          </div>
        </div>

        <div className="card">
          <h2 className="card-title">ユーザーの進行状況</h2>
          <table className="table">
            <thead>
              <tr>
                <th>ユーザーID</th>
                <th>シナリオ</th>
                <th>現在のステップ</th>
                <th>進行率</th>
                <th>次回配信</th>
                <th>アクション</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>U001234</td>
                <td>ウェルカムシーケンス</td>
                <td>ステップ 2/3</td>
                <td>67%</td>
                <td>2024-01-16 10:00</td>
                <td>
                  <button className="btn btn-outline btn-sm">詳細</button>
                </td>
              </tr>
              <tr>
                <td>U005678</td>
                <td>商品紹介シリーズ</td>
                <td>ステップ 3/5</td>
                <td>60%</td>
                <td>2024-01-16 14:30</td>
                <td>
                  <button className="btn btn-outline btn-sm">詳細</button>
                </td>
              </tr>
              <tr>
                <td>U009876</td>
                <td>ウェルカムシーケンス</td>
                <td>ステップ 1/3</td>
                <td>33%</td>
                <td>2024-01-16 09:15</td>
                <td>
                  <button className="btn btn-outline btn-sm">詳細</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <style jsx>{`
          .progress-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
          }

          .btn-sm {
            padding: 5px 10px;
            font-size: 12px;
          }
        `}</style>
      </div>
    );
  }

  if (currentView === 'create') {
    return (
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">新規シナリオ作成</h1>
          <button className="btn btn-outline" onClick={() => setCurrentView('list')}>
            一覧に戻る
          </button>
        </div>

        <div className="scenario-form">
          <div className="card">
            <h2 className="card-title">基本設定</h2>
            
            <div className="form-group">
              <label className="form-label">シナリオ名 *</label>
              <input
                type="text"
                className="form-input"
                value={newScenario.name}
                onChange={(e) => setNewScenario(prev => ({ ...prev, name: e.target.value }))}
                placeholder="例: 新規ユーザー向けウェルカムシーケンス"
              />
            </div>

            <div className="form-group">
              <label className="form-label">説明</label>
              <textarea
                className="form-textarea"
                value={newScenario.description}
                onChange={(e) => setNewScenario(prev => ({ ...prev, description: e.target.value }))}
                placeholder="シナリオの目的や内容を説明してください"
                rows="3"
              />
            </div>

            <div className="form-group">
              <label className="form-label">開始トリガー</label>
              <select
                className="form-select"
                value={newScenario.trigger}
                onChange={(e) => setNewScenario(prev => ({ ...prev, trigger: e.target.value }))}
              >
                <option value="registration">友だち登録直後</option>
                <option value="tag_added">特定タグ追加時</option>
                <option value="button_click">ボタンクリック時</option>
                <option value="manual">手動開始</option>
              </select>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">ステップ設定</h2>
              <button className="btn btn-outline" onClick={handleAddStep}>
                + ステップ追加
              </button>
            </div>

            <div className="steps-container">
              {newScenario.steps.map((step, index) => (
                <div key={step.id} className="step-card">
                  <div className="step-header">
                    <h3>ステップ {index + 1}</h3>
                    {newScenario.steps.length > 1 && (
                      <button 
                        className="delete-step"
                        onClick={() => handleDeleteStep(step.id)}
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  <div className="step-form">
                    <div className="form-group">
                      <label className="form-label">ステップ名</label>
                      <input
                        type="text"
                        className="form-input"
                        value={step.name}
                        onChange={(e) => handleUpdateStep(step.id, 'name', e.target.value)}
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">配信タイミング</label>
                        <div className="timing-inputs">
                          <input
                            type="number"
                            className="form-input timing-number"
                            value={step.delay}
                            onChange={(e) => handleUpdateStep(step.id, 'delay', parseInt(e.target.value))}
                            min="0"
                          />
                          <select
                            className="form-select timing-unit"
                            value={step.delayUnit}
                            onChange={(e) => handleUpdateStep(step.id, 'delayUnit', e.target.value)}
                          >
                            <option value="minutes">分後</option>
                            <option value="hours">時間後</option>
                            <option value="days">日後</option>
                            <option value="weeks">週間後</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">メッセージタイプ</label>
                        <select
                          className="form-select"
                          value={step.messageType}
                          onChange={(e) => handleUpdateStep(step.id, 'messageType', e.target.value)}
                        >
                          <option value="text">テキスト</option>
                          <option value="image">画像</option>
                          <option value="template">テンプレート</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">メッセージ内容</label>
                      <textarea
                        className="form-textarea"
                        value={step.content}
                        onChange={(e) => handleUpdateStep(step.id, 'content', e.target.value)}
                        placeholder="配信するメッセージを入力してください"
                        rows="4"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">条件分岐（オプション）</label>
                      <select
                        className="form-select"
                        value={step.condition || ''}
                        onChange={(e) => handleUpdateStep(step.id, 'condition', e.target.value || null)}
                      >
                        <option value="">条件なし</option>
                        <option value="clicked">リンククリック済み</option>
                        <option value="not_clicked">リンク未クリック</option>
                        <option value="replied">返信あり</option>
                        <option value="not_replied">返信なし</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button className="btn btn-secondary" onClick={() => setCurrentView('list')}>
              キャンセル
            </button>
            <button className="btn btn-primary" disabled={!newScenario.name}>
              シナリオを保存
            </button>
          </div>
        </div>

        <style jsx>{`
          .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }

          .steps-container {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .step-card {
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            padding: 20px;
            background: #f8f9fa;
          }

          .step-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
          }

          .step-header h3 {
            margin: 0;
            color: #333;
          }

          .delete-step {
            background: #dc3545;
            color: white;
            border: none;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            cursor: pointer;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }

          .timing-inputs {
            display: flex;
            gap: 10px;
          }

          .timing-number {
            flex: 1;
          }

          .timing-unit {
            flex: 1;
          }

          .form-actions {
            display: flex;
            gap: 15px;
            justify-content: center;
            margin-top: 30px;
          }

          @media (max-width: 768px) {
            .form-row {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">ステップ配信</h1>
        <div className="header-actions">
          <button className="btn btn-outline" onClick={() => setCurrentView('progress')}>
            進行状況管理
          </button>
          <button className="btn btn-primary" onClick={() => setCurrentView('create')}>
            新規シナリオ作成
          </button>
        </div>
      </div>

      <div className="scenarios-grid">
        {existingScenarios.map((scenario) => (
          <div key={scenario.id} className="scenario-card">
            <div className="scenario-header">
              <h3>{scenario.name}</h3>
              <span className={`status-badge ${scenario.status === 'active' ? 'status-active' : 'status-inactive'}`}>
                {scenario.status === 'active' ? '配信中' : '下書き'}
              </span>
            </div>
            
            <p className="scenario-description">{scenario.description}</p>
            
            <div className="scenario-stats">
              <div className="stat-item">
                <span className="stat-label">ステップ数:</span>
                <span className="stat-value">{scenario.totalSteps}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">進行中ユーザー:</span>
                <span className="stat-value">{scenario.activeUsers}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">完了率:</span>
                <span className="stat-value">{scenario.completionRate}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">作成日:</span>
                <span className="stat-value">{scenario.createdAt}</span>
              </div>
            </div>

            <div className="scenario-actions">
              <button className="btn btn-outline btn-sm">編集</button>
              <button className="btn btn-outline btn-sm">複製</button>
              <button className="btn btn-outline btn-sm">詳細</button>
              {scenario.status === 'active' ? (
                <button className="btn btn-secondary btn-sm">停止</button>
              ) : (
                <button className="btn btn-primary btn-sm">開始</button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="empty-state" style={{ display: existingScenarios.length === 0 ? 'block' : 'none' }}>
        <div className="empty-icon">🔄</div>
        <h3>シナリオがありません</h3>
        <p>新規シナリオを作成して、自動配信を開始しましょう</p>
        <button className="btn btn-primary" onClick={() => setCurrentView('create')}>
          最初のシナリオを作成
        </button>
      </div>

      <style jsx>{`
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .header-actions {
          display: flex;
          gap: 15px;
        }

        .scenarios-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 25px;
        }

        .scenario-card {
          background: white;
          border-radius: 8px;
          padding: 25px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          border: 1px solid #e0e0e0;
          transition: all 0.2s;
        }

        .scenario-card:hover {
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
          transform: translateY(-2px);
        }

        .scenario-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 15px;
        }

        .scenario-header h3 {
          margin: 0;
          color: #333;
          font-size: 18px;
        }

        .scenario-description {
          color: #666;
          margin-bottom: 20px;
          line-height: 1.5;
        }

        .scenario-stats {
          margin-bottom: 20px;
        }

        .stat-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 14px;
        }

        .stat-label {
          color: #666;
        }

        .stat-value {
          color: #333;
          font-weight: 500;
        }

        .scenario-actions {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .btn-sm {
          padding: 6px 12px;
          font-size: 12px;
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: #666;
        }

        .empty-icon {
          font-size: 48px;
          margin-bottom: 20px;
        }

        .empty-state h3 {
          margin-bottom: 10px;
          color: #333;
        }

        .empty-state p {
          margin-bottom: 30px;
        }

        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            gap: 15px;
            align-items: flex-start;
          }

          .header-actions {
            width: 100%;
            justify-content: flex-start;
          }

          .scenarios-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default StepDelivery;