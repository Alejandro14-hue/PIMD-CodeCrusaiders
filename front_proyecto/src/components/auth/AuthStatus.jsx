import React from 'react';

const AuthStatus = ({ user, loading, onLogin, onLogout }) => {
  if (loading) return <div>Cargando...</div>;

  return (
    <div className='auth-status' style={{ padding: '1rem', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1rem' }}>
      {user ? (
        <div className='user-info' style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>Bienvenido, <strong>{user.email || user.name || 'Usuario'}</strong></span>
          <button onClick={onLogout} className='auth-button logout' style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Cerrar Sesión</button>
        </div>
      ) : (
        <button onClick={onLogin} className='auth-button login' style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Iniciar Sesión con Google</button>
      )}
    </div>
  );
};

export default AuthStatus;
