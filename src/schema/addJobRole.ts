// schema.ts
import * as yup from 'yup';

export const jobRoleSchema = yup.object().shape({
    jobTitle: yup.string().required('Job title is required'),
    location: yup.string().required('Location must be selected'),
    department: yup.string().required('Department must be selected'),
    seniority: yup.string().required('Seniority must be selected'),
    responsibilities: yup.string().required('Responsibilities are required'),
    requiredSkills: yup
        .array()
        .of(yup.string().required('Each tag must be a non-empty string'))
        .required('Tags are required'),
    qualifications: yup.string().required('Qualifications are required'),
    currency: yup.string(),
    minSalary: yup
        .number()
        .transform((value, originalValue) => ((`${originalValue}` || '').trim() === '' ? 0 : value))
        .required('Min salary is required'),
    maxSalary: yup
        .number()
        .transform((value, originalValue) => ((`${originalValue}` || '').trim() === '' ? 0 : value))
        .required('Max salary is required'),
});
