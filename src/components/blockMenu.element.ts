import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("block-menu")
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
  search = "what";

  @state()
  _open = false;

  @property({ attribute: false })
  blockItems = [];

  @property({ attribute: false })
  position: { top: number; left: number };

  @property({ type: Boolean })
  get open() {
    return this._open;
  }
  set open(newValue) {
    const oldValue = this._open;
    this._open = newValue;
    this.onOpenChange(newValue);
    this.requestUpdate("open", oldValue);
  }

  disconnectedCallback(): void {
    document.removeEventListener("keydown", this.onKeyDownHandler);
  }

  private onKeyDownHandler = this.onKeyDown.bind(this);
  private onKeyDown(e: KeyboardEvent) {
    if (e.key === "Backspace") {
      this.search = this.search.slice(0, -1);
    }
    // Only single characters and no spaces or slashes
    if (/^(?=\S)(?!\/)(.{1})$/.test(e.key)) {
      this.search = this.search + e.key.toLowerCase();
    }
  }

  private onOpenChange(open: boolean): void {
    if (open) {
      document.addEventListener("keydown", this.onKeyDownHandler);
      this.style.display = "block";
      this.style.top = `${this.position.top}px`;
      this.style.left = `${this.position.left}px`;
    } else {
      document.removeEventListener("keydown", this.onKeyDownHandler);
      this.style.display = "none";
      this.search = "";
    }
  }

  private onSelectItem(command: Function) {
    command();

    const event = new CustomEvent("close");
    this.dispatchEvent(event);
  }

  private renderBlockItems(): Array<Object> {
    const filteredItems = this.blockItems.filter((x) =>
      x.display.toLowerCase().includes(this.search)
    );

    return filteredItems.map(
      (block) =>
        html`<div @click=${() => this.onSelectItem(block.command)}>
          ${block.display}${block.description}
        </div>`
    );
  }

  protected render() {
    return html`<div id="block-menu">${this.renderBlockItems()}</div>`;
  }
}
