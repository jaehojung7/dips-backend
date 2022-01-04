import prisma from "../../prisma";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createTemplate: protectedResolver(
      async (_, { programId, title }, { loggedInUser }) => {
        const existingProgram = await prisma.program.findUnique({
          where: {
            id: programId,
          },
          select: {
            id: true,
          },
        });
        if (!existingProgram) {
          return {
            ok: false,
            error: "프로그램을 찾을 수 없습니다.",
          };
        }
        const newTemplate = await prisma.template.create({
          data: {
            title,
            program: {
              connect: {
                id: programId,
              },
            },
            // Let's think about if a template has to be connected to a user
            // In this case, Prisma model has to be updated as well
            // user: {
            //   connect: {
            //     id: loggedInUser.id,
            //   },
            // },
          },
        });
        return {
          ok: true,
          id: newTemplate.id,
        };
      }
    ),
  },
};
