# MovieApp - A React Native Movie Search App 🎬

A React Native app that allows users to search for movies, watch trailers, and save favorite movies for later. Built with Expo, the app fetches movie data from The Movie Database (TMDb) API and provides a seamless user experience.

## Features 🚀

* **Search for Movies**: Search for movies using the movie title.
* **Movie Details**: View details of a selected movie, including synopsis, release date, and rating.
* **Watch Trailers**: Play movie trailers directly within the app using the YouTube player.
* **Save Movies**: Save favorite movies to view later.
* **View Saved Movies**: Access a list of saved movies from the profile screen.

---

## 🛠️ Libraries Used

* **React Native**: For building the mobile app.
* **Expo**: For easy React Native development and deployment.
* **react-navigation**: For navigating between different screens in the app.
* **AsyncStorage**: To store saved movies locally on the device.
* **axios**: For making HTTP requests to the TMDb API.
* **react-native-youtube-iframe**: For embedding YouTube trailers in the app.

---

## 📦 Installation Instructions

### 1. Install Dependencies

First, clone the repository and navigate into the project folder:

```bash
git clone <your-repository-url>
cd <your-project-folder>
```

Then install all required dependencies:

```bash
npm install
```

### 2. Set Up TMDb API Key

To access movie data from TMDb, you'll need to create a TMDb account and generate an API key.

* Go to [TMDb](https://www.themoviedb.org/) and sign up for an account.
* Navigate to [API Settings](https://www.themoviedb.org/settings/api) and create a new API key.
* Add your API key in the project by creating a `.env` file in the root directory and adding the following:

```bash
TMDB_API_KEY=<Your_TMDB_API_KEY>
```

### 3. Start the App

To run the app locally, use Expo's development server:

```bash
npx expo start
```

This will open a new browser window with a QR code. Scan the QR code with the Expo Go app (available on Android and iOS) to run the app.

---

## 💡 How It Works

1. **Movie Search**: Users can search for movies by title, and the app will display a list of matching movies using the TMDb API.
2. **Movie Details**: When a movie is selected, the app displays detailed information including the movie synopsis, release date, rating, and a play button for the trailer.
3. **Play Trailer**: When a user clicks the play button, the YouTube trailer for the movie is displayed within the app using `react-native-youtube-iframe`.
4. **Save Movies**: Users can save their favorite movies by clicking the "Save" button on the movie details screen. The movie data is saved locally using **AsyncStorage**.
5. **View Saved Movies**: Users can navigate to the **Saved Movies** screen to see a list of movies they've saved.

---

## 🧑‍💻 Contributing

If you'd like to contribute to this project, feel free to fork the repository, make your changes, and create a pull request. Contributions are always welcome!

---

## 🙏 Acknowledgments

* [TMDb API](https://www.themoviedb.org/) for providing the movie data.
* [Expo](https://expo.dev/) for simplifying React Native development.
* [React Navigation](https://reactnavigation.org/) for handling navigation in React Native apps.

---

Let me know if you'd like any further adjustments!
