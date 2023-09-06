import React, { useEffect, useState } from "react";
import "bulma/css/bulma.min.css";
import "./style.css";
import logo from "../assets/logo.svg";
import MovieCard from "./MovieCard";

let base_url = "https://api.themoviedb.org/3";
let API_key = process.env.REACT_APP_API_KEY;

let url =
  base_url + "/discover/movie?sort_by=popularity.desc" + API_key + "&page=1";

const MainPage = () => {
  const [movieData, setMovieData] = useState([]);
  const [urlx, setUrlx] = useState(url);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(urlx)
      .then((res) => res.json())
      .then((data) => {
        setMovieData(data.results);
      });
  }, [urlx]);

  const searchMovie = () => {
    let x = API_key + "&query=" + search;
    let url = base_url + "/search/movie?" + x;
    setUrlx(url);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchMovie();
    }
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    let nextPageUrl =
      base_url +
      "/discover/movie?sort_by=popularity.desc" +
      API_key +
      "&page=" +
      (currentPage + 1);
    setUrlx(nextPageUrl);

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      let prevPageUrl =
        base_url +
        "/discover/movie?sort_by=popularity.desc" +
        API_key +
        "&page=" +
        (currentPage - 1);
      setUrlx(prevPageUrl);

      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 100);
    }
  };

  const redirectToFirstPage = () => {
    setCurrentPage(1);
    setUrlx(url);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const scrollToTop = () => {
    const windowHeight = window.innerHeight;

    if (window.scrollY >= windowHeight / 2) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return (
    <>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <nav className="navbar">
              <div className="navbar-brand">
                <a class="navbar-item">
                  <img src={logo} alt="movie-app" width={40} height={40} />
                </a>
                <a
                  className="navbar-item"
                  href="#"
                  onClick={redirectToFirstPage}
                >
                  <h1 className="title is-4">MovieApp</h1>
                </a>
              </div>
              <div className="navbar-start"></div>
              <div className="navbar-end">
                <div className="field has-addons">
                  <div className="control">
                    <input
                      type="text"
                      placeholder="Enter Movie Name"
                      className="input"
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                      value={search}
                      onKeyPress={handleKeyPress}
                    ></input>
                  </div>
                  <div className="control">
                    <button className="button is-danger" onClick={searchMovie}>
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </section>
      <div className="container">
        <div
          style={{ marginTop: "10px", transform: "translateY(0)" }}
          className={`columns is-multiline ${
            currentPage !== 1 ? "scroll-up-animation" : ""
          }`}
        >
          {movieData && movieData.length > 0 ? (
            movieData.map((res, pos) => (
              <div className="column is-3" key={pos}>
                <MovieCard info={res} />
              </div>
            ))
          ) : (
            <p>NOT FOUND</p>
          )}
        </div>
        <div className="pagination is-centered">
          <button className="button is-danger" onClick={prevPage}>
            ↫Previous
          </button>
          <button className="button is-danger" onClick={nextPage}>
            Next↬
          </button>
        </div>
      </div>

      <button
        className="button is-primary fab-button is-rounded"
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "80px",
          right: "20px",
        }}
      >
        ↑
      </button>
      <button
        className="button is-primary fab-button is-rounded"
        onClick={scrollToBottom}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
        }}
      >
        ↓
      </button>
    </>
  );
};

export default MainPage;
