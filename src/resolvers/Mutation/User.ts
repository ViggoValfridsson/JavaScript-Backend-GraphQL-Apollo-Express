import { Users } from "../../../db/database";

interface UserArgs {
  user: {
    name?: string;
    description?: string;
  };
}

interface User {
  id: string;
  name: string;
  description: string;
}

interface UserPayloadType {
  userErrors: {
    message: string;
  }[];
  user: User | null;
}

export const userResolvers = {
  userCreate: async (_: any, { user }: UserArgs): Promise<UserPayloadType> => {
    const { name, description } = user;

    if (!name || !description) {
      return {
        userErrors: [
          {
            message: "You must provide both a name and description to create a user.",
          },
        ],
        user: null,
      };
    }

    const newUser = await Users.create({
      name,
      description,
    });

    return {
      userErrors: [],
      user: newUser,
    };
  },
  userUpdate: async (_: any, { user, id }: { user: UserArgs["user"]; id: string }): Promise<UserPayloadType> => {
    const { name, description } = user;

    if (!name && !description) {
      return {
        userErrors: [
          {
            message: "You must either provide a new name or description to update a user.",
          },
        ],
        user: null,
      };
    }

    const userToUpdate = await Users.findById(id);

    if (!userToUpdate) {
      return {
        userErrors: [
          {
            message: "Could not find user!",
          },
        ],
        user: null,
      };
    }

    let updatePayload: any = {};

    if (name) {
      updatePayload.name = name;
    }
    if (description) {
      updatePayload.description = description;
    }

    return {
      userErrors: [],
      user: await Users.update({
        ...userToUpdate,
        ...updatePayload,
      }),
    };
  },
  userDelete: async (_: any, { id }: { id: string }): Promise<UserPayloadType> => {
    const user = await Users.findById(id);

    if (!user) {
      return {
        userErrors: [
          {
            message: "Could not find user",
          },
        ],
        user: null,
      };
    }

    await Users.delete(id);

    return {
      userErrors: [],
      user: user,
    };
  },
};
