/* eslint-disable @typescript-eslint/no-explicit-any */
// jobTypes.ts

import { FetchPayload, IDepartment } from '../utils/common';

// General JobRoleData Interface
export interface IJob {
    id?: string;
    companyId?: string;
    jobTitle: string;
    location: string;
    departments?: IDepartment | null;
    department: string;
    seniority: string;
    currency?: string;
    minSalary: number | string;
    maxSalary: number | string;
    responsibilities: string;
    requiredSkills: string[];
    qualifications: string;
    createdAt?: string;
    status?: boolean;
    interviewerId?: string;
    completedInterview?: number;
}
export interface ICandidateRanking {
    id: string;
    overallScore: number;
    skillMatchScore: number;
    experienceScore: number;
    culturalScore: number;
    softSkillScore: number;
    interview: any;
}
export interface fetchCandidateRankingListPayload extends FetchPayload {
    jobId: string;
}
export enum DEPARTMENT {
    SOFTWARE_DEVELOPMENT = 'software-development',
    ADMIN = 'admin',
    HR = 'hr',
    MARKETING = 'marketing',
    SALES = 'sales',
    QUALITY_ASSURANCE = 'quality-assurance',
    BUSINESS_ADMINISTRATION = 'business-administration',
}

export interface FetchJobPayload {
    page?: number;
    order?: string;
    jobRole?: string;
}
