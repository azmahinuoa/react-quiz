import './App.css'
import { Route, Routes } from 'react-router-dom'
import QuizContainer from './components/QuizContainer'
import ResultsContainer from './components/ResultsContainer'
import { QuizProvider } from './context/QuizContext'

function App() {
  

  return (
    <div>
      <QuizProvider>
        <Routes>
          <Route path="" element={<QuizContainer/>}/>
          <Route path="results" element={<ResultsContainer/>}/>
        </Routes>
      </QuizProvider>
    </div>
  )
}

export default App
