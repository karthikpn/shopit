import bcrypt from "bcryptjs";

const users = [
  {
    name: "Karthik",
    email: "karthik@ex.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Ronaldo",
    email: "ronny@ex.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Messi",
    email: "messi@ex.com",
    password: bcrypt.hashSync("123456", 10),
  },
];
export default users;
