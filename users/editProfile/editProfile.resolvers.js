import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        { username, email, password: newPassword },
        { loggedInUser }
      ) => {
        let encryptedPassword = null;
        if (newPassword) {
          encryptedPassword = await bcrypt.hash(newPassword, 10);
        }
        const updatedUser = await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            username,
            email,
            ...(encryptedPassword && { password: encryptedPassword }),
          },
        });
        if (updatedUser.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "프로필 변경이 실패하였습니다.",
          };
        }
      }
    ),
  },
};
