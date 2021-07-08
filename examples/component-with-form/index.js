/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Formik, Field, Form } from 'formik';
// Config
import { BASE_URL } from './config';

/**
 * Функция-обработчик отправки формы.
 * Принимает содержимое полей, отправляет его по фейковому API и возвращает true.
 */
const sendSignUpRequest = async (values) => {
  return fetch(`${BASE_URL}/users`, {
    method: 'POST',
    body: JSON.stringify(values),
  })
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.error(err);
    });
};

/**
 * Компонент с формой.
 * При отправке выполняет запрос на фейковый API.
 *
 * Заметка:
 * `role="form"` присваивается элементу <form /> только когда у него есть доступное название.
 * Поэтому ему задано имя через `aria-labelledby`, чтобы он была доступна для функции `getByRole`
 * по роли `form`.
 */
function SignUpForm() {
  return (
    <div>
      <h1 id="signUpHeading">Регистрация</h1>
      <Formik
        initialValues={{
          name: '',
          job: '',
          policy: false,
        }}
        onSubmit={async (values, { resetForm }) => {
          await sendSignUpRequest({
            name: values.name,
            job: values.job,
          });

          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form aria-labelledby="signUpHeading">
            <label>
              Имя
              <Field name="name" placeholder="Ваше имя" required />
            </label>

            <label>
              Работа
              <Field name="job" required />
            </label>

            <label>
              Я прочел и согласен с политикой обработки персональных данных
              <Field name="policy" type="checkbox" required />
            </label>

            <button type="submit" disabled={isSubmitting}>
              Отправить
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SignUpForm;
