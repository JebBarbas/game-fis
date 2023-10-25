import { LitElement, html, css } from 'lit'

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

class ModalAnswers extends LitElement {
    static properties = {
        question: { type: Object, converter: questionConverter }
    }
    
    static styles = css`
        :host {
            --text: #f8fafc;
            --modal: #334155;
        }    

        
        
    `

    render(){
        return html`
            <dialog id="dialog">
                <div class="container">

                </div>
            </dialog>
        `
    }
}

customElements.define('jeb-answers', ModalAnswers)