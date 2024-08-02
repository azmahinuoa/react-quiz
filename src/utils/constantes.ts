export const BASE_QUIZZ_URL = "https://opentdb.com/api.php"
export const BASE_CATEGORIES_URL = "https://opentdb.com/api_category.php"
export const NUMBER_OF_QUESTIONS = 5;
export const DIFFICULTY_OPTIONS = [
    {
        id: "easy",
        name: "Easy"
    },
    {
        id: "medium",
        name: "Medium"
    },
    {
        id: "hard",
        name: "Hard"
    },
];

export const decodeHtmlEntities = (encodedString: string): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(encodedString, 'text/html');
    return doc.documentElement.textContent || '';
  };