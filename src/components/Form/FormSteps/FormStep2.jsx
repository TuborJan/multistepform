import { useEffect, useState } from "react";

const FormStep2 = ({ formData, updateForm }) => {
  const [atLeastOneChecked, setAtLeastOneChecked] = useState(
    formData.products.length > 0
  );

  useEffect(() => {
    setAtLeastOneChecked(formData.products.length > 0);
  }, [formData.products.length]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateForm(name, value);
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    const updatedProducts = checked
      ? [...formData.products, value]
      : formData.products.filter((product) => product !== value);
    updateForm(name, updatedProducts);
  };

  return (
    <>
      <label htmlFor="email">Почта</label>
      <input
        required
        data-testid="email"
        type="email"
        name="email"
        id="email"
        value={formData.email}
        onChange={handleInputChange}
      />
      <label>Продукты:</label>
      <div>
        <input
          required={!atLeastOneChecked}
          type="checkbox"
          name="products"
          value="СХД"
          id="shd"
          checked={formData.products.includes("СХД")}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="shd">СХД:</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="products"
          value="Серверы"
          id="servers"
          checked={formData.products.includes("Серверы")}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="servers">Серверы:</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="products"
          value="Планшеты"
          id="tablets"
          checked={formData.products.includes("Планшеты")}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="tablets">Планшеты:</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="products"
          value="Пк"
          id="pc"
          checked={formData.products.includes("Пк")}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="pc">Пк:</label>
      </div>
      <label htmlFor="about">О себе</label>
      <textarea
        required
        data-testid="about"
        type="text"
        name="about"
        id="about"
        rows={6}
        value={formData.about}
        onChange={handleInputChange}
      />
    </>
  );
};

export default FormStep2;
