# Wallet Ourglass - React Native

============================

> This project was bootstrapped with [React Native](https://reactnative.dev/docs/environment-setup).

## Available Scripts

In the project directory, you can run:

### `npx react-native start`

### `npx react-native run-ios`

### `npx react-native run-android`

## Components - Storybook

> Always when you create component you must set up its Storybook and test files

## Directory - folder structure

> Here is description of each folder of `src`

    ./src
    ├── api                   # Contains the API Layer of our application
    ├── assets                # Contains fonts, images, and videos
    ├── components            # The common directory will contain any reusable components. Not common would be placed inside of specific components.
    ├── constants             # Any conts values to reuse
    ├── context               # Should contain any global-level context state providers.
    ├── helpers               # Any utilities and small reusable functions
    ├── hooks                 # Would hold any custom and reusable hooks
    ├── layout                # Should have components that provide different layouts for your pages
    ├── services              # Complex business logic code that is used in a few different places
    ├── themes                # Global style values
    ├── views                 # Containers of components to create view
    ├── App.js                # Config of your App
    └── routing.js            # Routing structure and contains all views
