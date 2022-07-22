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
          // Create a string for today's date
          const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
          const today = new Date();
          const dd = String(today.getDate()).padStart(2, "0");
          const mm = String(today.getMonth() + 1).padStart(2, "0");
          const yyyy = today.getFullYear();
          const day = weekday[today.getDay()];
          const date = yyyy + "-" + mm + "-" + dd + " " + day;

          const newRecord = await prisma.record.create({
            data: {
              title,
              date,
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
            error: "Cannot save record.",
          };
        }
      }
    ),
  },
};
