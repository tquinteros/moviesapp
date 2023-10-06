import React from "react";
import { MoviesItemProps, MovieItemContainerProps } from "@/types/types";
import Image from "next/image";
import { AiOutlineStar } from "react-icons/ai";
const MovieItemContainer: React.FC<MovieItemContainerProps> = ({ movie }) => {

    const baseUrl = "https://image.tmdb.org/t/p/500";
    const posterPath = movie.poster_path;
    const imageUrl = `${baseUrl}${posterPath}`;

    return (
        <div className="container grid my-12 mt-6 md:p-0 grid-cols-12 gap-0 md:gap-6 mx-auto">
            <div className="col-span-12 p-6 md:p-0 md:col-span-6">
                <Image src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="w-full max-h-[750px]" width={400} height={400} alt={movie.original_title} />
            </div>
            <div className="col-span-12 flex flex-col gap-2 p-6 md:p-0 md:col-span-6">
                <h1 className="text-4xl font-bold">{movie.original_title}</h1>
                <p className="text-lg">{movie.overview}</p>
                {/* <p>{movie.genres}</p> */}
                <div className="flex flex-col md:flex-row gap-2 mt-6 md:gap-0 justify-between md:mt-auto">
                    <p>Release Date: {movie.release_date}</p>
                    <div className="flex items-center gap-1">
                        <p>Vote Average: {movie.vote_average.toFixed(2)}/10 </p>
                        <AiOutlineStar color="#ffff00" />
                        ({movie.vote_count})
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieItemContainer;
