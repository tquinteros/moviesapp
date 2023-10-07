import React, { useCallback } from "react";
import { MoviesItemProps, MovieItemContainerProps } from "@/types/types";
import Image from "next/image";
import { AiOutlineStar } from "react-icons/ai";
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import type { Engine } from 'tsparticles-engine'
import { optionsParticles } from "../MoviesContainer/particleOptions";
import { motion } from "framer-motion";

const MovieItemContainer: React.FC<MovieItemContainerProps> = ({ movie }) => {

    const baseUrl = "https://image.tmdb.org/t/p/500";
    const posterPath = movie.poster_path;
    const imageUrl = `${baseUrl}${posterPath}`;

    const particlesInit = useCallback(async (engine: Engine) => {
        await loadFull(engine)
    }, [])

    const particlesLoaded = useCallback(async () => { }, [])

    return (
        <div className="container grid my-12 mt-6 md:p-0 grid-cols-12 gap-0 md:gap-6 mx-auto">
            <div className="absolute w-full -z-50 h-full top-0 left-0">
                <Particles
                    className="w-full h-full"
                    id="tsparticles"
                    init={particlesInit}
                    loaded={particlesLoaded}
                    options={optionsParticles}
                />
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 1.4 }}
                className="col-span-12 p-6 md:p-0 md:col-span-6">
                <Image src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="w-full max-h-[750px]" width={400} height={400} alt={movie.original_title} />
            </motion.div>
            <div className="col-span-12 flex flex-col gap-2 p-6 md:p-0 md:col-span-6">
                <motion.h1
                    initial={{ y: 200, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 1.2 }}
                    className="text-4xl font-bold">{movie.original_title}</motion.h1>
                <motion.p
                    initial={{ y: 300, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 1.2 }}
                    className="text-lg">{movie.overview}</motion.p>
                {/* <p>{movie.genres}</p> */}
                <div className="flex flex-col md:flex-row gap-2 mt-6 md:gap-0 justify-between md:mt-auto">
                    <motion.p
                        initial={{ y: -300, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1.2 }}
                        className="">Release Date: {movie.release_date}</motion.p>
                    <div className="flex items-center gap-1">
                        <motion.p
                            initial={{ y: -300, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8, duration: 1.2 }}
                            className="flex items-center gap-1">Vote Average: {movie.vote_average.toFixed(2)}/10
                            <AiOutlineStar color="#ffff00" />
                            ({movie.vote_count})
                        </motion.p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieItemContainer;
