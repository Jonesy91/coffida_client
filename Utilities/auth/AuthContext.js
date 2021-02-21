import React from 'react';
import { AuthReducer } from './AuthReducer'; 

const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();

function AuthProvider({ children }) {
  const [state, dispatch] = React.useReducer(AuthReducer, {
    isLoading: true,
    isSignout: false,
    userToken: null
  });

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

/* 
This function provides access to the auth state
*/
function useAuthState() {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider');
  }
  return context;
}

/* 
This function allows you to send state to the auth reducer
*/
function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within a AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuthState, useAuthDispatch };