# Wallet Ourglass - React Native

> This project was bootstrapped with [React Native](https://reactnative.dev/docs/environment-setup).

## Available Scripts

In the project directory, you can run:

`npx react-native start`

`npx react-native run-ios`

`npx react-native run-android`

## Typescript files

> This project support Typescript files, so please always develop with it.

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
    ├── App.tsx               # Config of your App
    └── routing.tsx           # Routing structure and contains all views

## Test with Jest

> This project support Jest and all test files must be in `__test__` folder.

You can run test with this script:

`yarn test`

## Components - Storybook

> Always when you create a component you must set up its Storybook and test files

With Storybook for React Native you can design and develop individual React Native components without running your app.

For more information about storybook visit: [storybook.js.org](https://storybook.js.org)

You must run scripts in below order:

Open a terminal and run `yarn storybook`
Then, open other terminal and run `npx react-native start`

Now you can see Stroybook dashboard in `localhost:7007`
