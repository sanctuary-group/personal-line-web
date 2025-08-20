import React, { useState } from 'react';

const BroadcastSend = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState('create'); // create, confirm, complete
  const [formData, setFormData] = useState({
    title: '',
    messageType: 'text',
    textContent: '',
    imageFile: null,
    imageUrl: '',
    hasButton: false,
    buttonText: '',
    buttonUrl: '',
    target: 'all',
    segment: '',
    tags: [],
    scheduleType: 'now',
    scheduleDate: '',
    scheduleTime: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        imageFile: file,
        imageUrl: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = () => {
    setCurrentStep('confirm');
  };

  const handleConfirm = () => {
    setCurrentStep('complete');
  };

  const handleNewBroadcast = () => {
    setCurrentStep('create');
    setFormData({
      title: '',
      messageType: 'text',
      textContent: '',
      imageFile: null,
      imageUrl: '',
      hasButton: false,
      buttonText: '',
      buttonUrl: '',
      target: 'all',
      segment: '',
      tags: [],
      scheduleType: 'now',
      scheduleDate: '',
      scheduleTime: ''
    });
  };

  if (currentStep === 'complete') {
    return (
      <div className="page-container">
        <div className="completion-screen">
          <div className="completion-icon">✅</div>
          <h1>配信完了</h1>
          <p>メッセージの配信が完了しました</p>
          <div className="completion-details">
            <div className="detail-item">
              <strong>配信タイトル:</strong> {formData.title}
            </div>
            <div className="detail-item">
              <strong>配信対象:</strong> {formData.target === 'all' ? '全友だち' : formData.target}
            </div>
            <div className="detail-item">
              <strong>配信時刻:</strong> {new Date().toLocaleString('ja-JP')}
            </div>
          </div>
          <div className="completion-actions">
            <button className="btn btn-primary" onClick={handleNewBroadcast}>
              新しい配信を作成
            </button>
            <button className="btn btn-outline" onClick={() => onNavigate('dashboard')}>
              ダッシュボードに戻る
            </button>
          </div>
        </div>

        <style jsx>{`
          .completion-screen {
            text-align: center;
            padding: 60px 20px;
            max-width: 600px;
            margin: 0 auto;
          }

          .completion-icon {
            font-size: 64px;
            margin-bottom: 20px;
          }

          .completion-screen h1 {
            color: #00b900;
            margin-bottom: 10px;
            font-size: 32px;
          }

          .completion-screen > p {
            color: #666;
            margin-bottom: 40px;
            font-size: 18px;
          }

          .completion-details {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 40px;
            text-align: left;
          }

          .detail-item {
            margin-bottom: 10px;
            font-size: 16px;
          }

          .detail-item strong {
            color: #333;
          }

          .completion-actions {
            display: flex;
            gap: 15px;
            justify-content: center;
            flex-wrap: wrap;
          }
        `}</style>
      </div>
    );
  }

  if (currentStep === 'confirm') {
    return (
      <div className="page-container">
        <h1 className="page-title">配信確認</h1>
        
        <div className="card">
          <h2 className="card-title">配信内容を確認してください</h2>
          
          <div className="confirm-section">
            <h3>基本情報</h3>
            <div className="confirm-item">
              <strong>タイトル:</strong> {formData.title}
            </div>
            <div className="confirm-item">
              <strong>配信対象:</strong> 
              {formData.target === 'all' ? '全友だち (12,453人)' : 
               formData.target === 'segment' ? `セグメント: ${formData.segment}` :
               `タグ: ${formData.tags.join(', ')}`}
            </div>
            <div className="confirm-item">
              <strong>配信予定:</strong> 
              {formData.scheduleType === 'now' ? '即座に配信' : 
               `${formData.scheduleDate} ${formData.scheduleTime}`}
            </div>
          </div>

          <div className="confirm-section">
            <h3>メッセージ内容</h3>
            <div className="message-preview">
              {formData.messageType === 'text' && (
                <div className="text-preview">
                  {formData.textContent}
                </div>
              )}
              {formData.messageType === 'image' && (
                <div className="image-preview">
                  {formData.imageUrl && (
                    <img src={formData.imageUrl} alt="配信画像" style={{maxWidth: '300px', maxHeight: '200px'}} />
                  )}
                  {formData.textContent && (
                    <div className="image-text">{formData.textContent}</div>
                  )}
                </div>
              )}
              {formData.hasButton && (
                <div className="button-preview">
                  <button className="preview-button">
                    {formData.buttonText}
                  </button>
                  <small>リンク先: {formData.buttonUrl}</small>
                </div>
              )}
            </div>
          </div>

          <div className="confirm-actions">
            <button className="btn btn-secondary" onClick={() => setCurrentStep('create')}>
              戻って編集
            </button>
            <button className="btn btn-primary" onClick={handleConfirm}>
              配信実行
            </button>
          </div>
        </div>

        <style jsx>{`
          .confirm-section {
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid #e0e0e0;
          }

          .confirm-section:last-of-type {
            border-bottom: none;
          }

          .confirm-section h3 {
            color: #333;
            margin-bottom: 15px;
            font-size: 18px;
          }

          .confirm-item {
            margin-bottom: 10px;
            font-size: 16px;
          }

          .confirm-item strong {
            color: #333;
            margin-right: 10px;
          }

          .message-preview {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #e0e0e0;
          }

          .text-preview {
            white-space: pre-wrap;
            font-size: 16px;
            color: #333;
          }

          .image-preview img {
            border-radius: 4px;
            margin-bottom: 10px;
          }

          .image-text {
            font-size: 16px;
            color: #333;
            margin-top: 10px;
          }

          .button-preview {
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px solid #e0e0e0;
          }

          .preview-button {
            background: #00b900;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: default;
            margin-bottom: 5px;
            display: block;
          }

          .button-preview small {
            color: #666;
            font-size: 12px;
          }

          .confirm-actions {
            display: flex;
            gap: 15px;
            justify-content: center;
            margin-top: 30px;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">一斉配信</h1>
        <button className="btn btn-outline" onClick={() => onNavigate('dashboard')}>
          ダッシュボードに戻る
        </button>
      </div>

      <div className="broadcast-form">
        <div className="card">
          <h2 className="card-title">基本設定</h2>
          
          <div className="form-group">
            <label className="form-label">配信タイトル *</label>
            <input
              type="text"
              className="form-input"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="例: 新商品のお知らせ"
            />
          </div>

          <div className="form-group">
            <label className="form-label">配信対象 *</label>
            <div className="radio-group">
              <label className="radio-item">
                <input
                  type="radio"
                  value="all"
                  checked={formData.target === 'all'}
                  onChange={(e) => handleInputChange('target', e.target.value)}
                />
                全友だち (12,453人)
              </label>
              <label className="radio-item">
                <input
                  type="radio"
                  value="segment"
                  checked={formData.target === 'segment'}
                  onChange={(e) => handleInputChange('target', e.target.value)}
                />
                セグメント
              </label>
              <label className="radio-item">
                <input
                  type="radio"
                  value="tags"
                  checked={formData.target === 'tags'}
                  onChange={(e) => handleInputChange('target', e.target.value)}
                />
                タグ
              </label>
            </div>
          </div>

          {formData.target === 'segment' && (
            <div className="form-group">
              <select
                className="form-select"
                value={formData.segment}
                onChange={(e) => handleInputChange('segment', e.target.value)}
              >
                <option value="">セグメントを選択</option>
                <option value="new_users">新規ユーザー</option>
                <option value="active_users">アクティブユーザー</option>
                <option value="inactive_users">非アクティブユーザー</option>
              </select>
            </div>
          )}
        </div>

        <div className="card">
          <h2 className="card-title">メッセージ内容</h2>
          
          <div className="form-group">
            <label className="form-label">メッセージタイプ</label>
            <div className="radio-group">
              <label className="radio-item">
                <input
                  type="radio"
                  value="text"
                  checked={formData.messageType === 'text'}
                  onChange={(e) => handleInputChange('messageType', e.target.value)}
                />
                テキストメッセージ
              </label>
              <label className="radio-item">
                <input
                  type="radio"
                  value="image"
                  checked={formData.messageType === 'image'}
                  onChange={(e) => handleInputChange('messageType', e.target.value)}
                />
                画像メッセージ
              </label>
            </div>
          </div>

          {formData.messageType === 'image' && (
            <div className="form-group">
              <label className="form-label">画像をアップロード</label>
              <div className="file-upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="file-input"
                />
                {formData.imageUrl && (
                  <div className="image-preview">
                    <img src={formData.imageUrl} alt="プレビュー" style={{maxWidth: '200px', maxHeight: '150px'}} />
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">
              {formData.messageType === 'image' ? 'キャプション' : 'メッセージ内容'} *
            </label>
            <textarea
              className="form-textarea"
              value={formData.textContent}
              onChange={(e) => handleInputChange('textContent', e.target.value)}
              placeholder="メッセージを入力してください"
              rows="4"
            />
          </div>

          <div className="form-group">
            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={formData.hasButton}
                onChange={(e) => handleInputChange('hasButton', e.target.checked)}
              />
              アクションボタンを追加
            </label>
          </div>

          {formData.hasButton && (
            <div className="button-settings">
              <div className="form-group">
                <label className="form-label">ボタンテキスト</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.buttonText}
                  onChange={(e) => handleInputChange('buttonText', e.target.value)}
                  placeholder="詳しく見る"
                />
              </div>
              <div className="form-group">
                <label className="form-label">リンクURL</label>
                <input
                  type="url"
                  className="form-input"
                  value={formData.buttonUrl}
                  onChange={(e) => handleInputChange('buttonUrl', e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
            </div>
          )}
        </div>

        <div className="card">
          <h2 className="card-title">配信設定</h2>
          
          <div className="form-group">
            <label className="form-label">配信タイミング</label>
            <div className="radio-group">
              <label className="radio-item">
                <input
                  type="radio"
                  value="now"
                  checked={formData.scheduleType === 'now'}
                  onChange={(e) => handleInputChange('scheduleType', e.target.value)}
                />
                今すぐ配信
              </label>
              <label className="radio-item">
                <input
                  type="radio"
                  value="scheduled"
                  checked={formData.scheduleType === 'scheduled'}
                  onChange={(e) => handleInputChange('scheduleType', e.target.value)}
                />
                日時を指定
              </label>
            </div>
          </div>

          {formData.scheduleType === 'scheduled' && (
            <div className="schedule-inputs">
              <div className="form-group">
                <label className="form-label">配信日</label>
                <input
                  type="date"
                  className="form-input"
                  value={formData.scheduleDate}
                  onChange={(e) => handleInputChange('scheduleDate', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">配信時刻</label>
                <input
                  type="time"
                  className="form-input"
                  value={formData.scheduleTime}
                  onChange={(e) => handleInputChange('scheduleTime', e.target.value)}
                />
              </div>
            </div>
          )}
        </div>

        <div className="form-actions">
          <button 
            className="btn btn-primary btn-large"
            onClick={handleSubmit}
            disabled={!formData.title || !formData.textContent}
          >
            確認画面へ進む
          </button>
        </div>
      </div>

      <style jsx>{`
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .broadcast-form {
          max-width: 800px;
        }

        .radio-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .radio-item {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .radio-item input[type="radio"] {
          margin: 0;
        }

        .checkbox-item {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .checkbox-item input[type="checkbox"] {
          margin: 0;
        }

        .button-settings {
          margin-top: 15px;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 4px;
        }

        .schedule-inputs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .file-upload {
          border: 2px dashed #ddd;
          border-radius: 4px;
          padding: 20px;
          text-align: center;
        }

        .file-input {
          margin-bottom: 10px;
        }

        .image-preview {
          margin-top: 10px;
        }

        .image-preview img {
          border-radius: 4px;
        }

        .form-actions {
          margin-top: 40px;
          text-align: center;
        }

        .btn-large {
          padding: 15px 40px;
          font-size: 16px;
        }

        .btn:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .schedule-inputs {
            grid-template-columns: 1fr;
          }
          
          .page-header {
            flex-direction: column;
            gap: 15px;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
};

export default BroadcastSend;