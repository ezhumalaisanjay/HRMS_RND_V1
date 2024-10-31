"use client";

import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Checkbox } from "~/components/ui/checkbox";

// Define interfaces for the form data
interface WorkExperience {
  companyName: string;
  jobTitle: string;
  fromDate: Date | null;
  toDate: Date | null;
  jobDescription: string;
  relevant: boolean;
}

interface Education {
  instituteName: string;
  degree: string;
  specialization: string;
  dateOfCompletion: Date | null;
}

interface Dependent {
  name: string;
  relationship: string;
  dateOfBirth: Date | null;
}

interface FormData {
  employeeId: string;
  nickName: string;
  firstName: string;
  lastName: string;
  email: string;
  division: string;
  department: string;
  location: string;
  designation: string;
  role: string;
  employmentType: string;
  employeeStatus: string;
  sourceOfHire: string;
  currentExperience: string;
  totalExperience: string;
}

// Main component
export function EmployeeFormWithSections() {
  const { register, handleSubmit } = useForm<FormData>();
  const [dob, setDOB] = React.useState<Date | null>(null);
  const [joiningDate, setJoiningDate] = React.useState<Date | null>(null);
  
  // State to manage work experience, education, and dependents
  const [workExperience, setWorkExperience] = React.useState<WorkExperience[]>([{
    companyName: "",
    jobTitle: "",
    fromDate: null,
    toDate: null,
    jobDescription: "",
    relevant: false,
  }]);
  const [education, setEducation] = React.useState<Education[]>([{
    instituteName: "",
    degree: "",
    specialization: "",
    dateOfCompletion: null,
  }]);
  const [dependents, setDependents] = React.useState<Dependent[]>([{
    name: "",
    relationship: "",
    dateOfBirth: null,
  }]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log({ ...data, workExperience, education, dependents });
  };

  // Handlers to add/remove fields dynamically
  const addWorkExperience = () => setWorkExperience([...workExperience, { companyName: "", jobTitle: "", fromDate: null, toDate: null, jobDescription: "", relevant: false }]);
  const removeWorkExperience = (index: number) => setWorkExperience(workExperience.filter((_, i) => i !== index));

  const addEducation = () => setEducation([...education, { instituteName: "", degree: "", specialization: "", dateOfCompletion: null }]);
  const removeEducation = (index: number) => setEducation(education.filter((_, i) => i !== index));

  const addDependent = () => setDependents([...dependents, { name: "", relationship: "", dateOfBirth: null }]);
  const removeDependent = (index: number) => setDependents(dependents.filter((_, i) => i !== index));

  return (
    
     <><aside className="sticky top-0 h-screen w-64 overflow-y-auto bg-gray-100 p-4">
      <h2 className="text-lg font-semibold mb-4">Navigation</h2>
      <ul className="space-y-2">
        <li><a href="#basic-info" className="hover:underline">Basic Information</a></li>
        <li><a href="#work-info" className="hover:underline">Work Information</a></li>
        <li><a href="#work-experience" className="hover:underline">Work Experience</a></li>
        <li><a href="#education" className="hover:underline">Education</a></li>
        <li><a href="#dependents" className="hover:underline">Dependents</a></li>
      </ul>
    </aside>
    <div className="w-full">
        <CardHeader>
          <CardTitle>Employee Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Basic Information */}
            <Card className="mb-4" id="basic-info">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-7">
                  <div className="flex flex-col">
                    <Label className="mb-2" htmlFor="employee-id">Employee ID</Label>
                    <Input id="employee-id" {...register("employeeId")} placeholder="Employee ID" />
                  </div>
                  <div className="flex flex-col">
                    <Label className="mb-2" htmlFor="nick-name">Nick Name</Label>
                    <Input id="nick-name" {...register("nickName")} placeholder="Nick Name" />
                  </div>
                  <div className="flex flex-col">
                    <Label className="mb-2" htmlFor="first-name">First Name</Label>
                    <Input id="first-name" {...register("firstName")} placeholder="First Name" />
                  </div>
                  <div className="flex flex-col">
                    <Label className="mb-2" htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" {...register("lastName")} placeholder="Last Name" />
                  </div>
                  <div className="flex flex-col">
                    <Label className="mb-2" htmlFor="email">Email Address</Label>
                    <Input id="email" {...register("email")} placeholder="Email Address" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>

              </CardFooter>
            </Card>





            {/* Work Information */}
            <Card className="mb-4" id="work-info">
              <CardHeader>
                <CardTitle>Work Information</CardTitle>
              </CardHeader>
              <CardContent>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-7">
                  <div className="flex flex-col">
                    <Label className="mb-2" htmlFor="division">Division</Label>
                    <Input id="division" {...register("division")} placeholder="Division" />
                  </div>
                  <div className="flex flex-col">
                    <Label className="mb-2" htmlFor="department">Department</Label>
                    <Input id="department" {...register("department")} placeholder="Department" />
                  </div>
                  <div className="flex flex-col">
                    <Label className="mb-2" htmlFor="location">Location</Label>
                    <Input id="location" {...register("location")} placeholder="Location" />
                  </div>
                  <div className="flex flex-col">
                    <Label className="mb-2" htmlFor="designation">Designation</Label>
                    <Input id="designation" {...register("designation")} placeholder="Designation" />
                  </div>
                  <div className="flex flex-col">
                    <Label className="mb-2" htmlFor="role">Role</Label>
                    <Input id="role" {...register("role")} placeholder="Role" />
                  </div>
                  <div className="flex flex-col">
                    <Label className="mb-2" htmlFor="employment-type">Employment Type</Label>
                    <Input id="employment-type" {...register("employmentType")} placeholder="Employment Type" />
                  </div>
                  <div className="flex flex-col">
                    <Label className="mb-2" htmlFor="employee-status">Employee Status</Label>
                    <Input id="employee-status" {...register("employeeStatus")} placeholder="Employee Status" />
                  </div>
                  <div className="flex flex-col">
                    <Label className="mb-2" htmlFor="source-of-hire">Source of Hire</Label>
                    <Input id="source-of-hire" {...register("sourceOfHire")} placeholder="Source of Hire" />
                  </div>
                  <div className="flex flex-col">
                    <Label className="mb-2" htmlFor="date-of-joining">Date of Joining</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn("w-[240px] justify-start text-left font-normal", !joiningDate && "text-muted-foreground")}
                        >
                          <CalendarIcon />
                          {joiningDate ? format(joiningDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="w-auto p-0">
                        <Calendar mode="single" selected={joiningDate} onSelect={setJoiningDate} />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex flex-col">
                    <Label className="mb-2" htmlFor="current-experience">Current Experience</Label>
                    <Input id="current-experience" {...register("currentExperience")} placeholder="Current Experience" />
                  </div>
                  <div className="flex flex-col">
                    <Label className="mb-2" htmlFor="total-experience">Total Experience</Label>
                    <Input id="total-experience" {...register("totalExperience")} placeholder="Total Experience" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>

              </CardFooter>
            </Card>
            {/* Work Experience (Repeatable fields) */}
            <Card className="mb-4" id="work-experience">
              <CardHeader>
                <CardTitle>Work Experience</CardTitle>
              </CardHeader>
              <CardContent>
                {workExperience.map((item, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-7">
                    <div className="flex flex-col">
                      <Label className="mb-2" htmlFor={`workExperience[${index}].companyName`}>Company Name</Label>
                      <Input
                        id={`workExperience[${index}].companyName`}
                        {...register(`workExperience[${index}].companyName`)}
                        placeholder="Company Name" />
                    </div>
                    <div className="flex flex-col">
                      <Label className="mb-2" htmlFor={`workExperience[${index}].jobTitle`}>Job Title</Label>
                      <Input
                        id={`workExperience[${index}].jobTitle`}
                        {...register(`workExperience[${index}].jobTitle`)}
                        placeholder="Job Title" />
                    </div>
                    <div className="flex flex-col">
                      <Label className="mb-2" htmlFor={`workExperience[${index}].fromDate`}>From Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn("w-[240px] justify-start text-left font-normal", !item.fromDate && "text-muted-foreground")}
                          >
                            <CalendarIcon />
                            {item.fromDate ? format(item.fromDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-auto p-0">
                          <Calendar mode="single" selected={item.fromDate} onSelect={(date) => {
                            const updatedWorkExperience = [...workExperience];
                            updatedWorkExperience[index].fromDate = date;
                            setWorkExperience(updatedWorkExperience);
                          } } />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex flex-col">
                      <Label className="mb-2" htmlFor={`workExperience[${index}].toDate`}>To Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn("w-[240px] justify-start text-left font-normal", !item.toDate && "text-muted-foreground")}
                          >
                            <CalendarIcon />
                            {item.toDate ? format(item.toDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-auto p-0">
                          <Calendar mode="single" selected={item.toDate} onSelect={(date) => {
                            const updatedWorkExperience = [...workExperience];
                            updatedWorkExperience[index].toDate = date;
                            setWorkExperience(updatedWorkExperience);
                          } } />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex flex-col">
                      <Label className="mb-2" htmlFor={`workExperience[${index}].jobDescription`}>Job Description</Label>
                      <Input
                        id={`workExperience[${index}].jobDescription`}
                        {...register(`workExperience[${index}].jobDescription`)}
                        placeholder="Job Description" />
                    </div>
                    <div className="flex flex-col">
                      <Label>
                        <Checkbox {...register(`workExperience[${index}].relevant`)} />

                        Relevant Experience
                      </Label>
                    </div>
                    <Button type="button" className="mb-4 w-20" onClick={() => removeWorkExperience(index)} variant="destructive">
                      Remove
                    </Button>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button type="button" className="mb-4 float-right" onClick={addWorkExperience}>Add Work Experience</Button>

              </CardFooter>
            </Card>




            {/* Education (Repeatable fields) */}

            <Card className="mb-4" id="education">
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent>
                {education.map((item, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-7">
                    <div className="flex flex-col">
                      <Label className="mb-2" htmlFor={`education[${index}].instituteName`}>Institute Name</Label>
                      <Input
                        id={`education[${index}].instituteName`}
                        {...register(`education[${index}].instituteName`)}
                        placeholder="Institute Name" />
                    </div>
                    <div className="flex flex-col">
                      <Label className="mb-2" htmlFor={`education[${index}].degree`}>Degree</Label>
                      <Input
                        id={`education[${index}].degree`}
                        {...register(`education[${index}].degree`)}
                        placeholder="Degree" />
                    </div>
                    <div className="flex flex-col">
                      <Label className="mb-2" htmlFor={`education[${index}].specialization`}>Specialization</Label>
                      <Input
                        id={`education[${index}].specialization`}
                        {...register(`education[${index}].specialization`)}
                        placeholder="Specialization" />
                    </div>
                    <div className="flex flex-col">
                      <Label className="mb-2" htmlFor={`education[${index}].dateOfCompletion`}>Date of Completion</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn("w-[240px] justify-start text-left font-normal", !item.dateOfCompletion && "text-muted-foreground")}
                          >
                            <CalendarIcon />
                            {item.dateOfCompletion ? format(item.dateOfCompletion, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-auto p-0">
                          <Calendar mode="single" selected={item.dateOfCompletion} onSelect={(date) => {
                            const updatedEducation = [...education];
                            updatedEducation[index].dateOfCompletion = date;
                            setEducation(updatedEducation);
                          } } />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <Button type="button" className="mb-4 w-20" onClick={() => removeEducation(index)} variant="destructive">
                      Remove
                    </Button>
                  </div>
                ))}
              </CardContent>
              <CardFooter>

                <Button type="button" className="mb-4 float-right" onClick={addEducation}>Add Education</Button>

              </CardFooter>
            </Card>


            {/* Dependents (Repeatable fields) */}

            <Card className="mb-4" id="dependents">
              <CardHeader>
                <CardTitle>Dependents</CardTitle>
              </CardHeader>
              <CardContent>
                {dependents.map((item, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-7">
                    <div className="flex flex-col">
                      <Label className="mb-2" htmlFor={`dependents[${index}].name`}>Name</Label>
                      <Input
                        id={`dependents[${index}].name`}
                        {...register(`dependents[${index}].name`)}
                        placeholder="Name" />
                    </div>
                    <div className="flex flex-col">
                      <Label className="mb-2" htmlFor={`dependents[${index}].relationship`}>Relationship</Label>
                      <Input
                        id={`dependents[${index}].relationship`}
                        {...register(`dependents[${index}].relationship`)}
                        placeholder="Relationship" />
                    </div>
                    <div className="flex flex-col">
                      <Label className="mb-2" htmlFor={`dependents[${index}].dateOfBirth`}>Date of Birth</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn("w-[240px] justify-start text-left font-normal", !item.dateOfBirth && "text-muted-foreground")}
                          >
                            <CalendarIcon />
                            {item.dateOfBirth ? format(item.dateOfBirth, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-auto p-0">
                          <Calendar mode="single" selected={item.dateOfBirth} onSelect={(date) => {
                            const updatedDependents = [...dependents];
                            updatedDependents[index].dateOfBirth = date;
                            setDependents(updatedDependents);
                          } } />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <Button type="button" className="mb-4 w-20" onClick={() => removeDependent(index)} variant="destructive">
                      Remove
                    </Button>
                  </div>
                ))}
              </CardContent>
              <CardFooter>

                <Button type="button" className="mb-4 float-right" onClick={addDependent}>Add Dependent</Button>

              </CardFooter>
            </Card>




            <Button type="submit" className="mt-8">Submit</Button>
          </form>
        </CardContent>
      </div></>
  );
}
