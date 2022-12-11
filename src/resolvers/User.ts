import { Posts } from "../../db/database";

interface UserParentType {
  id: string;
}

export const User = {
  posts: async (parent: UserParentType) => {
   return await Posts.findAll((post) => post.authorId === parent.id);
  },
};
