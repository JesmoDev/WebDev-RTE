import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EditorCommand, searchCommands } from '../helpers/editorHelper';
import { MenuBase } from '../abstracts/MenuBase';
@customElement('block-menu')
export class BlockMenuElement extends MenuBase {
  static styles = [
    ...MenuBase.styles,
    css`
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
  private search = '';

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this.onKeyDownHandler);
  }

  firstUpdated() {
    this.style.display = 'block';
    this.style.top = `${this.position.top + this.parentElement.scrollTop}px`;
    this.style.left = `${this.position.left - this.parentElement.offsetLeft}px`;

    // This skips the "k" input
    setTimeout(() => {
      document.addEventListener('keydown', this.onKeyDownHandler);
    }, 0);
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
      <p>${this.search}</p>
      <div>${this.renderBlockItems()}</div>
    </div>`;
  }
}
