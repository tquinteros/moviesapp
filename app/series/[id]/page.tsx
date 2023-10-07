"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { MoviesItems, SeriesItemsProps, SeriesItems } from "@/types/types";
import { Oval } from "react-loader-spinner";
import MovieItemContainer from "@/src/components/MovieItemContainer/MovieItemContainer";
import SerieItemContainer from "@/src/components/SerieItemContainer/SerieItemContainer";

export default function Movies({ params }: SeriesItems) {
    const { id } = params;
    const [serie, setSerie] = useState<SeriesItemsProps | null>(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/tv/${id}?api_key=eb8f0af79880e0d8a9a3e7b7daaac3fe`
                );
                setSerie(response.data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        if (id) {
            fetchMovieDetails();
        }
    }, [id]);

    return (
        <div>
            {serie ? (
                <SerieItemContainer serie={serie} />
            ) : (
                <div className="flex justify-center items-center h-screen">
                    <Oval
                        height={72}
                        width={72}
                        color="#fff"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel='oval-loading'
                        secondaryColor="#fff"
                        strokeWidth={2}
                        strokeWidthSecondary={2}

                    />
                </div>
            )}
        </div>
    );
};

