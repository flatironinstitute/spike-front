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

At the top of each Schema file are notes about the implementation or contents of the Schema as well as an example object that demonstrates how the data could be formatted to be injested as a JSON.
Relationships between the items are indicated through related foreign keys, called here mongoose.Schema.ObjectId.

ObjectId's are presented as strings in the example for readability.
