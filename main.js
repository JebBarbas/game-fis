//@ts-check

import { getQuestions, state } from "./state.js"
import { throwIfNull } from "./utils.js"


let main = document.querySelector('main')



async function init(){
    if(throwIfNull(main)){
        await getQuestions()

        state.questions?.forEach((question, index) => {
            const card = document.createElement('jeb-card')
            const answers = document.createElement('jeb-answers')

            //@ts-ignore
            card.question = question
            //@ts-ignore
            card.index = index
            //@ts-ignore
            answers.question = question

            main && main.insertAdjacentElement('beforeend', card)
        })
    }
}

init()
