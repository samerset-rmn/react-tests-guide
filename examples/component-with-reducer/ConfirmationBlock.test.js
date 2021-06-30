import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// Components
import ConfirmationBlock from '.';

describe('ConfirmationBlock comp-t', () => {
  test('should show success message when click on the confirm button', () => {
    // Рендерим компонент
    render(<ConfirmationBlock />);

    // Находим изначальное сообщение
    expect(screen.getByText(/ожидание/i)).toBeInTheDocument();

    // Меняем состояние при клике на кнопку
    userEvent.click(screen.getByRole('button', /подтвердить/i));

    // Проверяем, что сообщение обновилось (следовательно, state работает верно)
    expect(screen.getByText(/готово/i)).toBeInTheDocument();
  });
});
