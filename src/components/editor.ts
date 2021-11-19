import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("rte-editor")
export class RTEEditor extends LitElement {
  static styles = [
    css`
      #editor {
        width: 100%;
        min-height: 200px;
        border: 1px solid black;
      }
    `,
  ];

  render() {
    return html`<div id="editor" contenteditable="true">
      <h1>Header</h1>
      <code>Code goes here</code>
      <b>Bold text</b>
    </div>`;
  }
}
