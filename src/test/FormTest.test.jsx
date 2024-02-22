import { describe, expect, it, vi } from "vitest";
import { getByTestId, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "../components/Form/Form";

describe("Form tests", () => {
  it("Form render properly", () => {
    render(<Form />);

    const label = screen.getByText(/Имя/);
    const label2 = screen.getByText(/Фамилия/);
    const button = screen.getByText(/Назад/);
    const button2 = screen.getByText(/Далее/);

    expect(label).toBeInTheDocument();
    expect(label2).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button2).toBeInTheDocument();
  });

  it("back button is disabled if form is in the first step", async () => {
    render(<Form />);

    const label = screen.getByText(/Имя/);
    const label2 = screen.getByText(/Фамилия/);
    const backButton = screen.getByText(/Назад/);

    expect(label).toBeInTheDocument();
    expect(label2).toBeInTheDocument();
    expect(backButton).toBeInTheDocument();

    await userEvent.click(backButton);

    expect(label).toBeInTheDocument();
    expect(label2).toBeInTheDocument();
  });

  it("next button throw an error if name and surname are empty", async () => {
    render(<Form />);

    const nameInput = screen.getByTestId("name");
    const surnameInput = screen.getByTestId("surname");
    const nextButton = screen.getByText(/Далее/);

    expect(nameInput.value).toBe("");
    expect(surnameInput.value).toBe("");
    expect(nextButton).toBeInTheDocument();

    await userEvent.click(nextButton);

    expect(nameInput).toBeInTheDocument();
    expect(surnameInput).toBeInTheDocument();
  });

  it("form data is output to console", async () => {
    const consoleSpy = vi.spyOn(console, "log");
    render(<Form />);

    const nameInput = screen.getByTestId("name");
    const surnameInput = screen.getByTestId("surname");
    const nextButton = screen.getByText(/Далее/);
    const backButton = screen.getByText(/Назад/);

    expect(nameInput).toBeInTheDocument();
    expect(surnameInput).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    expect(backButton).toBeInTheDocument();

    await userEvent.type(nameInput, "Иван");
    await userEvent.type(surnameInput, "Иванов");

    expect(nameInput.value).toBe("Иван");
    expect(surnameInput.value).toBe("Иванов");

    await userEvent.click(nextButton);

    expect(screen.getByText(/Почта/)).toBeInTheDocument();
    expect(screen.getByText(/Продукты/)).toBeInTheDocument();
    expect(screen.getByText(/О себе/)).toBeInTheDocument();

    const shdCheckbox = screen.getByLabelText(/СХД/);
    const email = screen.getByTestId("email");
    const about = screen.getByTestId("about");

    await userEvent.click(shdCheckbox);
    await userEvent.type(email, "mail@mail.m");
    await userEvent.type(about, "иванов");
    await userEvent.click(nextButton);

    const submitButton = screen.getByText(/Отправить/);
    expect(submitButton).toBeInTheDocument();

    const isReady = screen.getByTestId("isReady");
    const isAgreed = screen.getByTestId("isAgreed");

    await userEvent.click(isReady);
    await userEvent.click(isAgreed);
    await userEvent.click(submitButton);

    expect(consoleSpy).toHaveBeenCalledWith({
      name: "Иван",
      surname: "Иванов",
      email: "mail@mail.m",
      about: "иванов",
      products: ["СХД"],
      isAgreed: true,
      isReady: true,
    });
  });
});
