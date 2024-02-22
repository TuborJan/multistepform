const FormStep1 = ({ formData, updateForm }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateForm(name, value);
  };

  return (
    <>
      <label htmlFor="name">Имя</label>
      <input
        data-testid="name"
        required
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
      />
      <label htmlFor="surname">Фамилия</label>
      <input
        data-testid="surname"
        required
        type="text"
        name="surname"
        value={formData.surname}
        onChange={handleInputChange}
      />
    </>
  );
};

export default FormStep1;
