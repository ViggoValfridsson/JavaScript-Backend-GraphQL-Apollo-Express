import { Users } from "../../../db/database";

interface UserArgs {
  user: {
    name: string;
    description: string;
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

    const newUser = await Users.create({
      name,
      description,
    });

    if (!newUser) {
      return {
        userErrors: [
          {
            message: "Incorrect input data",
          },
        ],
        user: null,
      };
    }

    console.log(newUser);

    return {
      userErrors: [],
      user: newUser,
    };
  },
};
