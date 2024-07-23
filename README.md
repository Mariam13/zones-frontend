# Zone Frontend

## Description

Zone Frontend is an Angular 18 application designed to manage and visualize zones used for vehicle detection at intersections. Each zone is defined by four points forming a polygon. The application allows users to load existing zones, create new zones by drawing polygons, and delete zones. The user interface leverages SVG for visual representation of the zones.

## Some info about the code
1. Created an HTTP interceptor to communicate with the backend
2. Developed a dynamic UI loader that triggers on every API call
3. Implemented a separate service to trigger Angular Material toast notifications
4. etc...

## Features
* **Load Zones** - Retrieve and display existing zones
* **Create Zones** - Draw a new polygon by clicking on the SVG canvas to define the four points (Please make sure you are not using any filters for listing before creating a zone. Otherwise, you might not see the newly created zone in the list.)
* **Delete Zones** - Remove zones from the list

## Technologies
* **Angular version >18**
* **Angular Material version >18**

## Installation
### Prerequisites
* [angular-cli](https://angular.dev/) (version >= 18)
* [Node.js](https://nodejs.org/en/download/) (version >= 22)
* [npm](https://www.npmjs.com/get-npm) (version >= 10)

### Steps
1. **Clone the repository:**
    ```
    git clone https://github.com/Mariam13/zones-frontend.git
    cd ./zones-frontend
    ```
2. **Install dependencies**
    ```
    npm install
    ```
3. **Run the application**
    ```
    ng serve
    ```
    `The application will be available at - http://localhost:4200`

    `The server will start on port 4200 by default.`

# Usage
## Load Existing Zones
Upon loading the application, existing zones are fetched from the backend and displayed as polygons on the SVG canvas.
1. **Click on 'Create New Zone' in the top right corner button to open zone creation modal.**
2. **Hover over the zone cards to see 'Zone Delete' button.**
3. **You can filter zones list by name or creation order.**

# Testing
The project includes unit tests for some functions. The tests use Jest and Supertest.
### To run the tests
```
ng test
```
