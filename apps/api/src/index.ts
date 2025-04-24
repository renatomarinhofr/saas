import { defineAbilityFor } from "@saas/auth";

const ability = defineAbilityFor({ role: "MEMBER" });
const userCanInviteSomoneElse = ability.can("invite", "User");
const userCanDeleteOtherUsers = ability.can("delete", "User");

const userCannotDeleteOtherUsers = ability.cannot("delete", "User");

console.log(userCannotDeleteOtherUsers);
console.log(userCanDeleteOtherUsers);
console.log(userCanInviteSomoneElse);
