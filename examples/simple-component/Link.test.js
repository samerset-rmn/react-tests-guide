import React from 'react';
import { render, screen } from '@testing-library/react';
// Components
import Link from '.';

describe('Link comp-t', () => {
  it('renders comp-t with props', () => {
    // Создаем объект props
    const props = {
      name: 'Link text',
      url: 'https://www.google.com',
    };

    // Передаем props в компонент и рендерим его
    render(<Link {...props} />);

    // Находим элемент
    const link = screen.getByRole('link', { name: 'Link text' });

    // Проверяем, что переданные props успешно использованы
    expect(link).toHaveTextContent('Link text');
    expect(link).toHaveAttribute('href', 'https://www.google.com');
  });
});
