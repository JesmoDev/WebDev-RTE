import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { RichTextEditorElement } from '../components/richTextEditor.element';
import exampleContent from './exampleContent';
import BubbleMenu from '@tiptap/extension-bubble-menu';

export interface EditorCommand {
  name: string;
  description: string;
  aliases: string[];
  keyboardShortcut: string[];
  command(): void;
}

let editor: Editor;

export { editor };

export const initEditor = (
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
        BubbleMenu.configure({
          element: hoverMenu,
        }),
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
      ],
      content: exampleContent,
    });
    return editor;
  }
};

export const searchCommands = (search: string): EditorCommand[] => {
  const filtered = getCommands().filter(
    x =>
      x.name.toLocaleLowerCase().includes(search) ||
      x.aliases.some(y => y.includes(search))
  );

  return filtered;
};

export const getCommands = (): EditorCommand[] => [
  {
    name: 'bold',
    description: 'make text bold',
    aliases: ['heavy'],
    keyboardShortcut: ['ctrl', 'b'],
    command: () => editor.chain().focus().toggleBold(),
  },
  {
    name: 'italicize',
    description: 'make text italic',
    aliases: ['cursive', 'italic'],
    keyboardShortcut: ['ctrl', 'i'],
    command: () => editor.chain().focus().toggleItalic(),
  },
  {
    name: 'underline',
    description: 'underline text',
    aliases: [''],
    keyboardShortcut: ['ctrl', 'u'],
    command: () => editor.chain().focus().toggleUnderline(),
  },
  {
    name: 'strikethrough',
    description: 'strike text',
    aliases: [''],
    keyboardShortcut: ['ctrl', 'shift', 'x'],
    command: () => editor.chain().focus().toggleStrike(),
  },
  {
    name: 'code',
    description: 'make code text',
    aliases: [''],
    keyboardShortcut: ['ctrl', 'e'],
    command: () => editor.chain().focus().toggleCode(),
  },
  {
    name: 'heading 1',
    description: 'set heading 1',
    aliases: ['h1', 'head1', 'header1', 'heading1'],
    keyboardShortcut: ['ctrl', 'alt', '1'],
    command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
  },
  {
    name: 'heading 2',
    description: 'set heading 2',
    aliases: ['h2', 'head2', 'header2', 'heading2'],
    keyboardShortcut: ['ctrl', 'alt', '2'],
    command: () => editor.chain().focus().toggleHeading({ level: 2 }),
  },
  {
    name: 'heading 3',
    description: 'set heading 3',
    aliases: ['h3', 'head3', 'header3', 'heading3'],
    keyboardShortcut: ['ctrl', 'alt', '3'],
    command: () => editor.chain().focus().toggleHeading({ level: 3 }),
  },
  {
    name: 'heading 4',
    description: 'set heading 4',
    aliases: ['h4', 'head4', 'header4', 'heading4'],
    keyboardShortcut: ['ctrl', 'alt', '4'],
    command: () => editor.chain().focus().toggleHeading({ level: 4 }),
  },
  {
    name: 'heading 5',
    description: 'set heading 5',
    aliases: ['h5', 'head5', 'header5', 'heading5'],
    keyboardShortcut: ['ctrl', 'alt', '5'],
    command: () => editor.chain().focus().toggleHeading({ level: 5 }),
  },
  {
    name: 'heading 6',
    description: 'set heading 6',
    aliases: ['h6', 'head6', 'header6', 'heading6'],
    keyboardShortcut: ['ctrl', 'alt', '6'],
    command: () => editor.chain().focus().toggleHeading({ level: 6 }),
  },
  {
    name: 'left align',
    description: 'align text to the left',
    aliases: ['left'],
    keyboardShortcut: ['ctrl', 'shift', 'l'],
    command: () => editor.chain().focus().setTextAlign('left'),
  },
  {
    name: 'center align',
    description: 'center align text',
    aliases: ['mid', 'center'],
    keyboardShortcut: ['ctrl', 'shift', 'e'],
    command: () => editor.chain().focus().setTextAlign('center'),
  },
  {
    name: 'right align',
    description: 'align text to the right',
    aliases: ['right'],
    keyboardShortcut: ['ctrl', 'shift', 'r'],
    command: () => editor.chain().focus().setTextAlign('right'),
  },
  {
    name: 'justify align',
    description: 'justify text',
    aliases: ['justify', 'mid'],
    keyboardShortcut: ['ctrl', 'shift', 'j'],
    command: () => editor.chain().focus().setTextAlign('justify'),
  },
];
