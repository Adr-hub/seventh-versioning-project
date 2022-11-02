# Installation

## Node.js installation

You have to install the latest node.js version on your operating system.

## API and database

### Backend modules installation

From the `backend` project's directory run the `npm install` command.

This will add a node_modules folder containing up to date dependencies.

### MongoDB

1. You have to connect to a MongoDB cluster. 

    If you don't have one you can sign up for free on mongodb.com.

2. As soon as you have registered create your database username and password. 

    You can fill in the `Quickstart` form. A link is available in the left pane. 

    The created user has to have the `read and write to any database` privilege.

3. On the homepage there is a menu bar on the right side of your cluster's name. 

    Click on the ellipsis: a list is displayed. Then click on `Command Line Tools`. 

4. On the tools page there is another link you have to follow in order to install `MongoDB Database Tools`. 

    Once installed go back to the command line tools page. 

5. Below the installation link there is a `mongorestore` template.

    You have been provided the project's database dump. Use the template to create the database on your cluster.

6. On the homepage click on `connect` and then on `connect your application`. 

    A connection URI is generated. 

7. Replace the comment in line 17 of the `server.js` file with the connection string. It should look like: 

   `mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/Intranet?retryWrites=true&w=majority`.

### Npm start

Run `npm start` to launch the backend server.


## Frontend 

### React modules installation

From the `frontend` project's directory use the `npm install` command.

### Npm start

Run `npm start` to launch the frontend server.