import prisma from "../../prisma";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createTemplateSet: protectedResolver(
      async (
        _,
        { templateId, exercise, setCount, rir, recReps },
        { loggedInUser }
      ) => {
        const existingTemplate = await prisma.template.findUnique({
          where: {
            id: templateId,
          },
          select: {
            id: true,
          },
        });
        if (!existingTemplate) {
          return {
            ok: false,
            error: "템플릿을 찾을 수 없습니다.",
          };
        }
        const newTemplateSet = await prisma.templateSet.create({
          data: {
            template: {
              connect: {
                id: templateId,
              },
            },
            exercise,
            setCount,
            rir,
            recReps,
            // Let's think about if a templateSet has to be connected to a user
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
          id: newTemplateSet.id,
        };
      }
    ),
  },
};
