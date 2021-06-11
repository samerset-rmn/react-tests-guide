import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// Components
import ConfirmationBlock from '.';

describe('ConfirmationBlock comp-t', () => {
  it('shows success message after confirm button is clicked', () => {
    // Рендерим компонент
    render(<ConfirmationBlock />);

    // Находим изначальное сообщение
    expect(screen.getByText(/ожидание/i)).toBeInTheDocument();

    // Меняем состояние при клике на кнопку
    userEvent.click(screen.getByRole('button', /подтвердить/i));

    // Проверяем, что состояние обновилось
    expect(screen.getByText(/готово/i)).toBeInTheDocument();
  });
});
