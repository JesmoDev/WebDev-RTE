import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("shortcut-menu")
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
        display: flex;
        cursor: pointer;
        padding: 8px 12px;
      }

      .shortcut:hover {
        background: grey;
      }

      .shortcut span {
        text-align: right;
        flex-grow: 1;
      }
    `,
  ];

  @state()
  search = "";

  @state()
  //TODO: Move to a separate container file
  shortCuts: { keys: string; alias: string; description: string }[] = [
    { keys: "ctrl + b", alias: "bold", description: "toggle text bold" },
    { keys: "ctrl + i", alias: "italic", description: "toggle text italic" },
    {
      keys: "ctrl + alt + 1-3",
      alias: "heading",
      description: "toggle headings",
    },
  ];

  renderShortcutList() {
    const filteredItems = this.shortCuts.filter((x) =>
      x.alias.toLocaleLowerCase().includes(this.search)
    );

    return filteredItems.map(
      (shortcut) => html`<div class="shortcut">
        <b>${shortcut.keys}</b>
        <span>${shortcut.description}</span>
      </div>`
    );
  }

  private onInput(e: InputEvent) {
    this.search = (e.target as HTMLInputElement).value;
  }

  protected render() {
    return html`<div id="shortcut-menu">
      <h2>Shortcuts</h2>
      <div>
        <input @input=${this.onInput} value=${this.search} type="text" />
      </div>
      <div>${this.renderShortcutList()}</div>
    </div>`;
  }
}
