// What to do:
// 1. Rename file
// 2. Rename class
// 3. Rename @customElement - has to have a "-" in it.
// 4. Import it in main.ts - import "./components/elementTemplate.element";

import { LitElement, html, css, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("element-template")
export class ElementTemplateElement extends LitElement {
  static styles = [
    css`
      :host {
      }

      #element {
      }
    `,
  ];

  // Internal state with default value: "state default value".
  // Change this to what you need, doesn't have to be called state.
  @state()
  private state = "state default value";

  // Property that can be accessed from outside component: "property default value".
  // Change this to what you need, doesn't have to be called property.
  @property({ type: String })
  public property: string = "property default value";

  private myEvent(e: MouseEvent): void {
    console.log("event fired, you pressed this element", e.target);
  }

  protected render(): TemplateResult {
    return html`<div @click=${this.myEvent} id="element">
      Custom element works!
    </div>`;
  }
}
