# SpaceX Missions Explorer - COMP3133 Lab Test 2

This Angular application displays information about SpaceX launches using the SpaceX API. Users can view mission details, filter by launch year, and access additional information through provided links.

## Features

- View all SpaceX missions with key information
- Filter missions by launch year
- View detailed information about selected missions
- Access external resources (articles, Wikipedia, videos) for each mission

## Technologies Used

- Angular 16+
- TypeScript
- HTML/CSS
- SpaceX REST API
- Angular Standalone Components

## Project Structure

The application consists of the following main components:
- Mission list display
- Mission filtering functionality
- Detailed mission information view
- SpaceX data service

## API Endpoints Used

- SpaceX Launches API: https://api.spacexdata.com/v3/launches
- SpaceX Launch Filter API: https://api.spacexdata.com/v3/launches?launch_year={year}
- SpaceX Mission Details API: https://api.spacexdata.com/v3/launches/{flight_number}

## Screenshots

### Homepage - Mission List
![image](https://github.com/user-attachments/assets/0813d04e-379e-4027-af4c-0aabbf75957e)

### Mission Details View
![image](https://github.com/user-attachments/assets/df31cdc2-59bd-4ada-8b8c-3abf7af1c6f0)


## Deployment

This application is deployed at: https://101462436-lab-test2-comp3133.vercel.app/

## Installation and Setup

To run this project locally:

1. Clone the repository
```bash
git clone https://github.com/v-aap/101462436-lab-test2-comp3133.git
cd 101462436-lab-test2-comp3133
