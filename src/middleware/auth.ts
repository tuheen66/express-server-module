import { NextFunction, Request, Response } from "express";
import config from "../config";
import jwt, { JwtPayload } from "jsonwebtoken";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // console.log({ authToken: token });

    try {
      if (!token) {
        return res.status(500).json({ message: " Your are not authorized" });
      }

      const decoded = jwt.verify(
        token,
        config.jwtSecret as string,
      ) as JwtPayload;
      //! make change in express namespace "type/express/index.ts" to add user type in Request type"
      req.user = decoded; //? to access user from everywhere through req.uer

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(500).json({
          success: false,
          error: "Unauthorized",
        });
      }
      console.log({ decoded });

      next();
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };
};

export default auth;
