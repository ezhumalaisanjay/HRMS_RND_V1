import { array, boolean, object, string } from "zod";
import { pkModules, skModules } from "~/db/dbModule";

const employeeInfoValidation = object({
  pk: string().default(pkModules.employee),
  sk: string().startsWith(skModules.employee),
  organization: string(),
  email: string().email(),
  username: string(),
});

const employeeGeneralInfoValidation = object({
  pk: string().default(pkModules.employee),
  sk: string().startsWith(skModules.employee),
  generalInfo: object({
    name: string(),
    contact: string(),
    address: string(),
  }),
});

const employeeEducationDetailsValidation = object({
  pk: string().default(pkModules.employee),
  sk: string().startsWith(skModules.employee),
  educationDetails: array(
    object({
      institution: string(),
      degree: string(),
      startDate: string().date(),
      endDate: string().date(),
      isPursuing: boolean(),
    }),
  ),
});

const employeeWorkExperienceValidation = object({
  pk: string().default(pkModules.employee),
  sk: string().startsWith(skModules.employee),
  workExperience: array(
    object({
      company: string(),
      designation: string(),
      startDate: string().date(),
      endDate: string().date(),
      isCurrent: boolean(),
    }),
  ),
});

const employeeSkillsValidation = object({
  pk: string().default(pkModules.employee),
  sk: string().startsWith(skModules.employee),
  skills: array(
    object({
      skill: string(),
    }),
  ),
});

export {
  employeeInfoValidation,
  employeeGeneralInfoValidation,
  employeeEducationDetailsValidation,
  employeeWorkExperienceValidation,
  employeeSkillsValidation,
};
