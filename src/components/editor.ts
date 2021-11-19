import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("rte-editor")
export class RTEEditor extends LitElement {
  static styles = [css``];

  render() {
    return html`<h1>I Am The Editor</h1>`;
  }
}
