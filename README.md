Project Name
Ngram Comparison App

Table of Contents

Project Overview
Technologies Used
Usage
API Endpoints
Port Number


Project Overview:-
In this project I created a website in which when user write anything inside the input-box and press enter or submit button then it goes to mongodb for connection log and save that sentene in another model and after that it calls the Django api using the most recent 2 string and returns the ngrams to the fontend by a django server that has an API that returns the ngram comparison using the NLTK.

Technologies Used:-
React.js for frontend
Node.js for backend
Django for backend

Usage
First start Django server by typing "py manage.py runserver"
then start node.js server by typing "nodemon index.js"
then start react.js server by typing "npm start"

API Endpoints
"api/ngrams/" this is an endponit of django server in which only post data is present only based on last 2 strings it split in the form of array
"text-data" this is an endpoint of node.js server for post data in mongodb with connection log

Port Number
Django -> 8000
React.js -> 3000
Node.js -> 5000
