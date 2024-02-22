import { useEffect, useState } from "react";

export function useMultiForm(steps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const isLastStep = currentStepIndex === steps.length - 1;

  const handleNext = () => {
    setCurrentStepIndex(currentStepIndex + 1);
    window.history.pushState(
      { currentStepIndex: currentStepIndex + 1 },
      "",
      ""
    );
  };

  const handlePrev = () => {
    setCurrentStepIndex(currentStepIndex - 1);
    window.history.pushState(
      { currentStepIndex: currentStepIndex - 1 },
      "",
      ""
    );
  };

  useEffect(() => {
    if (window.history.state === null) {
      window.history.replaceState({ currentStepIndex: 0 }, "", "");
    }
  }, []);

  useEffect(() => {
    window.onpopstate = (event) => {
      if (
        event.state !== null &&
        event.state.hasOwnProperty("currentStepIndex")
      ) {
        setCurrentStepIndex(event.state.currentStepIndex);
      }
    };
  }, [currentStepIndex]);

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    isLastStep,
    handlePrev,
    handleNext,
  };
}
