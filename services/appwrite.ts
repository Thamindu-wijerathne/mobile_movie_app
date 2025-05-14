// track the searches made by a user
import { Account, Client, Databases, ID, Query } from "appwrite";


const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const USER_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID_USER;

const client = new Client()
    .setEndpoint('https://syd.cloud.appwrite.io/v1')
    .setProject('681f060f0012d516dc73');

const database = new Databases(client);
const account  = new Account(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
    try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.equal("searchTerm", query),
    ]);

    if (result.documents.length > 0) {
        const existingMovie = result.documents[0];
        await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
            count: existingMovie.count + 1,
        }
        );
    } else {
        await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.id,
        title: movie.title,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        });

    }
    } catch (error) {
    console.error("Error updating search count:", error);
    throw error;
    }
};

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
    Query.limit(5),
    Query.orderDesc('count'),
    ])
    return result.documents as unknown as TrendingMovie[];
} catch(error) {
    console.log(error);
    return undefined;
}
}

export const checkUserLoggedIn = async(): Promise<boolean> => {
    try {
        await account.get();
        return true;
    } catch(error) {
        console.log('User log check error :', error);
        return false;
    }
} // make sure this import exists

export const loggedUserDetail = async ()=> {
try {
    const detail = await account.get();
    return detail;
} catch (error) {
    console.log('Failed to get user details', error);
    return null;
}
};


export const createUser = async (email: string, password: string, name: string) => {
    try {
      const user = await account.create(ID.unique(), email, password, name);
      console.log("Create account successfull", user);
      return user;
    } catch (error) {
      console.error('Create account failed : ', error);
      throw error;
    }
};


export const loginUser = async (email: string, password: string) => {
    try {
    const session = await account.createEmailPasswordSession(email, password);
    return { session};
    } catch (error) {
    console.error("Login failed:", error);
    throw error;
    }
};


// loginUser('thamindu12ku@gmail.com', 'Thamindu');

export const logoutUser = async () => {
    try {
        const result = await account.deleteSession("current");
        console.log("Log out successfull", result);
        return result;

    } catch (error) {
        console.error('LogOut failed', error);
        throw error;
    }

};


export const getSavedMovies = async () => {
    try {
        const result = await account.getPrefs()
        console.log("user prefernce :", result.savedMovies);
        return result.savedMovies;
    } catch (error) {
        console.error("user get preference :",error);
        return ;
    }
}

export const addSavedMovie = async (newMovieId: number) => {
    try {
      const user = await account.get();
      const currentMovies: number[] = user.prefs?.savedMovies || [];
  
      // Avoid duplicates
      if (currentMovies.includes(newMovieId)) return;
  
      const updatedMovies = [...currentMovies, newMovieId];
      await account.updatePrefs({ savedMovies: updatedMovies });
  
      console.log("Movie added to saved list.");
    } catch (error) {
      console.error("Failed to add movie:", error);
    }
  };


export const removeSavedMovie = async (movieIdToRemove: number) => {
  try {
    // Step 1: Get current preferences
    const user = await account.get();
    const currentMovies = user.prefs?.savedMovies || [];

    // Step 2: Filter out the movie ID
    const updatedMovies = currentMovies.filter((id: number) => id !== movieIdToRemove);

    // Step 3: Update preferences
    await account.updatePrefs({ savedMovies: updatedMovies });

    console.log("Movie removed successfully");
    return;
  } catch (error) {
    console.error("Error removing movie:", error);
  }
};

// addSavedMovie(11);

// getSavedMovies();
// logoutUser('681f29f4ec84e4627e37');