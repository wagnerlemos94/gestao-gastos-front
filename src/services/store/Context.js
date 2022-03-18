import { createContext } from 'react';

const StoreContext = createContext({
  token: null,
  setToken: () => {},
  openMessage: () => {},
  setMessage: () => {},
  loadingBar: () => {},
  beginTheBar: () => {},
  endTheBar: () => {},
  removeToken: () => {},  
});

export default StoreContext;