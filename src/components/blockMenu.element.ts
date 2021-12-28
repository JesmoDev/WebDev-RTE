import { html, css, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { EditorCommand, searchCommands } from '../helpers/editorHelper';
import { MenuBase } from '../abstracts/MenuBase';
@customElement('block-menu')
export class BlockMenuElement extends MenuBase {
  static styles = [
    ...MenuBase.styles,
    css`
      :host {
        height: 300px;
        max-width: 250px;
        /* padding: 8px; */
        width: 200px;
        box-sizing: border-box;
      }

      .input-field {
        margin: 8px 8px;
      }

      .input-text {
        position: relative;
        cursor: pointer;
      }

      .input-text:hover .input-hp {
        background-color: #c7c7c7;
        transition-timing-function: ease;
        width: 100%;
        border-radius: 3px;
      }

      .input-text.selected-item::before {
        content: '';
        width: calc(100% + 16px);
        height: calc(100% + 8px);
        position: absolute;
        background: #e1e1e1;
        inset: 0;
        z-index: -1;
        left: -8px;
        top: -4px;
      }

      input {
        box-sizing: border-box;
        outline: none;
        width: 100%;
        font-size: inherit;
        font-family: inherit;
        padding: 8px;
        background: white;
        border: solid 1px #adadad;
        border-radius: 4px;
      }

      .input-icon img {
        width: 70%;
        height: 100%;
        margin: auto;
      }

      .input-icon {
        border: 1px solid #adadad;
        min-height: 28px;
        min-width: 28px;
        max-height: 28px;
        max-width: 28px;
        text-align: center;
        border-radius: 5px;
        display: flex;
        margin: auto;
        background-color: white;
      }

      .input-text {
        display: flex;
        float: left;
        padding: none;
        width: 100%;
        padding: 0 8px;
        background-color: #e3dfdf;
        margin: none;
        margin-bottom: 8px;
      }

      .input-hp {
        width: 100%;
        height: auto;
        padding: 4px 0;
        margin: 0;
        margin-left: 10px;
        text-align: justify;
        border-bottom: transparent 2px solid;
      }

      .input-hp h3 {
        font-size: 12px;
        margin: 0;
        padding-bottom: 0;
      }

      .input-hp p {
        font-size: 10px;
        margin-top: 4px;
        margin-bottom: 0;
        color: #686565;
      }

      .block-items {
        width: 100%;
        height: 245px;
        overflow-y: auto;
        overflow-x: hidden;
        flex-direction: column;
        gap: 4px;
      }
    `,
  ];

  @state()
  private _search = '';

  @state()
  private _index = 0;

  protected firstUpdated(): void {
    const input = this.shadowRoot.getElementById('input');
    input.focus();
  }

  connectedCallback(): void {
    super.connectedCallback();
    setTimeout(() => {
      document.addEventListener('keydown', this.onKeyDownHandler);
    }, 0);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this.onKeyDownHandler);
  }

  private onKeyDownHandler = this.onKeyDown.bind(this);
  private onKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Backspace') {
      if (!this._search) {
        e.preventDefault();
        this.closeMenu();
      }
      this._search = this._search.slice(0, -1);
    }

    if (e.key === 'Escape') {
      this.closeMenu();
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      this._index = Math.max(0, this._index - 1);
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this._index = Math.min(
        searchCommands(this._search, 'block').length - 1,
        this._index + 1
      );
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      // TODO: This should be cashed
      this.onSelectItem(searchCommands(this._search, 'block')[this._index]);
    }
  }

  private onSelectItem(editorCommand: EditorCommand): void {
    editorCommand.command();
    this.closeMenu();
  }

  private renderBlockItems(): TemplateResult[] {
    const filteredItems = searchCommands(this._search, 'block');

    this._index =
      searchCommands(this._search, 'block').length === 0
        ? 0
        : Math.min(
            this._index,
            searchCommands(this._search, 'block').length - 1
          );

    return filteredItems.map(
      (editorCommand: EditorCommand, index) =>
        html`<div
          @click=${() => this.onSelectItem(editorCommand)}
          class="input-text ${index === this._index ? 'selected-item' : ''}">
          <div class="input-icon">
            <img src=${editorCommand.icon} alt="" />
          </div>
          <div class="input-hp">
            <h3>${editorCommand.name}</h3>
            <p>${editorCommand.description}</p>
          </div>
        </div>`
    );
  }

  private onInput(e: InputEvent) {
    this._search = (e.target as HTMLInputElement).value;
  }

  protected render(): TemplateResult {
    return html`<div id="block-menu">
      <div class="mainBlockMenu">
        <div class="input-field">
          <input
            type="text"
            id="input"
            @input=${this.onInput}
            name="input"
            value=${this._search} />
        </div>
        <div class="block-items">${this.renderBlockItems()}</div>
      </div>
    </div> `;
  }
}
