import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// Components
import TextModal from '.';

describe('TextModal comp-t', () => {
  // Рендерим компонент с props перед каждым тестом
  beforeEach(() => {
    // Содержимое компонента
    const modalContent = 'Окно с текстом';

    // Рендерим компонент с содержимым модалки
    render(<TextModal>{modalContent}</TextModal>);
  });

  test('should render comp-t with props', () => {
    // Компонент успешно отрендерен с props
    expect(screen.getByRole('dialog', { hidden: true })).toHaveTextContent(
      'Окно с текстом'
    );
  });

  test('should change a modal visibility on click on the button', () => {
    // Находим кнопку для открытия модалки
    const button = screen.getByRole('button', { name: /(закрыть|открыть)/i });
    // И саму модалку (передаем параметр `hidden: true`, т.к. она изначально не отображается и `getByRole` ее не видит)
    const modal = screen.getByRole('dialog', {
      hidden: true,
    });

    // Проверяем, что изначально модалка не отображается
    expect(modal).not.toBeVisible();

    // Открываем модалку по клику на кнопку
    userEvent.click(button);
    // Проверяем, что она открылась
    expect(modal).toBeVisible();
    // Проверяем, что `aria-label` кнопки поменялся
    expect(button).toHaveAccessibleName(/закрыть/i);

    // Те же действия, но в обратном порядке
    userEvent.click(button);
    expect(modal).not.toBeVisible();
    expect(button).toHaveAccessibleName(/открыть/i);
  });
});
