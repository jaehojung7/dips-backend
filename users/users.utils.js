import jwt from "jsonwebtoken";
import client from "../client";

// Function that returns the user, to whom the token has been issued
export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const { id } = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await client.user.findUnique({ where: { id } });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

// Function that protects a resolver from invalid users
export const protectedResolver =
  (myResolver) => (root, args, context, info) => {
    if (!context.loggedInUser) {
      const query = info.operation.operation === "query";
      if (query) {
        return null;
      } else {
        return {
          ok: false,
          error: "로그인이 필요합니다.",
        };
      }
    }
    return myResolver(root, args, context, info);
  };
