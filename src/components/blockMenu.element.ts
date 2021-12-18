import { Editor } from "@tiptap/core";
import { LitElement, html, css, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { EditorCommand, searchCommands } from "../helpers/editorHelper";

@customElement("block-menu")
export class BlockMenuElement extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        position: absolute;
        z-index: 100;
        padding: 24px 0;
      }

      #block-menu {
        width: 300px;
        height: 200px;
        background: white;
        border: 1px solid black;
        border-radius: 4px;
        box-sizing: border-box;
      }
    `,
  ];

  @state()
  private search = "";

  @state()
  private _open = false;

  @property({ attribute: false })
  public position: { top: number; left: number };

  @property({ attribute: false })
  public editor: Editor;

  @property({ type: Boolean })
  public get open() {
    return this._open;
  }
  public set open(newValue) {
    const oldValue = this._open;
    this._open = newValue;
    this.onOpenChange(newValue);
    this.requestUpdate("open", oldValue);
  }

  disconnectedCallback() {
    document.removeEventListener("keydown", this.onKeyDownHandler);
  }

  private onKeyDownHandler = this.onKeyDown.bind(this);
  private onKeyDown(e: KeyboardEvent): void {
    if (e.key === "Backspace") {
      this.search = this.search.slice(0, -1);
    }
    // Only single characters and no spaces or slashes
    if (/^(?=\S)(?!\/)(.{1})$/.test(e.key)) {
      this.search = this.search + e.key.toLowerCase();
    }
  }

  private onOpenChange(open: boolean): void {
    if (open) {
      document.addEventListener("keydown", this.onKeyDownHandler);
      this.style.display = "block";
      this.style.top = `${this.position.top}px`;
      this.style.left = `${this.position.left}px`;
    } else {
      document.removeEventListener("keydown", this.onKeyDownHandler);
      this.style.display = "none";
      this.search = "";
    }
  }

  private onSelectItem(command: Function): void {
    command();
    const event = new CustomEvent("close");
    this.dispatchEvent(event);
  }

  private renderBlockItems(): TemplateResult[] {
    const filteredItems = searchCommands(this.editor, this.search);

    return filteredItems.map(
      (editorCommand: EditorCommand) =>
        html`<div @click=${() => this.onSelectItem(editorCommand.command)}>
          ${editorCommand.name}${editorCommand.description}
        </div>`
    );
  }

  protected render(): TemplateResult {
    return html`<div id="block-menu">${this.renderBlockItems()}</div>`;
  }
}
