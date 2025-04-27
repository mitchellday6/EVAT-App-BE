# EVAT-Mobile/App
- Company: Chameleon
- Project: EV Adoption Tools
- Team: Mobile/App

## Tech Stack
- NodeJS
- TypeScript
- Express.js
- MongoDB
- JWT

## Env Variables

Create a .env file in then root and add the following

```
PORT = 8080
MONGODB_URI = mongodb://<<address>>:<<port>>/EVAT
JWT_SECRET = 'abc123'
GOOGLE_MAPS_API_KEY=ABCD1234
GOOGLE_AI_API_KEY=ABCD1234
GOOGLE_APPLICATION_CREDENTIALS="C:\Path\To\Auth.json"
```

### Authentication
#### Google Maps
1. Go to https://console.cloud.google.com/ and create a new project.
2. Ensure you have a billing account and it is enabled https://console.cloud.google.com/billing/
3. Click the sidebar menu and go to 'API & Services'
4. Click 'Enable APIs and services'
5. Search for and enable 'Places API (New)', 'Places API', 'Distance Matrix API', and 'Directions API'
6. At the top of the page search for 'Credentials' and click on it
7. Click 'Create Credentials' then 'API key'
8. Copy the API key into the `.env` file for `GOOGLE_MAPS_API_KEY="Key"`
9. Click 'Close' then 'Create Credentials', then 'Service account'
10. Give the service account a name and click 'Continue'
11. Select 'Role' then 'Basic' then 'Viewer'
12. Click 'Done'
13. Click on the service account email address you just created.
14. Click 'Keys' then 'Add key', 'Create new key', 'JSON', and then 'Create'
15. A JSON file will be downloaded to your computer. Move it to the the folder of the cloned Git repository and place it in a new /auth/ folder.
15. Copy the path of the file and place it in `.env` under `GOOGLE_APPLICATION_CREDENTIALS="Path/To/File.json`

### MongoDB
MongoDB is required to run the backend server. There are multiple ways to do this.

1. Locally using docker to download and run a MongoDB container.

https://www.docker.com/

https://hub.docker.com/_/mongo 

2. Download and install mongoDB locally on your computer - Use the MongoDB Community Server download.

https://www.mongodb.com/try/download/community-kubernetes-operator 

3. Create a free DB online using MongoDB Atlas (Links below)

https://www.mongodb.com/lp/cloud/atlas/try4-reg?utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_core-high-int_prosp-brand_gic-null_ww-tier1_ps-all_desktop_eng_lead&utm_term=atlas%20mongodb&utm_medium=cpc_paid_search&utm_ad=p&utm_ad_campaign_id=22031347569&adgroup=173739098393&cq_cmp=22031347569&gad_source=1&gclid=Cj0KCQjwkN--BhDkARIsAD_mnIouAdtcJEgv3IPKGPZrGnDaLv9Z1tzM3GQcBn3VSr9nBkTzrZc7Tm8aAvltEALw_wcB 

https://www.mongodb.com/resources/basics/databases/free 

#### Ensure MongoDB has the correct data and schema for chargers
https://gist.github.com/EscWasTaken/3f08797d7470237ae3c2ed0dd149aace

#### MongoDB Compass 
A great tool for connecting, testing, editing, exporting and importing data into mongo databases.

https://www.mongodb.com/products/tools/compass 

## Install Dependencies

```bash
npm install
```

## Run App


# Run in dev mode

```bash
npm run server
```

# MORE INFORMATION REQUIRED

## Fixes Required

1. Invalid token error occuring when performing GET /api/vehicle
Bearer is correct when checking in code.