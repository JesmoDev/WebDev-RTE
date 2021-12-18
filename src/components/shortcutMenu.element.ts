import { CommandManager, Editor } from "@tiptap/core";
import { LitElement, html, css, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  EditorCommand,
  getCommands,
  searchCommands,
} from "../helpers/editorHelper";

@customElement("shortcut-menu")
export class ShortcutMenuElement extends LitElement {
  static styles = [
    css`
      :host {
        position: sticky;
        width: 250px;
        height: 500px;
        opacity: 0.5;
        top: 175px;
        background: lightgray;
        box-sizing: border-box;
        transition: opacity 200ms ease-out;
      }

      :host(:hover),
      :host(:focus-within) {
        opacity: 1;
      }

      #shortcut-menu {
        box-sizing: border-box;
      }

      input {
        box-sizing: border-box;
        width: 100%;
        margin-bottom: 16px;
      }

      .shortcut {
        display: flex;
        cursor: pointer;
        padding: 8px 12px;
        user-select: none;
      }

      .shortcut:hover {
        background: grey;
      }

      .shortcut-name {
        font-weight: bold;
      }

      .shortcut-keys {
        text-align: right;
        flex-grow: 1;
      }
    `,
  ];

  @state()
  search = "";

  @property({ attribute: false })
  editor: Editor;

  private renderShortcut(shortcut: EditorCommand): TemplateResult {
    return html`<div @click=${() => shortcut.command()} class="shortcut">
      <span class="shortcut-name">${shortcut.name}</span>
      <span class="shortcut-keys">
        ${shortcut.keyboardShortcut.map(
          (key, i) =>
            html`
              <span>${key}</span>
              ${i !== shortcut.keyboardShortcut.length - 1 ? "+" : ""}
            `
        )}
      </span>
    </div>`;
  }

  private renderShortcutList() {
    const filteredItems = searchCommands(this.editor, this.search);

    return filteredItems.map(
      (shortcut) => html`${this.renderShortcut(shortcut)}`
    );
  }

  private onInput(e: InputEvent) {
    this.search = (e.target as HTMLInputElement).value;
  }

  protected render() {
    return html`<div id="shortcut-menu">
      <h2>Shortcuts</h2>
      <div>
        <input @input=${this.onInput} value=${this.search} type="text" />
      </div>
      <div>${this.renderShortcutList()}</div>
    </div>`;
  }
}
