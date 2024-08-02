import { useContext } from "react";
import Question from "./Question";
import { QuizContext } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";
import { QuizQuestion } from "../utils/interfaces";

const ResultsContainer = () => {
    const navigate = useNavigate();
    const {initiateQuizData} = useContext(QuizContext)
    let {quizData} = useContext(QuizContext)
    let quizLenght = quizData!.length

    if(quizLenght > 0) {
        sessionStorage.setItem('myquizresults', JSON.stringify(quizData))
    } else {
        const storedquizData = sessionStorage.getItem('myquizresults')
       if(storedquizData) quizData = JSON.parse(storedquizData)
    }

    quizLenght = quizData!.length
    const score = quizData!.filter((el:QuizQuestion) => el.selected_answer == el.correct_answer).length
    const backgroundColor = score < 2 ? 'red': score < 4 ? 'yellow' : 'green'

    const redirectToNewQuiz = () => {
        initiateQuizData([])
        navigate('/')
    }

    return (
        <>
            <h3>Results</h3>
            {quizData && quizData.map((el:QuizQuestion, index: number) => <Question key={index} mode='resultpage' questionData={el} />)}
            <div>
                <p style={{ backgroundColor }}>You scored {score} out of {quizLenght}</p>
                <button onClick={redirectToNewQuiz}>Create new quiz</button>
            </div>
            
        </>
    )
}

export default ResultsContainer;