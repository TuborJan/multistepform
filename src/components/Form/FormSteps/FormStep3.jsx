const FormStep3 = ({ formData, updateForm }) => {
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    updateForm(name, checked);
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    updateForm(name, value === "true" ? true : false);
  };

  return (
    <>
      <div>
        <input
          data-testid="isAgreed"
          required
          type="checkbox"
          name="isAgreed"
          id="isAgreed"
          checked={formData.isAgreed === true}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="isAgreed">Согласен на обработку данных</label>
      </div>
      <div>
        <input
          data-testid="isReady"
          required
          type="radio"
          name="isReady"
          id="isReady"
          value={true}
          checked={formData.isReady === true}
          onChange={handleRadioChange}
        />
        <label htmlFor="isReady">Да, хочу работать в Yadro</label>
      </div>
      <div>
        <input
          required
          type="radio"
          name="isReady"
          id="isUnReady"
          value={false}
          checked={formData.isReady === false}
          onChange={handleRadioChange}
        />
        <label htmlFor="isUnReady">Нет, не хочу работать в Yadro</label>
      </div>
    </>
  );
};

export default FormStep3;
