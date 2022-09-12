import { createContext, useEffect, useState } from "react";
import Storage from "../storage";

export const HistoryContext = createContext([]);

const HistoryContextProvider = (props) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    Storage.getHistory().then(setHistory);
  }, []);

  const addToHistory = (episode) => {
    Storage.addToHistory(episode).then(setHistory);
  }

  const clearHistory = () => {
    Storage.clearHistory().then(setHistory);
  }

  return (
    <HistoryContext.Provider value={{history, addToHistory, clearHistory}}>
      {props.children}
    </HistoryContext.Provider>
  )
}

export default HistoryContextProvider;