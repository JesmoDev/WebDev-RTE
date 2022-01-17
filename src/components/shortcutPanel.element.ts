import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EditorCommand, searchCommands } from '../helpers/editorHelper';

@customElement('shortcut-panel')
export class ShortcutPanelElement extends LitElement {
  static styles = [
    css`
      :host {
        font-family: 'Montserrat', sans-serif;
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

      #get-started {
        text-align: center;
      }

      #get-started-shortcut {
        font-size: 2em;
      }

      input {
        box-sizing: border-box;
        outline: none;
        width: 100%;
        font-size: inherit;
        font-family: inherit;
        padding: 6px 8px;
        background: white;
        border: solid 1px #c7c7c7;
        border-radius: 2px;
        margin-bottom: 16px;
      }

      #shortcut-list {
        overflow-y: auto;
      }

      .shortcut {
        /* reset button styling */
        font-size: 0.9em;
        background: none;
        border: none;
        width: 100%;
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
        font-weight: 600;
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
      <div id="get-started">
        <p id="get-started-shortcut">Shortcuts</p>
      </div>

      <input @input=${this.onInput} value=${this.search} type="text" />

      <div id="shortcut-list">${this.renderShortcutList()}</div>
    </div>`;
  }
}
