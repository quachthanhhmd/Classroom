import "reflect-metadata";
import {Router} from "express";
import { MemberController } from "../../controllers";
import { inject, injectable } from "inversify";
import { MemberValidation } from "../../validations";
import { Authenticate, validate } from "../../middlewares";

@injectable()
class MemberRoute {
    public router: Router;    

    constructor(
        @inject("MemberController") private readonly _memberController: MemberController,
        @inject("MemberValidation") private readonly _memberValidation: MemberValidation,
        @inject("Authenticate") private readonly _authenticate: Authenticate,
    ){
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            "/upsertId", 
            this._authenticate.authenticate(),
            validate(this._memberValidation.UpsertStudentId()), 
            this._memberController.upsertStudentId,
        )

        this.router.get(
            "/:courseId",
            this._authenticate.authenticate(),
            validate(this._memberValidation.getRoleMember()),
            this._memberController.getRoleMember,
        )
    }
}

export default MemberRoute;