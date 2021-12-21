import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EditorCommand, searchCommands } from '../helpers/editorHelper';

@customElement('block-menu')
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
  private search = '';

  @property({ attribute: false })
  public position: { top: number; left: number };

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this.onKeyDownHandler);
  }

  private onKeyDownHandler = this.onKeyDown.bind(this);
  private onKeyDown(e: KeyboardEvent): void {
    e.preventDefault();
    if (e.key === 'Backspace') {
      if (!this.search) {
        this.remove();
      }
      this.search = this.search.slice(0, -1);
    }

    if (e.key === 'Escape') {
      this.remove();
    }

    // Only single characters and no spaces or slashes
    if (/^(?=\S)(?!\/)(.{1})$/.test(e.key)) {
      this.search = this.search + e.key.toLowerCase();
    }
  }

  protected firstUpdated(): void {
    this.style.display = 'block';
    this.style.top = `${this.position.top + this.parentElement.scrollTop}px`;
    this.style.left = `${this.position.left - this.parentElement.offsetLeft}px`;

    // This skips the "k" input
    setTimeout(() => {
      document.addEventListener('keydown', this.onKeyDownHandler);
    }, 0);
  }

  private onSelectItem(editorCommand: EditorCommand): void {
    editorCommand.command();
    this.remove();
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
