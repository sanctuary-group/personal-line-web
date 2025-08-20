import React, { useState } from 'react';

const Settings = ({ onNavigate }) => {
  const [currentTab, setCurrentTab] = useState('tags'); // tags, admin

  const [tags, setTags] = useState([
    { id: 1, name: '新規', color: '#28a745', description: '新しく追加された友だち', count: 234 },
    { id: 2, name: 'アクティブ', color: '#007bff', description: '最近活動のある友だち', count: 567 },
    { id: 3, name: 'VIP', color: '#ffc107', description: '重要な顧客', count: 45 },
    { id: 4, name: '購入済み', color: '#17a2b8', description: '商品を購入した友だち', count: 189 },
    { id: 5, name: 'リピーター', color: '#6f42c1', description: '複数回購入している友だち', count: 78 }
  ]);

  const [newTag, setNewTag] = useState({ name: '', color: '#007bff', description: '' });
  const [showAddTag, setShowAddTag] = useState(false);

  const [admins, setAdmins] = useState([
    {
      id: 1,
      name: '管理者',
      email: 'admin@example.com',
      role: 'owner',
      status: 'active',
      lastLogin: '2024-01-15 10:30',
      createdAt: '2024-01-01'
    },
    {
      id: 2,
      name: 'スタッフA',
      email: 'staff-a@example.com',
      role: 'editor',
      status: 'active',
      lastLogin: '2024-01-14 16:20',
      createdAt: '2024-01-05'
    },
    {
      id: 3,
      name: 'スタッフB',
      email: 'staff-b@example.com',
      role: 'viewer',
      status: 'inactive',
      lastLogin: '2024-01-10 09:15',
      createdAt: '2024-01-10'
    }
  ]);

  const [inviteForm, setInviteForm] = useState({ email: '', role: 'viewer' });
  const [showInvite, setShowInvite] = useState(false);


  const handleAddTag = () => {
    if (newTag.name.trim()) {
      const newTagItem = {
        id: Date.now(),
        name: newTag.name,
        color: newTag.color,
        description: newTag.description,
        count: 0
      };
      setTags(prev => [...prev, newTagItem]);
      setNewTag({ name: '', color: '#007bff', description: '' });
      setShowAddTag(false);
    }
  };

  const handleDeleteTag = (tagId) => {
    setTags(prev => prev.filter(tag => tag.id !== tagId));
  };

  const handleInviteAdmin = () => {
    if (inviteForm.email) {
      // 招待メール送信処理
      setInviteForm({ email: '', role: 'viewer' });
      setShowInvite(false);
    }
  };

  const renderBasicSettings = () => (
    <div className="settings-content">
      <div className="card">
        <h2 className="card-title">基本設定</h2>
        
        <div className="form-group">
          <label className="form-label">アプリケーション名</label>
          <input
            type="text"
            className="form-input"
            defaultValue="個人LINE管理画面"
          />
        </div>

        <div className="form-group">
          <label className="form-label">タイムゾーン</label>
          <select className="form-select">
            <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
            <option value="UTC">UTC</option>
          </select>
        </div>

        <div className="form-group">
          <label className="checkbox-item">
            <input type="checkbox" defaultChecked />
            メール通知を有効にする
          </label>
        </div>

        <div className="form-actions">
          <button className="btn btn-primary">設定を保存</button>
        </div>
      </div>
    </div>
  );

  const renderTagSettings = () => (
    <div className="settings-content">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">タグ管理</h2>
          <button className="btn btn-primary" onClick={() => setShowAddTag(true)}>
            + 新しいタグ
          </button>
        </div>

        {showAddTag && (
          <div className="add-tag-form">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">タグ名</label>
                <input
                  type="text"
                  className="form-input"
                  value={newTag.name}
                  onChange={(e) => setNewTag(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="例: 優良顧客"
                />
              </div>
              <div className="form-group">
                <label className="form-label">色</label>
                <input
                  type="color"
                  className="form-input color-input"
                  value={newTag.color}
                  onChange={(e) => setNewTag(prev => ({ ...prev, color: e.target.value }))}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">説明</label>
              <input
                type="text"
                className="form-input"
                value={newTag.description}
                onChange={(e) => setNewTag(prev => ({ ...prev, description: e.target.value }))}
                placeholder="タグの用途を説明してください"
              />
            </div>
            <div className="form-actions">
              <button className="btn btn-secondary" onClick={() => setShowAddTag(false)}>
                キャンセル
              </button>
              <button className="btn btn-primary" onClick={handleAddTag}>
                追加
              </button>
            </div>
          </div>
        )}

        <div className="tags-list">
          {tags.map((tag) => (
            <div key={tag.id} className="tag-item">
              <div className="tag-info">
                <div className="tag-visual">
                  <span 
                    className="tag-color" 
                    style={{ backgroundColor: tag.color }}
                  ></span>
                  <span className="tag-name">{tag.name}</span>
                </div>
                <div className="tag-details">
                  <p className="tag-description">{tag.description}</p>
                  <span className="tag-count">{tag.count}人が使用中</span>
                </div>
              </div>
              <div className="tag-actions">
                <button className="btn btn-outline btn-sm">編集</button>
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleDeleteTag(tag.id)}
                >
                  削除
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAdminSettings = () => (
    <div className="settings-content">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">管理者アカウント</h2>
          <button className="btn btn-primary" onClick={() => setShowInvite(true)}>
            + 管理者を招待
          </button>
        </div>

        {showInvite && (
          <div className="invite-form">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">メールアドレス</label>
                <input
                  type="email"
                  className="form-input"
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="example@company.com"
                />
              </div>
              <div className="form-group">
                <label className="form-label">権限</label>
                <select
                  className="form-select"
                  value={inviteForm.role}
                  onChange={(e) => setInviteForm(prev => ({ ...prev, role: e.target.value }))}
                >
                  <option value="viewer">閲覧者</option>
                  <option value="editor">編集者</option>
                  <option value="owner">管理者</option>
                </select>
              </div>
            </div>
            <div className="form-actions">
              <button className="btn btn-secondary" onClick={() => setShowInvite(false)}>
                キャンセル
              </button>
              <button className="btn btn-primary" onClick={handleInviteAdmin}>
                招待メールを送信
              </button>
            </div>
          </div>
        )}

        <div className="admins-list">
          <table className="table">
            <thead>
              <tr>
                <th>名前</th>
                <th>メール</th>
                <th>権限</th>
                <th>ステータス</th>
                <th>最終ログイン</th>
                <th>アクション</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id}>
                  <td>{admin.name}</td>
                  <td>{admin.email}</td>
                  <td>
                    <span className={`role-badge role-${admin.role}`}>
                      {admin.role === 'owner' ? '管理者' :
                       admin.role === 'editor' ? '編集者' : '閲覧者'}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${admin.status === 'active' ? 'status-active' : 'status-inactive'}`}>
                      {admin.status === 'active' ? 'アクティブ' : '非アクティブ'}
                    </span>
                  </td>
                  <td>{admin.lastLogin}</td>
                  <td>
                    <div className="admin-actions">
                      {admin.role !== 'owner' && (
                        <>
                          <button className="btn btn-outline btn-sm">編集</button>
                          <button className="btn btn-secondary btn-sm">削除</button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">権限について</h2>
        <div className="permissions-info">
          <div className="permission-item">
            <h4>管理者 (Owner)</h4>
            <p>すべての機能にアクセス可能。他の管理者の招待・削除が可能です。</p>
          </div>
          <div className="permission-item">
            <h4>編集者 (Editor)</h4>
            <p>配信の作成・編集、友だち管理、レポートの閲覧が可能です。</p>
          </div>
          <div className="permission-item">
            <h4>閲覧者 (Viewer)</h4>
            <p>レポートとデータの閲覧のみ可能です。編集はできません。</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">設定</h1>
        <button className="btn btn-outline" onClick={() => onNavigate('dashboard')}>
          ダッシュボードに戻る
        </button>
      </div>

      <div className="settings-layout">
        <div className="settings-nav">
          <button
            className={`nav-tab ${currentTab === 'basic' ? 'active' : ''}`}
            onClick={() => setCurrentTab('basic')}
          >
            基本設定
          </button>
          <button
            className={`nav-tab ${currentTab === 'tags' ? 'active' : ''}`}
            onClick={() => setCurrentTab('tags')}
          >
            タグ管理
          </button>
          <button
            className={`nav-tab ${currentTab === 'admin' ? 'active' : ''}`}
            onClick={() => setCurrentTab('admin')}
          >
            管理者設定
          </button>
        </div>

        <div className="settings-main">
          {currentTab === 'basic' && renderBasicSettings()}
          {currentTab === 'tags' && renderTagSettings()}
          {currentTab === 'admin' && renderAdminSettings()}
        </div>
      </div>

      <style jsx>{`
        .settings-layout {
          display: grid;
          grid-template-columns: 250px 1fr;
          gap: 30px;
        }

        .settings-nav {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .nav-tab {
          padding: 12px 20px;
          border: none;
          background: none;
          text-align: left;
          color: #666;
          font-size: 14px;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.2s;
        }

        .nav-tab:hover {
          background: #f8f9fa;
          color: #333;
        }

        .nav-tab.active {
          background: #00b900;
          color: white;
        }

        .settings-content {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }


        .checkbox-item {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
        }

        .add-tag-form,
        .invite-form {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 25px;
          border: 1px solid #e0e0e0;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 20px;
        }

        .color-input {
          width: 60px;
          height: 40px;
          padding: 2px;
        }

        .tags-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .tag-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 8px;
          border: 1px solid #e0e0e0;
        }

        .tag-visual {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 5px;
        }

        .tag-color {
          width: 20px;
          height: 20px;
          border-radius: 50%;
        }

        .tag-name {
          font-weight: 500;
          color: #333;
        }

        .tag-description {
          margin: 0;
          color: #666;
          font-size: 14px;
        }

        .tag-count {
          color: #999;
          font-size: 12px;
        }

        .tag-actions,
        .admin-actions {
          display: flex;
          gap: 8px;
        }

        .btn-sm {
          padding: 5px 10px;
          font-size: 12px;
        }

        .admins-list {
          overflow-x: auto;
        }

        .role-badge {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }

        .role-owner {
          background: #e8f5e8;
          color: #00b900;
        }

        .role-editor {
          background: #e3f2fd;
          color: #1976d2;
        }

        .role-viewer {
          background: #f3e5f5;
          color: #7b1fa2;
        }

        .permissions-info {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .permission-item {
          padding: 15px;
          background: #f8f9fa;
          border-radius: 6px;
        }

        .permission-item h4 {
          margin: 0 0 8px 0;
          color: #333;
          font-size: 14px;
        }

        .permission-item p {
          margin: 0;
          color: #666;
          font-size: 13px;
          line-height: 1.4;
        }

        @media (max-width: 768px) {
          .settings-layout {
            grid-template-columns: 1fr;
          }

          .settings-nav {
            flex-direction: row;
            overflow-x: auto;
          }

          .nav-tab {
            white-space: nowrap;
          }

          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Settings;