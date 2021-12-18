import { Editor } from '@tiptap/core';
import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EditorCommand, searchCommands } from '../helpers/editorHelper';

@customElement('shortcut-menu')
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
        background: none;
        border: none;
        width: 100%;
        font-size: inherit;
        font-family: inherit;
        display: flex;
        cursor: pointer;
        padding: 8px 12px;
        user-select: none;
        outline: none;
      }

      .shortcut:hover,
      .shortcut:focus {
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
  private search = '';

  @property({ attribute: false })
  public editor: Editor;

  private renderShortcut(editorCommand: EditorCommand): TemplateResult {
    return html`<button
      @click=${() => editorCommand.command()}
      class="shortcut">
      <span class="shortcut-name">${editorCommand.name}</span>
      <span class="shortcut-keys">
        ${editorCommand.keyboardShortcut.map(
          (key, i) =>
            html`
              <span>${key}</span>
              ${i !== editorCommand.keyboardShortcut.length - 1 ? '+' : ''}
            `
        )}
      </span>
    </button>`;
  }

  private renderShortcutList(): TemplateResult[] {
    const filtered = searchCommands(this.editor, this.search);

    return filtered.map(
      (shortcut: EditorCommand) => html`${this.renderShortcut(shortcut)}`
    );
  }

  private onInput(e: InputEvent): void {
    this.search = (e.target as HTMLInputElement).value;
  }

  protected render(): TemplateResult {
    return html`<div id="shortcut-menu">
      <h2>Shortcuts</h2>
      <div>
        <input @input=${this.onInput} value=${this.search} type="text" />
      </div>
      <div>${this.renderShortcutList()}</div>
    </div>`;
  }
}
