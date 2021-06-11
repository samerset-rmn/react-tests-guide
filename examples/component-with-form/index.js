import React from 'react';
import { Formik, Field, Form } from 'formik';

const BASE_URL = 'https://foo.bar';

/**
 * Функция-обработчик отправки формы. Принимает содержимое полей, отправляет его
 * и возвращает true.
 */
const sendSignUpRequest = async (values) => {
  return fetch(`${BASE_URL}/registration`, {
    method: 'POST',
    body: values
  }).then(() => true);
};

/**
 * Компонент с формой.
 * При отправке выполняет запрос через переданный асинхронный колбэк.
 *
 * Заметка:
 * `role="form"` присваивается элементу <form /> только когда у нее есть доступное название.
 * Поэтому ей задано имя через `aria-labelledby`, чтобы она была доступна для функции `getByRole`
 * по роли `form`.
 */
function SignUpForm() {
  return (
    <div>
      <h1 id='signUpHeading'>Регистрация</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: ''
        }}
        onSubmit={async (values) => {
          await sendSignUpRequest(values);
        }}
      >
        <Form aria-labelledby='signUpHeading'>
          <label>
            Имя
            <Field name='firstName' placeholder='Ваше имя' />
          </label>

          <label>
            Фамилия
            <Field name='lastName' placeholder='Ваша фамилия' />
          </label>

          <label>
            Email
            <Field name='email' placeholder='jane@acme.com' type='email' />
          </label>

          <button type='submit'>Отправить</button>
        </Form>
      </Formik>
    </div>
  );
}

export default SignUpForm;
