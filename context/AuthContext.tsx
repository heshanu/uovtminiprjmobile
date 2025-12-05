import React, { createContext, useContext, useReducer, ReactNode } from "react";

type State = {
  user: null | {
    id: string;
    username: string;
  };
  isAuthenticated: boolean;
};

type Action =
  | { type: "LOGIN"; payload: State["user"] }
  | { type: "LOGOUT" };

const initialState: State = {
  user: null,
  isAuthenticated: false,
};

function authReducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return {
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
