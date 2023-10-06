import React, { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import { useParams } from "react-router-dom";
import api from "../api";

// /movies/1    -> useParams()
// /movies?id=1 -> useSearchParams()
const MovieDetail = () => {
  const { id } = useParams();

  const [movieDetail, setMovieDetail] = useState(null);
  const [movieReview, setMovieReview] = useState([]);

  const getMovieDetail = async () => {
    let res = await api.get(`/movie/${id}?language=ko`);
    // console.log(res.data);
    setMovieDetail(res.data);
  };

  const getMovieReview = async () => {
    let res = await api.get(`movie/${id}/reviews?language=en-US&page=1`);
    console.log(res.data);
    setMovieReview(res.data.results);
  };

  useEffect(() => {
    getMovieDetail();
    getMovieReview();
  }, []);

  return (
    <div>
      {movieDetail ? (
        <div className="container movie-details">
          <div className="poster">
            <img
              src={`https://www.themoviedb.org/t/p/original${movieDetail.poster_path}`}
              alt="포스터"
            />
          </div>
          <div className="info">
            <div className="genre">
              {movieDetail.genres.map((genre, idx) => (
                <Badge key={idx} bg="danger">
                  {genre.name}
                </Badge>
              ))}
            </div>
            <h1>{movieDetail.title}</h1>
            <h4>{movieDetail.tagline}</h4>
            <div className="">
              <span>{movieDetail.release_date}</span>
              <span>{movieDetail.runtime}분</span>
              <span>평점 : {movieDetail.vote_average.toFixed(1)}</span>
              <span>{movieDetail.adult ? "청불" : "18세 미만"}</span>
            </div>
            <div className="overview">{movieDetail.overview}</div>
          </div>
        </div>
      ) : null}

      {/* 리뷰 영역 */}
      {movieDetail ? (
        <div className="container review-box">
          {movieReview.map((review, idx) => (
            <div key={idx} className="review-item">
              <h4>{review.author}</h4>
              <p>{review.content}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default MovieDetail;
