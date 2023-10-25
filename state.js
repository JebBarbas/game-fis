//@ts-check

/**
 * @typedef QuestionAnswer
 * @property {string} value
 * @property {boolean} correct
 */

/**
 * @typedef Question
 * @property {string} question
 * @property {QuestionAnswer[]} answers
 */

export const state = {
    /** @type {Question[] | null} */
    questions: null,

    points: 0
}

/**
 * Lee el json de questions y asigna el estado de questions 
 */
export async function getQuestions(){
    try {
        const response = await fetch('./questions.json')
        const questions = await response.json()

        state.questions = questions
    }
    catch {
        console.error('No se pudieron obtener las preguntas')
    }
}
