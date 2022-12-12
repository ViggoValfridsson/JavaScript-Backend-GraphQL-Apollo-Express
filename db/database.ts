import { Database, Entity } from "fakebase";

interface User extends Entity {
  id: string;
  name: string;
  description: string;
}

interface Posts extends Entity {
  id: string;
  title: string;
  content: string;
  authorId: string;
}

const db = new Database("./db/data");

export const Users = db.table<User>("users");
export const Posts = db.table<Posts>("posts");
