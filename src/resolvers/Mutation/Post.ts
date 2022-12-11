import { Posts } from "../../../db/database";

interface PostArgs {
  post: {
    title?: string;
    content?: string;
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

export const postResolvers = {

};
