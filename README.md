<h1 align="center">BackPacker<br>
</h1>
<center>A Travel Location Recomendation System</center>

## Introduction
Travelling is a major thing that people used to reduce stresses with their busy schedules.

Selecting a proper location to travel is one of the major problems where people get stuck when planning on travelling.

As a solution to this problem, we developed a mobile application that helps travellers to get an idea about locations around the world through this project.

## Proposed Solution
![System Architecture](https://github.com/maneeshaindrachapa/FYP/blob/master/WorkInProgress/Docs/images/FYP_Archi.png?raw=true)
## Functionalities

- Register Users to the Application
- Search Locations
- View Location Details
- Capture Environment status (Using Sensors)
- Share New Location Data with a Review about that place

## Registering Users to the Application

- A new user can register to the application with a valid email, username, password ,age and address.
- Login
- Forget password

## Search Location
 **1. List view**
 A Registered user can search and find the details of the required locations.
 **2. Map view**
 A Registered user can search and view required locations in the map.
 
## View Location Data
A Registered user can view the details of the location

## Share New Location Data
A registered user need to follow four steps to share the location with data,

1. Share the Location

2. Take a photo of the Location

3. Capture the environment status
	 - [x] Noise Level
	 - [x] Luminosity
	 - [x] Temperature
	 - [x] Pressure
4. Add Recommendation

## Technologies
- Ionic 4 Framework
- Google Firebase API
- Ionic Native Plugins
- Google Maps API
- Google Locations API
## Challenges
- Ionic 4 has a different approach rather than Ionic 3
- Accessing sensor hardware using Ionic Framework
- Debugging and Testing

## Further Improvements
- Categorizing same location details and photos into one
- Use Current data and timestamp details to create a predictive model which can predict the weather of a location
- If person has a poor connectivity, save data in a local storage and push it to server when person connects with the internet
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTYyNjk2Mjg2OCwyNzQ4MTQxNjAsLTIxND
Q1Mzk3NDVdfQ==
-->