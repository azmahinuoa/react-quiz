import React, { useState } from "react";
import CategorySelector from "./CategorySelector";
import QuestionsContainer from "./QuestionsContainer";
import { VoidTypeFunction } from "../utils/types";

const QuizContainer:React.FC = () => {

    const [selectedCategoryId, setSelectedCategoryId] = useState<string>()
    const [selectedDifficultyId, setSelectedDifficultyId] = useState<string>()


    const handleOnCreateClicked: VoidTypeFunction = (selectedCategory: string, selectedDifficulty: string) => {
        setSelectedCategoryId(selectedCategory)
        setSelectedDifficultyId(selectedDifficulty)
    }

    return (
        <div className="full-container">
            <CategorySelector handleOnCreateClicked={handleOnCreateClicked}/>
            <QuestionsContainer selectedCategoryId={selectedCategoryId} selectedDifficultyId={selectedDifficultyId}/>
        </div>
    )
}

export default QuizContainer;