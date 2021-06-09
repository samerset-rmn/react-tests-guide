import React from 'react';
import { render, screen } from '@testing-library/react';
// Components
import SimpleComponent from '.';

describe('SimpleComponent comp-t', () => {
  test('Renders with props', () => {
    // Создаем объект props
    const props = {
      name: 'Link text',
      url: 'https://www.google.com'
    };

    // Передаем props в компонент и рендерим его
    render(<SimpleComponent {...props} />);

    // Находим элемент (заодно проверяя работу props)
    const linkEl = screen.getByRole('link', { name: 'Link text' });
    // Проверяем, что он успешно отрендерился
    expect(linkEl).toBeInTheDocument();
  });
});
