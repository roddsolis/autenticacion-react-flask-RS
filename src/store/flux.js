// getStore: obtiene todo lo que este dentro del store
// getActions: obtiene todo lo que este dentro del actions
// setStore : actualiza la informacion o estado.

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      apiURL: "http://127.0.0.1:5000",
      currentUser: null,
    },
    actions: {},
  };
};

export default getState;
