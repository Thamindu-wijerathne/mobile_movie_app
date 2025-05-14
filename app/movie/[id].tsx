import { icons } from "@/constants/icons";
import { fetchMovieDetails, fetchMovieVideo } from "@/services/api";
import { addSavedMovie, getSavedMovies, removeSavedMovie } from "@/services/appwrite";
import useFetch from "@/services/usefetch";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import YoutubePlayer from "react-native-youtube-iframe";
interface MovieInfoProps {
    label: string;
    value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
    <View className="flex-col items-start justify-center mt-5">
        <Text className="text-light-200 font-normal text-sm">{label}</Text>
        <Text className="text-light-100 font-bold text-sm mt-2">
        {value || "N/A"}
        </Text>
    </View>
);

const Details = () => {

    const [playing, setPlaying] = useState(false);
    const [savedMovies, setSavedMovies] = useState<number[]>([]);

    const onStateChange = useCallback((state: string) => {
        if (state === "ended") {
            setPlaying(false);
            // Alert.alert("Video has finished playing!");
        }
    }, []);

    const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev);
    }, []);

    const router = useRouter();
    const { id } = useLocalSearchParams();

    const { data: movie, loading } = useFetch(() =>
        fetchMovieDetails(id as string)
    );

    const { data: VideoDetail } = useFetch(() => 
        fetchMovieVideo(id as string)
    );

    // select movie for save
    const [selectMovie, setMovieSelect] = useState(false);

    useEffect(() => {
      const fetchSaved = async () => {
        const movies = await getSavedMovies();
        setSavedMovies(movies);
      };
    
      fetchSaved(); // Only run this once when the component mounts
    }, []); // Empty dependency array ensures it runs only once

    const handleSaveOrDeleteMovie = async (movieId: number) => {
        if (selectMovie) {
            // If the movie is already selected (saved), delete it
            await removeSavedMovie(movieId);
    
            // Remove the movie from the savedMovies state
            setSavedMovies((prevMovies) => prevMovies.filter((id) => id !== movieId));
            // Alert.alert("Movie deleted successfully!");
        } else {
            // If the movie is not selected, save it
            await addSavedMovie(movieId);
    
            // Update the savedMovies state to reflect the new saved movie
            setSavedMovies((prevMovies) => [...prevMovies, movieId]);
            // Alert.alert("Movie saved successfully!");
        }
    
        // Toggle the selectMovie state
        setMovieSelect((prev) => !prev);
    };

    // const isSaved = movies

    console.log('Saved Movies:', savedMovies);

    if (loading)
        return (
        <SafeAreaView className="bg-primary flex-1">
            <ActivityIndicator />
        </SafeAreaView>
        );

    return (
        <View className="bg-primary flex-1">
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
            {!playing ? (
                <>
                    <Image
                        source={{
                        uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
                        }}
                        className="w-full h-[550px]"
                        resizeMode="stretch"
                    />

                    <TouchableOpacity
                        className="absolute bottom-5 right-5 rounded-full size-14 bg-white flex items-center justify-center"
                        onPress={togglePlaying}
                    >
                        <Image
                            source={icons.play}
                            className="w-6 h-7 ml-1"
                            resizeMode="stretch"
                        />
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <View className="mt-10 -mb-16">
                        <YoutubePlayer
                            height={300}
                            play={playing}
                            videoId={VideoDetail}
                            onChangeState={onStateChange}
                        />
                    </View>
                    <TouchableOpacity
                        className="absolute bottom-5 right-5 rounded-full size-14 bg-white flex items-center justify-center"
                        onPress={togglePlaying}
                    >
                        <Image
                            source={icons.back}
                            className="w-6 h-7 mr-1"
                        />
                    </TouchableOpacity>
                </>
            )}
            </View>

            <View className="flex-col items-start justify-center mt-5 px-5">
                <View className="flex flex-row w-full justify-between items-center">
                    <Text className="text-white font-bold text-xl">{movie?.title}</Text>
                    <TouchableOpacity onPress={() => handleSaveOrDeleteMovie(Number(id))}>
                        <Image 
                            source={selectMovie ? icons.mark : icons.unmark} 
                            style={selectMovie ? { tintColor: 'yellow' } : { tintColor: 'white' }} 
                            className="w-[40px] h-[40px]"
                        />
                    </TouchableOpacity>
                </View>
                <View className="flex-row items-center gap-x-1 mt-2">
                    <Text className="text-light-200 text-sm">
                    {movie?.release_date?.split("-")[0]} •
                    </Text>
                    <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
                </View>

                <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
                    <Image source={icons.star} className="size-4" />

                    <Text className="text-white font-bold text-sm">
                        {Math.round(movie?.vote_average ?? 0)}/10
                    </Text>

                    <Text className="text-light-200 text-sm">
                        ({movie?.vote_count} votes)
                    </Text>
                </View>

                <MovieInfo label="Overview" value={movie?.overview} />
                <MovieInfo
                    label="Genres"
                    value={movie?.genres?.map((g) => g.name).join(" • ") || "N/A"}
                />

                <View className="flex flex-row justify-between w-1/2">
                    <MovieInfo
                        label="Budget"
                        value={`$${(movie?.budget ?? 0) / 1_000_000} million`}
                    />
                    <MovieInfo
                        label="Revenue"
                        value={`$${Math.round(
                            (movie?.revenue ?? 0) / 1_000_000
                        )} million`}
                    />
                </View>

                <MovieInfo
                    label="Production Companies"
                    value={movie?.production_companies?.map((c) => c.name).join(" • ") || "N/A"}
                />
            </View>
        </ScrollView>

            <TouchableOpacity
                className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
                onPress={router.back}
            >
                <Image
                source={icons.arrow}
                className="size-5 mr-1 mt-0.5 rotate-180"
                tintColor="#fff"
                />
                <Text className="text-white font-semibold text-base">Go Back</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Details;
