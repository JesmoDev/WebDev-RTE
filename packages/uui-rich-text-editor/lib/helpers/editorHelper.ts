/* eslint-disable import/no-named-as-default */
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import { UUIRichTextEditorElement } from '../uui-rich-text-editor.element';
import Link from '@tiptap/extension-link';
import exampleContent from './exampleContent';
import BubbleMenu from '@tiptap/extension-bubble-menu';

export interface EditorCommand {
  name: string;
  description: string;
  aliases: string[];
  keyboardShortcut: string[];
  command(): void;
  icon: string;
  tags: string[];
}

let editor: Editor;
let rte: UUIRichTextEditorElement;

export { editor, rte };

export const initEditor = (
  rteElement: UUIRichTextEditorElement,
  mountElement: Element,
  hoverMenu: HTMLElement
): Editor => {
  if (editor) {
    return editor;
  } else {
    editor = new Editor({
      element: mountElement,
      extensions: [
        StarterKit,
        Underline,
        Image,
        Link.configure({
          openOnClick: false,
        }),
        BubbleMenu.configure({
          element: hoverMenu,
        }),
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
      ],
      content: exampleContent,
    });
    rte = rteElement;
    return editor;
  }
};

export const searchCommands = (
  search: string,
  tag?: string
): EditorCommand[] => {
  const filtered = getCommands().filter(
    x =>
      (x.name.toLocaleLowerCase().includes(search) ||
        x.aliases.some(y => y.includes(search))) &&
      (tag ? x.tags.some(z => z.includes(tag)) : true)
  );

  return filtered;
};

