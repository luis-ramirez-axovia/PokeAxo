import React, { useContext, createContext } from 'react';

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const [variableState, setVariableState] = React.useState(false);

  React.useEffect(() => {

  }, []);

  const values = React.useMemo(() => (
    {
      variableState,
      setVariableState,
    }
  ), [variableState]);

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext);
  if( !context ) {
    console.log('Error en deploy de App Context');
  }
  return context;
}

export default useAppContext;