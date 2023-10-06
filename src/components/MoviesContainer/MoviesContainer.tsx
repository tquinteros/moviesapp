"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../MovieCard/MovieCard";
import { MoviesItemProps, SeriesItemsProps } from "@/types/types";
import Image from "next/image";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import SerieCard from "../SerieCard/SerieCard";

const MoviesContainer = () => {
    const [movies, setMovies] = useState<MoviesItemProps[]>([]);
    const [series, setSeries] = useState<SeriesItemsProps[]>([]);
    const [genres, setGenres] = useState<{ [key: number]: string }>({});
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [tab, setTab] = useState("movies");
    const fetchMovies = async () => {
        setIsLoading(true);
        const res = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=eb8f0af79880e0d8a9a3e7b7daaac3fe&page=${currentPage}`
        );
        setMovies(res.data.results);
        setIsLoading(false);
    };

    const fetchSeries = async () => {
        setIsLoading(true);
        const res = await axios.get(
            `https://api.themoviedb.org/3/tv/popular?api_key=eb8f0af79880e0d8a9a3e7b7daaac3fe&page=${currentPage}`
        );
        setSeries(res.data.results);
        setIsLoading(false);
    }

    const fetchGenres = async () => {
        const genreResponse = await axios.get(
            "https://api.themoviedb.org/3/genre/movie/list?api_key=eb8f0af79880e0d8a9a3e7b7daaac3fe"
        );
        const genreMap: { [key: number]: string } = {}; // Define el tipo adecuado para genreMap
        genreResponse.data.genres.forEach((genre: any) => {
            genreMap[genre.id] = genre.name;
        });
        setGenres(genreMap);
    };
    useEffect(() => {
        fetchSeries();
        fetchMovies();
        fetchGenres();
    }, []);

    const mapGenreIdsToNames = (genreIds: number[], genres: { [key: number]: string }): string => {
        return genreIds.map((genreId) => genres[genreId]).join(", ");
    };

    const filteredMovies = movies.filter((movie) => {
        return movie.original_title.toLowerCase().includes(searchTerm.toLowerCase());
    }
    );

    const filteredSeries = series.filter((serie) => {
        return serie.original_name.toLowerCase().includes(searchTerm.toLowerCase());
    }
    );

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    useEffect(() => {
        if (tab === "movies") {
            fetchMovies();
        }
        if (tab === "series") {
            fetchSeries();
        }
        window.scrollTo(0, 0);
    }, [currentPage]);

    const handleTab = (tab: string) => {
        setTab(tab);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [tab]);


    return (
        <div className="container p-6 md:p-0 mx-auto mb-36 mt-8">
            <div className="grid justify-items-center mb-0 rounded-lg gap-4 grid-cols-12">
                <div
                    onClick={() => handleTab("movies")}
                    className={`rounded-lg cursor-pointer hover:underline hover:bg-gray-400/25 duration-300 col-span-6 py-3 flex justify-center w-full ${tab === "movies" ? " bg-gray-400/25" : "search-bar"}`}>
                    <button
                        className={`text-3xl font-bold  ${tab === "movies" ? "underline" : ""}`}>Movies
                    </button>
                </div>
                <div
                    onClick={() => handleTab("series")}
                    className={`rounded-lg cursor-pointer hover:bg-gray-400/25 hover:underline duration-300 col-span-6 py-3 flex justify-center w-full ${tab === "series" ? " bg-gray-400/25" : "search-bar"}`}>
                    <button
                        className={`text-3xl font-bold ${tab === "series" ? "underline" : ""}`}>Series
                    </button>
                </div>
            </div>
            <div className="relative flex items-center">
                <input
                    type="text"
                    placeholder="Search"
                    onChange={(event) => {
                        setSearchTerm(event.target.value);
                    }}
                    className="search-bar pl-11 rounded-lg px-4 my-8 py-3 w-full"
                />
                <Image
                    className="absolute left-3"
                    src="/searchicon.png"
                    width={20}
                    height={20}
                    alt="Search-Icon"
                />
            </div>
            <div className="grid grid-cols-12 gap-6">
                {
                    tab === "movies" && (
                        filteredMovies.length === 0 ? (
                            <h4 className="text-3xl font-thin col-span-12 w-full">No Items Found</h4>
                        ) : (
                            filteredMovies.map((movie, index) => (
                                <MovieCard
                                    key={index}
                                    id={movie.id}
                                    original_title={movie.original_title}
                                    overview={movie.overview}
                                    poster_path={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    release_date={movie.release_date}
                                    vote_average={movie.vote_average}
                                    vote_count={movie.vote_count}
                                    adult={movie.adult}
                                    genres={mapGenreIdsToNames(movie.genre_ids, genres)}
                                    genre_ids={movie.genre_ids}
                                    index={index}
                                    isLoading={isLoading}
                                />
                            ))
                        )
                    )
                }
                {
                    tab === "series" && (
                        filteredSeries.length === 0 ? (
                            <h4 className="text-3xl font-thin col-span-12 w-full">No Items Found</h4>
                        ) : (
                            filteredSeries.map((movie, index) => (
                                <SerieCard
                                    key={index}
                                    id={movie.id}
                                    original_name={movie.original_name}
                                    overview={movie.overview}
                                    poster_path={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    release_date={movie.release_date}
                                    vote_average={movie.vote_average}
                                    vote_count={movie.vote_count}
                                    genres={mapGenreIdsToNames(movie.genre_ids, genres)}
                                    genre_ids={movie.genre_ids}
                                    index={index}
                                    isLoading={isLoading}
                                />
                            ))
                        )
                    )
                }
                {/* {filteredMovies.length === 0 ? (
                    <h4 className="text-3xl font-thin col-span-12 w-full">No Items Found</h4>
                ) : (
                    filteredMovies.map((movie, index) => (
                        <MovieCard
                            key={index}
                            id={movie.id}
                            original_title={movie.original_title}
                            overview={movie.overview}
                            poster_path={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            release_date={movie.release_date}
                            vote_average={movie.vote_average}
                            vote_count={movie.vote_count}
                            adult={movie.adult}
                            genres={mapGenreIdsToNames(movie.genre_ids, genres)}
                            genre_ids={movie.genre_ids}
                            index={index}
                            isLoading={isLoading}
                        />
                    ))
                )} */}
            </div>
            <div className="flex mt-12 justify-center gap-2 items-center">
                <button className="font-thin flex justify-center text-xl p-4 rounded-lg hover:underline cursor-pointer border w-30 search-bar" onClick={prevPage}><AiOutlineArrowLeft size={28} /></button>
                <span className="font-thin text-xl p-4 px-6 rounded-lg border search-bar hover:underline w-30 cursor-pointer">{currentPage}</span>
                <button className="font-thin flex justify-center text-xl p-4 border rounded-lg w-30 search-bar hover:underline cursor-pointer" onClick={nextPage}> <AiOutlineArrowRight size={28} /> </button>
            </div>
        </div>
    );
};

export default MoviesContainer;
