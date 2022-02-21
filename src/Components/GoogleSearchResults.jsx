import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import { useDispatch } from "react-redux";
import {
  Search_Data,
  Store_Data,
  Sort_Title_A_Z,
  Sort_Title_Z_A,
} from "../Redux/Actions";
export const GoogleSearchResults = () => {
  const { query, data } = useSelector((store) => store);
  console.log("data", data);
  const dispatch = useDispatch();
  const [newQuery, setNewQuery] = useState("");
  console.log("hello", query);

  const searchNewQuery = () => {
    dispatch(Search_Data(newQuery));
  };

  const handleSort = () => {
    console.log(Sort_Title_A_Z());
    dispatch(Sort_Title_A_Z());
  };

  useEffect(() => {
    axios
      .get(`https://fast-reef-22226.herokuapp.com/data?q=${query}`)
      .then(({ data }) => {
        dispatch(Store_Data(data));
        console.log(data);
      });
  }, [query]);
  return (
    <div>
      <h1>SearchResult</h1>
      <div className="navbar">
        <div>
          <img
            src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_dark_color_272x92dp.png"
            alt=""
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter your Query"
            onChange={(e) => setNewQuery(e.target.value)}
          />
        </div>
        <div>
          <button onClick={searchNewQuery}>Search</button>
        </div>
      </div>
      <div>
        <button
          id="sort-alphabetically"
          onClick={() => dispatch(Sort_Title_A_Z())}
        >
          sort by title a-z
        </button>
        <button
          id="sort-alphabetically-desc"
          onClick={() => dispatch(Sort_Title_Z_A())}
        >
          sort by title z-a
        </button>
        <button id="sort-by-date">sort by date Asc</button>
        <button id="sort-by-date-desc">sort by date Desc</button>
        <button id=" sort-by-quality">sort by quality low-high</button>
        <button id="sort-by-quality-desc">sort by quality high-low</button>
        <button id="filter-explicit">Filter Explicit</button>
      </div>
      <div className="Content" id="search-result">
        {!data.length
          ? "...loading"
          : data.map((item) => {
              return (
                <div key={item.id} id="result">
                  <div>{item.url}</div>
                  <div>
                    {item.title} | {item.author}
                  </div>
                  <div>{item.description}</div>
                  <div>creation_date : {item.creation_date}</div>
                  <div>
                    Explicit : {item.explicit ? "Yes" : "no"} | quality :{" "}
                    {item.quality}
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};
