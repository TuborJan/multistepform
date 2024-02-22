import React, { useEffect, useState } from "react";
import { useMultiForm } from "../../hooks/useMultiForm";
import FormStep1 from "./FormSteps/FormStep1";
import FormStep2 from "./FormSteps/FormStep2";
import FormStep3 from "./FormSteps/FormStep3";
import StepBar from "../StepBar/StepBar";
import MultiStepNavigation from "../MultiStepNavigation/MultiStepNavigation";
import "./Form.scss";

const initialFormData = {
  name: "",
  surname: "",
  email: "",
  about: "",
  products: [],
  isAgreed: null,
  isReady: null,
};

const Form = () => {
  const [formData, setFormData] = useState(initialFormData);

  const handleUpdateForm = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const steps = [
    <FormStep1 formData={formData} updateForm={handleUpdateForm} />,
    <FormStep2 formData={formData} updateForm={handleUpdateForm} />,
    <FormStep3 formData={formData} updateForm={handleUpdateForm} />,
  ];

  const { currentStepIndex, step, isLastStep, handleNext, handlePrev } =
    useMultiForm(steps);

  useEffect(() => {
    const storedFormData = sessionStorage.getItem("formData");
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLastStep) {
      console.log(formData);
    } else {
      handleNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <StepBar steps={steps} currentStepIndex={currentStepIndex} />
      <div className="form-items">{step}</div>
      <MultiStepNavigation
        currentStepIndex={currentStepIndex}
        isLastStep={isLastStep}
        handlePrev={handlePrev}
      />
    </form>
  );
};

export default Form;
