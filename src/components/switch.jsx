import "./switch.css";
import { Link } from "react-router-dom";

export const Switch = () => {
  return (
    <div className="switch">
      <Link to="/counter">
        <button>Counter</button>
      </Link>
      <Link to="/todo">
        <button>Todo</button>
      </Link>
      <Link to="/stopWatch">
        <button>StopWatch</button>
      </Link>
    </div>
  );
};
