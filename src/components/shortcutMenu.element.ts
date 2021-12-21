import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EditorCommand, searchCommands } from '../helpers/editorHelper';

@customElement('shortcut-menu')
export class ShortcutMenuElement extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        transition: opacity 200ms ease-out;
      }

      #shortcut-menu {
        height: 600px;
        display: flex;
        flex-direction: column;
      }

      input {
        box-sizing: border-box;
        width: 100%;
        margin-bottom: 16px;
      }

      #shortcut-list {
        overflow-y: auto;
      }

      .shortcut {
        /* reset button styling */
        background: none;
        border: none;
        width: 100%;
        font-size: inherit;
        font-family: inherit;
        outline: none;

        display: flex;
        cursor: pointer;
        padding: 8px 12px;
        user-select: none;
      }

      .shortcut:hover,
      .shortcut:focus {
        background: lightgrey;
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
    const filtered = searchCommands(this.search);

    return filtered.map(
      (shortcut: EditorCommand) => html`${this.renderShortcut(shortcut)}`
    );
  }

  private onInput(e: InputEvent): void {
    this.search = (e.target as HTMLInputElement).value;
  }

  protected render(): TemplateResult {
    return html`<div id="shortcut-menu">
      <div>
        <h2>Get started</h2>
        <p>ctrl + k</p>
      </div>

      <input @input=${this.onInput} value=${this.search} type="text" />

      <div id="shortcut-list">${this.renderShortcutList()}</div>
    </div>`;
  }
}
