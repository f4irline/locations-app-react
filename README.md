# Locations App

## A simple app to post locations using latitude and longitude values.

### Introduction

This is a very simple web app, where user can display locations on a map using latitude and
longitude values or by clicking on the map. The locations are saved in a database.

### The App

The app utilizes a RESTful Spring Boot API to post the locations on a database. The RESTful
API is something that the user has to implement on one's own. The API this app uses is something 
that a course teacher gave me for the sole purpose of learning creating POST/GET requests.

The app also utilizes [Leaflet map's library](https://leafletjs.com/) to display a map on the web page and to add/remove markers
to it according to the locations the user adds/removes to the table.

The front-end is created using React.js.

![Gif of the App](/doc/app.gif)
