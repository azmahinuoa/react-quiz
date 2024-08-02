export interface QuizQuestion {
    question: string;
    difficulty: string;
    choices: string[];
    correct_answer: string;
    incorrect_answers: string[];
    selected_answer: string
  }