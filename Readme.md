# Volato Coding Challenge

## Description
Create a React Native app, able to run on the iOS and Android devices, that accepts a fully dynamic data model, displays a UI based on that data model, and performs the tasks defined by the data model.
Your app should provide a drop-down list to select which data model to use, where each data model is defined by a local JSON file (including a human-readable name). Upon selecting a named model, the main interface should display a set of UI elements to do the following:
• Allow users to input scalar values for fields as defined in the data model
• Display calculated values based on user input as defined by the data model
An example of a simple data model that accepts 2 numbers and adds them together is:
```
{
     “name”: “X + Y”,
     “fields”: {
        “x”: {
            “label”: “X”,
            “type”: “int”,
            “readOnly”: false,
            “calculate”: null
        }, “y”: {
            “label”: “Y”,
            “type”: “int”,
            “readOnly”: false,
            “calculate”: null
        }, “sum”: {
            “label”: “Sum”,
            “type”: “int”,
            “readOnly”: true,
            “calculate”: “x + y”
        }, 
    }
}
```

### Data Model 1
The first data model should define 2 fields string fields as input and 1 output field representing a SHA256 hash of the two input strings such that all unique combinations of string 1 and string 2 yields a unique hash. NOTE: You cannot create a unique hash by simply concatenating the strings and calling the sha256() function.
### Data Model 2
The second data model should define 10 number fields as input, and 3 output fields as defined below:

1. Mean of the 10 input values
2. Median of the 10 input values
3. Standard deviation of the 10 input values
## Briefings of delivery
- Selection of data model - DONE
- Allow users to input scalar values for fields as defined in the data model - DONE
-  Display calculated values based on user input as defined by the data model - DONE
- Evaluation of calulation logic from JSON string - DONE

### Data Model 2 JSON implementation
- 2 input and 1 output  defintions & presentation - DONE
- SHA256 calcuation with 2 string fields - DONE
```
{
    "name": "String Hash",
    "fields": {
        "string1": {
            "label": "String 1",
            "type": "string",
            "readOnly": false,
            "calculate": null
        },
        "string2": {
            "label": "String 2",
            "type": "string",
            "readOnly": false,
            "calculate": null
        },
        "hash": {
            "label": "Hash",
            "type": "string",
            "readOnly": true,
            "calculate": "(ctx) => { return ctx.CryptoJS.SHA256(string1 + '|' + string2).toString();}"
        }
    }
}
```
### Data Model 2 implementation
- 10 inputs of number defintion & presentation - DONE
- Mean, Median, Standard Deviation Calculation - DONE

#### Data Model 2 JSON
```
{
    "name": "Standard Deviation",
    "fields": {
      "input1": {
        "label": "Input 1",
        "type": "number",
        "readOnly": false,
        "calculate": null
      },
      "input2": {
        "label": "Input 2",
        "type": "number",
        "readOnly": false,
        "calculate": null
      },
      "input3": {
        "label": "Input 3",
        "type": "number",
        "readOnly": false,
        "calculate": null
      },
      "input4": {
        "label": "Input 4",
        "type": "number",
        "readOnly": false,
        "calculate": null
      },
      "input5": {
        "label": "Input 5",
        "type": "number",
        "readOnly": false,
        "calculate": null
      },
      "input6": {
        "label": "Input 6",
        "type": "number",
        "readOnly": false,
        "calculate": null
      },
      "input7": {
        "label": "Input 7",
        "type": "number",
        "readOnly": false,
        "calculate": null
      },
      "input8": {
        "label": "Input 8",
        "type": "number",
        "readOnly": false,
        "calculate": null
      },
      "input9": {
        "label": "Input 9",
        "type": "number",
        "readOnly": false,
        "calculate": null
      },
      "input10": {
        "label": "Input 10",
        "type": "number",
        "readOnly": false,
        "calculate": null
      },
      "mean": {
        "label": "Mean",
        "type": "number",
        "readOnly": true,
        "calculate": "(input1 + input2 + input3 + input4 + input5 + input6 + input7 + input8 + input9 + input10) / 10"
      },

      "median": {
        "label": "Median",
        "type": "number",
        "readOnly": true,
        "calculate": "()=>{const arr = [input1, input2, input3, input4, input5, input6, input7, input8, input9, input10]; const {length} = arr; arr.sort((a, b)=>a-b); return length % 2 === 0 ? ((arr[length / 2 - 1] + arr[length / 2]) / 2) : arr[(length - 1) / 2]}"
      },

      "stdDeviation": {
        "label": "Standard Deviation",
        "type": "number",
        "readOnly": true,
        "calculate": "Math.sqrt((Math.pow(input1 - mean, 2) + Math.pow(input2 - mean, 2) + Math.pow(input3 - mean, 2) + Math.pow(input4 - mean, 2) + Math.pow(input5 - mean, 2) + Math.pow(input6 - mean, 2) + Math.pow(input7 - mean, 2) + Math.pow(input8 - mean, 2) + Math.pow(input9 - mean, 2) + Math.pow(input10 - mean, 2)) / 10)"
      }
    }
  }
```


# Installation
## Available Scripts
### `npm install` or `yarn`
It will add all the required components for your project to run inside your node_modules.


### Install Pods for iOS
### `npx pod-install`
It will install all of pods files required for your project.


## Link Components
### npx react-native link
It will do link components and resources like fonts

## Running app in Android or iOS
In the project directory, you can run:
### `npx react-native run-android` or `npx react-native run-ios`
### OR
### `react-native run-android` or `react-native run-ios`
Runs the app in development mode.<br>
On android emulator or ios simulator.
The page will automatically reload if you make changes to the code.<br>
You will see the build errors and lint warnings in the console.

### User Guide
You can find detailed instructions on using React Native and many tips in [its documentation](https://reactnative.dev/docs/getting-started).

#### Commands to run the iOS version on Mac

Requirements:

pod --version => >= 1.10.1

yarn -v => >= 1.22.4

node -v => >= v14.0.0

XCode + Simulator installed

Then run in the root directory:
```
yarn

yarn react-native link

npx pod-install

npx react-native run-ios
```

#### Commands to build of iOS Release version
```
yarn install
yarn react-native link
npx pod-install
yarn run build:ios
```
and archive build in XCode

#### Commands to run the Android version on Windows
```
yarn install --check-files
react-native run-android
```

#### Commands to build Android Release version
```
yarn install
npx jetify
yarn react-native link

cd android/
gradlew assembleRelease
```