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

## Loading data into the database

**Step 1: delete the data (clear the database)**

```
admin/bin/delete-data.js [database_url] --delete
or
admin/bin/delete-data.js --database-from-env --delete
```

This command clears the database entirely and is the essential first step of the data injest process.

If `--database-from-env` is specified, the DATABASE environment variable (from .env) will be used for the database url.

**Step 2: format and load data into database**

```
admin/bin/format-and-load-data.js [data_directory] [database_url]
or
admin/bin/format-and-load-data.js [data_directory] --database-from-env
```

Assigns ids, formats, and injests raw data from the spikeforest pipeline into the website for visualization. Raw data files for injest should be stored in a local copy of the `data/rawData` folder with capitalized titles before running this command. After injest is complete, this script automatically deletes temp files generated in the process as well as the rawData files. 

If `--database-from-env` is specified, the DATABASE environment variable (from .env) will be used for the database url.

## Authors

- **Liz Lovero** - [elovero](https://github.com/elovero)

## Acknowledgments

This site was bootstrapped with [Create React App](https://facebook.github.io/create-react-app/docs/getting-started).

Thanks to the following:

- [Lenny](https://www.instagram.com/lillenlen/) for canine awesomeness
