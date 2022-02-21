import {
  SEARCH_DATA,
  SORT_TITLE_A_Z,
  SORT_TITLE_Z_A,
  STORE_DATA,
} from "./ActionsTypes.js";
const init = {
  query: "",
  data: [],
};
export const GoogleSearchEngineReducer = (store = init, { type, payload }) => {
  switch (type) {
    case SEARCH_DATA:
      return { ...store, query: payload };
    case STORE_DATA:
      return { ...store, data: payload };
    case SORT_TITLE_A_Z:
      return {
        ...store,
        data: [
          ...store.data.sort((a, b) => {
            let c = a.title.toUpperCase();
            let d = b.title.toUpperCase();
            if (c < d) {
              return -1;
            } else if (c > d) {
              return 1;
            } else {
              return 0;
            }
          }),
        ],
      };
    case SORT_TITLE_Z_A:
      return {
        ...store,
        data: [
          ...store.data.sort((a, b) => {
            let c = a.title.toUpperCase();
            let d = b.title.toUpperCase();
            if (c < d) {
              return 1;
            } else if (c > d) {
              return -1;
            } else {
              return 0;
            }
          }),
        ],
      };
    default:
      return { ...store };
  }
};
