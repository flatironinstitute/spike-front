# Spikeforest

Benchmarking of spike sorting algorithms. Seeing the spike forest for the trees.

## Available Scripts

To install software and packages, you can run:

### `yarn install`

To start both the client and backend for local development, you can run:

### `yarn dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn blowitallaway`

This command clears the database entirely.

### `yarn clean`

This command will clean and injest raw data from the pipeline.

_To function properly, this command has two requirements:_

1. Data files for injest is stored in the `data/rawData` folder with capitalized titles.

2. `data/cleanedData` contains either existing cleaned data jsons _or_ a json file for each model type with an all lowercase title. Each stub json file must contain at least a blank object.

## Authors

- **Liz Lovero** - [elovero](https://github.com/elovero)

## Acknowledgments

This site was bootstrapped with [Create React App](https://facebook.github.io/create-react-app/docs/getting-started).

Thanks to the following:

- [Lenny](https://www.instagram.com/lillenlen/) for canine awesomeness

## Remaining Questions

## Future ToDos
