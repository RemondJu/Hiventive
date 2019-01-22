# Hiventive Project

Collaborative web app about building interactive OS for electronic devices by assembling Github Yocto layers.

## Installation

- 1 .  Fork this project.

- 2 . Go to  your repository

- 3 . Clone it in your computer :

`$ git clone https://github.com/[your_profile_github]/bordeaux-0918-js-hiventive.git`

### SQL initialization

- 1 . Go to the back/sql folder .

- 2 . Import *DATABASE_hiventive* in your Database Management System (DBMS).

### Rest api initialization

1 . Go to the back folder .

- 2 . Add new file *conf.js* in /back/routes/conf.js with your settings.

Example :

```javascript
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '',
  port: '',
  user: '',
  password: '',
  database: '',
});
export default connection;

```

- 3 . Dependencies installation  npm:

`$ npm install`

- 4 . Start the api:

`$ npm start`

### Front initialization 

- 1 . Go to the front folder.

- 2 . Create a new file *.env* at the folder's root with the fetch path.
Example: 

`REACT_APP_API_URL = http://localhost:4000`

- 3 . Npm dependencies installation :

`$ npm install`

- 4 . Start the front project :

`$ npm start`

- 5 . And to finish, in your navigator,  go to *http://localhost:3000/*  to see the web project.

## Technologie used: 
- Front => ReactJs
- Api => NodeJs
- Sql => Data base

## Team Hiventive

- Delbergue Guillaume
- Barrois Benjamin
- Bordel Benjamin

## Team beepolar to wild code school
- Nguyen Maeva
- Ribeiro Agnès
- Fettinger Julien
- Gonzalez Thomas
- Moureaux Mathias
- Remond Julien
