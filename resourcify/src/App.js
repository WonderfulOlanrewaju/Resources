import React, { useEffect } from 'react';
import './output.css';
import { Form, Field, Formik } from 'formik';

function App() {
  const handleSubmit = (values, actions) => {
    console.log(values, actions);
  }
  return (
    <div className="h-screen bg-gray-200 w-full py-20">
      <div className='bg-white rounded-lg shadow-xl  sm:mx-auto my-32  mx-8 p-8 sm:w-1/3'>
        <Formik
          initialValues={{
            query: ''
          }}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <Form className='my-4'>
              <div className='mb-4'>
                <Field className='w-full rounded-md p-2 border-gray-400 border-2' placeholder='e.g. minify css' name='query' />
              </div>
              <div>
                <button className='w-full p-2 hover:bg-red-900 rounded-full active:outline-none font-semibold bg-red-700 text-white'>Search Resource</button>
              </div>
            </Form>
          )}
        </Formik>

        <div className='mt-10'>
          <div>Resource here</div>
        </div>
      </div>
    </div>
  );
}

export default App;
