import { orgModel } from "~/db/schema";

const createOrganization = async (data: {
  name: string;
  description: string;
  licenseStartsAt: string;
  licenseDuration: number;
  registeredMail: string;
}) => {
  try {
    const organization = await orgModel.Model.create({
      ...data,
      sk: "ORG#1",
    });
    await organization.save();

    return "Success";
  } catch (error) {
    throw error;
  }
};

const listOrganization = async () => {
  try {
    const response = await orgModel
      .query("pk")
      .eq("OrganizationProfile")
      .exec();
    return response;
  } catch (error) {
    throw error;
  }
};

const getOrganization = async (sk: string) => {
  try {
    const response = await orgModel.get({
      pk: "OrganizationProfile",
      sk,
    });
    if (response) return response;
    else throw new Error("Org not found");
  } catch (error) {
    throw error;
  }
};

const deleteOrg = async (sk: string) => {
  try {
    const response = await orgModel.get({
      pk: "OrganizationProfile",
      sk,
    });
    if (response) {
      await response.delete();
      return "Success";
    } else throw new Error("Org not found");
  } catch (error) {
    throw error;
  }
};

const updateOrganization = async (
  data: {
    name: string;
    description: string;
    licenseStartsAt: string;
    licenseDuration: number;
    registeredMail: string;
  },
  sk: string,
) => {
  try {
    const controlledData = { ...data };
    const response = await orgModel.update(
      { pk: "OrganizationProfile", sk },
      {
        ...controlledData,
      },
    );
    console.log(response);

    return "success";
  } catch (error) {
    throw error;
  }
};
export {
  createOrganization,
  listOrganization,
  getOrganization,
  deleteOrg,
  updateOrganization,
};
