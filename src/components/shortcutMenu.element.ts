import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("shortcut-menu")
export class ShortcutMenuElement extends LitElement {
  static styles = [
    css`
      :host {
        position: sticky;
        width: 300px;
        height: 500px;
        opacity: 0.5;
        top: 175px;
        background: lightgray;
        box-sizing: border-box;
      }

      :host(:hover) {
        opacity: 1;
      }

      #shortcut-menu {
        box-sizing: border-box;
      }

      input {
        box-sizing: border-box;
        width: 100%;
      }

      .shortcut {
        display: flex;
      }
    `,
  ];

  @state()
  search = "what";

  @state()
  shortCuts: { keys: string; description: string }[] = [
    { keys: "ctrl + b", description: "toggle text bold" },
  ];

  renderShortcutList() {
    return this.shortCuts.map(
      (shortcut) => html`<div>
        <div>${shortcut.keys}</div>
        <div>${shortcut.description}</div>
      </div>`
    );
  }

  protected render() {
    return html`<div id="shortcut-menu">
      <div><input type="text" /></div>
      <div>${this.renderShortcutList()}</div>
    </div>`;
  }
}
