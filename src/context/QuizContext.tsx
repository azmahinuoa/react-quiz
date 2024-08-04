import { createContext, ReactNode, useState } from "react";
import { QuizQuestion } from "../utils/interfaces";

interface QuizContextProps {
    quizData?: QuizQuestion[] , 
    initiateQuizData: (a: QuizQuestion[]) => void, 
    updateQuizData: (a: QuizQuestion) => void
}

interface QuizProviderProps {
    children: ReactNode;
}

const QuizContext = createContext<QuizContextProps>({
    quizData: [] , 
    initiateQuizData: () => {}, 
    updateQuizData: () => {}
});


const QuizProvider: React.FC<QuizProviderProps> = ({children}) => {
    const [quizData, setQuizData] = useState<QuizQuestion[]>([])

    const initiateQuizData = (newQuizData:QuizQuestion[]) => {
        setQuizData(newQuizData)
    }

    const updateQuizData = (updatedQuizData: QuizQuestion) => {
        setQuizData((prevQuizData: QuizQuestion[]) => 
            prevQuizData.map((el:QuizQuestion) =>
                el.question === updatedQuizData.question
                    ? { ...el, ...updatedQuizData }
                    : el
            )
        );
    }

    return (
        <QuizContext.Provider value={{quizData, initiateQuizData, updateQuizData}}>
            {children}
        </QuizContext.Provider>
    )
}

export {QuizProvider, QuizContext};