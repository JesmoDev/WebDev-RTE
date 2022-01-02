import '../main';
import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Editor } from '@tiptap/core';
import { initEditor } from '../helpers/editorHelper';
import { MenuBase } from '../abstracts/MenuBase';
@customElement('rich-text-editor')
export class RichTextEditorElement extends LitElement {
  static styles = [
    css`
      :host {
        width: 100%;
        font-family: 'Roboto', sans-serif;
        display: flex;
        justify-content: center;
        overflow-y: auto;
        /* white-space: pre-wrap; */
        background: #f8f9fa;
      }

      [contenteditable]:focus {
        outline: none;
      }

      #wrapper {
        display: grid;
        height: max-content;
        min-height: 100%;
        grid-template-columns: 300px auto 300px;
        gap: 64px;
        padding: 16px 0px;
        box-sizing: border-box;
      }

      #editor {
        display: flex;
        box-sizing: border-box;
        position: relative;
        width: 816px;
        background: white;
        grid-column-start: 2;
        padding: 101px;
        box-shadow: 0 1px 3px 1px rgba(60, 64, 67, 0.15);
      }

      :host,
      #editor,
      .ProseMirror {
        height: 100%;
      }

      .ProseMirror {
        flex-grow: 1;
        inset: 0;
      }

      .panel-left,
      .panel-right {
        height: fit-content;
        position: sticky;
        top: 0;

        width: 100%;
        /* border: 1px solid black; */
        opacity: 0.5;
        transition: opacity 100ms ease-in;
        overflow-y: auto;
      }

      .panel-left:hover,
      .panel-right:hover,
      .panel-left:focus-within,
      .panel-right:focus-within {
        opacity: 1;
      }

      pre {
        box-sizing: border-box;
        background: #ecedec;
        border-radius: 4px;
        border: solid 1px #c7c7c7;
        margin: 0;
        width: 100%;
        padding: 16px;
        white-space: pre-wrap; /* css-3 */
      }

      pre code {
        background: none;
        padding: 0;
        border-radius: 0;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-family: 'Montserrat', sans-serif;
      }

      code {
        padding: 2px 4px;
        border-radius: 4px;
        background: #ecedec;
        font-size: 0.8em;
        font-family: 'Roboto Mono', monospace;
      }

      blockquote {
        position: relative;
        border-left: 4px solid #3647ab;
        margin-left: 0;
        padding-left: 20px;
      }
    `,
  ];

  @state()
  private _editor: Editor;

  @state()
  private _currentMenu: MenuBase;

  // NON STATE VARIABLES //
  private lastSlashPosition = 0; // used to know where the / is when trying to close the block menu by deleting the / that triggered it
  private lastCaretPosition = 0; // used to return to the correct position when refocusing the editor

  firstUpdated() {
    const mountElement = this.shadowRoot.getElementById('editor');
    const hoverMenu = this.shadowRoot.getElementById('hover-menu');

    this._editor = initEditor(this, mountElement, hoverMenu);
    this._editor.on('update', () => this.onEditorUpdate());
    this._editor.on('focus', () => this.onEditorFocus());
    this._editor.on('blur', () => this.onEditorBlur());

    this._editor.view.focus();
  }

  private onEditorUpdate(): void {
    // this.requestUpdate(); // This is only for the render and JSON previews
  }

  private onEditorFocus(): void {
    // this._editor.view.focus();
    // this._editor.commands.setTextSelection(this.lastCaretPosition);
  }

  private onEditorBlur(): void {
    // this.lastCaretPosition = this.getCaretPos;
  }

  private onKeydown(e: KeyboardEvent): void {
    if (e.ctrlKey && e.key === 'k') {
      e.preventDefault();
      if (!(this._currentMenu instanceof MenuBase)) {
        this.openMenu('block-menu');
      }
    }
  }

  private get getCaretPos(): number {
    if (this.hasSelection) {
      return this._editor.state.selection.$head.pos;
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore // For some reason it doesn't know that $cursor exists
      return this._editor.state.selection.$cursor.pos;
    }
  }

  private get hasSelection(): boolean {
    const from = this._editor.state.selection.ranges[0].$from.pos;
    const to = this._editor.state.selection.ranges[0].$to.pos;

    return to - from > 0;
  }

  public openMenu(tag: string): void {
    const pos = this._editor.view.coordsAtPos(this.getCaretPos);
    const menu = document.createElement(tag) as MenuBase;
    this._currentMenu = menu;

    const mountElement = this.shadowRoot.getElementById('editor');
    mountElement.insertBefore(menu, mountElement.firstChild);
    menu.position = {
      top: pos.top + this.scrollTop,
      left: pos.left + this.scrollLeft,
    };
    menu.addEventListener('onClose', () => (this._currentMenu = null));
  }

  protected render(): TemplateResult {
    return html`<div id="wrapper">
      <div class="panel-left"></div>
      <div id="editor" @keydown=${this.onKeydown}></div>
      <div class="panel-right">
        <shortcut-panel></shortcut-panel>
      </div>
      <hover-menu id="hover-menu"></hover-menu>
    </div>`;
  }
}
