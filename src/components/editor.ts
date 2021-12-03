import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { BaseEditor, createEditor, Editor, Transforms } from "slate";

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
  private readonly emptyValue = [{ children: [{ text: "asf" }] }];

  private _editor: BaseEditor = createEditor();

  @property()
  value;

  constructor() {
    super();
    this._editor.children = this.emptyValue;
    this._editor.selection = {
      anchor: { path: [0, 0], offset: 0 },
      focus: { path: [0, 0], offset: 15 },
    };
  }

  start = {
    path: [0, 0],
    offset: 0,
  };

  onKeyDown(event: KeyboardEvent) {
    event.preventDefault();
  }

  onInput(event: InputEvent) {
    if (event.data) {
      this._editor.insertText(event.data);
    }
    this.requestUpdate();
  }

  blockSelector(block) {
    switch (block.type) {
      case "paragraph":
        return html`<p>${block.children[0].text}</p>`;

      default:
        return html`${block.children[0].text}`;
    }
  }

  render() {
    return html`<div id="editor" contenteditable="true" @input=${this.onInput}>
      ${this._editor.children.map((block) => {
        return this.blockSelector(block);
      })}
    </div>`;
  }
}
