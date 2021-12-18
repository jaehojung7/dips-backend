import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";

export default {
  Mutation: {
    login: async (_, { email, password }) => {
      // Find a user with the entered email
      const user = await client.user.findFirst({ where: { email } });
      if (!user) {
        return {
          ok: false,
          error: "이메일이 존재하지 않습니다.",
        };
      }

      // Check if password is correct
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: "패스워드가 일치하지 않습니다.",
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
