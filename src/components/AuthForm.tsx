import React, { useState } from 'react';

interface AuthFormProps {
  onLoginSuccess: (userType: string, token?: string) => void;
}

// Xano Signup API call
async function xanoSignup(email: string, password: string,userType: string) {
  const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:d6ALaC-c/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password , user_type: userType }),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Signup failed');
  }
  return result;
}

// Xano Login API call
async function xanoLogin(email: string, password: string) {
  const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:d6ALaC-c/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Login failed');
  }
  return result;
}

const AuthForm: React.FC<AuthFormProps> = ({ onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('company');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setInfo('');

    try {
      let result;
      if (isSignUp) {
        // Signup flow
        result = await xanoSignup(email, password,userType);
        // If Xano returns an authToken, treat as logged in
        const token = result.authToken;
        if (token) {
          localStorage.setItem('xano_token', token);
          setInfo('Account created and logged in!');
          onLoginSuccess(result.userType || userType, token);
        } else {
          setInfo('Account created! Please sign in.');
          setIsSignUp(false);
        }
      } else {
        // Login flow
        result = await xanoLogin(email, password);
        const token = result.authToken;
        if (token) {
          localStorage.setItem('xano_token', token);
          onLoginSuccess(result.userType || userType, token);
        } else {
          setError('Login successful, but no token received.');
        }
      }
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-2xl font-bold text-gray-600">BANK</span>
            <span className="text-2xl font-bold text-red-600">ONE</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            {isSignUp ? 'Create Account' : 'Sign In'}
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            Access your corporate account application
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
              minLength={6}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type of User</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="company">Company</option>
              <option value="management">Management Company</option>
            </select>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">
              {error}
            </div>
          )}
          {info && (
            <div className="text-green-600 text-sm text-center">
              {info}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 disabled:opacity-50"
          >
            {loading ? 'Loading...' : (isSignUp ? 'Create Account' : 'Sign In')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
              setInfo('');
            }}
            className="text-red-600 hover:text-red-700 text-sm"
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;