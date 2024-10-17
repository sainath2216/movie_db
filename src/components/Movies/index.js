import React, { Component } from "react";
import MoviesDetails from '../MoviesDetails'
import { ThreeDots, } from 'react-loader-spinner';
import { Navigate } from "react-router-dom";


import './index.css';

class Movies extends Component {
    state = {
        moviesList: [],
        isLoading: false,
        searchInput: "",
        redirectToLogin: false,
    }
    componentDidMount() {
        this.getMovies()
    }

    getMovies = async () => {
        const url = 'https://imdb8.p.rapidapi.com/auto-complete?q=game%20of%20thr';
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'fb65146ad3msh45cce57b10a42c5p1b59e6jsn7fc60468a2f5',
                'x-rapidapi-host': 'imdb8.p.rapidapi.com'
            }
        };
        this.setState({ isLoading: true });

        const response = await fetch(url, options)
        if (response.ok === true) {
            const data = await response.json()
            console.log(data)
            const updatedData = data.d.map(eachMovie => ({
                title: eachMovie.l,
                genre: eachMovie.q,
                show: eachMovie.qid,
                rank: eachMovie.rank,
                players: eachMovie.s,
                launchYear: eachMovie.y,
                years: eachMovie.yr,
                imageUrl: eachMovie.imageUrl,
            }))
            this.setState({
                moviesList: updatedData,
                isLoading: false,
            })
        } else {
            this.setState({ isLoading: false });
        }
    }

    changeSearchInput = event => {
        this.setState({ searchInput: event.target.value })
    }
    getSearchResults = () => {
        const { searchInput, moviesList } = this.state
        const searchResult = moviesList.filter(each =>
            each.title.toLowerCase().includes(searchInput.toLowerCase()),
        )
        return searchResult
    }


    onEnterSearchInput = event => {
        if (event.key === 'Enter') {
            this.getMovies()
        }
    }
    renderLoadingView = () => (
        <div className="loader-container" data-testid="loader">
            <ThreeDots color="#ffff" height="50" width="50" />
        </div>
    )
    onLogout = () => {
        localStorage.removeItem('users');
        return <Navigate to="/" />
    };

    render() {
        const { moviesList, isLoading, searchInput, onLogout } = this.state

        return (
            <div className="movies-container">
                <div className="logout-btn-and-heading">
                    <h1 className="main-heading">MOVIES.<span className="span">com</span></h1>
                    <button className="btn" onClick={onLogout}>Logout</button>
                </div>
                {isLoading ? (
                    this.renderLoadingView()

                ) : (
                    <>

                        <div className="search-container">
                            <input
                                type="search"
                                className="search-input"
                                placeholder="Search"
                                value={searchInput}
                                onChange={this.changeSearchInput}
                                onKeyDown={this.onEnterSearchInput}
                            />
                        </div>
                        <ul className="ul-container">
                            {moviesList.map(each => (
                                <MoviesDetails moviesData={each} key={each.id} />
                            ))}
                        </ul>
                    </>
                )}


            </div>
        );
    }
}

export default Movies;

