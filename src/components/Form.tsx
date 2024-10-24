/* eslint-disable @typescript-eslint/no-explicit-any */
import JobForm from "./JobForm";

const FormContainer = ({ handleData }: { handleData: any }) => {
  return (
    <div className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <JobForm handleData={handleData} />
    </div>
  );
};

export default FormContainer;
