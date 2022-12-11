import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    users: [User!]!
    posts: [Post!]!
    post(id: ID!): Post
    user(id: ID!): User
  }

  type Mutation {
    userCreate(user: UserInput!): UserPayload!
    userUpdate(id: ID!, user: UserInput!): UserPayload!
    userDelete(id: ID!): UserPayload!
    postCreate(post: PostInput!): PostPayload!
  }

  type User {
    id: ID!
    name: String!
    description: String!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    user: User!
  }

  type UserPayload {
    userErrors: [UserError!]!
    user: User
  }

  type PostPayload {
    userErrors: [UserError!]!
    post: Post
  }

  type UserError {
    message: String!
  }

  input UserInput {
    name: String
    description: String
  }

  input PostInput {
    title: String
    content: String
    authorId: String
  }
`;
