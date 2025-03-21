# Overview
This is a simple application designed to fetch patient information from a Bahmni Electronic Medical Records System, and put it into a format that can be sent to a label printer (in particular a Honeywell PC43t). It also needed to include functionality to grab recent lab orders, which wasn't directly exposed in Bahmni APIs, hence an intermediary docker image and SQL access was used to fetch these.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
This project requires a .env or .env.development file to be created in the root directory and populated with the following fields:
```
REACT_APP_PARENT_PAGE_URL="<BAHMNI HOMEPAGE>"
REACT_APP_BAHMNI_HOST="<BAHMNI HOST/IP ADDRESS>"
REACT_APP_OPENMRS_API_PATH="openmrs/ws/rest/v1"
REACT_APP_API_USER="<API USER ON OPENMRS USERNAME>"
REACT_APP_API_PASS="<API USER ON OPENMRS PASSWORD>"
SQL_HOST="<BAHMNI DB HOST>"
SQL_USERNAME="<BAHMNI DB USERNAME>"
SQL_PASSWORD="<BAHMNI DB PASSWORD>"
REACT_APP_LAB_ORDER_API_HOST="<IP/PORT YOU RUN THE SERVER.JS SCRIPT>"
REACT_APP_LAB_ORDER_API_PATH="api/labOrderPatients"
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

Note: It's important to change a couple of things, including the basename tag in `index.js`, update URLs in your `.env` files and modify homepage and proxy values in `package.json`

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
