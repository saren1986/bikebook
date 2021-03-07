const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type User {
    id: ID!,
    email: String!, 
    username: String!,
    stravaId: Int,
    stravaAccessToken: String,
    stravaRefresToken: String,
    stravaExpiresAt: Int,
    stravaExpiresIn: Int,
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
    stravaId: String
    stravaSync: Boolean
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
    bikes(strava: Int!): [Bike]!
    bikeTypes: [BikeType],
    user: User!,
  }
  schema {
    query: Query
    mutation: Mutation
  }
`);