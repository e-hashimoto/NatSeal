# Natseal

Natseal is a clone of National Geographic with the focus on seals, and locations and travel opportunities surrounding seals.  Signed up users have the ability to post locations and travel opportunities on visiting seals.

## Technologies Used
* Languages: Javascript, Python, HTML/CSS
* Backend: Flask
* Frontend: React, Redux
* Database: PostgreSQL
* Hosting: Heroku

## Links
* [MVP Feature List](https://github.com/e-hashimoto/natseal/wiki/MVP-Feature-List)
* [Database Schema](https://github.com/e-hashimoto/natseal/wiki/Database-Schema-and-Backend-Routes)
* [User Stories](https://github.com/e-hashimoto/natseal/wiki/User-Stories)

## How to Start the Environment
1. Clone the following git repository: https://github.com/e-hashimoto/natseal
2. Install dependencies with pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
3. Create a .env file based on the example with the proper settings for your development environment
4. Setup your PostgresSQL user,password, and database and make sure it matches with your .env file
5. Enter your environment, migrate your database, seed your database, and run your flask app
   - pipenv shell
   - flask db upgrade
   - flask seed all
   - flask run
6. Go into your react app directory and install dependencies and run the app
   - npm install
   - npm start
7. Open your browser and go to the localhost address your are running the app in

## Future Features to Implement
* Seal Database
* Articles and Journal Entries
* Links to videos and documentaries
