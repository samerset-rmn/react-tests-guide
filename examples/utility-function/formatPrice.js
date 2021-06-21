/**
 * Функция принимает цену в виде числа и возвращает ее в формате валюты "RUB".
 * Все знаки после запятой отсекаются.
 *
 * @param {number|string} price - Цена.
 * @returns {string} - цена в формате валюты "RUB".
 */
const formatPrice = (price) => {
  if (typeof price !== 'number' && typeof price !== 'string') {
    throw new Error('Неверный тип price в функции formatPrice!');
  }

  const formatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return formatter.format(parseInt(price, 10)).slice(0, -2);
};

export default formatPrice;
