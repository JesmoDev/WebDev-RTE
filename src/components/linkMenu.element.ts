import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { MenuBase } from '../abstracts/MenuBase';
import { getCommands, editor } from '../helpers/editorHelper';

@customElement('link-menu')
export class LinkMenuElement extends MenuBase {
  static styles = [
    ...MenuBase.styles,
    css`
      :host {
        padding: 12px;
      }

      #element {
      }

      input {
        box-sizing: border-box;
        outline: none;
        width: 100%;
        font-size: inherit;
        font-family: inherit;
        padding: 6px 8px;
        background: white;
        border: solid 1px #c7c7c7;
        border-radius: 2px;
      }
    `,
  ];

  @state()
  private _url = '';

  protected firstUpdated(): void {
    const input = this.shadowRoot.getElementById('input');
    input.focus();
  }

  private onKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Enter' && this._url) {
      e.preventDefault();

      //insert https:// if missing.
      const url = this.isValidHttpUrl(this._url)
        ? this._url
        : `https://${this._url}`;

      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run();

      this.closeMenu();
    }

    if (e.key === 'Escape') {
      this.closeMenu();
    }
  }

  private onInput(e: InputEvent) {
    this._url = (e.target as HTMLInputElement).value;
  }

  private isValidHttpUrl(string) {
    let url;

    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }

    return url.protocol === 'http:' || url.protocol === 'https:';
  }

  protected render(): TemplateResult {
    return html`<input
      id="input"
      @keydown=${this.onKeyDown}
      @input=${this.onInput}
      value=${this._url}
      type="text" />`;
  }
}
