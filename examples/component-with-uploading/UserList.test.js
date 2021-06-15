import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// Config
import { BASE_URL } from './config';
// Components
import UserList from '.';

// Props компонента
const props = {
  listItems: [
    {
      id: 1,
      first_name: 'First',
      last_name: 'First',
    },
    {
      id: 2,
      first_name: 'Second',
      last_name: 'Second',
    },
  ],
};

describe('UserList comp-t', () => {
  it('renders with props', () => {
    // Рендерим компонент с props
    render(<UserList {...props} />);

    // Список отрендерен с 2 элементами
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('uploads next list items on click', async () => {
    // Устанавливаем перехватчик GET запроса
    nock(BASE_URL)
      .get('/users')
      .query({ page: 2 })
      .reply(200, {
        data: [
          {
            id: 3,
            first_name: 'Third',
            last_name: 'Third',
          },
          {
            id: 4,
            first_name: 'Fourth',
            last_name: 'Fourth',
          },
        ],
      });

    // Рендерим компонент с props
    render(<UserList {...props} />);

    // Находим кнопку "Показать ещё"
    const loadMoreButton = screen.getByRole('button', {
      name: /показать ещё/i,
    });

    // Запускаем асинхронную подзагрузку по клику
    userEvent.click(loadMoreButton);
    expect(loadMoreButton).toBeDisabled();

    // Ожидаем завершения асин. колбэка и проверяем, что в списке теперь 4 элемента
    await waitFor(() => {
      expect(screen.getAllByRole('listitem')).toHaveLength(4);
    });

    // Кнопка вернулась в начальное состояние
    expect(loadMoreButton).not.toBeDisabled();
  });
});
