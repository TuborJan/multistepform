import "./StepBar.scss";

const StepBar = ({ steps, currentStepIndex }) => {
  return (
    <div className="form-progress">
      {steps.map((step, index) =>
        index === currentStepIndex ? (
          <span key={index} className="current">
            {index + 1}
          </span>
        ) : index < currentStepIndex ? (
          <span key={index} className="completed">
            ✔
          </span>
        ) : (
          <span key={index} className="upcoming">
            {index + 1}
          </span>
        )
      )}
    </div>
  );
};

export default StepBar;
