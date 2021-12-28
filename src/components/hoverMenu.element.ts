import { html, css, TemplateResult, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { getCommands, editor, rte } from '../helpers/editorHelper';

@customElement('hover-menu')
export class HoverMenuElement extends LitElement {
  static styles = [
    css`
      :host {
        user-select: none;
        width: fit-content;
        border-radius: 4px;
      }
      #hover-menu {
        box-shadow: 0 1px 10px 1px rgba(60, 64, 67, 0.4);
        background-color: #3647ab;
        color: white;
        width: fit-content;
        border-radius: 4px;
        align-items: center;
        display: flex;
        gap: 12px;
      }

      #hover-menu div img {
        width: 18px;
        margin: auto;
      }

      #alignment-group,
      #mark-group {
        width: fit-content;
        display: flex;
      }

      #alignment-group div,
      #mark-group div {
        cursor: pointer;
        width: 32px;
        height: 32px;
        display: flex;
      }

      #alignment-group div:hover,
      #mark-group div:hover,
      #dropdown-text:hover {
        background: #5666c2;
      }

      #dropdown-text {
        width: 64px;
        height: 32px;
        display: flex;
        align-items: center;
        padding-left: 6px;
        border-right: 1px solid #ffffff4d;
      }

      #dropdown-menu {
        position: relative;
      }

      #dropdown-menu::after {
        content: 'V';
        font-family: sans-serif;
        position: absolute;
        top: 11px;
        font-size: 12px;
        right: 8px;
        transform: scaleY(0.6);
      }

      #dropdown-menu:hover #dropdown-list {
        display: block;
      }

      #dropdown-list {
        display: none;
        position: absolute;
        background-color: #3647ab;
        height: 400px;
        width: 150px;
        overflow-y: auto;
      }

      ul {
        padding: 0;
        margin: 0;
      }
      li {
        list-style: none;
        padding: 10px 12px;
      }
      li:hover {
        background: #5666c2;
      }
    `,
  ];

  private handleLink() {
    if (editor.isActive('link')) {
      editor.chain().focus().unsetLink().run();
    } else {
      rte.openMenu('link-menu');
    }
  }

  protected render(): TemplateResult {
    return html`
      <div id="hover-menu">
        <div id="dropdown-menu">
          <div id="dropdown-text">Text</div>
          <div id="dropdown-list">
            <ul>
              ${getCommands().map(
                editorCommand =>
                  html`<li
                    class="dropdown-item"
                    @click=${() => editorCommand.command()}>
                    <div>${editorCommand.name}</div>
                  </li>`
              )}
            </ul>
          </div>
        </div>
        <div id="mark-group">
          <div @click=${() => editor.chain().focus().toggleBold().run()}>
            <img src="src/img/icons/icon8-bold-50.svg" alt="" />
          </div>
          <div @click=${() => editor.chain().focus().toggleItalic().run()}>
            <img src="src/img/icons/icon8-italic-50.svg" alt="" />
          </div>
          <div @click=${() => editor.chain().focus().toggleUnderline().run()}>
            <img src="src/img/icons/icon8-underline-50.svg" alt="" />
          </div>
          <div @click=${() => editor.chain().focus().toggleStrike().run()}>
            <img src="src/img/icons/icon8-strikethrough-50.svg" alt="" />
          </div>
          <div @click=${this.handleLink}>
            <img src="src/img/icons/icon8-link-50.svg" alt="" />
          </div>
        </div>
        <div id="alignment-group">
          <div
            @click=${() => editor.chain().focus().setTextAlign('left').run()}>
            <img src="src/img/icons/icon8-align-left-50.svg" alt="" />
          </div>
          <div
            @click=${() => editor.chain().focus().setTextAlign('center').run()}>
            <img src="src/img/icons/icon8-align-justify-50.svg" alt="" />
          </div>
          <div
            @click=${() => editor.chain().focus().setTextAlign('right').run()}>
            <img src="src/img/icons/icon8-align-right-50.svg" alt="" />
          </div>
        </div>
      </div>
    `;
  }
}
