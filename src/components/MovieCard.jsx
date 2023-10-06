import React from "react";
import { Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const { genreList } = useSelector((state) => state.movie);
  console.log();

  const div_styled = {
    backgroundImage: `url(https://www.themoviedb.org/t/p/w355_and_h200_multi_faces${movie?.poster_path})`,
  };

  return (
    <div className="movie-card" style={div_styled}>
      <Link to={`/movies/${movie.id}`}>
        <div className="overlay">
          <h3>{movie.title}</h3>
          <div className="genres">
            {movie.genre_ids.map((genre_id, idx) => (
              <Badge bg="danger" key={idx}>
                {/* find() : 일치한 정보들 중 첫번째 요소만 반환하는 함수 */}
                {genreList.find((genre) => genre.id === genre_id).name}
              </Badge>
            ))}
          </div>
          <div className="card-info">
            <span>{`평점:${movie.vote_average}점 (${movie.vote_count}) `}</span>
            <span>|</span>
            <span>{movie.adult ? "청불" : "청소년관람"}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
