import bcrypt from "bcrypt";
import prisma from "../../prisma";
import { protectedResolver } from "../users.utils";
import { uploadToS3 } from "../../common/common.utils";

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        { username, email, password: newPassword, avatar },
        { loggedInUser }
      ) => {
        // Upload photo to AWS S3 and get URL
        let avatarUrl = null;
        if (avatar) {
          avatarUrl = await uploadToS3(avatar, loggedInUser.id, "avatars");
        }

        // Encrypted password
        let encryptedPassword = null;
        if (newPassword) {
          encryptedPassword = await bcrypt.hash(newPassword, 10);
        }

        const updatedUser = await prisma.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            username,
            email,
            ...(encryptedPassword && { password: encryptedPassword }),
            ...(avatarUrl && { avatar: avatarUrl }),
          },
        });
        if (updatedUser.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Cannot update profile.",
          };
        }
      }
    ),
  },
};
