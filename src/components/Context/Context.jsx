import { createContext, useReducer } from "react";

const DataContext = createContext();

function DataProvider({children, reducer, initial}) {
  return (
    <DataContext.Provider value={useReducer(reducer, initial)}>
      {children}
    </DataContext.Provider>
  );
}

export { DataContext, DataProvider};