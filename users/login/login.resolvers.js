import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../prisma";

export default {
  Mutation: {
    login: async (_, { email, password }) => {
      // Find a user with the entered email
      const user = await prisma.user.findFirst({ where: { email } });
      if (!user) {
        return {
          ok: false,
          error: "Account does not exist.",
        };
      }

      // Check if password is correct
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: "Password is not correct.",
        };
      }

      // Issue a token with user ID and our secret key
      const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      return {
        ok: true,
        token,
      };
    },
  },
};
