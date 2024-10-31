import { number, object, string } from "zod";
import { pkModules, skModules } from "~/db/dbModule";

export const organizationMutationValidation = object({
  pk: string().default(pkModules.organization),
  sk: string().startsWith(skModules.organization),
  name: string(),
  description: string(),
  registeredMail: string(),
  registeredPhone: string(),
  licenseStartsAt: string().date(),
  licenseDuration: number(),
});

export const organizationGetQueryValidation = object({
  pk: string().default(pkModules.organization),
  sk: string().startsWith(skModules.organization),
});

export const organizationListQueryValidation = object({
  pk: string().default(pkModules.organization),
});
