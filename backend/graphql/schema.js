const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type User {
    id: ID!,
    email: String!, 
  }
  input BikeTypeInput {
    type: String!
    label: String!
  }
  type BikeType {
    id: ID!
    type: String!
    label: String!
    createdAt: String
    updatedAt: String
  }
  type Bike {
    id: ID!
    strava: String
    name: String
    distance: Int
    type: BikeType
    weight: Int
    brand: String
    model: String
    description: String
    startDate: String
    retired: Boolean
    user: User
    createdAt: String
    updatedAt: String
  }
  input createBikeInput {
    name: String!
    distance: Int!
    model: String
    type: ID!
    weight: Int
    brand: String
    description: String
    startDate: String
  }
  type Mutation {
    createBike(data: createBikeInput!): Bike!
    createBikeType(data: BikeTypeInput!): BikeType!
  }
  type Query{
    bikes: [Bike]!
    bikeTypes: [BikeType]
  }
  schema {
    query: Query
    mutation: Mutation
  }
`);