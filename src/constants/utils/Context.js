import React, { useContext, createContext } from 'react';

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const [variableState, setVariableState] = React.useState(false);

  
}