export const getCommands = (): EditorCommand[] => [
  {
    name: 'bold',
    description: 'make text bold',
    aliases: ['heavy'],
    keyboardShortcut: ['ctrl', 'b'],
    tags: [],
    icon: '',
    command: () => editor.chain().focus().toggleBold().run(),
  },
  {
    name: 'italicize',
    description: 'make text italic',
    aliases: ['cursive', 'italic'],
    keyboardShortcut: ['ctrl', 'i'],
    tags: [],
    icon: '',
    command: () => editor.chain().focus().toggleItalic().run(),
  },
  {
    name: 'underline',
    description: 'underline text',
    aliases: [''],
    keyboardShortcut: ['ctrl', 'u'],
    tags: [],
    icon: '',
    command: () => editor.chain().focus().toggleUnderline().run(),
  },
  {
    name: 'strikethrough',
    description: 'strike text',
    aliases: [''],
    keyboardShortcut: ['ctrl', 'shift', 'x'],
    command: () => editor.chain().focus().toggleStrike().run(),
    tags: [],
    icon: '',
  },
  {
    name: 'code',
    description: 'make code text',
    aliases: [''],
    keyboardShortcut: ['ctrl', 'e'],
    command: () => editor.chain().focus().toggleCode().run(),
    tags: [],
    icon: '',
  },
  {
    name: 'text',
    description: 'paragraph',
    aliases: ['p', 'paragraph', 'word'],
    keyboardShortcut: ['ctrl', 'alt', '0'],
    command: () => editor.commands.setParagraph(),
    tags: ['block'],
    icon: 'packages/uui-rich-text-editor/lib/img/icons/carbon_letter-aa-large-2.svg',
  },
  {
    name: 'heading 1',
    description: 'set heading 1',
    aliases: ['h1', 'head1', 'header1', 'heading1'],
    keyboardShortcut: ['ctrl', 'alt', '1'],
    command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    tags: ['block'],
    icon: 'packages/uui-rich-text-editor/lib/img/icons/H1Vector.svg',
  },
  {
    name: 'heading 2',
    description: 'set heading 2',
    aliases: ['h2', 'head2', 'header2', 'heading2'],
    keyboardShortcut: ['ctrl', 'alt', '2'],
    command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    tags: ['block'],
    icon: 'packages/uui-rich-text-editor/lib/img/icons/H2Vector.svg',
  },
  {
    name: 'heading 3',
    description: 'set heading 3',
    aliases: ['h3', 'head3', 'header3', 'heading3'],
    keyboardShortcut: ['ctrl', 'alt', '3'],
    command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    tags: ['block'],
    icon: 'packages/uui-rich-text-editor/lib/img/icons/H3Vector.svg',
  },
  {
    name: 'heading 4',
    description: 'set heading 4',
    aliases: ['h4', 'head4', 'header4', 'heading4'],
    keyboardShortcut: ['ctrl', 'alt', '4'],
    command: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
    tags: ['block'],
    icon: 'packages/uui-rich-text-editor/lib/img/icons/H4Vector.svg',
  },
  {
    name: 'heading 5',
    description: 'set heading 5',
    aliases: ['h5', 'head5', 'header5', 'heading5'],
    keyboardShortcut: ['ctrl', 'alt', '5'],
    command: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
    tags: ['block'],
    icon: 'packages/uui-rich-text-editor/lib/img/icons/H5Vector.svg',
  },
  {
    name: 'heading 6',
    description: 'set heading 6',
    aliases: ['h6', 'head6', 'header6', 'heading6'],
    keyboardShortcut: ['ctrl', 'alt', '6'],
    command: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
    tags: ['block'],
    icon: 'packages/uui-rich-text-editor/lib/img/icons/H6Vector.svg',
  },
  {
    name: 'left align',
    description: 'align text to the left',
    aliases: ['left'],
    keyboardShortcut: ['ctrl', 'shift', 'l'],
    command: () => editor.chain().focus().setTextAlign('left').run(),
    tags: [],
    icon: '',
  },
  {
    name: 'center align',
    description: 'center align text',
    aliases: ['mid', 'center'],
    keyboardShortcut: ['ctrl', 'shift', 'e'],
    command: () => editor.chain().focus().setTextAlign('center').run(),
    tags: [],
    icon: '',
  },
  {
    name: 'right align',
    description: 'align text to the right',
    aliases: ['right'],
    keyboardShortcut: ['ctrl', 'shift', 'r'],
    command: () => editor.chain().focus().setTextAlign('right').run(),
    tags: [],
    icon: '',
  },
  {
    name: 'justify align',
    description: 'justify text',
    aliases: ['justify', 'mid'],
    keyboardShortcut: ['ctrl', 'shift', 'j'],
    command: () => editor.chain().focus().setTextAlign('justify').run(),
    tags: [],
    icon: '',
  },
  {
    name: 'bullet list',
    description: 'add bullet list',
    aliases: ['dot'],
    keyboardShortcut: ['ctrl', 'shift', '8'],
    command: () => editor.chain().focus().toggleBulletList().run(),
    tags: ['block'],
    icon: '',
  },
  {
    name: 'ordered list',
    description: 'add an ordered list',
    aliases: ['numeric', 'number'],
    keyboardShortcut: ['ctrl', 'shift', '7'],
    command: () => editor.chain().focus().toggleOrderedList().run(),
    tags: ['block'],
    icon: '',
  },
  {
    name: 'code block',
    description: 'add a code block',
    aliases: [],
    keyboardShortcut: ['ctrl', 'alt', 'c'],
    command: () => editor.chain().focus().toggleCodeBlock().run(),
    tags: ['block'],
    icon: '',
  },
  {
    name: 'block quote',
    description: 'add a block quote',
    aliases: [],
    keyboardShortcut: ['ctrl', 'shift', 'b'],
    command: () => editor.chain().focus().toggleBlockquote().run(),
    tags: ['block'],
    icon: '',
  },
  {
    name: 'horizontal rule',
    description: 'add a horizontal rule',
    aliases: ['line', 'break'],
    keyboardShortcut: [],
    command: () => editor.chain().focus().setHorizontalRule().run(),
    tags: ['block'],
    icon: '',
  },
];
