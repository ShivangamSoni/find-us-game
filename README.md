# Find Us Game

This is a Game inspired by **Where's Waldo**. The user is presented with an Image & they are supposed to find the listed characters within the Image.

I've completed this project as part of <a href="https://www.theodinproject.com/">**TheOdinProject**</a>.

<a href="https://find-us-game.web.app/">**Live Demo**</a>


## Tech Stack

### 1. Frontend
- React
- TypeScript
- Redux (@redux/toolkit)
- Firebase v9
- React Router DOM v6
- MUI v5

### 2. Backend
- Firebase Firestore DB
- Firebase Cloud Storage
- Firebase Anonymous Authentication
- Firebase Hosting
- ImageKit Image Delivery


## Project Details

### 1. Frontend
- UI is made using MUI Components. It's fully responsive & customizable.
- Using the Customization User can toggle between Light & Dark modes as well as they can choose the Theme Color to their liking.
- User is made aware to the results of their interactions using **<a href="https://mui.com/material-ui/react-snackbar/">Snackbar</a>** Notifications.
- With the use of Header, Main, Lists & other Semantic elements the UI is made completely Accessible.

### 2. Backend
- I have used Firebase for backend, the Game Levels Data is stored in Firestore DB alongside the Character Details & Global Leaderboard.
- The Images are stored in Firebase Cloud Storage & are delivered to the user using ImageKit Delivery System.
- The users are Anonymously authenticated, to prevent unnecessary misuse of the Firebase API.
- The Website itself is hosted using Firebase Hosting Service.
