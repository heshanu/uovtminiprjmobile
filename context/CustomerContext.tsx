import React, { createContext, useContext, useReducer, ReactNode } from "react";

// ✅ Export User type for reuse
export type User = {
  id: string;
  name: string;
  age: number;
  address: string;
  travelMode: string;
  accomadation: string;
  foodList: string;
  beverageList: string;
  startDate: string;
  endDate: string;
  phonenum: string;
};

// ✅ State type
type CustomerState = {
  user: User | null;
};

// ✅ Action types
type Action =
  | { type: "SETCUSTOMER"; payload: User }
  | { type: "LOGOUT" };

// ✅ Initial state
const initialState: CustomerState = {
  user: null,
};

// ✅ Reducer
function customerReducer(
  state: CustomerState,
  action: Action
): CustomerState {
  switch (action.type) {
    case "SETCUSTOMER":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
}

// ✅ Context type
type CustomerContextType = {
  state: CustomerState;
  dispatch: React.Dispatch<Action>;
};

// ✅ Create context
const CustomerContext = createContext<CustomerContextType | undefined>(
  undefined
);

// ✅ Provider
export function CustomerProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(customerReducer, initialState);

  return (
    <CustomerContext.Provider value={{ state, dispatch }}>
      {children}
    </CustomerContext.Provider>
  );
}

// ✅ Custom hook (SAFE)
export function useCustomer() {
  const context = useContext(CustomerContext);

  if (!context) {
    throw new Error("useCustomer must be used inside CustomerProvider");
  }

  return context;
}
