import { LitElement, html, css } from 'lit';

/**
 * @element uui-ref-list
 */
export class UUIRefListElement extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }

      ::slotted(*:not(:first-child)) {
        margin-top: 1px;
      }
      ::slotted(*:not(:first-child))::before {
        content: '';
        position: absolute;
        top: -1px;
        width: 100%;
        border-top: 1px solid lightgrey;
      }
    `,
  ];

  render() {
    return html`<slot></slot>`;
  }
}
