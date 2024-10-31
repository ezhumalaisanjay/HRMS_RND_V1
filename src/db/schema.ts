import { model, Schema } from "dynamoose";
import ddb from "dynamoose/dist/aws/ddb";

const organizationSchema = new Schema({
  pk: { type: String, hashKey: true, default: "OrganizationProfile" },
  sk: { type: String, rangeKey: true },
  name: { type: String, required: true },
  description: { type: String },
  licenseStartsAt: { type: String, required: true },
  licenseDuration: { type: Number, required: true },
  registeredPhone: { type: String },
  registeredMail: { type: String },
});

const employeeSchema = new Schema(
  {
    pk: { type: String, hashKey: true, default: () => "EmployeeProfile" },
    sk: {
      type: String,
      rangeKey: true,
    },
    organization: { type: String },
    email: { type: String, required: true }, // Ensure email is required
    username: { type: String, required: true }, // Ensure username is required
    generalInfo: {
      type: Object,
      schema: {
        name: { type: String, required: true }, // Make name required
        contact: { type: String },
        address: { type: String },
      },
    },
    educationDetails: {
      type: Array,
      schema: [
        {
          type: Object,
          schema: {
            degree: { type: String, required: true },
            institution: { type: String },
            startDate: { type: String }, // Dates as strings (ISO format)
            endDate: { type: String },
            isPursuing: { type: Boolean, default: false },
          },
        },
      ],
    },
    workExperience: {
      type: Array,
      schema: [
        {
          type: Object,
          schema: {
            company: { type: String, required: true }, // Make company required
            designation: { type: String },
            startDate: { type: String }, // Use ISO date string format
            endDate: { type: String },
            isCurrent: { type: Boolean, default: false },
          },
        },
      ],
    },
    skills: {
      type: Array,
      schema: [String],
    },
    points: {
      type: Object,
      schema: {
        profile: { type: Number, default: 0 },
        leaves: { type: Number, default: 0 },
      },
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  },
);

const leavePolicySchema = new Schema(
  {
    pk: { type: String, hashKey: true, default: () => "LeavePolicy" },
    sk: {
      type: String,
      rangeKey: true,
    },
    organization: { type: String },
    name: { type: String, required: true }, // Name is required
    description: { type: String },
    unit: { type: String, default: "days" }, // Default to "days" for unit
    paid: { type: Boolean, default: false },
    accural: {
      type: Object,
      schema: {
        frequency: { type: String, default: "Monthly" }, // Default accrual frequency
        accrualRate: { type: Number, default: 1 }, // Default accrual rate
        maxAccrual: { type: Number },
        proratedAccural: { type: Boolean, default: false }, // Default prorated accrual
      },
    },
    carryForward: {
      type: Object,
      schema: {
        allowed: { type: Boolean, default: false },
        maxDays: { type: Number, default: 0 }, // Default to 0 if carry forward not allowed
        expiryPeriod: { type: Number },
      },
    },
    eligibilityCriteria: { type: String },
    includeHolidays: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const leaveEntitlementSchema = new Schema(
  {
    pk: { type: String, hashKey: true }, // e.g., "EMP#123"
    sk: { type: String, rangeKey: true }, // e.g., "LEAVE#001"
    leavePolicyId: { type: String, required: true }, // Leave policy ID
    leavePolicyName: { type: String }, // General Leave, Sick Leave, etc.
    initialLeaves: { type: Number, required: true },
    usedLeaves: { type: Number, default: 0 },
    balance: {
      type: Number,
    },
    year: {
      type: Number,
    },
    organization: { type: String },
  },
  {
    timestamps: true,
  },
);

export const orgModel = model("hrms-table", organizationSchema);
export const employeeModel = model("hrms-table", employeeSchema);
export const leavePolicyModel = model("hrms-table", leavePolicySchema);
export const leaveEntitlementModel = model(
  "hrms-table",
  leaveEntitlementSchema,
);
