import "reflect-metadata";
import {Router} from "express";
import { MemberController } from "../../controllers";
import { inject, injectable } from "inversify";
import { MemberValidation } from "../../validations";
import { Authenticate, validate } from "../../middlewares";
import { TYPEROLE } from "../../constants";

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
            "/upsert", 
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
        
        this.router.get(
            "/all/:courseId",
            this._authenticate.authenticate(),
            validate(this._memberValidation.getAllSummaryMember()),
            this._memberController.getAllSummaryMember
        );
        this.router.post(
            "/invite/:courseId",
            this._authenticate.authenticate(),
            validate(this._memberValidation.inviteMemberByEmail()),
            this._authenticate.courseAuthentication(TYPEROLE.TEACHER, TYPEROLE.ASSISTANT),
            this._memberController.inviteMemberByEmail
        )
    }
}

export default MemberRoute;