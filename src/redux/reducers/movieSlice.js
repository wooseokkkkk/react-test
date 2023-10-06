import { createSlice } from '@reduxjs/toolkit'

const movieSlice = createSlice({
    name: 'movie',
    initialState : {
        popularMovies : [],
        topRatedMovies : [],
        upcomingMovies : [],
        genreList : [],
    },
    reducers : {
        initData : (state, action) => {
            // console.log('initData....');
            
            let {payload} = action; // 구조분해를 통해 payload 속성값만 접근
            state.popularMovies = payload.popular.results
            state.topRatedMovies = payload.topRated.results
            state.upcomingMovies = payload.upcoming.results
            state.genreList = payload.genres
        }
    }
})

export const MovieReducerActions = movieSlice.actions;

export default movieSlice.reducer;