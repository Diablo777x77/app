import React, { useEffect, useState } from 'react';
import { SaleorAuthClient } from '@saleor/auth-sdk';

const saleorAuthClient = new SaleorAuthClient({
  saleorApiUrl: 'http://localhost:8000/graphql/',
  clientId: 'your-client-id',
  storage: 'localStorage',
  redirectUri: 'http://localhost:3000/callback',
});

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await saleorAuthClient.isAuthenticated();
      setIsAuthenticated(authenticated);
    };
    checkAuth();
  }, []);

  const handleLogin = () => {
    const url = saleorAuthClient.getLoginUrl();
    window.location.href = url;
  };

  const handleLogout = async () => {
    await saleorAuthClient.logout();
    setIsAuthenticated(false);
  };

  return (
    <div>
      <h1>Saleor Auth SDK Example</h1>
      {isAuthenticated ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};

export default App;
