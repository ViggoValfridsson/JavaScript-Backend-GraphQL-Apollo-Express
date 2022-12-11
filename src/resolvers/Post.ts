import { Users } from "../../db/database";

interface PostParentType {
  authorId: string;
}

export const Post = {
  user: async (parent: PostParentType) => {
   return await Users.findById(parent.authorId);
  },
};
