// Components
import formatPrice from './formatPrice';

describe('formatPrice util function', () => {
  test('returns taken price in RUB format', () => {
    // Выполняем функцию
    const result = formatPrice(1550000.99);
    /* 
      Строка для сравнения (`Intl.NumberFormat` возвращает строку с неразрывными пробелами, 
      из-за этого в строке для сравнения мы заменяем обычные пробелы на неразрывные)
    */
    const expected = '1 550 000'.replace(/\s/g, String.fromCharCode(160));

    // Проверяем результат форматирования
    expect(result).toBe(expected);
  });

  test('throws error after invoking with wrong param type', () => {
    // Передаем в функцию неверные параметры и проверяем, что она возвращает ошибку
    expect(() => formatPrice(undefined)).toThrow();
    expect(() => formatPrice(null)).toThrow();
    expect(() => formatPrice({})).toThrow();
  });
});
