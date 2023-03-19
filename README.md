# project setup
$ npx create-expo-app .
$ touch tsconfig.json
$ npx expo start

# Navigation
$ npm install @react-navigation/native
$ npx expo install react-native-screens react-native-safe-area-context

# Native-Stack Navigator
$ npm install @react-navigation/native-stack

# Tab Navigator
$ npm install @react-navigation/bottom-tabs

# Drawer Navigator
$ npm install @react-navigation/drawer
$ npm install react-native-gesture-handler react-native-reanimated
>> add this to babel.config.js
```
       plugins: [
            [
                'react-native-reanimated/plugin',
                { relativeSoureLLocation: true },
            ],
        ],
```

# Redux Tookit
$ npm install @reduxjs/toolkit react-redux
$ npm i -D @types/react-redux

# nanoid
$ npm i nanoid react-native-get-random-values
$ npm i -D @types/react-native-get-random-values
```
import 'react-native-get-random-values';
import { nanoid } from 'nanoid/non-secure';
```

# zod validation
$ npm i zod zod-validation-error
```
import {z} from 'zod'
import {fromZodError} from 'zod-validation-error'
```