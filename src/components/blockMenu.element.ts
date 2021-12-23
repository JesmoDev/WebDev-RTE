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
        height: 700px;
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
        height: 40px;
        width: 40px;

        text-align: center;
        border-radius: 5px;
      }

      .input-text {
        display: flex;
        float: left;
        padding-bottom: 12px;
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

      .input-hp:hover {
        border-bottom: #f5c1bc 4px solid;
        transition-timing-function: ease;
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
          <input type="text" id="input" name="input" value="Search..." />
        </div>
        <br />
        <div class="input-text">
          <div class="input-icon">
            <img src="src/img/icons/carbon_letter-aa-large-2.svg" alt="" />
          </div>
          <div class="input-hp">
            <h3>Text</h3>
            <p>Just start writing with plain text</p>
          </div>
        </div>
        <div class="input-text">
          <div class="input-icon">
            <img src="src/img/icons/H1Vector-1.svg" alt="" />
          </div>
          <div class="input-hp">
            <h3>Heading 1</h3>
            <p>Biggest section heading</p>
          </div>
        </div>
        <div class="input-text">
          <div class="input-icon">
            <img src="src/img/icons/H2Vector-3.svg" alt="" />
          </div>
          <div class="input-hp">
            <h3>Heading 2</h3>
            <p>Bigger section heading</p>
          </div>
        </div>
        <div class="input-text">
          <div class="input-icon">
            <img src="src/img/icons/H3Vector-2.svg" alt="" />
          </div>
          <div class="input-hp">
            <h3>Heading 3</h3>
            <p>Big section heading</p>
          </div>
        </div>
        <div class="input-text">
          <div class="input-icon">
            <img src="src/img/icons/H4Vector.svg" alt="" />
          </div>
          <div class="input-hp">
            <h3>Heading 4</h3>
            <p>Small section heading</p>
          </div>
        </div>
        <div class="input-text">
          <div class="input-icon">
            <img src="src/img/icons/H5Vector-4.svg" alt="" />
          </div>
          <div class="input-hp">
            <h3>Heading 5</h3>
            <p>Smaller section heading</p>
          </div>
        </div>
        <div class="input-text">
          <div class="input-icon">
            <img src="src/img/icons/H6Vector-5.svg" alt="" />
          </div>
          <div class="input-hp">
            <h3>Heading 6</h3>
            <p>Smallest section heading</p>
          </div>
        </div>
        <div class="input-text">
          <div class="input-icon">
            <img src="src/img/icons/IMGGroup.svg" alt="" />
          </div>
          <div class="input-hp">
            <h3>Image</h3>
            <p>Add an image</p>
          </div>
        </div>
        <div class="input-text">
          <div class="input-icon">
            <img src="src/img/icons/Bullet listVector.svg" alt="" />
          </div>
          <div class="input-hp">
            <h3>Bullet list</h3>
            <p>Simple bulleted list</p>
          </div>
        </div>
        <div class="input-text">
          <div class="input-icon">
            <img
              src="src/img/icons/fluent_text-number-list-ltr-24-filled.svg"
              alt="" />
          </div>
          <div class="input-hp">
            <h3>Numbered list</h3>
            <p>List with numbering</p>
          </div>
        </div>
        <div class="input-text">
          <div class="input-icon">
            <img src="src/img/icons/carbon_letter-aa-large-2.svg" alt="" />
          </div>
          <div class="input-hp">
            <h3>Code</h3>
            <p>Code snippets</p>
          </div>
        </div>
      </div>
    </div> `;
  }
}
