import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { RichTextEditorElement } from '../components/richTextEditor.element';
import exampleContent from './exampleContent';

export interface EditorCommand {
  name: string;
  description: string;
  aliases: string[];
  keyboardShortcut: string[];
  command(): void;
}

let _editor: Editor;
let _rte: RichTextEditorElement;

export const initEditor = (
  rte: RichTextEditorElement,
  mountElement: Element
): Editor => {
  if (_editor) {
    return _editor;
  } else {
    _editor = new Editor({
      element: mountElement,
      extensions: [StarterKit, Underline],
      content: exampleContent,
    });
    _rte = rte;
    return _editor;
  }
};

export const focusEditor = (): void => {
  _editor.view.focus();
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
    command: () => _editor.commands.toggleBold(),
  },
  {
    name: 'italicize',
    description: 'make text italic',
    aliases: ['cursive', 'italic'],
    keyboardShortcut: ['ctrl', 'i'],
    command: () => _editor.commands.toggleItalic(),
  },
  {
    name: 'underline',
    description: 'underline text',
    aliases: [''],
    keyboardShortcut: ['ctrl', 'u'],
    command: () => _editor.commands.toggleUnderline(),
  },
  {
    name: 'strikethrough',
    description: 'strike text',
    aliases: [''],
    keyboardShortcut: ['ctrl', 'shift', 'x'],
    command: () => _editor.commands.toggleStrike(),
  },
  {
    name: 'code',
    description: 'make code text',
    aliases: [''],
    keyboardShortcut: ['ctrl', 'e'],
    command: () => _editor.commands.toggleCode(),
  },
  {
    name: 'heading 1',
    description: 'set heading 1',
    aliases: ['h1', 'head1', 'header1', 'heading1'],
    keyboardShortcut: ['ctrl', 'alt', '1'],
    command: () => _editor.commands.toggleHeading({ level: 1 }),
  },
  {
    name: 'heading 2',
    description: 'set heading 2',
    aliases: ['h2', 'head2', 'header2', 'heading2'],
    keyboardShortcut: ['ctrl', 'alt', '2'],
    command: () => _editor.commands.toggleHeading({ level: 2 }),
  },
  {
    name: 'heading 3',
    description: 'set heading 3',
    aliases: ['h3', 'head3', 'header3', 'heading3'],
    keyboardShortcut: ['ctrl', 'alt', '3'],
    command: () => _editor.commands.toggleHeading({ level: 3 }),
  },
  {
    name: 'heading 4',
    description: 'set heading 4',
    aliases: ['h4', 'head4', 'header4', 'heading4'],
    keyboardShortcut: ['ctrl', 'alt', '4'],
    command: () => _editor.commands.toggleHeading({ level: 4 }),
  },
  {
    name: 'heading 5',
    description: 'set heading 5',
    aliases: ['h5', 'head5', 'header5', 'heading5'],
    keyboardShortcut: ['ctrl', 'alt', '5'],
    command: () => _editor.commands.toggleHeading({ level: 5 }),
  },
  {
    name: 'heading 6',
    description: 'set heading 6',
    aliases: ['h6', 'head6', 'header6', 'heading6'],
    keyboardShortcut: ['ctrl', 'alt', '6'],
    command: () => _editor.commands.toggleHeading({ level: 6 }),
  },
];
