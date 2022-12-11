import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    users: [User!]!
    posts: [Post!]!
    post(id: ID!): Post
    user(id: ID!): User
  }

  type User {
    id: ID!,
    name: String!,
    description: String!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    user: User!
  }
`;
