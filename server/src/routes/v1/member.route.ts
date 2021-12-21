import { Router } from "express";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPEROLE } from "../../constants";
import { MemberController } from "../../controllers";
import { validate, Authenticate } from "../../middlewares";
import { MemberValidation } from "../../validations";

@injectable()
class MemberRoute {
    public router: Router;

    constructor(
        @inject("MemberController") private readonly _memberController: MemberController,
        @inject("MemberValidation") private readonly _memberValidation: MemberValidation,
        @inject("Authenticate") private readonly _authenticate: Authenticate,
    ) {
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
            this._authenticate.courseAuthentication(...Object.values(TYPEROLE)),
            validate(this._memberValidation.getRoleMember()),
            this._memberController.getRoleMember,
        )

        this.router.get(
            "/all/:courseId",
            this._authenticate.authenticate(),
            this._authenticate.courseAuthentication(...Object.values(TYPEROLE)),
            validate(this._memberValidation.getAllSummaryMember()),
            this._memberController.getAllSummaryMember
        );
        this.router.post(
            "/invite/:courseId",
            this._authenticate.authenticate(),
            validate(this._memberValidation.inviteMemberByEmail()),
            this._authenticate.courseAuthentication(TYPEROLE.TEACHER, TYPEROLE.ASSISTANT),
            this._memberController.inviteMemberByEmail
        );

        this.router.patch(
            "/update/:courseId/:userId",
            this._authenticate.authenticate(),
            validate(this._memberValidation.deleteMember()),
            this._authenticate.courseAuthentication(TYPEROLE.TEACHER),
            this._memberController.updateStateMember
        )

        this.router.post(
            "/course/:courseId/import-student-list",
            // this._authenticate.authenticate(),
            // this._authenticate.courseAuthentication(TYPEROLE.TEACHER),
            validate(this._memberValidation.importStudentList),
            this._memberController.importAuthMember
        )
    }
}

export default MemberRoute;