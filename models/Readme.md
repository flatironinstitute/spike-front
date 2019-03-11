# Data Structure

The spike-front data structure is built on a MongoDB database and skinned on the front end with Mongoose ODM.

Basics on Mongoose can be found [here](https://mongoosejs.com/docs/index.html).

## Defining the Schema

Everything in Mongoose starts with a Schema. Each Schema maps to a MongoDB collection and defines the shape of the documents within that collection. There are 6 Schemas in this application:

- Study Set
- Study
- Recording
- True Unit
- Unit Result
- Sorter

Relationships between the items are indicated through related foreign keys, called here Schema.Types.ObjectId.
The example objects provided at the top of each Schema demonstrate how the data can be formatted to be injested as a JSON.
