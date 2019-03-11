# Data Structure

The spike-front data structure is built on a MongoDB database and skinned on the front end with Mongoose ODM.

## Defining the schema

Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection. There are 6 schemas in this application:

- Study Set
- Study
- Recording
- True Unit
- Unit Result
- Sorter

Relationships between the items are indicated through related foreign keys, called here Schema.Types.ObjectId.
The examples provided at the top of each schema doc demonstrate the data format that could be injested as a json.
For injest, a single JSON representing each Schema is easily injested via the MongoDB commandline.
