# EVAT-Mobile/App
- Company: Chameleon
- Project: EV Adoption Tools
- Team: Mobile/App

### Tech Stack
- NodeJS
- TypeScript
- Express.js
- MongoDB
- JWT

### Env Variables

Create a .env file in then root and add the following

```
PORT = 8080
<<<<<<< HEAD
MONGODB_URI = MongoDB Uri
JWT_SECRET = 'abc123'
```

=======
MONGODB_URI = mongodb://<<address>>:<<port>>/EVAT
JWT_SECRET = 'abc123'
```



## MongoDB
MongoDB is required to run the backend server. There are multiple ways to do this.

1. Locally using docker to download and run a MongoDB container.

https://www.docker.com/

https://hub.docker.com/_/mongo 

2. Download and install mongoDB locally on your computer - Use the MongoDB Community Server download.

https://www.mongodb.com/try/download/community-kubernetes-operator 

3. Create a free DB online using MongoDB Atlas (Links below)

https://www.mongodb.com/lp/cloud/atlas/try4-reg?utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_core-high-int_prosp-brand_gic-null_ww-tier1_ps-all_desktop_eng_lead&utm_term=atlas%20mongodb&utm_medium=cpc_paid_search&utm_ad=p&utm_ad_campaign_id=22031347569&adgroup=173739098393&cq_cmp=22031347569&gad_source=1&gclid=Cj0KCQjwkN--BhDkARIsAD_mnIouAdtcJEgv3IPKGPZrGnDaLv9Z1tzM3GQcBn3VSr9nBkTzrZc7Tm8aAvltEALw_wcB 

https://www.mongodb.com/resources/basics/databases/free 

## Ensure MongoDB has the correct data and schema for chargers
https://gist.github.com/EscWasTaken/3f08797d7470237ae3c2ed0dd149aace

## MongoDB Compass 
A great tool for connecting, testing, editing, exporting and importing data into mongo databases.

https://www.mongodb.com/products/tools/compass 

>>>>>>> 2ef7dcf44cf11a3a99ca9907205f20bee56614bb
## Install Dependencies

```
npm install

```

## Run App

```

# Run in dev mode

npm run server

<<<<<<< HEAD
```
=======
```

# MORE INFORMATION REQUIRED

## Fixes Required

1. Invalid token error occuring when performing GET /api/vehicle

Bearer is correct when checking in code.

>>>>>>> 2ef7dcf44cf11a3a99ca9907205f20bee56614bb
