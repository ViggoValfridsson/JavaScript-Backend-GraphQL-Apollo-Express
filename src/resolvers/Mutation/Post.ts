import { Posts, Users } from "../../../db/database";

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
  postUpdate: async (_: any, { id, post }: { id: string; post: PostArgs["post"] }): Promise<PostPayloadType> => {
    const { title, content, authorId } = post;

    if (!title && !content && !authorId) {
      return {
        userErrors: [
          {
            message: "You must provide new information to update a post",
          },
        ],
        post: null,
      };
    }

    const postToUpdate = await Posts.findById(id);

    if (!postToUpdate) {
      return {
        userErrors: [
          {
            message: "Could not find post to update",
          },
        ],
        post: null,
      };
    }

    let updatePayload: any = {};

    if (title) {
      updatePayload.title = title;
    }
    if (content) {
      updatePayload.content = content;
    }
    if (authorId) {
      const newUser = await Users.findById(authorId);

      if (!newUser) {
        return {
          userErrors: [
            {
              message: "Could not find user",
            },
          ],
          post: null,
        };
      }

      updatePayload.authorId = authorId;
    }

    return {
      userErrors: [],
      post: await Posts.update({
        ...postToUpdate,
        ...updatePayload,
      }),
    };
  },
  postDelete: async (_: any, { id }: { id: string }): Promise<PostPayloadType> => {
    const post = await Posts.findById(id);

    if (!post) {
      return {
        userErrors: [
          {
            message: "Could not find post, please provide a valid id.",
          },
        ],
        post: null,
      };
    }

    await Posts.delete(id);

    return {
      userErrors: [],
      post,
    };
  },
};
