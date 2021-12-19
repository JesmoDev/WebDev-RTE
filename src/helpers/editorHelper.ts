import { Editor } from '@tiptap/core';
import { RichTextEditorElement } from '../components/richTextEditor.element';

export interface EditorCommand {
  name: string;
  description: string;
  aliases: string[];
  keyboardShortcut: string[];
  command(): void;
}

export const searchCommands = (
  rte: RichTextEditorElement,
  search: string
): EditorCommand[] => {
  const filtered = getCommands(rte).filter(
    x =>
      x.name.toLocaleLowerCase().includes(search) ||
      x.aliases.some(y => y.includes(search))
  );

  return filtered;
};

export const getCommands = (rte: RichTextEditorElement): EditorCommand[] => [
  {
    name: 'bold',
    description: 'make text bold',
    aliases: ['heavy'],
    keyboardShortcut: ['ctrl', 'b'],
    command: () => rte.editor.commands.toggleBold(),
  },
  {
    name: 'italicize',
    description: 'make text italic',
    aliases: ['cursive', 'italic'],
    keyboardShortcut: ['ctrl', 'i'],
    command: () => rte.editor.commands.toggleItalic(),
  },
  {
    name: 'underline',
    description: 'underline text',
    aliases: [''],
    keyboardShortcut: ['ctrl', 'u'],
    command: () => rte.editor.commands.toggleUnderline(),
  },
  {
    name: 'strikethrough',
    description: 'strike text',
    aliases: [''],
    keyboardShortcut: ['ctrl', 'shift', 'x'],
    command: () => rte.editor.commands.toggleStrike(),
  },
  {
    name: 'code',
    description: 'make code text',
    aliases: [''],
    keyboardShortcut: ['ctrl', 'e'],
    command: () => rte.editor.commands.toggleCode(),
  },
  {
    name: 'heading 1',
    description: 'set heading 1',
    aliases: ['h1', 'head1', 'header1', 'heading1'],
    keyboardShortcut: ['ctrl', 'alt', '1'],
    command: () => rte.editor.commands.toggleHeading({ level: 1 }),
  },
  {
    name: 'heading 2',
    description: 'set heading 2',
    aliases: ['h2', 'head2', 'header2', 'heading2'],
    keyboardShortcut: ['ctrl', 'alt', '2'],
    command: () => rte.editor.commands.toggleHeading({ level: 2 }),
  },
  {
    name: 'heading 3',
    description: 'set heading 3',
    aliases: ['h3', 'head3', 'header3', 'heading3'],
    keyboardShortcut: ['ctrl', 'alt', '3'],
    command: () => rte.editor.commands.toggleHeading({ level: 3 }),
  },
  {
    name: 'heading 4',
    description: 'set heading 4',
    aliases: ['h4', 'head4', 'header4', 'heading4'],
    keyboardShortcut: ['ctrl', 'alt', '4'],
    command: () => rte.editor.commands.toggleHeading({ level: 4 }),
  },
  {
    name: 'heading 5',
    description: 'set heading 5',
    aliases: ['h5', 'head5', 'header5', 'heading5'],
    keyboardShortcut: ['ctrl', 'alt', '5'],
    command: () => rte.editor.commands.toggleHeading({ level: 5 }),
  },
  {
    name: 'heading 6',
    description: 'set heading 6',
    aliases: ['h6', 'head6', 'header6', 'heading6'],
    keyboardShortcut: ['ctrl', 'alt', '6'],
    command: () => rte.editor.commands.toggleHeading({ level: 6 }),
  },
  {
    name: 'link',
    description: 'add link',
    aliases: [''],
    keyboardShortcut: [],
    command: () =>
      rte.editor.commands.toggleLink({
        href: 'https://tiptap.dev/api/marks/link',
      }),
  },
];
