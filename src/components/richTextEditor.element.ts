import '../main';
import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Editor } from '@tiptap/core';
import { BlockMenuElement } from './blockMenu.element';
import { initEditor } from '../helpers/editorHelper';

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
        background: #e4e4e4;
        padding: 16px;
      }

      blockquote {
        position: relative;
        border-left: 4px solid black;
        margin-left: 0;
        padding-left: 20px;
      }
    `,
  ];

  @state()
  private _editor: Editor;

  @property({ attribute: false })
  public get editor() {
    return this._editor;
  }
  private set editor(newValue) {
    const oldValue = this._editor;
    this._editor = newValue;
    this.requestUpdate('editor', oldValue);
  }

  // NON STATE VARIABLES //
  private lastSlashPosition = 0; // used to know where the / is when trying to close the block menu by deleting the / that triggered it
  private lastCaretPosition = 0; // used to return to the correct position when refocusing the editor

  firstUpdated() {
    const mountElement = this.shadowRoot.getElementById('editor');

    this.editor = initEditor(this, mountElement);
    this.editor.on('update', () => this.onEditorUpdate());
    this.editor.on('focus', () => this.onEditorFocus());
    this.editor.on('blur', () => this.onEditorBlur());

    this.editor.view.focus();
  }

  private onEditorUpdate(): void {
    // this.requestUpdate(); // This is only for the render and JSON previews
  }

  private onEditorFocus(): void {
    this.editor.view.focus();
    this.editor.commands.setTextSelection(this.lastCaretPosition);
  }

  private onEditorBlur(): void {
    this.lastCaretPosition = this.getCaretPos;
  }

  private onKeydown(e: KeyboardEvent): void {
    if (e.ctrlKey && e.key === 'k') {
      e.preventDefault();
      this.openMenu('block-menu');
    }
  }

  private get getCaretPos(): number {
    if (this.hasSelection) {
      return this.editor.state.selection.$head.pos;
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore // For some reason it doesn't know that $cursor exists
      return this.editor.state.selection.$cursor.pos;
    }
  }

  private get hasSelection(): boolean {
    const from = this.editor.state.selection.ranges[0].$from.pos;
    const to = this.editor.state.selection.ranges[0].$to.pos;

    return to - from > 0;
  }

  private openMenu(tag: string): void {
    const cursorPos = this.getCaretPos;
    const pos = this.editor.view.coordsAtPos(cursorPos);
    // TODO: BlockMenuElement should be replaced by the generic class
    const menu = document.createElement(tag) as BlockMenuElement;
    menu.position = pos;
    menu.onclose = this.onMenuClosed.bind(this);

    const mountElement = this.shadowRoot.getElementById('editor');
    mountElement.insertBefore(menu, mountElement.firstChild);
  }

  private onMenuClosed(): void {
    // do this to delete the slash
    this.editor.view.focus();
    this.editor.commands.setTextSelection({
      from: this.lastSlashPosition,
      to: this.getCaretPos,
    });
    this.editor.commands.deleteSelection();
  }

  protected render(): TemplateResult {
    return html`<div id="wrapper">
      <div class="panel-left"></div>
      <div id="editor" @keydown=${this.onKeydown}></div>
      <div class="panel-right">
        <shortcut-menu></shortcut-menu>
      </div>
    </div>`;
  }
}
