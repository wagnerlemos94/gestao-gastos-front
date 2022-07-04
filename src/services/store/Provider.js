import React, { useCallback, useState } from 'react';
import Context from './Context';
import useStorage from 'utils/useStorage';

const StoreProvider = ({ children }) => {
  
  const [ openMessage, setOpenMessage ] = useState(null);
  const [ loadingBar, setLoadingBar] = useState(0);
  const [token, setToken, removeToken] = useStorage('token');
  const [ localStorage, setLocalStorage, removeLocalStorage ] = useStorage('locationHistory');

  const setMessage = useCallback(dispatch => {
    setOpenMessage(dispatch);
  }, []);

  const beginTheBar = useCallback(() => {
    let i = Math.floor(Math.random() * 40) + 10;
    setLoadingBar(i);
  }, []);
  
  const endTheBar = useCallback(() => {
    setLoadingBar(100);
  }, []);

  return (
    <Context.Provider
      value={{
        token,
        setToken,
        openMessage,
        setMessage,
        loadingBar,
        beginTheBar,
        endTheBar,
        removeToken,
        localStorage,
        setLocalStorage,
        removeLocalStorage
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default StoreProvider;