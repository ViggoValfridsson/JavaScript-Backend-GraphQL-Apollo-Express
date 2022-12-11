import { Posts, Users } from "../../../db/database";
import { User } from "../User";

interface PostArgs {
  post: {
    title?: string;
    content?: string;
    authorId?: string;
  };
}

interface Post {
  id: string;
  title: string;
  content: string;
}

interface PostPayloadType {
  userErrors: {
    message: string;
  }[];
  post: Post | null;
}

export const postResolvers = {
  postCreate: async (_: any, { post }: PostArgs): Promise<PostPayloadType> => {
    const { title, content, authorId } = post;

    if (!title || !content || !authorId) {
      return {
        userErrors: [
          {
            message: "You must provide title, content and author to create a post.",
          },
        ],
        post: null,
      };
    }

    const user = await Users.findById(authorId);

    if (!user) {
      return {
        userErrors: [
          {
            message: "Can't find user to connect to post.",
          },
        ],
        post: null,
      };
    }

    return {
      userErrors: [],
      post: await Posts.create({
        title,
        authorId,
        content,
      }),
    };
  },
};
