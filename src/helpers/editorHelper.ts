import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { RichTextEditorElement } from '../components/richTextEditor.element';
import exampleContent from './exampleContent';

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
let _rte: RichTextEditorElement;

export { editor };

export const initEditor = (
  rte: RichTextEditorElement,
  mountElement: Element
): Editor => {
  if (editor) {
    return editor;
  } else {
    editor = new Editor({
      element: mountElement,
      extensions: [
        StarterKit,
        Underline,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
      ],
      content: exampleContent,
    });
    _rte = rte;
    return editor;
  }
};

export const searchCommands = (
  search: string,
  tag: string
): EditorCommand[] => {
  const filtered = getCommands().filter(
    x =>
      (x.name.toLocaleLowerCase().includes(search) ||
        x.aliases.some(y => y.includes(search))) &&
      x.tags.some(z => z.includes(tag))
  );

  return filtered;
};

export const getCommands = (): EditorCommand[] => [
  {
    name: 'bold',
    description: 'make text bold',
    aliases: ['heavy'],
    keyboardShortcut: ['ctrl', 'b'],
    command: () => editor.commands.toggleBold(),
    tags: [],
    icon: '',
  },
  {
    name: 'italicize',
    description: 'make text italic',
    aliases: ['cursive', 'italic'],
    keyboardShortcut: ['ctrl', 'i'],
    command: () => editor.commands.toggleItalic(),
    tags: [],
    icon: '',
  },
  {
    name: 'underline',
    description: 'underline text',
    aliases: [''],
    keyboardShortcut: ['ctrl', 'u'],
    command: () => editor.commands.toggleUnderline(),
    tags: [],
    icon: '',
  },
  {
    name: 'strikethrough',
    description: 'strike text',
    aliases: [''],
    keyboardShortcut: ['ctrl', 'shift', 'x'],
    command: () => editor.commands.toggleStrike(),
    tags: [],
    icon: '',
  },
  {
    name: 'code',
    description: 'make code text',
    aliases: [''],
    keyboardShortcut: ['ctrl', 'e'],
    command: () => editor.commands.toggleCode(),
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
    icon: 'src/img/icons/carbon_letter-aa-large-2.svg',
  },
  {
    name: 'heading 1',
    description: 'set heading 1',
    aliases: ['h1', 'head1', 'header1', 'heading1'],
    keyboardShortcut: ['ctrl', 'alt', '1'],
    command: () => editor.commands.toggleHeading({ level: 1 }),
    tags: ['block'],
    icon: 'src/img/icons/H1Vector.svg',
  },
  {
    name: 'heading 2',
    description: 'set heading 2',
    aliases: ['h2', 'head2', 'header2', 'heading2'],
    keyboardShortcut: ['ctrl', 'alt', '2'],
    command: () => editor.commands.toggleHeading({ level: 2 }),
    tags: ['block'],
    icon: 'src/img/icons/H2Vector.svg',
  },
  {
    name: 'heading 3',
    description: 'set heading 3',
    aliases: ['h3', 'head3', 'header3', 'heading3'],
    keyboardShortcut: ['ctrl', 'alt', '3'],
    command: () => editor.commands.toggleHeading({ level: 3 }),
    tags: ['block'],
    icon: 'src/img/icons/H3Vector.svg',
  },
  {
    name: 'heading 4',
    description: 'set heading 4',
    aliases: ['h4', 'head4', 'header4', 'heading4'],
    keyboardShortcut: ['ctrl', 'alt', '4'],
    command: () => editor.commands.toggleHeading({ level: 4 }),
    tags: ['block'],
    icon: 'src/img/icons/H4Vector.svg',
  },
  {
    name: 'heading 5',
    description: 'set heading 5',
    aliases: ['h5', 'head5', 'header5', 'heading5'],
    keyboardShortcut: ['ctrl', 'alt', '5'],
    command: () => editor.commands.toggleHeading({ level: 5 }),
    tags: ['block'],
    icon: 'src/img/icons/H5Vector.svg',
  },
  {
    name: 'heading 6',
    description: 'set heading 6',
    aliases: ['h6', 'head6', 'header6', 'heading6'],
    keyboardShortcut: ['ctrl', 'alt', '6'],
    command: () => editor.commands.toggleHeading({ level: 6 }),
    tags: ['block'],
    icon: 'src/img/icons/H6Vector.svg',
  },
  {
    name: 'left align',
    description: 'align text to the left',
    aliases: ['left'],
    keyboardShortcut: ['ctrl', 'shift', 'l'],
    command: () => editor.commands.setTextAlign('left'),
    tags: [],
    icon: '',
  },
  {
    name: 'center align',
    description: 'center align text',
    aliases: ['mid', 'center'],
    keyboardShortcut: ['ctrl', 'shift', 'e'],
    command: () => editor.commands.setTextAlign('center'),
    tags: [],
    icon: '',
  },
  {
    name: 'right align',
    description: 'align text to the right',
    aliases: ['right'],
    keyboardShortcut: ['ctrl', 'shift', 'r'],
    command: () => editor.commands.setTextAlign('right'),
    tags: [],
    icon: '',
  },
  {
    name: 'justify align',
    description: 'justify text',
    aliases: ['justify', 'mid'],
    keyboardShortcut: ['ctrl', 'shift', 'j'],
    command: () => editor.commands.setTextAlign('justify'),
    tags: [],
    icon: '',
  },
];
