# SpaceX Launch Programs

react repo for the SpaceX Launch Programs

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Development

## Running the app locally

1. Install js dependencies: `npm install`
2. Run the project: `npm start`

## Structure

We're using `redux` for state management and `redux-saga` for asynchronous actions e.g. api requests.

The bulk of the code is in the `app` directory.

| location       | contents                                                                                         |
| -------------- | ------------------------------------------------------------------------------------------------ |
| src/App.js     | Entrypoint for the app                                                                           |
| src/api        | API interaction                                                                                  |
| src/components | lower level components, e.g. LeftSidebar, MainContent                                            |
| src/pages      | components representing entire screens within the app, where integration with redux would happen |
| src/state      | redux reducers/actions/selectors. Combined in `index.js`                                         |
| src/sagas      | `redux-saga` sagas, forked from the root saga in `index.js` to run in parallel.                  |

## In this app includes:

- Function components
- hooks - useEffect, useState, useSelector, useDispatch, etc.
- Bootstrap for grid management
- styled-components npm to create custom styles
- Redux with redux-saga interation
- apisauce npm for fetch data from api
- funtionlity for filter action - used location.search feature
- Unit test cases with fixtures data
- Deployment with netlify

## Deployed build URL

https://relaxed-euclid-e005c5.netlify.app
