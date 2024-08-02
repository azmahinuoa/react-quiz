import { useContext, useState } from 'react'
import {decodeHtmlEntities} from './../utils/constantes'
import { QuizContext } from '../context/QuizContext';
import { QuizQuestion } from '../utils/interfaces';

interface QuestionProps {
    questionData: QuizQuestion;
    mode: string
}

const Question:React.FC<QuestionProps> = ({questionData, mode}) => {

    const [selectedAnswer, setSelectedAnswer] = useState();

    const {updateQuizData} = useContext(QuizContext)
    const isResult = mode == 'resultpage'


    const onAnswerClicked = (e) => {
        updateQuizData({
            ...questionData,
            selected_answer: e.target.value
        })
        setSelectedAnswer(e.target.value)
    }

    return (
        <div className='quiz-entity'>
            <p>{decodeHtmlEntities(questionData.question)}</p>
            {
                questionData.choices && questionData.choices.map((option: string, index:number) => {
                const optionClass = isResult 
                    ? (option == questionData.correct_answer ? 'correct-choice' : option == questionData.selected_answer ? 'wrong-choice' : undefined) 
                    : option == selectedAnswer ? 'choice selected' : 'choice'
                return (
                <button
                    disabled={isResult}
                    className={optionClass} 
                    style={{margin: '0.5rem'}}
                    value={option} 
                    key={index} 
                    onClick={(e) => onAnswerClicked(e)}>
                        {decodeHtmlEntities(option)}
                </button>
                )}
                )
            }

        </div>
    )
}

export default Question;