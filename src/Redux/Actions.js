import { SEARCH_DATA, SORT_TITLE_A_Z, SORT_TITLE_Z_A, STORE_DATA } from "./ActionsTypes.js";
export const Search_Data = (payload) => {
  return {
    type: SEARCH_DATA,
    payload,
  };
};
export const Store_Data = (payload) => {
  return {
    type: STORE_DATA,
    payload,
  };
};
export const Sort_Title_A_Z = () => {
  return {
    type: SORT_TITLE_A_Z,
    payload: null,
  };
};
export const Sort_Title_Z_A = () => {
  return {
    type: SORT_TITLE_Z_A,
    payload: null,
  };
};
