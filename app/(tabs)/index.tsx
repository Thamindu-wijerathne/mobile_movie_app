import GenreMovieCard from "@/components/GenreMovieCard";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchGenre, fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/usefetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";

export default function Index() {
    const router = useRouter();

    const {
        data: trendingMovies,
        loading: trendingLoading,
        error: trendingError
    } = useFetch(getTrendingMovies);

    const { 
        data:movies, 
        loading: moviesLoading, 
        error: moviesError } = useFetch(() => fetchMovies({
        query: ''
    }));

    const {
        data: adventureMovies,
        loading: adventureLoading,
        error: adventureError
      } = useFetch(() => fetchGenre('12'));
      
      const {
        data: actionMovies,
        loading: actionLoading,
        error: actionError
      } = useFetch(() => fetchGenre('28'));
      
      const {
        data: scifiMovies,
        loading: scifiLoading,
        error: scifiError
      } = useFetch(() => fetchGenre('878'));
      
      const {
        data: romanceMovies,
        loading: romanceLoading,
        error: romanceError
      } = useFetch(() => fetchGenre('10749'));
      
      const {
        data: animationMovies,
        loading: animationLoading,
        error: animationError
      } = useFetch(() => fetchGenre('16'));

      const GenreSection = ({ title, data }: { title: string; data: Movie[] | null }) => {
        // if (!data || data.length === 0){ return null;}
      
        return (
          <>
            <Text className="text-lg text-white font-bold mt-5 mb-3">{title}</Text>
            {data && data.length > 0 ? (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-4 mt-3"
              data={data}
              contentContainerStyle={{ gap: 20 }}
              renderItem={({ item }) => <GenreMovieCard {...item} />}
            />
            ) : (
                <Text className="text-white italic mb-4">No movies found.</Text>
            )}
          </>
        );
      };
      
      
      

return (
    <View className="flex-1 bg-primary">
        <Image source={images.bg} className="absolute w-full z-0" />
        <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{
            minHeight:'100%', paddingBottom: 10
        }}>
            <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5  mx-auto" />

            {moviesLoading || trendingLoading || adventureLoading || actionLoading || scifiLoading || romanceLoading || animationLoading || animationError? (
            <ActivityIndicator
                size="large"
                color="#0000ff"
                className="mt-10 self-center"
            /> 
            ): moviesError || trendingError || adventureError || actionError || scifiError || romanceError ? (
                <Text>Error: {moviesError?.message || trendingError?.message}</Text>
            ): (
            <View className="flex-1 mt-5">
                <SearchBar 
                    onPress={() => router.push("/search")}
                    placeholder='search for movie'
                />

            {trendingMovies && (
            <View className="mt-10">
                <Text className="text-lg text-white font-bold mb-3">
                Trending Movies
                </Text>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="mb-4 mt-3"
                    data={trendingMovies}
                    contentContainerStyle={{
                        gap: 26,
                    }}
                    renderItem={({ item, index }) => (
                        <TrendingCard movie={item} index={index} />
                    )}
                    keyExtractor={(item) => item.movie_id.toString()}
                    ItemSeparatorComponent={() => <View className="w-4" />}
                />
            </View>
            )}

            <>
                <Text className="text-lg text-white font-bold mt-5 mb-3">
                    Latest Movies
                </Text>
                <FlatList 
                    data={movies?.slice(0,9)}
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
            </>

            <GenreSection title="Adventure" data={adventureMovies} />
            <GenreSection title="Action" data={actionMovies} />
            <GenreSection title="Sci-Fi" data={scifiMovies} />
            <GenreSection title="Romance" data={romanceMovies} />
            <GenreSection title="Animation" data={animationMovies} />


            </View>
        )}


        </ScrollView>
    </View>

);
}
