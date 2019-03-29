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

## Adding New Data

### `yarn blowitallaway`

This command clears the database entirely and is the essential first step of the data injest process. 

### `yarn cleanthenload`

Assigns ids, formats, and injests raw data from the spikeforest pipeline into the website for visualization. Raw data files for injest should be stored in a local copy of the `data/rawData` folder with capitalized titles before running this command. After injest is complete, this script automatically deletes temp files generated in the process as well as the rawData files. 

## Authors

- **Liz Lovero** - [elovero](https://github.com/elovero)

## Acknowledgments

This site was bootstrapped with [Create React App](https://facebook.github.io/create-react-app/docs/getting-started).

Thanks to the following:

- [Lenny](https://www.instagram.com/lillenlen/) for canine awesomeness
