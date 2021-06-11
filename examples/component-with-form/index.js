import React from 'react';
import { Formik, Field, Form } from 'formik';

const BASE_URL = 'https://foo.bar';

/**
 * Функция для обработки отправки формы. Принимает значения из полей и отправляет их,
 * через некоторое время возвращая успешный ответ.
 */
const sendSignUpRequest = async (values) => {
  return fetch(`${BASE_URL}/registration`, { method: 'POST', body: values })
    .then(() => setTimeout(() => true), 500)
    .then((res) => res);
};

/**
 * Компонент с формой.
 * При отправке выполняет запрос через переданный асинхронный колбэк.
 * 
 * Заметка:
 * `role="form"` присваивается элементу <form /> только когда у ее есть доступное название.
 * Поэтому форме задано имя через `aria-labelledby`, чтобы `getByRole` функция нашла ее по роли `form`.
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
