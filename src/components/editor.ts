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
      <h1>Header1</h1>
      <h2>Header2</h2>
      <h3>Header3</h3>
      <div>Normal Text</div>
      <code>Code</code> <br />
      <b>Bold text</b> <br />
      <ol>
        <li>Ordered</li>
        <li>List</li>
      </ol>
      <ul>
        <li>Bullet</li>
        <li>List</li>
      </ul>
      <br />
      <img src="" alt="I am image" />
      <div>Custom Elements</div>
    </div>`;
  }
}
