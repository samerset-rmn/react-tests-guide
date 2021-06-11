import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextModal from '.';

describe('TextModal comp-t', () => {
  it('changes the modal visibility by clicking on button', () => {
    // Содержимое компонента
    const modalContent = 'Окно с текстом';

    // Рендерим компонент с содержимым
    render(<TextModal>{modalContent}</TextModal>);

    // Находим кнопку для открытия модалки (используем RegExp для надежного поиска, избегая буквальных строк)
    const button = screen.getByRole('button', { name: /(закрыть|открыть)/i });
    // И саму модалку (передаем параметр `hidden: true`, т.к. она изначально невидима и `getByRole` ее не найдет)
    const modal = screen.getByRole('dialog', {
      hidden: true
    });

    // Проверяем, что модалка невидима и содержит текст, который мы передали
    expect(modal).not.toBeVisible();
    expect(modal).toHaveTextContent(modalContent);

    // Открываем модалку по клику на кнопку
    userEvent.click(button);
    // Проверяем, что она открылась
    expect(modal).toBeVisible();
    // Проверяем, что `aria-label` кнопки поменялся
    expect(button).toHaveAttribute(
      'aria-label',
      expect.stringMatching(/закрыть/i)
    );

    // Те же действия, но в обратном порядке
    userEvent.click(button);
    expect(modal).not.toBeVisible();
    expect(button).toHaveAttribute(
      'aria-label',
      expect.stringMatching(/открыть/i)
    );
  });
});
