hemasYoutube is a video streaming application where users can explore videos, view trending and gaming content, save favorite videos, and more. The app includes multiple routes, user authentication, and dynamic content loading.

This README will guide you through the functionalities and structure of the app.

Features
1. Login Route
Invalid Credentials: Displays an error message if the username or password is incorrect.
Valid Credentials: Redirects to the Home route upon successful login.
Unauthorized Access: If an unauthenticated user tries to access restricted routes like Home, Trending, Gaming, Saved Videos, or Video Details, they are redirected to the Login route.
Show/Hide Password: Allows users to toggle the visibility of their password in the login form.
2. Home Route
Initial Load: Displays a list of videos after making an HTTP GET request with an empty search query.
Search: Users can search for videos by entering text in the search bar and clicking the search button. The app fetches relevant results.
Failure View: If the HTTP GET request fails, a failure view is displayed.
No Videos View: If no videos match the search query, a "No Videos Found" view is displayed.
Sidebar Navigation: Users can navigate to Trending, Gaming, or Saved Videos from the sidebar.
3. Trending Route
Video Fetching: Displays a list of trending videos fetched from an API.
Retry: A retry button is provided in case of a failed HTTP request.
Navigation: Users can navigate to Home, Gaming, or Saved Videos via the sidebar.
4. Gaming Route
Video Fetching: Displays a list of gaming videos fetched from an API.
Retry: Retry button available in case of failure.
Navigation: Navigation to Home, Trending, or Saved Videos is possible through the sidebar.
5. Saved Videos Route
Saved Videos List: Displays saved videos. If no saved videos exist, a "No Saved Videos Found" view is shown.
Navigation: Users can navigate to Home, Trending, or Gaming via the sidebar.
6. Video Item Details Route
Video Fetching: Displays detailed video information and streams the video.
Buttons:
Like: The like button changes color and state when clicked.
Dislike: Similarly, the dislike button toggles when clicked.
Save: The save button allows users to save or unsave a video and changes its state.
Failure View: A failure view is displayed if the video request fails.
7. Logout
Logout Confirmation: When the logout button is clicked, a confirmation popup appears.
Cancel: Closes the popup without logging out.
Confirm: Logs the user out and redirects to the Login route.
8. Not Found Route
Invalid Path Handling: Displays a "Not Found" view when users attempt to access an invalid URL path.
9. Theme
Light/Dark Theme Toggle: The theme can be toggled by clicking the theme button in the header.
Light Theme: Light theme background colors are applied to each route (e.g., #f9f9f9).
Dark Theme: Dark theme background colors are applied to each route (e.g., #181818 for Home, #0f0f0f for other routes).
API Requests & Responses
The app interacts with APIs to fetch videos for different routes like Home, Trending, Gaming, and Saved Videos. It uses JWT tokens stored in cookies for authenticated routes.

Key API Endpoints:
Home: homeVideosApiUrl
Trending: trendingVideosApiUrl
Gaming: gamingVideosApiUrl
Saved Videos: savedVideosApiUrl
Video Details: videoItemDetailsApiUrl
Styling and Design
Styled Components: The app uses styled-components for styling.
Theme Management: The background color of each route changes based on the selected theme.
Responsive Design: The app is designed to be fully responsive and adjusts based on screen size.
Important HTML Attributes:
Data Test IDs: Test IDs are used for various elements for easier testing:
data-testid="loader": For the loader component.
data-testid="searchButton": For the search button in the Home route.
data-testid="theme": For the theme toggle button.
data-testid="banner": For banners in each route.
Images:
Logo: The logo used for the app has the alt attribute website logo.
Failure View: Images for failure views have the alt attribute failure view.
Not Found View: Images for not found views have the alt attribute not found.
Routing
The app uses React Router for navigation between different routes:

Home Route: /
Login Route: /login
Trending Route: /trending
Gaming Route: /gaming
Saved Videos Route: /saved-videos
Video Item Details Route: /videos/:id
Not Found Route: Displays on any undefined path.
User Credentials
Make sure to provide valid user credentials to access protected routes. Unauthorized access will redirect to the Login route.
userid:rahul
password:rahul@2021

Getting Started
Prerequisites:
Node.js and npm (or yarn) installed on your local machine.
Installation:
Clone the repository to your local machine.
Navigate to the project directory.
Run the following commands:
bash
Copy code
npm install
Start the app:
bash
Copy code
npm start
Conclusion
This is a fully functioning video streaming app with various routes, authentication features, and interactive elements. It offers a rich user experience with seamless transitions between different sections and a responsive UI based on the Light and Dark themes.
