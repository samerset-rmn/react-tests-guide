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
  // Рендерим компонент с props перед началом каждого теста
  beforeEach(() => {
    render(<UserList {...props} />);
  });

  test('renders comp-t with props', () => {
    // Список отрендерен с 2 элементами
    props.listItems.forEach((listItem) => {
      expect(
        screen.getByText(listItem.first_name, { exact: false })
      ).toBeInTheDocument();
    });
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  test('uploads next list items on click', async () => {
    // Находим кнопку "Показать ещё"
    const loadMoreButton = screen.getByRole('button', {
      name: /показать ещё/i,
    });

    // Сохраняем список следующих элементов
    const uploadedItems = [
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
    ];

    // Устанавливаем перехватчик GET запроса
    nock(BASE_URL).get('/users').query({ page: 2 }).reply(200, {
      data: uploadedItems,
    });

    // Запускаем асинхронную подзагрузку по клику
    userEvent.click(loadMoreButton);
    expect(loadMoreButton).toBeDisabled();

    // После завершения асин. колбеков делаем проверку
    await waitFor(() => {
      // Список дополнился новыми элементами
      [...props.listItems, ...uploadedItems].forEach((listItem) => {
        expect(
          screen.getByText(listItem.first_name, { exact: false })
        ).toBeInTheDocument();
      });
    });

    // Длина списка теперь 4
    expect(screen.getAllByRole('listitem')).toHaveLength(4);

    // Кнопка вернулась в начальное состояние
    expect(loadMoreButton).not.toBeDisabled();
  });
});
