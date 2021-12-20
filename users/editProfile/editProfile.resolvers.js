import bcrypt from "bcrypt";
import client from "../../client";
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

        console.log(avatarUrl);
        const updatedUser = await client.user.update({
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
            error: "프로필 변경이 실패하였습니다.",
          };
        }
      }
    ),
  },
};
