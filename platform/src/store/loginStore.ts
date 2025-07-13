import {create} from "zustand";
import {immer} from "zustand/middleware/immer";

const useLoginStore = create(
  immer((set, get) => ({
      // eslint-disable-next-line no-undef
      login: localStorage.getItem('token'),
      // @ts-ignore
      setLogin: (info) => {
        set({login: info});
      },
      getLogin: () => {
          // @ts-ignore
          return get().login;
      }
      
  }))
);

export default useLoginStore;