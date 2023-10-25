import { LitElement, html, css } from 'lit'
import { addCorrectQuestion } from './utils.js';

const questionConverter = () => {
    return {
      toAttribute: (question) => {
        return JSON.stringify(question)
      },
      fromAttribute: (value) => {
        return JSON.parse(value);
      },
    };
};

class Card extends LitElement {
    static properties = {
        index: { type: Number },
        question: { type: Object, converter: questionConverter },

        _correct: { type: Boolean, state: true }
    }

    static styles = css`
        :host {
            --paper: #1e293b;
            --text: #f8fafc;
            --modal: #334155;

            --padding: 1rem;

            --red: #dc2626;
            --blue:  #2563eb;
            --green: #16a34a;
            --yellow: #f59e0b;
        }    

        .card {
            background-color: var(--paper);
            height: 8rem;
            border-radius: 0.5rem;
            display: grid;
            place-content: center;
            font-size: 3rem;
        }

        .card:hover:not(.correct, .incorrect) {
            cursor: pointer;
            scale: 1.1;
            rotate: 5deg;
        }

        .card.correct {
            background-color: var(--green)
        }

        .card.incorrect {
            background-color: var(--red)
        }

        .dialog {
            border: 0;
            background: var(--modal);
            color: var(--text);
            border-radius: 0.25rem;
            max-width: 500px;
            padding: 0;
        }

        .header {
            display: flex;
            justify-content: end;
            padding: var(--padding);
        }

        .btn-close {
            cursor: pointer;
            border: 0;
            background: transparent;
            fill: var(--text);
            padding: 0.25rem;
            font-size: 1.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .body {
            padding: var(--padding);
            text-align: center;
        }

        .footer {
            padding: var(--padding);
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.5rem;
        }

        .answer {
            text-align: center;
            padding: var(--padding);
            border-radius: 0.25rem;
        }

        .answer:hover {
            cursor: pointer;
            transform: scale(1.025);
        }

        .bg-0 { background-color: var(--red); }
        .bg-1 { background-color: var(--blue); }
        .bg-2 { background-color: var(--green); }
        .bg-3 { background-color: var(--yellow); }
    `

    constructor(){
        super()

        this.index = -1

        /** @type {import('./state.js').Question} */
        this.question = {}

        this._correct = null
    }

    /////////////////////// Internal Elements ////////////////////////////
    
    get #dialog(){
        return this.renderRoot.querySelector('.dialog') ?? null
    }

    ////////////////////// Generators ///////////////////////////////////

    get #answersHTML(){
        const randomAnswers = [...this.question.answers].sort(() => Math.random() - 0.5)

        return html`
            ${randomAnswers.map((answer, index) => html`
                <div class="answer bg-${index}" @click=${() => this.onAnswerClick(answer)}>
                    ${answer.value}
                </div>
            `)}
        `
    }

    ///////////////////// Event Handlers ////////////////////////////
    
    onCardClick(){
        if(this._correct !== null) return 
        this.#dialog && this.#dialog.showModal()
    }

    onCloseClick(){
        this.#dialog && this.#dialog.close()
    }

    /**
     * @param {import('./state.js').QuestionAnswer} answer 
     */
    onAnswerClick(answer){
        const isCorrect = answer.correct
        this._correct = isCorrect

        if(isCorrect){
            addCorrectQuestion()
        }

        this.onCloseClick()
    }

    render(){
        return html`
            <div class="card ${this._correct !== null ? this._correct ? 'correct' : 'incorrect' : ''}" @click=${this.onCardClick}>
                ${this.index + 1}
            </div>

            <dialog class="dialog">
                <div class="container">
                    <div class="header">
                        <button class="btn-close" @click=${this.onCloseClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                        </button>
                    </div>
                    <div class="body">
                        ${this.question.question}
                    </div>
                    <div class="footer">
                        ${this.#answersHTML}
                    </div>
                </div>
            </dialog>
        `
    }
}

customElements.define('jeb-card', Card)