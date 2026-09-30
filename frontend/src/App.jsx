import React from 'react'
import axios from 'axios'
import {useState} from 'react'
import {useMutation} from '@tanstack/react-query'
import "./App.css";

const makeRequestAPI = async (prompt) => {
  const response = await axios.post('http://localhost:3000/generate', { prompt });
  return response.data;
};

const App = () => {
  const [prompt, setPrompt] = useState('');
const mutation = useMutation({
  mutationFn: makeRequestAPI,
  mutationKey: ['generateContent'],
})

const submitHandler = (e) => {
  e.preventDefault();
  mutation.mutate(prompt);
}

  return (
      <div className="App">
      <header>Gemini AI Content Generator</header>
      <p>Enter a prompt and let Gemini AI craft a unique content for you.</p>
      <form className="App-form" onSubmit={submitHandler}>
        <label htmlFor="Enter your prompt:"></label>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Write a content about..."
          className="App-input"
        />
        <button className="App-button" type="submit">
          Generate Content
        </button>
        <section className="App-response">
          {mutation.isPending && <p>Generating your content</p>}
          {mutation.isError && <p>{mutation.error.message}</p>}
          {mutation.isSuccess && <p>{mutation.data}</p>}
        </section>
      </form>
    </div>
  )
}

export default App