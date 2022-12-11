import { Users, Posts } from "../../db/database";

export const Query = {
  users: async () => {
    return await Users.findAll();
  },
  posts: async () => {
    return await Posts.findAll();
  },
  user: async (_: any, {id}: {id: string}) => {
    return await Users.findById(id);
  },
  post: async (_: any, {id}: {id: string}) => {
    return await Posts.findById(id);
  },
};
