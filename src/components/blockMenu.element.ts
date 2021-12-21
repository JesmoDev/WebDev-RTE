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
        height: 65vh;
        width: 300px;
        padding: 2px;
        padding-left: 5px;
        border-radius: 5px;
        background-color: #f3f3f3;
      }
      .mainBlockMenu img {
        width: 40px;
        height: 25;
        border: black 1px solid;
        border-radius: 5px;
        box-shadow: 1px 1px 1px 1px grey;
      }

      .input-field input {
        margin-top: 5px;
        height: 20px;
        width: 250px;
      }

      .input-text {
        display: flex;
        float: left;
        padding-bottom: 8px;
        width: 260px;
      }
      .input-hp {
        width: 200px;
        height: 40px;
        padding: 0;
        margin: 0;

        margin-left: 20px;
        text-align: justify;
      }

      .input-hp h3 {
        font-size: 15px;
        margin: 0;
        padding-bottom: 3px;
      }

      .input-hp p {
        font-size: 10px;
        margin-top: 4px;
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
    const filteredItems = searchCommands(this.search);

    return filteredItems.map(
      (editorCommand: EditorCommand) =>
        html`<div @click=${() => this.onSelectItem(editorCommand)}>
          ${editorCommand.name}${editorCommand.description}
        </div>`
    );
  }

  protected render(): TemplateResult {
    return html`<div id="block-menu">
      <div class="mainBlockMenu">
        <div class="input-field">
          <input type="text" id="input" name="input" value="input" />
        </div>
        <br />
        <div class="input-text">
          <img src="carbon_letter-aa-large-2.svg" alt="" />
          <div class="input-hp">
            <h3>text</h3>
            <p>just start writing with plain text</p>
          </div>
        </div>
        <div class="input-text">
          <img src="carbon_letter-aa-large-2.svg" alt="" />
          <div class="input-hp">
            <h3>heading 1</h3>
            <p>biggest section heading</p>
          </div>
        </div>
        <div class="input-text">
          <img src="carbon_letter-aa-large-2.svg" alt="" />
          <div class="input-hp">
            <h3>heading 2</h3>
            <p>bigger section heading</p>
          </div>
        </div>
        <div class="input-text">
          <img src="carbon_letter-aa-large-2.svg" alt="" />
          <div class="input-hp">
            <h3>heading 3</h3>
            <p>big section heading</p>
          </div>
        </div>
        <div class="input-text">
          <img src="carbon_letter-aa-large-2.svg" alt="" />
          <div class="input-hp">
            <h3>heading 4</h3>
            <p>small section heading</p>
          </div>
        </div>
        <div class="input-text">
          <img src="carbon_letter-aa-large-2.svg" alt="" />
          <div class="input-hp">
            <h3>heading 5</h3>
            <p>smaller section heading</p>
          </div>
        </div>
        <div class="input-text">
          <img src="carbon_letter-aa-large-2.svg" alt="" />
          <div class="input-hp">
            <h3>heading 6</h3>
            <p>smallest section heading</p>
          </div>
        </div>
        <div class="input-text">
          <img src="carbon_letter-aa-large-2.svg" alt="" />
          <div class="input-hp">
            <h3>image</h3>
            <p>just add an image</p>
          </div>
        </div>
        <div class="input-text">
          <img src="carbon_letter-aa-large-2.svg" alt="" />
          <div class="input-hp">
            <h3>bullet list</h3>
            <p>simple bulleted list</p>
          </div>
        </div>
        <div class="input-text">
          <img src="carbon_letter-aa-large-2.svg" alt="" />
          <div class="input-hp">
            <h3>numbered list</h3>
            <p>list with numbering</p>
          </div>
        </div>
        <div class="input-text">
          <img src="carbon_letter-aa-large-2.svg" alt="" />
          <div class="input-hp">
            <h3>code</h3>
            <p>code snippets</p>
          </div>
        </div>
      </div>
    </div> `;
  }
}
