import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// Components
import SignUpForm from '.';

const BASE_URL = 'https://foo.bar';

describe('SignUpForm comp-t', () => {
  it('renders component successfully', () => {
    render(<SignUpForm />);

    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('submits form and sends request with the form data', async () => {
    render(<SignUpForm />);

    const formValues = {
      firstName: 'Роман',
      lastName: 'Романов',
      email: 'roma@email.com'
    };

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

    expect(screen.getByRole('form')).toHaveFormValues(formValues);

    userEvent.click(screen.getByRole('button', { name: /отправить/i }));

    nock(BASE_URL).post('/registration', formValues).delay(500).reply(201);
  });
});
