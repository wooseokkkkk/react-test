import api from "../api";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MovieReducerActions } from "../redux/reducers/movieSlice";
import Banner from "../components/Banner";
import MovieSlide from "../components/MovieSlide";
import { ClipLoader } from "react-spinners";

const Home = () => {
  const { popularMovies, topRatedMovies, upcomingMovies} = useSelector(
    (state) => state.movie
  );
  const dispatch = useDispatch();

  const [loading, setLoding] = useState(false);

  // 3가지 종류의 영화목록을 묶어서 요청하는 방법
  const getMovieList = async () => {
    setLoding(true); // 데이터를 가져오기 전

    const popularList = api.get("/movie/popular?language=ko-KR&page=1");
    const topRatedList = api.get("/movie/top_rated?language=ko-KR&page=1");
    const upcomingList = api.get("/movie/upcoming?language=ko-KR&page=1");
    const genres = api.get('/genre/movie/list?language=ko')

    const [popular, topRated, upcoming, genre] = await Promise.all([
      popularList,
      topRatedList,
      upcomingList,
      genres,
    ]);
    // console.log(popular.data);
    // console.log(topRated.data);
    // console.log(upcoming.data);
    // console.log(genre.data.genres);
    setLoding(false)
    dispatch(
      MovieReducerActions.initData({
        popular: popular.data,
        topRated: topRated.data,
        upcoming: upcoming.data,
        genres: genre.data.genres
      })
    );
  };

  useEffect(() => {
    // console.log("home...");
    // popularReq();
    // topRatedReq();
    // upcomingReq();
    getMovieList();
  }, []);

  // true : 데이터를 가져오기 전
  // false : 데이터를 가져온 후
  return (
    <div>
      {loading ? (
        <ClipLoader
          color={`#ffffff`}
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <div>
          {popularMovies[0] !== undefined ? <Banner movie={popularMovies[0]} /> : null}
          <h1>인기있는 영화</h1>
          <MovieSlide movies={popularMovies} />
          <h1>평점 높은 영화</h1>
          <MovieSlide movies={topRatedMovies} />
          <h1>개봉 예정 영화</h1>
          <MovieSlide movies={upcomingMovies} />
        </div>
      )}
    </div>
  );
};

export default Home;
