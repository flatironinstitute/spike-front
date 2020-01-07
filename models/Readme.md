# Data Structure

The spike-front data structure is built on a MongoDB database and skinned on the front end with Mongoose ODM.

Basics on Mongoose can be found [here](https://mongoosejs.com/docs/index.html).

## Defining the Schema

Everything in Mongoose starts with a Schema. Each Schema maps to a MongoDB collection and defines the shape of the documents within that collection. There are 8 Schemas in this application:

- Algorithm
- General
- Newspost
- Sorter
- Sorting Result
- Study Analysis Result
- Study Set

Some schemas include virtual properties and static functions. The virtual properties provide calculated metrics and populate db relationship data. The static functions organize data results for the visualizations.
