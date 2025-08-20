import React, { useState } from 'react';

const IndividualSupport = ({ onNavigate }) => {
  const [currentView, setCurrentView] = useState('friends'); // friends, chat, autoReply
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTag, setFilterTag] = useState('all');

  const friends = [
    {
      id: 'U001234',
      displayName: '田中太郎',
      pictureUrl: null,
      tags: ['新規', 'アクティブ'],
      lastMessage: 'ありがとうございます！',
      lastMessageTime: '2024-01-15 14:30',
      unreadCount: 2,
      status: 'active'
    },
    {
      id: 'U005678',
      displayName: '佐藤花子',
      pictureUrl: null,
      tags: ['VIP', '購入済み'],
      lastMessage: '商品について質問があります',
      lastMessageTime: '2024-01-15 10:15',
      unreadCount: 1,
      status: 'active'
    },
    {
      id: 'U009876',
      displayName: '山田次郎',
      pictureUrl: null,
      tags: ['新規'],
      lastMessage: 'こんにちは',
      lastMessageTime: '2024-01-14 16:45',
      unreadCount: 0,
      status: 'inactive'
    },
    {
      id: 'U011111',
      displayName: '鈴木美咲',
      pictureUrl: null,
      tags: ['リピーター', 'アクティブ'],
      lastMessage: 'いつもありがとうございます',
      lastMessageTime: '2024-01-14 09:20',
      unreadCount: 0,
      status: 'active'
    }
  ];

  const chatHistory = selectedFriend ? [
    {
      id: 1,
      senderId: selectedFriend.id,
      senderType: 'user',
      content: 'こんにちは！商品について質問があります',
      timestamp: '2024-01-15 10:10',
      messageType: 'text'
    },
    {
      id: 2,
      senderId: 'admin',
      senderType: 'admin',
      content: 'ご質問をお聞かせください。喜んでお答えします！',
      timestamp: '2024-01-15 10:12',
      messageType: 'text'
    },
    {
      id: 3,
      senderId: selectedFriend.id,
      senderType: 'user',
      content: '配送にはどのくらいかかりますか？',
      timestamp: '2024-01-15 10:15',
      messageType: 'text'
    }
  ] : [];

  const autoReplyRules = [
    {
      id: 1,
      keyword: '営業時間',
      reply: '営業時間は平日9:00-18:00です。土日祝日はお休みをいただいております。',
      isActive: true,
      matchType: 'contains'
    },
    {
      id: 2,
      keyword: '配送',
      reply: '配送は通常2-3営業日でお届けします。お急ぎの場合は別途ご相談ください。',
      isActive: true,
      matchType: 'contains'
    },
    {
      id: 3,
      keyword: '返品',
      reply: '返品・交換については商品到着後7日以内にご連絡ください。詳細は下記をご確認ください。',
      isActive: false,
      matchType: 'contains'
    }
  ];

  const filteredFriends = friends.filter(friend => {
    const matchesSearch = friend.displayName.includes(searchQuery) || 
                         friend.id.includes(searchQuery);
    const matchesTag = filterTag === 'all' || friend.tags.includes(filterTag);
    return matchesSearch && matchesTag;
  });

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedFriend) {
      // ここで実際のメッセージ送信処理を行う
      setMessageInput('');
    }
  };

  if (currentView === 'autoReply') {
    return (
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">自動応答設定</h1>
          <div className="header-actions">
            <button className="btn btn-outline" onClick={() => setCurrentView('friends')}>
              友だち一覧に戻る
            </button>
            <button className="btn btn-primary">新規ルール追加</button>
          </div>
        </div>

        <div className="card">
          <h2 className="card-title">自動応答ルール</h2>
          <p className="card-description">
            キーワードに基づいて自動的にメッセージを返信します。優先度の高い順に処理されます。
          </p>

          <div className="auto-reply-list">
            {autoReplyRules.map((rule) => (
              <div key={rule.id} className="auto-reply-item">
                <div className="rule-header">
                  <div className="rule-info">
                    <h3>キーワード: "{rule.keyword}"</h3>
                    <span className={`status-badge ${rule.isActive ? 'status-active' : 'status-inactive'}`}>
                      {rule.isActive ? '有効' : '無効'}
                    </span>
                  </div>
                  <div className="rule-actions">
                    <button className="btn btn-outline btn-sm">編集</button>
                    <button className="btn btn-secondary btn-sm">
                      {rule.isActive ? '無効化' : '有効化'}
                    </button>
                  </div>
                </div>
                
                <div className="rule-content">
                  <strong>自動返信:</strong>
                  <p>{rule.reply}</p>
                </div>

                <div className="rule-settings">
                  <span>マッチ条件: {rule.matchType === 'contains' ? '部分一致' : '完全一致'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          .auto-reply-list {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .auto-reply-item {
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            padding: 20px;
            background: #f8f9fa;
          }

          .rule-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 15px;
          }

          .rule-info {
            display: flex;
            align-items: center;
            gap: 15px;
          }

          .rule-info h3 {
            margin: 0;
            color: #333;
            font-size: 16px;
          }

          .rule-actions {
            display: flex;
            gap: 10px;
          }

          .rule-content {
            margin-bottom: 15px;
          }

          .rule-content strong {
            color: #333;
            display: block;
            margin-bottom: 5px;
          }

          .rule-content p {
            background: white;
            padding: 10px;
            border-radius: 4px;
            margin: 0;
            border: 1px solid #e0e0e0;
          }

          .rule-settings {
            font-size: 14px;
            color: #666;
          }

          .btn-sm {
            padding: 5px 10px;
            font-size: 12px;
          }

          .card-description {
            color: #666;
            margin-bottom: 25px;
            font-size: 14px;
          }
        `}</style>
      </div>
    );
  }

  if (currentView === 'chat' && selectedFriend) {
    return (
      <div className="page-container">
        <div className="chat-container">
          <div className="chat-header">
            <div className="chat-user-info">
              <div className="user-avatar">
                {selectedFriend.displayName.charAt(0)}
              </div>
              <div className="user-details">
                <h2>{selectedFriend.displayName}</h2>
                <p>ID: {selectedFriend.id}</p>
                <div className="user-tags">
                  {selectedFriend.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            <button className="btn btn-outline" onClick={() => setCurrentView('friends')}>
              一覧に戻る
            </button>
          </div>

          <div className="chat-messages">
            {chatHistory.map((message) => (
              <div key={message.id} className={`message ${message.senderType === 'admin' ? 'message-sent' : 'message-received'}`}>
                <div className="message-content">
                  {message.content}
                </div>
                <div className="message-time">
                  {message.timestamp}
                </div>
              </div>
            ))}
          </div>

          <div className="chat-input">
            <div className="input-container">
              <textarea
                className="message-textarea"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="メッセージを入力..."
                rows="3"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <button 
                className="send-button"
                onClick={handleSendMessage}
                disabled={!messageInput.trim()}
              >
                送信
              </button>
            </div>
            <div className="quick-replies">
              <button className="quick-reply" onClick={() => setMessageInput('ありがとうございます。')}>
                ありがとうございます
              </button>
              <button className="quick-reply" onClick={() => setMessageInput('確認いたします。')}>
                確認いたします
              </button>
              <button className="quick-reply" onClick={() => setMessageInput('申し訳ございません。')}>
                申し訳ございません
              </button>
            </div>
          </div>
        </div>

        <style jsx>{`
          .chat-container {
            display: flex;
            flex-direction: column;
            height: calc(100vh - 160px);
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }

          .chat-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            border-bottom: 1px solid #e0e0e0;
            background: #f8f9fa;
            border-radius: 8px 8px 0 0;
          }

          .chat-user-info {
            display: flex;
            align-items: center;
            gap: 15px;
          }

          .user-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #00b900;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            font-weight: bold;
          }

          .user-details h2 {
            margin: 0 0 5px 0;
            font-size: 18px;
            color: #333;
          }

          .user-details p {
            margin: 0 0 8px 0;
            color: #666;
            font-size: 14px;
          }

          .user-tags {
            display: flex;
            gap: 5px;
            flex-wrap: wrap;
          }

          .tag {
            background: #e8f5e8;
            color: #00b900;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 12px;
          }

          .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 15px;
          }

          .message {
            display: flex;
            flex-direction: column;
            max-width: 70%;
          }

          .message-received {
            align-self: flex-start;
          }

          .message-sent {
            align-self: flex-end;
          }

          .message-content {
            padding: 12px 16px;
            border-radius: 18px;
            word-wrap: break-word;
          }

          .message-received .message-content {
            background: #f0f0f0;
            color: #333;
            border-bottom-left-radius: 4px;
          }

          .message-sent .message-content {
            background: #00b900;
            color: white;
            border-bottom-right-radius: 4px;
          }

          .message-time {
            font-size: 12px;
            color: #999;
            margin-top: 4px;
            text-align: center;
          }

          .chat-input {
            padding: 20px;
            border-top: 1px solid #e0e0e0;
            background: #f8f9fa;
            border-radius: 0 0 8px 8px;
          }

          .input-container {
            display: flex;
            gap: 10px;
            margin-bottom: 15px;
          }

          .message-textarea {
            flex: 1;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 6px;
            resize: none;
            font-family: inherit;
            font-size: 14px;
          }

          .message-textarea:focus {
            outline: none;
            border-color: #00b900;
          }

          .send-button {
            background: #00b900;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 500;
            transition: background-color 0.2s;
          }

          .send-button:hover:not(:disabled) {
            background: #009900;
          }

          .send-button:disabled {
            background: #ccc;
            cursor: not-allowed;
          }

          .quick-replies {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
          }

          .quick-reply {
            background: white;
            color: #00b900;
            border: 1px solid #00b900;
            padding: 6px 12px;
            border-radius: 16px;
            cursor: pointer;
            font-size: 12px;
            transition: all 0.2s;
          }

          .quick-reply:hover {
            background: #00b900;
            color: white;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">個別対応</h1>
        <button className="btn btn-primary" onClick={() => setCurrentView('autoReply')}>
          自動応答設定
        </button>
      </div>

      <div className="friends-container">
        <div className="friends-header">
          <div className="search-filters">
            <div className="search-box">
              <input
                type="text"
                className="form-input"
                placeholder="友だち名またはIDで検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="filter-tags">
              <select
                className="form-select"
                value={filterTag}
                onChange={(e) => setFilterTag(e.target.value)}
              >
                <option value="all">すべてのタグ</option>
                <option value="新規">新規</option>
                <option value="アクティブ">アクティブ</option>
                <option value="VIP">VIP</option>
                <option value="購入済み">購入済み</option>
                <option value="リピーター">リピーター</option>
              </select>
            </div>
          </div>
          <div className="friends-count">
            {filteredFriends.length}件の友だち
          </div>
        </div>

        <div className="friends-list">
          {filteredFriends.map((friend) => (
            <div key={friend.id} className="friend-item">
              <div className="friend-avatar">
                {friend.displayName.charAt(0)}
              </div>
              
              <div className="friend-info">
                <div className="friend-name">
                  {friend.displayName}
                  {friend.unreadCount > 0 && (
                    <span className="unread-badge">{friend.unreadCount}</span>
                  )}
                </div>
                <div className="friend-id">ID: {friend.id}</div>
                <div className="friend-tags">
                  {friend.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
                <div className="last-message">
                  <span className="message-text">{friend.lastMessage}</span>
                  <span className="message-time">{friend.lastMessageTime}</span>
                </div>
              </div>

              <div className="friend-actions">
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    setSelectedFriend(friend);
                    setCurrentView('chat');
                  }}
                >
                  メッセージ
                </button>
                <button className="btn btn-outline btn-sm">プロフィール</button>
              </div>
            </div>
          ))}
        </div>

        {filteredFriends.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">👥</div>
            <h3>友だちが見つかりません</h3>
            <p>検索条件を変更してみてください</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .friends-container {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .friends-header {
          padding: 25px;
          border-bottom: 1px solid #e0e0e0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        .search-filters {
          display: flex;
          gap: 15px;
          flex: 1;
        }

        .search-box {
          flex: 1;
          max-width: 300px;
        }

        .filter-tags {
          min-width: 150px;
        }

        .friends-count {
          color: #666;
          font-size: 14px;
        }

        .friends-list {
          display: flex;
          flex-direction: column;
        }

        .friend-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 20px 25px;
          border-bottom: 1px solid #f0f0f0;
          transition: background-color 0.2s;
        }

        .friend-item:hover {
          background-color: #f8f9fa;
        }

        .friend-item:last-child {
          border-bottom: none;
        }

        .friend-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #00b900;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: bold;
          flex-shrink: 0;
        }

        .friend-info {
          flex: 1;
          min-width: 0;
        }

        .friend-name {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 5px;
          font-size: 16px;
          font-weight: 500;
          color: #333;
        }

        .unread-badge {
          background: #ff4757;
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
        }

        .friend-id {
          color: #666;
          font-size: 14px;
          margin-bottom: 8px;
        }

        .friend-tags {
          display: flex;
          gap: 5px;
          flex-wrap: wrap;
          margin-bottom: 8px;
        }

        .tag {
          background: #e8f5e8;
          color: #00b900;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 12px;
        }

        .last-message {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
        }

        .message-text {
          color: #666;
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          flex: 1;
        }

        .message-time {
          color: #999;
          font-size: 12px;
          flex-shrink: 0;
        }

        .friend-actions {
          display: flex;
          gap: 10px;
          flex-shrink: 0;
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
          margin-bottom: 0;
        }

        @media (max-width: 768px) {
          .friends-header {
            flex-direction: column;
            align-items: stretch;
          }

          .search-filters {
            flex-direction: column;
          }

          .friend-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }

          .friend-actions {
            width: 100%;
            justify-content: flex-end;
          }
        }
      `}</style>
    </div>
  );
};

export default IndividualSupport;