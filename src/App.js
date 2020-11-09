import "./css/App.css";
import Query from "./Query";
import React, { useEffect, useState } from "react";
import Scrollbar from "react-smooth-scrollbar";

function App() {
  const API_KEY = "4c397752e5cefdf86d36ee3e05ff8a23";

  const [queries, setQuery] = useState([]);
  const [search, setSearch] = useState("");
  const [submit, setSubmit] = useState(" ");
  const [plot, setPlot] = useState("Movie");
  const [content, setContent] = useState(
    "GET TO KNOW ABOUT LATEST AND GREATEST BLOCKBUSTERS OF ALL TIME"
  );

  useEffect(() => {
    if (plot === "Movie") getMovies();
    else if (plot === "Show") getSeries();
  }, [submit]);

  const getMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${submit}&page=1&include_adult=false`
    );
    const data = await response.json();
    setQuery(data.results);
  };

  const getSeries = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=en-US&page=1&query=${submit}&include_adult=false`
    );
    const data = await response.json();
    setQuery(data.results);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setSubmit(search);
    setContent(search);
    document.querySelector(".main-head").style.fontSize = "4.5rem";

    // console.log(plot);
    // setSearch("");
  };
  const updatePlot = (e) => {
    setPlot(e.target.value);
  };

  return (
    <div className="App">
      <div className="input-section">
        <form className="form" onSubmit={getSearch}>
          <input
            type="text"
            className="title"
            placeholder="Search for Movies"
            value={search}
            onChange={updateSearch}
          />

          <button type="submit" className="submit">
            {/* <i class="fas fa-search"></i> */}
          </button>
        </form>
        <h1 className="main-head">{content}</h1>
      </div>
      <Scrollbar
        damping="0.05"
        renderByPixels="true"
        continuousScrolling="true"
        className="scroll"
      >
        <div className="items-section">
          {queries.map((query) => (
            <Query
              key={query.id}
              title={query.title}
              imgSrc={query.poster_path}
              rating={query.vote_average}
            />
          ))}
        </div>
      </Scrollbar>
    </div>
  );
}

export default App;
