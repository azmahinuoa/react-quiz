import axios from "axios"
import { useContext, useEffect } from "react"
import Question from "./Question";

import { BASE_QUIZZ_URL, NUMBER_OF_QUESTIONS } from "../utils/constantes";
import { QuizContext } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";
import { QuizQuestion } from "../utils/interfaces";

interface QuestionsContainerProps {
    selectedCategoryId?: string;
    selectedDifficultyId?: string;
}

const QuestionsContainer:React.FC<QuestionsContainerProps> = ({selectedCategoryId, selectedDifficultyId}) => {
    const navigate = useNavigate();
    const {quizData, initiateQuizData} = useContext(QuizContext)
    const displaySubmit = quizData!.length > 0 ?  quizData!.filter((el: QuizQuestion) => el.selected_answer == null).length === 0 : false

    const onSubmitQuiz = () => {
        navigate('/results')
    }

    const shuffleAnswers = (answersArrays: string[]) => {
        return answersArrays.sort(() => Math.random() - 0.5)
    }
    
    useEffect(() => {
        if(!selectedCategoryId || !selectedDifficultyId) return;

        axios.get(`${BASE_QUIZZ_URL}?amount=${NUMBER_OF_QUESTIONS}&category=${selectedCategoryId}&difficulty=${selectedDifficultyId}&type=multiple`).then(
            (response) => {
                initiateQuizData(response.data.results.map((el: QuizQuestion) => {
                    return {
                        ...el,
                        choices: shuffleAnswers([...el.incorrect_answers, el.correct_answer]),
                        selected_answer: null
                    }
                }))

            } 
        ).catch(
            (error) => {
                console.log('an error has occured',error)
                initiateQuizData([])
            }
        )

    },[selectedCategoryId,selectedDifficultyId])

    return (
        <div>
            {quizData && quizData.map((el: QuizQuestion, index: number) => <Question key={index} mode="quizpage" questionData={el} />)}
            {displaySubmit && <button onClick={onSubmitQuiz}>Submit</button>}
        </div>
    )
}

export default QuestionsContainer;