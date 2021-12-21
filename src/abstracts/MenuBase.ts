import { css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { focusEditor } from '../helpers/editorHelper';

export abstract class MenuBase extends LitElement {
  static styles = [
    css`
      :host {
        position: absolute;
        z-index: 100;
      }
    `,
  ];

  parent: HTMLElement;

  @property({ attribute: false })
  public position: { top: number; left: number };

  private onClickHandler = this.onClick.bind(this);
  private onClick(e: MouseEvent): void {
    if (e.target !== this) {
      this.closeMenu();
    }
  }

  connectedCallback(): void {
    this.style.top = `${this.position.top + this.parentElement.scrollTop}px`;
    this.style.left = `${this.position.left - this.parentElement.offsetLeft}px`;

    this.parent = this.parentElement;
    super.connectedCallback();
    this.parent.addEventListener('click', this.onClickHandler);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    this.parent.removeEventListener('click', this.onClickHandler);
  }

  protected closeMenu(): void {
    focusEditor();
    this.parent.removeEventListener('click', this.onClickHandler);
    this.remove();
  }
}
