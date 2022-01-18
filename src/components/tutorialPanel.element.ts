// What to do:
// 1. Rename file
// 2. Rename class
// 3. Rename @customElement - has to have a "-" in it.
// 4. Import it in main.ts - import "./components/elementTemplate.element";

import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EditorCommand, searchCommands } from '../helpers/editorHelper';

@customElement('tutorial-panel')
export class TutorialPanelElement extends LitElement {
  static styles = [
    css`
      :host {
        font-family: 'Montserrat', sans-serif;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        transition: opacity 200ms ease-out;
      }
      #how-to {
        height: 600px;
        display: flex;
        flex-direction: column;

        box-shadow: 2px 2px 5px #a4a2a2;
      }

      #how-to-start {
        text-align: center;
      }

      #how-to-h1 {
        text-align: center;
        font-style: italic;
        font-weight: 400;
      }

      #how-to-h2 {
        text-align: center;
        font-weight: 300;
        padding: none;
        margin: none;
      }

      #how-to-h3 {
        text-align: center;
        font-weight: 400;
      }

      #how-to-start {
      }
      #how-to-img {
        width: 35%;
        display: block;
        margin-left: auto;
        margin-right: auto;
        padding-top: 10px;
      }

      #how-to-img-2 {
        width: 90%;
        display: block;
        margin-left: auto;
        margin-right: auto;
      }

      #how-to-hover {
        text-align: center;
        padding-top: 5%;
      }
      #how-to-hover-para {
        text-align: center;
        font-style: italic;
        font-weight: 300;
      }

      #element {
      }
    `,
  ];

  // Internal state with default value: "state default value".
  // Change this to what you need, doesn't have to be called state.
  @state()
  private state = 'state default value';

  // Property that can be accessed from outside component: "property default value".
  // Change this to what you need, doesn't have to be called property.
  @property({ type: String })
  public property = 'property default value';

  private myEvent(e: MouseEvent): void {
    console.log('event fired, you pressed this element', e.target);
  }

  protected render(): TemplateResult {
    return html`<div id="tutorial-menu">
      <div id="how-to">
        <h1 id="how-to-h1">HOW TO GET STARTED</h1>
        <h2 id="how-to-h2">"Open Editor"</h2>
        <h2 id="how-to-h3">ctrl+k</h2>
        <p id="how-to-start">Select a block to build with</p>
        <img id="how-to-img" src="src/img/icons/blockMenu.png" alt="" />
        <p id="how-to-hover">Highlight text to edit</p>
        <img id="how-to-img-2" src="src/img/icons/hoverMenu.png" alt="" />
        <p id="how-to-hover-para">(Or use shortcuts)</p>
      </div>
    </div>`;
  }
}
