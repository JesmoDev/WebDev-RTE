import { html, css, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { MenuBase } from '../abstracts/MenuBase';
import { getCommands, editor } from '../helpers/editorHelper';

@customElement('hover-menu')
export class HoverMenuElement extends MenuBase {
  static styles = [
    ...MenuBase.styles,
    css`
      .hover-menu {
        background-color: #3647ab;
        width: 500px;
        border-radius: 5px;
        align-items: center;
      }
      .hover-menu div {
        text-decoration: none;
        color: white;
        font-size: 20px;
        padding: 15px;
        display: inline-block;

        height: auto;
      }

      .hover-menu div img {
        width: 20px;
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
        background: #3647ab;
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
        background: #3647ab;
        display: block;
      }

      .dropdownlist li {
        height: auto;
      }
      .dropdownlist li img {
        width: 24px;
        float: left;
      }
      .dropdownlist li a {
        font-size: 18px;
        text-align: center;
      }

      ul li ul li div {
        display: block !important;
      }
      ul li ul li:hover {
        background: #3648abc6;
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
        <div @click=${() => editor.commands.toggleBold()}>
          <img src="src/img/icons/icon8-bold-50.svg" alt="" />
        </div>
        <div @click=${() => editor.commands.toggleItalic()}>
          <img src="src/img/icons/icon8-italic-50.svg" alt="" />
        </div>
        <div @click=${() => editor.commands.toggleUnderline()}>
          <img src="src/img/icons/icon8-underline-50.svg" alt="" />
        </div>
        <div @click=${() => editor.commands.toggleStrike()}>
          <img src="src/img/icons/icon8-strikethrough-50.svg" alt="" />
        </div>
        <div><img src="src/img/icons/icon8-link-50.svg" alt="" /></div>
        <div @click=${() => editor.commands.setTextAlign('left')}>
          <img src="src/img/icons/icon8-align-left-50.svg" alt="" />
        </div>
        <div @click=${() => editor.commands.setTextAlign('center')}>
          <img src="src/img/icons/icon8-align-justify-50.svg" alt="" />
        </div>
        <div @click=${() => editor.commands.setTextAlign('right')}>
          <img src="src/img/icons/icon8-align-right-50.svg" alt="" />
        </div>
      </div>
    `;
  }
}
