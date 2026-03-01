import React from 'react';

const AuthStatus = ({ user, loading, onLogin, onLogout }) => {
  if (loading) return null;

  return (
    <div className='auth-status' style={{ padding: '0.5rem 1rem', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', background: '#f8f9fa', borderBottom: '1px solid #dee2e6' }}>
      {user ? (
        <div className='user-info' style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span>Hola, <strong>{user.name || user.email}</strong></span>
          <button onClick={onLogout} className='auth-button logout' style={{ padding: '0.25rem 0.75rem', cursor: 'pointer', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}>
            Cerrar Sesión
          </button>
        </div>
      ) : (
        <button onClick={onLogin} className='auth-button login' style={{ padding: '0.25rem 0.75rem', cursor: 'pointer', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
          Iniciar Sesión con Google
        </button>
      )}
    </div>
  );
};

export default AuthStatus;
