import React, { useState } from "react";
import { SeriesItemsProps } from "@/types/types";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import { AiOutlineStar } from "react-icons/ai";

const ImageSkeleton = () => {
    return <Skeleton className="h-[300px] w-[300px]" height={300} width={350} />;
};

const SerieCard = ({ id, original_name, overview, poster_path, first_air_date, vote_average, vote_count, genres, index, isLoading }: SeriesItemsProps) => {
    const baseUrl = "https://image.tmdb.org/t/p/";
    const posterPath = poster_path;
    const imageUrl = `${baseUrl}${posterPath}`;
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();
    const cardVariants = {
        hover: {
            scale: 1.05,
            borderColor: "#fff",
            borderWidth: 1,
            transition: {
                duration: 0.6,
                borderColor: { ease: "easeOut", duration: 0.6 },
            },
        },
        initial: {
            scale: 1,
            borderColor: "transparent",
        },
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handlePushToMovie = () => {
        router.push(`/series/${id}`);
    }

    return (
        <motion.div
            onClick={handlePushToMovie}
            className="lg:col-span-4 xl:col-span-3 md:col-span-6 sm:col-span-6 col-span-12 cursor-pointer test rounded-lg"
            onHoverStart={handleMouseEnter}
            onHoverEnd={handleMouseLeave}
            variants={cardVariants}
            initial="initial"
            animate={isHovered ? "hover" : "initial"}
        >
            <div className="relative">
                {isLoading ? (
                    <ImageSkeleton />
                ) : (
                    <Image
                        src={imageUrl}
                        width={350}
                        className="max-h-[300px] rounded-t-lg w-full object-fit"
                        height={300}
                        alt={original_name}
                    />
                )}
            </div>
            <div className="flex flex-col justify-between gap-4 px-6 pb-6 mt-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold">{original_name}</h1>
                    <div className="flex items-center gap-1">
                        <p>{vote_average.toFixed(1)}/10 </p>
                        <AiOutlineStar color="#ffff00" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default SerieCard;
