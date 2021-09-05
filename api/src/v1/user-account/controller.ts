import { Request, Response } from "express";
import { UserAccount } from "../../models";
import { validationResult } from "express-validator";

export default class UserAccountController {
  public async addUserAccount(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const userAccount = await UserAccount.create({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        picture: req.body.picture,
        step: req.body.step
      });

      if (userAccount) {
        return res.json({
          success: true,
          data: userAccount
        });
      } 

      return res.json({
        success: false,
        errors: [{ msg: "Unable to create user-account" }],
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        errors: [{ msg: "Something went wrong. Please try again." }],
      });
    }
  }
}
