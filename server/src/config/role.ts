import { TYPEROLE } from "../constants";
export const roles = [ TYPEROLE.STUDENT,TYPEROLE.ASSISTANT, TYPEROLE.TEACHER];

//Add url need to use
const roleRight = new Map();
roleRight.set(roles[0], []);
roleRight.set(roles[1], []);
roleRight.set(roles[2], ["inviteMemberByEmail"]);

export const roleRights = roleRight;