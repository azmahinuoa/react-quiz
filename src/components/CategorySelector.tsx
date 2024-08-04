import React, { useEffect, useRef, useState } from 'react'
import SelectBox from './SelectBox';
import axios from 'axios';

import { BASE_CATEGORIES_URL, DIFFICULTY_OPTIONS } from './../utils/constantes'
import { VoidTypeFunction } from '../utils/types';

interface CategorySelectorProps {
    handleOnCreateClicked: VoidTypeFunction
}

const CategorySelector:React.FC<CategorySelectorProps> = ({handleOnCreateClicked}) => {
    const [errorMsg, setErrorMsg] = useState<string>();
    const [categories, setCategories] = useState()
    const categoryRef = useRef<HTMLSelectElement>(null)
    const difficultyRef = useRef<HTMLSelectElement>(null)

    useEffect(() => {

        axios.get(BASE_CATEGORIES_URL).then(
            (response) => {
                setCategories(response.data.trivia_categories)
            } 
        ).catch(
            (error) => {
                console.log('an error has occured',error)
            }
        )

    },[])
    

    const onCreateButtonClicked = () => {
        const selectedCategory = categoryRef.current?.value
        const selectedDifficulty = difficultyRef.current?.value
        if(!selectedCategory || !selectedDifficulty) {
            setErrorMsg("Please select a category and a difficulty level")
        }else {
            setErrorMsg("")
            handleOnCreateClicked(selectedCategory, selectedDifficulty)
        }
       
    }

    return (
        <div>
            <h1>QUIZ MAKER</h1>
            <div>
                {categories && <SelectBox defaultOption="select a category" selectRef={categoryRef} id="categorySelect" options={categories}/>}
                <SelectBox defaultOption="select a difficulty" selectRef={difficultyRef} id="difficultySelect" options={DIFFICULTY_OPTIONS}/>
                <button id='createBtn' onClick={onCreateButtonClicked}>Create</button>
                <p>{errorMsg}</p>
            </div>
        </div>
    )
}

export default CategorySelector;