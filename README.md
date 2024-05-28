### creation 
    npm install vite@latest
### Setup instruction
    1.Clone the project
        git clone https://github.com/singhsanket143/lms-frontend-hn.git
    2.Move into the directory
        cd lms-frontend-hn
    3.install dependencies
        npm i
    4.run the server
        npm run dev
### Setup instructions for tailwind

    1.Install tailwindcss
        npm install -D tailwindcss postcss autoprefixer
    2.Create tailwind config file
        npx tailwindcss init
    3.Add file extensions to tailwind config file in the contents property
        "./src/**/*.{html,js}"
        or
        "./src/**/*.{html,js,jsx,ts,tsx}", "./index.html",

    4.Add the tailwind directives at the top of the index.css file
        @tailwind base;
        @tailwind components;
        @tailwind utilities;
    5.Install dependencies 
        npm i -D postcss autoprefixer
    6. Make changes in content of tailwing.config.js
          content: ["./index.html,./src/**/*.{html,js,jsx,ts,tsx}"],

    7. npx tailwindcss init -p      it will give post css config (when project is created through vite)

    8.Add the following deatails in the plugins property of tailwing config so that daisiui css will be applied
          plugins: [require('daisyui'),require('@tailwindcss/line-clamp')],

     
### Dependencies and plugins
    for state management
    npm install @reduxjs/toolkit
    npm install react-redux
    npm install react-router-dom
    npm install react-icons
    npm install react-chartjs-2
    npm install chart.js
    npm install daisyui for ui
    npm install axios for network request
    npm install react-hot-toast for messaging
    npm install @tailwindcss/line-clamp

### daisyui is used in slide bar