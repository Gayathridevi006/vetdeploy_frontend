import * as z from "zod";
const baseSchema = z.object({
  recruiterType: z.enum(["company", "consultant"], {
    message: "Please select one",
  }),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .max(15, "Enter a valid phone number"),
  email: z.string().email("Enter a valid work email"),
});

const companySchema = baseSchema.extend({
  recruiterType: z.literal("company"),
  companyName: z.string().min(2, "Organisation name is required"),
  recruiterName: z.string().min(2, "Recruiter name is required"),
  designation: z.string().min(2, "Designation is required"),
});

const consultantSchema = baseSchema.extend({
  recruiterType: z.literal("consultant"),
  consultantOrg: z.string().min(2, "Consultancy name is required"),
  consultantLocation: z.string().min(2, "Location is required"),
});

export const formSchema = z.discriminatedUnion("recruiterType", [
  companySchema,
  consultantSchema,
]);



export const formTransitionSchema = z.object({
  commissioned: z.enum(["yes", "no"]),
  armedForces: z.string().min(1, "Armed Forces is required"),
  rank: z.string().min(1, "Rank is required"),
  // fields required by backend
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  dob: z.string().min(1, "Date of birth is required"),
  category: z.string().optional(),
  role: z.string().optional(),
  doj: z.string().min(1, "Date of Joining is required"),
  dod: z.string().min(1, "Date of Discharge is required"),
  years: z.string().min(1, "Years of service is required"),
  jobProfile: z.string().min(1, "Job profile is required"),
  serviceNo: z.string().min(1, "Service number is required"),
  corps: z.string().min(1, "Corps is required"),
  certification: z.string().optional(),
  qualification: z.string().min(1, "Qualification is required"),
  institute: z.string().optional(),
  place: z.string().min(1, "Place is required"),
  state: z.string().min(1, "State is required"),
  resume: z.enum(["yes", "no"]),
});
