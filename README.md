🎬 React Movie App
This is my first full-stack project, built as part of my journey to learn React and full-stack development. 
I learned everything in this project by doing — including working with JWT authentication, handling protected routes.
I also included screenshots below.

The project is a movie listing platform developed with:

React for the frontend

Express.js for the backend

MongoDB for the database

TMDB API for movie data



✨ Features
Browse and filter movies, with "load more" functionality

Detailed movie cards, where you can view info and add to favorites

User authentication using JWT (JSON Web Tokens)

Protected profile route (/profile) that checks for a valid token before rendering

Secure HTTP-only cookie handling for storing JWTs

Profile page with:

Favorite movie list

User info display

User info update

Password update functionality

Basic light/dark mode toggle (experimental)

As mobile friendly as possible (the profile page may not be as mobile after certain screen widths)

🛠️ How to Run the Project Locally
Follow these steps:

1. Install Dependencies
 In both the frontend and backend folders install the  node modules:
 
 cd frontend
 npm install

 cd ../backend
 npm install

2.Create Environment Variable Files
You need to create two .env files — one in the backend and one in the frontend:
For back-end 

MONGO_URI=your_mongodb_connection_string,
PORT=your_backend_port,
JWT_SECRET=your_jwt_secret

For front-end

VITE_API_KEY=your_tmdb_api_key


3. Run the Project
Start the servers in both the frontend and backend folders:

Start Backend (Express server)
cd backend
nodemon express


Start Frontend (React app)
cd frontend
npm run dev

Once both servers are running, open your browser and navigate to:
http://localhost:5173/home 


Here are ScreenShots from my project to make it easier to see without running the project

![Home page](https://github.com/user-attachments/assets/a3b046cd-7e50-4458-9039-44e3698f227c)
![forth Light theme](https://github.com/user-attachments/assets/e70ab838-f4fc-49ca-ade0-19373c39d3b1)
![second big movie card](https://github.com/user-attachments/assets/fee9e082-b757-4847-9dee-2d331f3a45cf)
![Light mode big movie card](https://github.com/user-attachments/assets/99ea29a6-c4ed-4094-b7b6-a499ee120011)
![third home page mobile](https://github.com/user-attachments/assets/a90ebdf3-939f-4316-a03a-385fe776cbcb)
![forth movie card mobile](https://github.com/user-attachments/assets/c9c67353-a5b7-4cfc-bb08-f1e6c2df2b2b)
![5th Login Page](https://github.com/user-attachments/assets/86482c3d-906f-434a-a9e2-a1cc673b15a6)
![Personal information 6th](https://github.com/user-attachments/assets/4364ecb5-965e-482d-a647-056ed4918001)
![7th reset password](https://github.com/user-attachments/assets/378e5e8a-ffad-462f-988b-b723d6415ee0)
![8th favorite movies page](https://github.com/user-attachments/assets/b4b15312-2908-47b1-b0da-3485e3bb52dc)
