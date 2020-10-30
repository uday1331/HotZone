# HotZone Django Server

Serves the React build from the `build` directory and delivers the `hotzone` API.

## Iteration 1:

As expected, the first iteration of HotZone will handle the simple case where there is a single GeoData location that satisfies the search criteria and the location is not already known to HotZone.

## Limitations and Exclusions:

- Editing and Deleting Locations is not allowed.
- Location can only be created based on GeoData Store i.e user cannot choose to input own values for the Location.
- Case Data storage is not supported yet.

# Running the server

1. Install all dependencies.
2. From the `server` directory, `gunicorn server.wsgi:application` OR `heroku local`.
