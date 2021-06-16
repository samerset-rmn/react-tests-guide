import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// Config
import { BASE_URL } from './config';
// Components
import SignUpForm from '.';

describe('SignUpForm comp-t', () => {
  it('renders component successfully', () => {
    // Рендерим компонент
    render(<SignUpForm />);

    // Проверяем, что он успешно отрендерился
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('submits form and sends request with the form data', async () => {
    // Рендерим компонент
    render(<SignUpForm />);

    // Записываем значения полей, которые хотим ввести в форму
    const formValues = {
      name: 'Роман',
      job: 'Программист',
    };

    // Находим элементы формы
    const form = screen.getByRole('form');
    const nameInput = screen.getByLabelText(/имя/i);
    const jobInput = screen.getByLabelText(/работа/i);
    const policyCheckbox = screen.getByLabelText(/персональных данных/i);
    const submitButton = screen.getByRole('button', { name: /отправить/i });

    // Проверяем, что все поля обязательны
    expect(nameInput).toBeRequired();
    expect(jobInput).toBeRequired();
    expect(policyCheckbox).toBeRequired();

    // Заполняем текстовые поля формы
    userEvent.type(nameInput, formValues.name);
    userEvent.type(jobInput, formValues.job);

    // Отмечаем обязательный чекбокс и проверяем его состояние
    userEvent.click(policyCheckbox);
    expect(policyCheckbox).toBeChecked();

    // Проверяем, что все поля заполнены и сохранены в форме
    expect(form).toHaveFormValues({
      ...formValues,
      policy: true,
    });

    // Устанавливаем перехватчик POST запроса.
    // Во время запроса возвращаем подделаный успешный ответ (! URL запроса должен быть настоящим)
    nock(BASE_URL).post('/users', formValues).reply(201, true);

    // Запускаем отправку формы и проверяем, что кнопка "Отправить" выключилась
    userEvent.click(submitButton);
    expect(submitButton).toBeDisabled();

    // После оставшихся асинхронных действий производим проверку
    await waitFor(() => {
      // Кнопка "Отправить" вернулась во включенное состояние
      expect(submitButton).toBeEnabled();
      // Поля формы очищены
      expect(form).toHaveFormValues({
        name: '',
        job: '',
        policy: false,
      });
    });
  });
});
