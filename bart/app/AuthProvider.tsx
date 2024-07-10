import React, { createContext, useContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};

type InitialState = {
  values: {
    auth: boolean;
    username: string;
  };
  setValues: React.Dispatch<
    React.SetStateAction<{ auth: boolean; username: string }>
  >;
};

export const AuthContext = createContext({} as InitialState);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const initialValues = { auth: false, username: "" };
  const [values, setValues] = useState(initialValues);
  return (
    <AuthContext.Provider value={{ values, setValues }}>
      {children}
    </AuthContext.Provider>
  );
};
