import '../main';
import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { BlockMenuElement } from './blockMenu.element';
import Underline from '@tiptap/extension-underline';
import exampleContent from '../helpers/exampleContent';

@customElement('rich-text-editor')
export class RichTextEditorElement extends LitElement {
  static styles = [
    css`
      :host {
        font-family: 'Roboto', sans-serif;
        display: flex;
        justify-content: center;
        /* white-space: pre-wrap; */
      }

      [contenteditable]:focus {
        outline: none;
      }

      #wrapper {
        position: relative;
        display: flex;
        gap: 64px;
      }

      #editor {
        width: 700px;
      }

      :host,
      #wrapper,
      #editor,
      .ProseMirror {
        min-height: 100%;
      }

      .ProseMirror {
        overflow: hidden;
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

  @query('#block-menu')
  private blockMenu: BlockMenuElement;

  @state()
  private _editor: Editor;

  @state()
  private blockMenuOpen = false;

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

    this.editor = new Editor({
      element: mountElement,
      extensions: [StarterKit, Underline],
      content: exampleContent,
    });
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
    if (this.blockMenuOpen) {
      const caretPos = this.getCaretPos;

      const characterBefore = this.editor.state.doc.textBetween(
        caretPos - 1,
        caretPos
      );

      const beforeIsOriginalPosition = caretPos - 1 === this.lastSlashPosition;
      const shouldCloseBlockMenu =
        (e.key === 'Backspace' &&
          beforeIsOriginalPosition &&
          characterBefore === '/') ||
        e.key === 'Escape';

      if (shouldCloseBlockMenu) {
        this.blockMenuOpen = false;
      }
    }

    if (e.key === '/' && !this.blockMenuOpen) {
      if (this.hasSelection) {
        // Dont type the / if there is a selection
        e.preventDefault();
      }
      this.lastSlashPosition = this.getCaretPos;

      this.openBlockMenu();
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

  private openBlockMenu(): void {
    this.blockMenuOpen = true;
    const cursorPos = this.getCaretPos;
    const pos = this.editor.view.coordsAtPos(cursorPos);

    this.blockMenu.position = pos;
  }

  private onBlockMenuClosed(): void {
    // do this to delete the slash
    this.editor.view.focus();
    this.editor.commands.setTextSelection({
      from: this.lastSlashPosition,
      to: this.getCaretPos,
    });
    this.editor.commands.deleteSelection();

    this.blockMenuOpen = false;
  }

  protected render(): TemplateResult {
    return html`<div id="wrapper">
        <div id="content-overview">Content overview</div>
        <div id="editor" @keydown=${this.onKeydown}></div>
        <shortcut-menu .rte=${this as RichTextEditorElement}></shortcut-menu>
      </div>
      <block-menu
        .rte=${this as RichTextEditorElement}
        .open=${this.blockMenuOpen}
        @close=${this.onBlockMenuClosed}
        id="block-menu"></block-menu>
      <hover-menu></hover-menu>`;
  }
}
