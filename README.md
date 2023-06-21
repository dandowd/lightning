# Overview
This program read lightning strike data from stdin. It is required that each strike is delimited with a newline character ('\n'). 
An assets file location must be supplied to the program on startup. When starting, this program will; load asset file into memory, register a processing handler with stdin stream, set an interval for processing data, and set an interval for dumping logs.

## How to run
From your terminal in the project directory first build the program `npm run build`. Once it has been built it can be run from the the dist folder `node dist/src/index.js -a ./assets.json`, once it has started lightning rows can be inserted by keyboard and once return is entered the row will be processed. You can also pipe data in from a file by running `cat lightning.json | node dist/src/index.js -a ./assets.json`. There is also an integration test that will run using the lightning.json and assets.json provided with the assignment, that can be run using the command `npm run test:integration`. 

## Considerations
Areas that I would have clarified with stakeholders
- What is the lifecycle of the program?
- Can it be assumed that lightning strikes are delimited with a new line character?
- Should we be re-logging an alert for a given <assetOwner>:<assetName> after a certain amount of time has passed?
- Where should errors be logged?
- What should happen if an asset isn't found for a given quadkey?
