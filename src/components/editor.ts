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
  private readonly emptyValue = [{ children: [{ type: "bold", text: "asf" }] }];

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
    // console.log(event.key);

    if (event.key === "Backspace") {
      this._editor.deleteBackward("character");
      event.preventDefault();
      this.requestUpdate();
    }
  }

  onInput(event: InputEvent) {
    event.preventDefault();
    if (event.data) {
      Transforms.insertText(this._editor, event.data);
    }
    console.clear();
    console.log(this._editor.children);
    this.requestUpdate();
  }

  onClick() {
    const selection = this.shadowRoot!.getSelection(); //Only Works in Chrome

    Transforms.select(this._editor, {
      anchor: { path: [0, 0], offset: selection.anchorOffset },
      focus: { path: [0, 0], offset: selection.focusOffset },
    });
    // this._editor.selection = selection.;
    console.log("selection: ", selection);
  }

  blockSelector(block) {
    console.log(block);

    switch (block.children[0].type) {
      case "paragraph":
        return html`<p>${block.children[0].text}</p>`;

      case "bold":
        return html`<b>${block.children[0].text}</b>`;

      default:
        return html`${block.children[0].text}`;
    }
  }

  render() {
    return html`<div
        id="editor"
        contenteditable="true"
        @input=${this.onInput}
        @keydown=${this.onKeyDown}
        @click=${this.onClick}
      >
        ${this._editor.children.map((block) => {
          return this.blockSelector(block);
        })}
      </div>
      <div>
        ${this._editor.children.map((block) => {
          return this.blockSelector(block);
        })}
      </div>`;
  }
}
