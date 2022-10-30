


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project


Backend API that allows students to login and add or remove teachers from their favourite lists

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With


* NodeJs
* ExpressJs
* MongoDB
* Mongoose

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started
### Prerequisites


* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation



1. Clone the repo
   ```sh
   git clone https://github.com/AbdullahNM/favourite-teacher-list
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Connect to MongoDB Database and get your Database URL 

   For help refer : [Help](https://www.mongodb.com/docs/guides/atlas/connection-string)
4. Enter your DATABASE_URL and JWT_SECRET_KEY in `.env`
   ```env
   DATABASE_URL = 'Enter Your URL'
   JWT_SECRET_KEY = 'Enter Your secret Key'
   ```
5. Start The Server (localhost:3000) 
 ```sh
 npm start
 ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

* Learner Schema
```json
{
    name: String,
    age: Number,
    favourite: Array,
    email: Email,
    password: String(Encrypted)
}
```

* Teacher Schema
```json
{
    name: String,
    age: Number,
    subject: String,
    count:  Number
}
```

* Add student to database
```
localhost:3000/learner/add
```

* Get All students
```
localhost:3000/learner/getAll
```

* Get Student By ID
```
localhost:3000/learner/getOne/:id
```
* Add teacher to favourite list
```
localhost:3000/learner/addfavourite
```
* Remove teacher from favourite list
```
localhost:3000/learner/removefavourite
```

* Login Student
```
localhost:3000/learner/login
```

* Add teachers to Database
```
localhost:3000/teacher/add
```

* Get Most Liked Teacher
```
localhost:3000/teacher/getMostFav
```

* Get All Teachers
```
localhost:3000/teacher/getAll
```

* Get Teacher By ID
```
localhost:3000/teacher/getOne/:id
```


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact


Project Link: [https://github.com/AbdullahNM/favourite-teacher-list](https://github.com/AbdullahNM/favourite-teacher-list)

<p align="right">(<a href="#readme-top">back to top</a>)</p>






