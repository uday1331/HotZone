#HotZone
## Deployed at:
https://hotzone3035552765.herokuapp.com/

## Iteration 1:

As expected, the first iteration of HotZone will handle the simple case where there is a single GeoData location that satisfies the search criteria and the location is not already known to HotZone.

## Limitations and Exclusions:

- Editing and Deleting Locations is not allowed.
- Location can only be created based on GeoData Store i.e user cannot choose to input own values for the Location.
- Case Data storage is not supported yet.
- Takes long to load.

## Setting up the development environment:

### Setting up the backend: 
1. Change directory to `HotZone/server`.
2. Install all dependencies from `requirements.txt` using `pip install -r /path/to/requirements.txt`
3. Make sure you switch to yur
2. From the `server` directory, `gunicorn server.wsgi:application` OR `heroku local`.

### Setting up the frontend:
1. Change directory to `HotZone/web`.
2. Install all dependencies using `yarn install`.
3. Run the frontend using `yarn start`.

Alternatively, if you have created the latest build (i.e. you ran `yarn build` , you can access the frontend from the backend url as well.)

## To deploy:

We use the `deployment` branch for deployment. To deploy, follow these steps:

1. Navigate to the `web` directory and then run `yarn build`. This will place `build` folder in the server folder.
2. With this, you are ready to deploy. Now, you can run `git subtree push --prefix server origin deployment --force`. This places the files required for the deplyment in the corresponding `deployment` branch. 
