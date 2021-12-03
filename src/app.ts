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

  @state()
  value = [
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ];

  handleChange(event) {
    console.log(event);
  }

  private editor = createEditor();

  render() {
    return html`<rte-editor
      .editor=${this.editor}
      .value=${this.value}
      @change=${this.handleChange}
    ></rte-editor>`;
  }
}
