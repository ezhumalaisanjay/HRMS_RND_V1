import { boolean, number, object, string } from "zod";
import { pkModules, skModules } from "~/db/dbModule";

const leavePolicyInfoValidation = object({
  pk: string().default(pkModules.leavePolicy),
  sk: string().startsWith(skModules.leavePolicy),
  organization: string().startsWith(skModules.organization),
  name: string(),
  unit: string(),
  paid: boolean(),
  eligibilityCriteria: string(),
  includeHolidays: boolean(),
});

const leavePolicyAccuralCarryForwardValidation = object({
  pk: string().default(pkModules.leavePolicy),
  sk: string().startsWith(skModules.leavePolicy),
  carryForward: object({
    allowed: boolean(),
    maxDays: number(),
    expiryPeriod: number(),
  }),
  accural: object({
    frequency: string(),
    accuralRate: number(),
    maxAccural: number(),
    proratedAccural: boolean(),
  }),
});

export { leavePolicyInfoValidation, leavePolicyAccuralCarryForwardValidation };
