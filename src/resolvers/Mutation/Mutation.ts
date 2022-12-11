import { userResolvers } from "./User";
import { postResolvers } from "./Post";

export const Mutation = {
  ...userResolvers,
  ...postResolvers,
};
