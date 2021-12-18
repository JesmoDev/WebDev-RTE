import "../main";
import { LitElement, html, css } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import { Editor, Command, Node } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import { BlockMenuElement } from "./blockMenu.element";
import Underline from "@tiptap/extension-underline";

@customElement("rich-text-editor")
export class RichTextEditorElement extends LitElement {
  static styles = [
    css`
      :host {
        font-family: "Roboto", sans-serif;
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

  startContent = {
    type: "doc",
    content: [
      {
        type: "heading",
        attrs: {
          level: 1,
        },
        content: [
          {
            type: "text",
            text: "Heading 1",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum erat ligula, efficitur quis mauris a, accumsan efficitur eros. Sed eu porttitor enim, et venenatis sapien. Donec quis consequat neque. Aliquam gravida metus a mauris consectetur semper. Sed sed mattis odio. Vestibulum pulvinar libero eros, in cursus nulla hendrerit eu. Curabitur pellentesque mi urna, vel vestibulum leo euismod sit amet. Fusce suscipit augue sit amet leo bibendum pretium. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse tristique fringilla lorem, nec accumsan lacus pellentesque sit amet. Morbi sagittis porta rutrum. Morbi a cursus ante. Phasellus ac diam elit.",
          },
        ],
      },
      {
        type: "heading",
        attrs: {
          level: 2,
        },
        content: [
          {
            type: "text",
            text: "Quote",
          },
        ],
      },
      {
        type: "blockquote",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Nam ullamcorper rutrum turpis, eu faucibus velit tincidunt laoreet. Vestibulum aliquam ligula et nulla faucibus, a iaculis metus fermentum. Mauris at augue eu sapien bibendum lacinia. Integer semper lobortis nulla a molestie. Suspendisse hendrerit turpis vehicula, scelerisque sapien ut, malesuada augue. Fusce nunc orci, cursus non molestie ac, posuere a sem. In laoreet risus eget",
              },
            ],
          },
        ],
      },
      {
        type: "heading",
        attrs: {
          level: 3,
        },
        content: [
          {
            type: "text",
            text: "Bullet List",
          },
        ],
      },
      {
        type: "bulletList",
        content: [
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "Yo",
                  },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "This is cool",
                  },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "bullet list",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "heading",
        attrs: {
          level: 3,
        },
        content: [
          {
            type: "text",
            text: "Numbered list",
          },
        ],
      },
      {
        type: "orderedList",
        attrs: {
          start: 1,
        },
        content: [
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "Hello",
                  },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "This is in order",
                  },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "yea",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "heading",
        attrs: {
          level: 3,
        },
        content: [
          {
            type: "text",
            text: "Code block",
          },
        ],
      },
      {
        type: "codeBlock",
        attrs: {
          language: "jsx",
        },
        content: [
          {
            type: "text",
            text: 'firstUpdated() {\n    const mountElement = this.shadowRoot.querySelector(".rte-editor");\n\n    this.editor = new Editor({\n      element: mountElement,\n      extensions: [StarterKit],\n      content: "<p>Hello World!</p>",\n    });\n  }\n',
          },
        ],
      },
    ],
  };

  @state()
  editor: Editor;

  @state()
  blockMenuOpen = false;

  // NON STATE VARIABLES //
  lastSlashPosition = 0; // used to know where the / is when trying to close the block menu by deleting the / that triggered it
  lastCaretPosition = 0; // used to return to the correct position when refocusing the editor

  // Implement aliases and more
  //TODO: Move this into the blockMenu or a separate container file
  blockList = [
    {
      display: "Heading 1",
      description: "Big text",
      command: () =>
        this.commandFromBlockMenu(() =>
          this.editor.commands.setHeading({ level: 1 })
        ),
    },
    {
      display: "Text",
      description: "normal text",
      command: () =>
        this.commandFromBlockMenu(() =>
          this.editor.commands.setHeading({ level: 2 })
        ),
    },
    {
      display: "Bold",
      description: "bold text",
      command: () =>
        this.commandFromBlockMenu(() =>
          this.editor.commands.setHeading({ level: 3 })
        ),
    },
  ];

  @query("#block-menu")
  blockMenu: BlockMenuElement;

  firstUpdated() {
    const mountElement = this.shadowRoot.getElementById("editor");

    this.editor = new Editor({
      element: mountElement,
      extensions: [StarterKit, Underline],
      content: this.startContent,
    });
    this.editor.on("update", () => this.onEditorUpdate());
    this.editor.on("focus", () => this.onEditorFocus());
    this.editor.on("blur", () => this.onEditorBlur());

    this.editor.view.focus();
  }

  onEditorUpdate() {
    // this.requestUpdate(); // This is only for the render and JSON previews
  }

  onEditorFocus() {
    this.editor.view.focus();
    this.editor.commands.setTextSelection(this.lastCaretPosition);
  }

  onEditorBlur() {
    this.lastCaretPosition = this.getCaretPos;
  }

  onKeydown(e: KeyboardEvent) {
    if (this.blockMenuOpen) {
      const caretPos = this.getCaretPos;

      const characterBefore = this.editor.state.doc.textBetween(
        caretPos - 1,
        caretPos
      );

      const beforeIsOriginalPosition = caretPos - 1 === this.lastSlashPosition;
      const shouldCloseBlockMenu =
        (e.key === "Backspace" &&
          beforeIsOriginalPosition &&
          characterBefore === "/") ||
        e.key === "Escape";

      if (shouldCloseBlockMenu) {
        this.blockMenuOpen = false;
      }
    }

    if (e.key === "/" && !this.blockMenuOpen) {
      if (this.hasSelection) {
        // Dont type the / if there is a selection
        e.preventDefault();
      }
      this.lastSlashPosition = this.getCaretPos;
      console.log("hello", this.lastSlashPosition);

      this.openBlockMenu();
    }
  }

  //TODO: Move this into the blockMenu
  commandFromBlockMenu(command: Function) {
    // if (
    //   this.hasSelection &&
    //   !this.editor.view.endOfTextblock("right") &&
    //   !this.editor.view.endOfTextblock("left")
    // ) {
    //   // Split block at top and bottom, place new block in the middle and focus it
    //   const from = this.editor.state.selection.ranges[0].$from.pos;
    //   const content = this.editor.state.selection.content().content.toJSON();
    //   this.editor.commands.deleteSelection();
    //   this.editor.commands.insertContentAt(from, content);
    //   this.editor.commands.focus(this.getCaretPos - 2);
    // }

    this.editor.view.focus();
    this.editor.commands.setTextSelection({
      from: this.lastSlashPosition,
      to: this.getCaretPos,
    });
    this.editor.commands.deleteSelection();
    command();
  }

  private get getCaretPos(): number {
    if (this.hasSelection) {
      return this.editor.state.selection.$head.pos;
    } else {
      // @ts-ignore // For some reason it doesn't know that $cursor exists
      return this.editor.state.selection.$cursor.pos;
    }
  }

  private get hasSelection(): boolean {
    const from = this.editor.state.selection.ranges[0].$from.pos;
    const to = this.editor.state.selection.ranges[0].$to.pos;

    return to - from > 0;
  }

  openBlockMenu() {
    this.blockMenuOpen = true;
    const cursorPos = this.getCaretPos;
    const pos = this.editor.view.coordsAtPos(cursorPos);

    this.blockMenu.position = pos;
  }

  render() {
    return html`<block-menu
        .blockItems=${this.blockList}
        .open=${this.blockMenuOpen}
        @close=${() => (this.blockMenuOpen = false)}
        id="block-menu"
      ></block-menu>
      <div id="wrapper">
        <div id="content-overview">Content overview</div>
        <div id="editor" @keydown=${this.onKeydown}></div>
        <shortcut-menu .editor=${this.editor}></shortcut-menu>
      </div>`;
  }
}
