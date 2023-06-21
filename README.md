# Overview
This program reads lightning strike data from stdin. It is required that each strike is delimited with a newline character ('\n'). 
An assets file location must be supplied to the program on startup. When starting, this program will; load asset file into memory, register a processing handler with stdin stream, and set an interval for dumping logs.

## Build
`npm run build` will build the program and output the build to the `dist` folder

## Run
From your terminal in the project directory run `npm run build:start`. This will build the program and pipe the data from lightning.json to the node script. 

You can also pipe data in from a file by running `cat lightning.json | node dist/src/index.js -a ./assets.json` or use `npm run start:pipe` to use the provided data. 

There is also an integration test that will run using the lightning.json and assets.json provided with the assignment, that can be run using the command `npm run test:integration`. 

## Questions
### What is the time complexity for determining if a strike has occurred for a particular asset? 
The lookup to retrieve an asset uses a map using the quadkey as id, which results in an O(1) lookup time. This results in a O(n) runtime for each data frame, which is a collection of strikes.
### If we put this code into production, but found it too slow, or it needed to scale to many more users or more frequent strikes, what are the first things you would think of to speed it up? 
First I would create a minified bundle which would help with node runtime speeds. If that wasn't enough, I would look into ways of running multiple nodes in parallel.

## Considerations
Areas that I would have clarified if I had access to stakeholders
- What is the lifecycle of the program?
- Can it be assumed that lightning strikes are delimited with a new line character?
- Should we be re-logging an alert for a given <assetOwner>:<assetName> after a certain amount of time has passed?
- Where should errors be logged?
- What should happen if an asset isn't found for a given quadkey?
