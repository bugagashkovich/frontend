import { Formik } from "formik";
import React, { useState } from "react";

function Map({ handleAddress }) {
  return (
    <div className="container">
      <h1>Добро пожаловать!</h1>
      <Formik
        initialValues={{ address: "" }}
        onSubmit={(values, { setSubmitting }) => {
          handleAddress(values.address);
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                className="form-control"
                type="text"
                name="address"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <div id="adressHelp" className="form-text">
                Введите название населенного пункта.
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
            >
              Показать погоду
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Map;
