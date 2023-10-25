import { state } from "./state.js"

/**
 * @template T
 * @param {T | null} v 
 * @returns {v is T}
 */
export function throwIfNull(v){
    if(v === null) throw new Error('Value is null')
    return true
}

export function addCorrectQuestion(){
    if(state.questions === null) return;

    state.points += 100 / state.questions.length
    document.querySelector('#points').innerText = `${state.points.toFixed(2)}%`
}