import React, { useState, useEffect } from "react";
import "./style.css";
import temp from "../assets/placeholder.svg";

const MovieCard = (movie) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previousScrollPosition, setPreviousScrollPosition] = useState(0);

  const toggleModal = () => {
    if (!isModalOpen) {
      setPreviousScrollPosition(window.scrollY);
      const windowHeight = window.innerHeight;
      window.scrollTo(0, windowHeight / 2 + 880);
    }
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
      window.scrollTo(0, previousScrollPosition);
    }
  }, [isModalOpen, previousScrollPosition]);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    } else {
      return text;
    }
  };

  const titleStyle = {
    maxWidth: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };

  const genreIdToName = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fic.",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  let circleBackgroundColor;
  if (movie.info.vote_average >= 7) {
    circleBackgroundColor = "#00DFA2";
  } else if (movie.info.vote_average <= 4) {
    circleBackgroundColor = "#FE0000";
  } else {
    circleBackgroundColor = "#F8DE22";
  }

  const firstTwoGenres = movie.info.genre_ids.slice(0, 2);
  const genreNames = firstTwoGenres.map((genreId) => genreIdToName[genreId]);
  let image_path = "https://image.tmdb.org/t/p/w500";
  let posterPath = movie.info.poster_path
    ? image_path + movie.info.poster_path
    : temp;
  return (
    <div className="card" onClick={toggleModal}>
      <div className="card-image">
        <figure className="image is-3by4">
          <img src={posterPath} alt={movie.info.title} />
        </figure>
      </div>
      <div className="card-content">
        <div className="content">
          <h3 style={titleStyle}>{movie.info.title}</h3>
          <p>{truncateText(movie.info.overview, 50)}</p>

          <div className="container" style={{ marginBottom: "30px" }}>
            <div className="columns is-multiline">
              {genreNames.map((genreName) => (
                <div className="column is-6" key={genreName}>
                  <div
                    className="box has-background-danger"
                    style={{
                      padding: "5px",
                    }}
                  >
                    <p
                      className="has-text-white has-text-centered"
                      style={{ fontSize: "16px" }}
                    >
                      {genreName}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className="circle-text-area"
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: circleBackgroundColor,
              borderRadius: "50%",
              position: "absolute",
              bottom: "10px",
              right: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              color: "white",
            }}
          >
            <p className="has-text-centered">{movie.info.vote_average}</p>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal is-active">
          <div className="modal-background-ghost"></div>
          <div className="modal-card">
            <header
              style={{ backgroundColor: "hsl(171, 100%, 41%)" }}
              className="modal-card-head"
            >
              <p style={{ color: "white" }} className="modal-card-title">
                {movie.info.title}
              </p>
              <button
                className="delete"
                aria-label="close"
                onClick={toggleModal}
              ></button>
            </header>

            <div
              className="modal-content"
              style={{
                overflow: "hidden",
              }}
            >
              <div
                className="image-modal"
                style={{
                  backgroundColor: "hsl(347, 90%, 96%)",
                }}
              >
                <img
                  src={posterPath}
                  alt={movie.info.title}
                  style={{
                    height: "420px",
                  }}
                />
              </div>
            </div>

            <section
              style={{
                backgroundColor: "hsl(347, 90%, 96%)",
                overflow: "hidden",
              }}
              className="modal-card-body"
            >
              <div className="columns is-multiline">
                {movie.info.genre_ids.map((genreId) => (
                  <div className="column is-2" key={genreId}>
                    <div
                      style={{ padding: "1px" }}
                      className="box has-background-danger"
                    >
                      <p
                        className="has-text-white has-text-centered"
                        style={{ fontSize: "12px" }}
                      >
                        {genreIdToName[genreId]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section
              style={{ backgroundColor: "hsl(347, 90%, 96%)" }}
              className="modal-card-body"
            >
              {movie.info.overview}
            </section>

            <section
              style={{
                overflow: "hidden",
                backgroundColor: "hsl(347, 90%, 96%)",
              }}
              className="modal-card-body"
            >
              <p>
                <b>Language:</b> {movie.info.original_language} ✨
                <b>Release:</b>
                {movie.info.release_date} ✨ <b>Vote:</b>
                {movie.info.vote_average}{" "}
              </p>
            </section>
            <footer
              style={{ backgroundColor: "hsl(347, 90%, 96%)" }}
              className="modal-card-foot"
            >
              <button className="button is-success" onClick={toggleModal}>
                Close
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
