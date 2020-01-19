## Initial steps :

npm init -y

npm i express mongoose dotenv node-geocoder cors
npm i -D nodemon


## Installing MongoDB on a Mac :

https://treehouse.github.io/installation-guides/mac/mongo-mac.html

Run the Mongo daemon, in one terminal window run ~/mongodb/bin/mongod. This will start the Mongo server.
Run the Mongo shell, with the Mongo daemon running in one terminal, type ~/mongodb/bin/mongo in another terminal window. This will run the Mongo shell which is an application to access data in MongoDB.

## Serving static files from Express :

Now we need to make some changes so that we’ll be serving the static files from our public directory. Let’s tell Express to serve users files from our public directory. We do this by adding the following line to our code:

app.use(express.static('public'));
Let’s look at what this does: when we call app.use(), we’re telling Express to use a piece of middleware. Middleware is a slightly more complicated topic that we’re not going to go into here, but in short, a middleware function is a function that Express passes requests through before it sends them to our routing functions, such as the app.get('/') route above. We tell Express to use the express.static middleware. express.static is a piece of middleware that comes built into Express, it’s purpose is to try to find and return the static file requested. The parameter we pass to the express.static function is the name of the directory we want Express to serve files from, in our case it’s public.

https://alligator.io/nodejs/serving-static-files-in-express/