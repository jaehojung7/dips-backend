import prisma from "../../prisma";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createRecord: protectedResolver(
      async (
        _,
        { title, description, baseProgramId, baseWorkoutIndex },
        { loggedInUser }
      ) => {
        try {
          const newRecord = await prisma.record.create({
            data: {
              title,
              description,
              baseProgramId,
              baseWorkoutIndex,
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
            },
          });
          return {
            ok: true,
            id: newRecord.id,
          };
        } catch (e) {
          return {
            ok: false,
            error: "운동 기록을 저장할 수 없습니다.",
          };
        }
      }
    ),
  },
};
