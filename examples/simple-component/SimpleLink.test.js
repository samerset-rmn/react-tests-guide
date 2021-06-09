import React from 'react';
import { render, screen } from '@testing-library/react';
// Components
import SimpleComponent from '.';

describe('SimpleComponent comp-t', () => {
  test('Renders with props', () => {
    // Задаем props
    const props = {
      name: 'Link text',
      url: 'https://www.google.com'
    };

    // Рендерим компонент с пропсами
    render(<SimpleComponent {...props} />);

    // Находим элемент (заодно проверяя props)
    const linkEl = screen.getByRole('link', { name: 'Link text' });
    // Делаем проверку на его успешное наличие
    expect(linkEl).toBeInTheDocument();
  });
});
