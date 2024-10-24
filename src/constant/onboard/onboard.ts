export const ONBOARD = {
    process: [
        {
            title: "Let’s Create Your First Interview",
            step: "Add New Job Role",
            key: "job",
        },
        {},
        {
            title: "Interview Setup Process",
            step: "Interview Questions",
            key: "interview",
        },
        {},
        {
            title: "Interview Setup Process",
            step: "Add Candidate(s)",
            key: "candidate",
        },
    ],
    addJobRole: {
        location: {
            label: "Location",
            options: [
                {
                    value: "india",
                    label: "India",
                },
                {
                    value: "usa",
                    label: "USA",
                },
                {
                    value: "uk",
                    label: "UK",
                },
                {
                    value: "australia",
                    label: "Australia",
                },
                {
                    value: "china",
                    label: "China",
                },
            ],
        },
        seniority: {
            label: "Seniority",
            options: [
                { label: "Internship", value: "internship" },
                { label: "Entry Level", value: "entryLevel" },
                { label: "Associate", value: "associate" },
                { label: "Mid-Senior Level", value: "midSeniorLevel" },
                { label: "Executive", value: "executive" },
                { label: "Not Applicable", value: "notApplicable" },
            ],
        },
        department: {
            label: "Department",
            options: [
                {
                    value: "it",
                    label: "IT",
                },
                {
                    value: "hr",
                    label: "HR",
                },
                {
                    value: "finance",
                    label: "Finance",
                },
                {
                    value: "marketing",
                    label: "Marketing",
                },
                {
                    value: "sales",
                    label: "Sales",
                },
            ],
        },
        currencySigns: {
            options: [
                { label: "$", value: "usd" },
                { label: "€", value: "eur" },
                { label: "₹", value: "inr" },
                { label: "¥", value: "cny" },
                { label: "₽", value: "rub" },
            ],
        },
    },
};
