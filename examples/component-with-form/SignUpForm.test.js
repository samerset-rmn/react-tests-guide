import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// Components
import SignUpForm from '.';
// Config
import { BASE_URL } from './config';

describe('SignUpForm comp-t', () => {
  it('renders component successfully', () => {
    // Рендерим компонент
    render(<SignUpForm />);

    // Проверяем, что он успешно отрендерен
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('submits form and sends request with the form data', async () => {
    // Рендерим компонент
    render(<SignUpForm />);

    // Записываем значения полей, которые хотим ввести в форму
    const formValues = {
      firstName: 'Роман',
      lastName: 'Романов',
      email: 'roma@email.com'
    };

    // Асинхронно (из-за логики работы `Formik`) заполняем все поля формы
    await userEvent.type(screen.getByLabelText(/имя/i), formValues.firstName, {
      delay: 1
    });
    await userEvent.type(
      screen.getByLabelText(/фамилия/i),
      formValues.lastName,
      {
        delay: 1
      }
    );
    await userEvent.type(screen.getByLabelText(/email/i), formValues.email, {
      delay: 1
    });

    // Проверяем, что все поля заполнены и сохранены в форме
    expect(screen.getByRole('form')).toHaveFormValues(formValues);

    // Запускаем отправку формы по клику на кнопку
    userEvent.click(screen.getByRole('button', { name: /отправить/i }));

    // Перехватываем запрос из формы и возвращаем успешный ответ (URL запроса должен быть настоящий)
    nock(BASE_URL).post('/registration', formValues).reply(201);
  });
});
