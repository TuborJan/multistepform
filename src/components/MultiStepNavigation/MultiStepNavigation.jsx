import "./MultiStepNavigation.scss";

const MultiStepNavigation = ({ currentStepIndex, isLastStep, handlePrev }) => {
  return (
    <div className="multitep-navigation">
      <button
        type="button"
        disabled={currentStepIndex < 1}
        onClick={handlePrev}
      >
        Назад
      </button>
      <button type="submit">{isLastStep ? "Отправить" : "Далее"}</button>
    </div>
  );
};

export default MultiStepNavigation;
