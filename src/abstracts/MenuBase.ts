import { css, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { editor } from '../helpers/editorHelper';

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

  @state()
  _position: { top: number; left: number };

  @property({ attribute: false })
  public get position() {
    return this._position;
  }
  public set position(newValue: { top: number; left: number }) {
    const oldValue = this._position;
    this._position = newValue;
    this.updatePosition();
    this.requestUpdate('position', oldValue);
  }

  private onClickHandler = this.onClick.bind(this);
  private onClick(e: MouseEvent): void {
    if (e.target !== this) {
      this.closeMenu();
    }
  }

  updatePosition(): void {
    if (this.position) {
      this.style.top = `${this.position.top + this.parent.scrollTop}px`;
      this.style.left = `${this.position.left - this.parent.offsetLeft}px`;
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.parent = this.parentElement;
    this.updatePosition();

    this.parent.addEventListener('click', this.onClickHandler);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.parent.removeEventListener('click', this.onClickHandler);
  }

  protected closeMenu(): void {
    editor.view.focus();
    this.dispatchEvent(new CustomEvent('onClose'));
    this.parent.removeEventListener('click', this.onClickHandler);
    this.remove();
  }
}
