import { Database, Entity } from "fakebase";

interface User extends Entity {
  id: string, 
  name: string;
  description: string;
}

const db = new Database("./db/data");

export const Users = db.table<User>("users");
