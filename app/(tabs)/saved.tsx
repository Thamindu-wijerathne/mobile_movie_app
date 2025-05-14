import MovieCard from "@/components/MovieCard";
import { images } from "@/constants/images";
import { fetchMovieDetails, fetchSavedMovies } from "@/services/api";
import { getSavedMovies } from "@/services/appwrite";
import useFetch from "@/services/usefetch";
import { useEffect, useState } from "react";
import { FlatList, Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
    type Movie = {
        id: string,
        title: string,
        poster_path: string
    }

    const [savedMovieDetails, setSavedMovieDetails] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      const fetchDetails = async () => {
        const ids = await getSavedMovies(); // [123, 456, 789]
        const moviePromises = ids.map((id: string) => fetchMovieDetails(id));
        const movies = await Promise.all(moviePromises);
        setSavedMovieDetails(movies);
        setLoading(false);
      };
    
      fetchDetails();
    }, []);

    const { 
        data:movies, 
        loading: moviesLoading, 
        error: moviesError } = useFetch(() => fetchSavedMovies(id as string));

    return (
    <SafeAreaView className="bg-primary flex-1">
        <Image source={images.bg} className="flex-1 absolute w-full z-0" resizeMode="cover" />
        <View className="flex justify-center items-center flex-1 flex-col gap-5">
            <FlatList 
                data={savedMovieDetails}
                renderItem={({ item }) => (
                    <MovieCard 
                    {... item}
                    />
                )}
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: 'flex-start',
                    gap: 20,
                    paddingRight: 5,
                    marginBottom: 10
                }}
                className="mt-2 mb-10"
                scrollEnabled={false}
            />
                
        </View>
    </SafeAreaView>
  );
};

export default Profile;