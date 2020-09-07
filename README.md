EXPRESS 4.17

IMPORTANT NOTES:

    1. Make sure you follow the steps mentioned under "PROJECT START STEPS" and ensure that the steps execute successfully.

PROJECT START STEPS:

    Pre-requisites:
    1. Install node, npm
    2. Install express (npm install express --save)

    Steps:
    1. If you wish to run without using docker, go to config/default.json and
        change the db string name to - "mongodb://localhost:27017/vidren"
    2. To run this application, do the following:
        1.a. Go to the project root directory.
        1.b. Run the following commands respectively in the terminal/command line to build and run the app:
            - npm install
            - npm start
    3. To run with docker, go to root and type in the terminal/command line
            - docker-compose up -d
