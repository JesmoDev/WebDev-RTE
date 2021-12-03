import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { createEditor } from "slate";
import "./components/editor";

@customElement("app-element")
export class App extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `,
  ];

  render() {
    return html`<rte-editor></rte-editor>`;
  }
}
