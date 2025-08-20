import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // 簡単なバリデーション
    if (!email || !password) {
      setError('メールアドレスとパスワードを入力してください');
      setIsLoading(false);
      return;
    }

    // ダミーログイン処理
    setTimeout(() => {
      if (email === 'admin@example.com' && password === 'password') {
        onLogin();
      } else {
        setError('メールアドレスまたはパスワードが正しくありません');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>個人LINE管理画面</h1>
          <p>アカウントにログインしてください</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              メールアドレス
            </label>
            <input
              type="email"
              id="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@company.com"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              パスワード
            </label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="パスワードを入力"
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="login-btn"
            disabled={isLoading}
          >
            {isLoading ? 'ログイン中...' : 'ログイン'}
          </button>
        </form>

        <div className="login-footer">
          <a href="#forgot" className="forgot-link">
            パスワードを忘れた場合
          </a>
        </div>

        <div className="demo-info">
          <h4>デモ用アカウント</h4>
          <p>Email: admin@example.com</p>
          <p>Password: password</p>
        </div>
      </div>
    </div>
  );
};

export default Login;