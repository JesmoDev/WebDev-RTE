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
      }

      #how-to-start {
        text-align: center;
      }

      #get-started-shortcut {
        font-size: 2em;
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
        <p id="how-to-start">Shortcuts</p>
      </div>
    </div>`;
  }
}
