# Bullets

A digital version of your analog Bullet Journal. Based on the extremely popular [Bullet Journal](https://www.bulletjournal.com) by Ryder Carroll, Bullets is an iOS app that allows you to keep track of your Tasks, Events, and Notes even when you can't carry your paper journal.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Node
* npm
* yarn

To run Bullets for development and testing, you will need XCode with Simulator installed on your local machine, or the Expo app for iOS for testing on your device.

You will also need to set up a project with [Firebase](https://console.firebase.google.com).

### Installing

Download or clone the repo:

```
git clone git@github.com:seanbuchholz/webappint.git
```

Then change directories and install dependencies:

```
cd bullets
npm install
```

Configure Firebase:

Go to the project you created in [Firebase](https://console.firebase.google.com) and click "Add Firebase to your web app". Copy the information inside the `config` object.

Create `/bullets/firebaseConfig.js` and configure it using the information from the previous step:

```
import * as firebase from 'firebase';
const config = {
  apiKey: <Your Firebase apiKey>,
  authDomain: <Your Firebase authDomain> ,
  databaseURL: <Your Firebase databaseURL>,
  storageBucket: <Your Firebase storageBucket>,
};
export default firebaseApp = firebase.initializeApp(config);
```

### Running Bullets

To run Bullets on your local machine or device, from `/bullets/` run

```
yarn start
```

If everything is installed correctly, the packager will generate a QR code in your terminal. Simply scan that code with the Expo app or press `i` to open Simulator.

<!-- ## Deployment

Add additional notes about how to deploy this on a live system -->

## Built With

* [React Native](https://facebook.github.io/react-native/)
* [NativeBase](https://nativebase.io)
* [React Navigation](https://reactnavigation.org/)
* [Firebase](https://console.firebase.google.com)

## Style Guide

Code styling for Bullets is based on the AirBnB style guide, with some modifications to accommodate React Native and JSX.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on the process for submitting pull requests to us.

## Versioning

Bullets uses [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/seanbuchholz/webappint/tags).

## Authors

* **Sean Buchholz** - *Initial work*

See also the list of [contributors](https://github.com/seanbuchholz/webappint/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


