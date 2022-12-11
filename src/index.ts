import { Users } from "../db/database";

async function testBase() {
  const newUser = await Users.create({
    name: "Viggo",
    description: "Yee",
  });
}

testBase();
