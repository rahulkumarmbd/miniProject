import { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { Search_Data } from "../Redux/Actions";
export const GoogleSearchEngine = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const [PressedEnter, setPressedEnter] = useState(false);

  if (PressedEnter) {
    return <Navigate to="/search" />;
  }

  const SearchResult = (e) => {
    setQuery(e.target.value);
    console.log(e.target.value);
    if (e.key === "Enter") {
      dispatch(Search_Data(e.target.value));
      setPressedEnter(true);
    }
  };
  return (
    <div>
      <div>
        <img
          src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_dark_color_272x92dp.png"
          alt=""
        />
      </div>
      <div>
        <input
          className="search-box"
          type="text"
          placeholder="Search your query"
          onKeyPress={SearchResult}
        />
      </div>
    </div>
  );
};
