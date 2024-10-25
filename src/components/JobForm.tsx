/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ONBOARD } from '../constant/onboard/onboard';
import { Button } from './button';
import FieldInput from './fieldInput/FieldInput';
import { FieldSelect } from './fieldSelect';
import { FieldTextArea } from './fieldTextArea';
import { Loader } from './loader';
import MultiFieldTextArea from './multiFieldTextArea/MultiFieldTextArea';

// import { useSearchParams } from "react-router-dom";

const {
    currencySigns: { options: defaultCurrencies },
} = ONBOARD.addJobRole;

export interface JobFormProps {
    callback?: (id: string) => void;
    jobId?: string;
    handleData: (data: any) => void;
}

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`;
const JobForm: React.FC<JobFormProps> = ({ handleData }) => {
    const [loader, setLoader] = React.useState(false);
    const methods = useForm({
        mode: 'onChange',
    });

    // const [searchParams] = useSearchParams();
    //   const readOnly = Boolean(searchParams?.get("readonly")) ?? false;
    const readOnly = false;
    const customSelectionComponent = useMemo(() => {
        const customComponents = {
            IndicatorSeparator: () => null,
            ClearIndicator: () => null,
        };
        if (readOnly) {
            return { ...customComponents, DropdownIndicator: () => null };
        }
        return customComponents;
    }, [readOnly]);
    const { watch, setValue } = methods;
    const selectedLocation = watch('location');
    const jobTitle = watch('jobTitle');
    const seniority = watch('seniority');
    const getResponsibilities = async (jobTitle: string, seniority: string) => {
        const url = BASE_URL + 'ai-interview/' + `chat-complete`;
        const payload = JSON.stringify({
            jobTitle,
            seniority,
        });
        try {
            setLoader(true);
            const data = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: payload,
            });
            const response = await data.json();
            setValue('responsibilities', response?.responsibilities || '');
            setValue('requiredSkills', response?.skills || []);
        } catch (err) {
            console.log('err', err);
        } finally {
            setLoader(false);
        }
    };
    useEffect(() => {
        if (jobTitle && seniority) {
            getResponsibilities(jobTitle, seniority);
        }
    }, [jobTitle, seniority]);
    // location currency association
    useEffect(() => {
        const locationCurrencyMap: Record<string, string> = {
            india: 'inr',
            usa: 'usd',
            uk: 'eur',
            australia: 'rub',
            china: 'cny',
        };
        const currencyValue = locationCurrencyMap[selectedLocation];

        if (currencyValue) {
            setValue('currency', currencyValue);
        } else {
            setValue('currency', defaultCurrencies[0].value);
        }
    }, [selectedLocation, setValue]);

    const onSubmit = async (data: any) => {
        const payload = {
            jobTitle: data.jobTitle,
            responsibilities: data.responsibilities,
            requiredSkills: data.requiredSkills,
            seniority: data.seniority,
        };

        const url = BASE_URL + 'ai-interview/create-assistant';
        // Fetch request
        try {
            const response = await fetch(url, {
                method: 'POST', // HTTP method
                headers: {
                    'Content-Type': 'application/json', // Sending JSON data
                },
                body: JSON.stringify(payload), // Convert data to JSON string
            });

            // Check if the response is OK (status 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Parse the response as JSON
            const result = await response.json();

            handleData(result);
        } catch (error) {
            console.error('Failed to create job:', error);
        }
    };

    return (
        <>
            {loader && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <Loader />
                </div>
            )}
            <FormProvider {...methods}>
                <form className="flex flex-col gap-4 w-[90%]" onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className={`jobInfo grid grid-cols-4 gap-4`}>
                        <FieldInput label="Job Title" name="jobTitle" required disabled={readOnly} />
                        <FieldSelect
                            label={'Seniority'}
                            name="seniority"
                            options={ONBOARD.addJobRole.seniority.options}
                            isDisabled={readOnly}
                            isSearchable={false}
                            components={customSelectionComponent}
                            classNames={{
                                className: '!h-full',
                            }}
                            required
                        />
                    </div>
                    <div className={`responsibility `}>
                        <FieldTextArea
                            label="Key Responsibility"
                            name="responsibilities"
                            rows={10}
                            required
                            disabled={readOnly}
                        />
                    </div>
                    <div className={`skillAndQualification grid  gap-4`}>
                        <MultiFieldTextArea
                            name="requiredSkills"
                            label="Required Skills"
                            required
                            disabled={readOnly}
                            isEditing={!readOnly}
                        />
                    </div>
                    {!readOnly && (
                        <div className="cta self-end mt-4">
                            <Button
                                //   disabled={isSubmitting}
                                //   className={`${false ? "!cursor-none !bg-[#D0AAFF]" : ""}`}
                                type="submit"
                            >
                                Next
                            </Button>
                        </div>
                    )}
                </form>
            </FormProvider>
        </>
    );
};

export default JobForm;
