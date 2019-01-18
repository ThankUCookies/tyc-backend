# Thank You Cookies

[![Build Status](http://jenkins.thankufoods.com/buildStatus/icon?job=tyc-backend-pipeline&style=flat)](http://jenkins.thankufoods.com/blue/organizations/jenkins/tyc-backend-pipeline/activity)

## Technical Details

- **Yarn** used instead of npm due to known advantages of yarn over npm
- It is built on top of **express.js (v4.x)** framework
- It uses **typescript (3.x)**
- **jest (v23.x)** is used for automated testing
- Code formatting is automated with **prettier (v1.x)**
- **TSLint (v5.12)** is used for linting the typescript code

## Architectural Details

3 Layered Architecture is followed

![architecture](https://imgur.com/BKBdLoB.png)

The IOC container is located in **src/ioc/service-locator.ts**

## Development Setup

1. Clone the repo

```sh
git clone https://github.com/ThankUCookies
```

2. Install yarn

3. Install the dependencies

```sh
yarn install
```

4. Start the development server

```sh
npm start
```

## Environment Variables

Create **.env** file in the root directory of the project and update it based on your need

```env
PORT=YOUR PORT NUMBER
```
