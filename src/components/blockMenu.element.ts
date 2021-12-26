import { html, css, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { EditorCommand, searchCommands } from '../helpers/editorHelper';
import { MenuBase } from '../abstracts/MenuBase';
@customElement('block-menu')
export class BlockMenuElement extends MenuBase {
  static styles = [
    ...MenuBase.styles,
    css`
      .mainBlockMenu {
        border: solid 3px #3647ab;
        height: 450px;
        max-width: 250px;
        padding: 2px;
        padding-left: 1%;
        border-radius: 5px;
        background-color: #f3f3f3;
        min-height: 70%;
        min-width: 200px;
      }

      .input-field {
        padding-top: 2%;
      }

      .input-icon img {
        width: 70%;
        height: 100%;
      }

      .input-icon {
        border: 2px solid #1b264fc6;
        height: 20px;
        width: 20px;

        text-align: center;
        border-radius: 5px;
      }

      .input-text {
        display: flex;
        float: left;
        padding: none;
        width: 80%;

        margin: none;
        margin-bottom: 3%;
      }

      .input-hp {
        width: 100%;
        height: auto;
        padding: 0;
        margin: 0;
        margin-left: 10px;
        text-align: justify;
      }

      .input-hp h3 {
        font-size: 10px;
        margin: 0;
        padding-bottom: 0;
      }

      .input-hp p {
        font-size: 8px;
        margin-top: 4px;
        margin-bottom: 0;
      }

      .input-hp:hover {
        border-bottom: #f5c1bc 2px solid;
        transition-timing-function: ease;
        width: 100%;
      }
    `,
  ];

  @state()
  private search = '';

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
    e.preventDefault();
    if (e.key === 'Backspace') {
      if (!this.search) {
        this.closeMenu();
      }
      this.search = this.search.slice(0, -1);
    }

    if (e.key === 'Escape') {
      this.closeMenu();
    }

    // Only single characters and no spaces or slashes
    if (/^(?=\S)(?!\/)(.{1})$/.test(e.key)) {
      this.search = this.search + e.key.toLowerCase();
    }
  }

  private onSelectItem(editorCommand: EditorCommand): void {
    editorCommand.command();
    this.closeMenu();
  }

  private renderBlockItems(): TemplateResult[] {
    const filteredItems = searchCommands(this.search, 'block');

    return filteredItems.map(
      (editorCommand: EditorCommand) =>
        html`<div @click=${() => editorCommand.command()} class="input-text">
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
    this.search = (e.target as HTMLInputElement).value;
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
            value=${this.search} />
        </div>
        <br />
        ${this.renderBlockItems()}
      </div>
    </div> `;
  }
}
