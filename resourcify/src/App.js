import React, { useEffect, useState } from 'react';
import './output.css';
import { Form, Field, Formik } from 'formik';
import ReactMarkdown from 'react-markdown';
// import source from './resources/Javascript.md';
const importAll = (r) => r.keys().map(r);
const markdownFiles = importAll(require.context('./resources', false, /\.md$/))
  .sort()
  .reverse();

function App() {
  const [results, setResults] = useState(null);
  const handleSubmit = (values, actions) => {
    console.log(values, actions);
  }
  useEffect(() =>
    // fetch(source).then(res => res.text()).then(loadedFile => setResults(loadedFile)).catch(err => console.log(err))
    async () => {
      const loadedFiles = await Promise.all(markdownFiles.map(file => fetch(file).then(res => res.text())))
        .catch(err => console.log(err))
      setResults(loadedFiles);
    }, [])
  return (
    <div className="h-screen bg-gray-400 w-full py-20">
      <div className='bg-white rounded-lg shadow-2xl  sm:mx-auto my-32  mx-8 p-8 sm:w-1/3'>
        <Formik
          initialValues={{
            query: ''
          }} onSubmit={handleSubmit}
        >
          {(props) => (
            <Form className='my-4'>
              <div className='mb-4'>
                <Field className='w-full rounded-md p-2 border-gray-400 border-2 focus:outline-none' placeholder='e.g. minify css' name='query' />
              </div>
              <div>
                <button type='submit' className='w-full p-2 hover:bg-red-900 rounded-full focus:outline-none font-semibold bg-red-700 text-white'>Search Resource</button>
              </div>
            </Form>
          )}
        </Formik>
        <div className='mt-10'>
          <div className='uppercase text-gray-700 font-semibold'>Resource here</div>
          <div>
            {results ?
              results.map((result, index) =>
                <div key={index}>
                  <ReactMarkdown source={result} />
                </div>
              ) : null
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
