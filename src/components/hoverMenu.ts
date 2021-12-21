import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { MenuBase } from '../abstracts/MenuBase';

@customElement('hover-menu')
export class ElementTemplateElement extends MenuBase {
  static styles = [
    ...MenuBase.styles,
    css`
      .hovermenu {
        background-color: #3647ab;
        width: 500px;
        border-radius: 5px;
        align-items: center;
      }
      .hovermenu a {
        text-decoration: none;
        color: white;
        font-size: 20px;
        padding: 15px;
        display: inline-block;

        height: auto;
      }

      .hovermenu a img {
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

      ul li ul li a {
        display: block !important;
      }
      ul li ul li:hover {
        background: #3648abc6;
      }
    `,
  ];

  // Internal state with default value: "state default value".
  // Change this to what you need, doesn't have to be called state.
  @state()
  private state = 'state default value';

  // Property that can be accessed from outside component: "property default value".
  // Change this to what you need, doesn't have to be called property.
  @property({ type: String })
  public property = 'property default value';

  private myEvent(e: MouseEvent): void {
    console.log('event fired, you pressed this element', e.target);
  }

  protected render(): TemplateResult {
    return html`
      <div class="hovermenu">
        <ul class="dropdownmenu">
          <li>
            <a href="#">Text</a>
            <ul class="dropdownlist">
              <li><a href="#">Text</a></li>
              <li>
                <a href="#"
                  ><img
                    src="src/img/icons/icons8-header-1-24.png"
                    alt="" />Header 1</a
                >
              </li>
              <li>
                <a href="#"
                  ><img
                    src="src/img/icons/icons8-header-2-24.png"
                    alt="" />Header 2</a
                >
              </li>
              <li>
                <a href="#"
                  ><img
                    src="src/img/icons/icons8-header-3-24.png"
                    alt="" />Header 3</a
                >
              </li>
              <li>
                <a href="#"
                  ><img src="src/img/icons/icons8-list-48.png" alt="" />Bullet
                  List</a
                >
              </li>
              <li>
                <a href="#"
                  ><img
                    src="src/img/icons/icons8-number-list-format-in-acending-sequence-order-48.png"
                    alt="" />Numeric List</a
                >
              </li>
              <li>
                <a href="#"
                  ><img src="src/img/icons/icons8-code-48.png" alt="" />Code</a
                >
              </li>
            </ul>
          </li>
        </ul>
        <a href="#"><img src="src/img/icons/icons8-bold-50.png" alt="" /></a>
        <a href="#"><img src="src/img/icons/icons8-italic-50.png" alt="" /></a>
        <a href="#"
          ><img src="src/img/icons/icons8-underline-50.png" alt=""
        /></a>
        <a href="#"
          ><img src="src/img/icons/icons8-strikethrough-50.png" alt=""
        /></a>
        <a href="#"><img src="src/img/icons/icons8-link-50.png" alt="" /></a>
        <a href="#"
          ><img src="src/img/icons/icons8-align-left-50.png" alt=""
        /></a>
        <a href="#"
          ><img src="src/img/icons/icons8-align-justify-50.png" alt=""
        /></a>
        <a href="#"
          ><img src="src/img/icons/icons8-align-right-50.png" alt=""
        /></a>
      </div>
    `;
  }
}
