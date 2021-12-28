import { html, css, TemplateResult, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { getCommands, editor } from '../helpers/editorHelper';

@customElement('hover-menu')
export class HoverMenuElement extends LitElement {
  static styles = [
    css`
      :host {
        user-select: none;
      }
      .hover-menu {
        background-color: #1b264f;
        width: 29%;
        border-radius: 5px;
        align-items: center;
      }
      .hover-menu div {
        text-decoration: none;
        color: white;
        font-size: 15px;
        padding: 15px;
        display: inline-block;

        height: auto;
      }

      .hover-menu div img {
        width: 12px;
      }
      ul {
        display: inline;
        margin: 0;
        padding: 0;
      }
      ul li {
        display: inline-block;
      }
      ul li:hover {
        background: #1b264f;
      }
      ul li:hover ul {
        display: block;
      }
      ul li ul {
        position: absolute;
        width: 200px;
        display: none;
      }
      ul li ul li {
        background: #1b264f;
        display: block;
      }

      .dropdownlist li {
        height: auto;
      }
      .dropdownlist li img {
        width: 15px;
        float: left;
      }
      .dropdownlist li a {
        font-size: 12px;
        text-align: center;
      }

      ul li ul li div {
        display: block !important;
      }
      ul li ul li:hover {
        background: #3648abc6;
        ul li ul li:hover {
          background: #f5c1bc;
        }
        ul li ul li div:hover {
          color: #1b264f;
        }
      }
    `,
  ];

  protected render(): TemplateResult {
    return html`
      <div class="hover-menu">
        <ul class="dropdownmenu">
          <li>
            <div>Text</div>
            <ul class="dropdownlist">
              ${getCommands().map(
                editorCommand =>
                  html`<li @click=${() => editorCommand.command()}>
                    <div>${editorCommand.name}</div>
                  </li>`
              )}
            </ul>
          </li>
        </ul>
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
        <div><img src="src/img/icons/icon8-link-50.svg" alt="" /></div>
        <div @click=${() => editor.chain().focus().setTextAlign('left').run()}>
          <img src="src/img/icons/icon8-align-left-50.svg" alt="" />
        </div>
        <div
          @click=${() => editor.chain().focus().setTextAlign('center').run()}>
          <img src="src/img/icons/icon8-align-justify-50.svg" alt="" />
        </div>
        <div @click=${() => editor.chain().focus().setTextAlign('right').run()}>
          <img src="src/img/icons/icon8-align-right-50.svg" alt="" />
        </div>
      </div>
    `;
  }
}
