// getStore: obtiene todo lo que este dentro del store
// getActions: obtiene todo lo que este dentro del actions
// setStore : actualiza la informacion o estado.

const getState = () => {
  return {
    store: {
      currentUser: null,
    },
    actions: {},
  };
};

export default getState;
