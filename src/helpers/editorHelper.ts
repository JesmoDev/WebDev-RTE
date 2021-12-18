import { Editor } from "@tiptap/core";

export interface EditorCommand {
  name: string;
  description: string;
  aliases: string[];
  keyboardShortcut: string[];
  command: Function;
}

export const searchCommands = (
  editor: Editor,
  search: string
): EditorCommand[] => {
  const filtered = getCommands(editor).filter(
    (x) =>
      x.name.toLocaleLowerCase().includes(search) ||
      x.aliases.some((y) => y.includes(search))
  );

  return filtered;
};

export const getCommands = (editor: Editor): EditorCommand[] => [
  {
    name: "bold",
    description: "make text bold",
    aliases: ["heavy"],
    keyboardShortcut: ["ctrl", "b"],
    command: () => editor.commands.toggleBold(),
  },
  {
    name: "italic",
    description: "make text italic",
    aliases: ["cursive"],
    keyboardShortcut: ["ctrl", "i"],
    command: () => editor.commands.toggleItalic(),
  },
  {
    name: "underline",
    description: "underline text",
    aliases: [""],
    keyboardShortcut: ["ctrl", "u"],
    command: () => editor.commands.toggleUnderline(),
  },
  {
    name: "strikethrough",
    description: "strike text",
    aliases: [""],
    keyboardShortcut: ["ctrl", "shift", "x"],
    command: () => editor.commands.toggleStrike(),
  },
  {
    name: "code",
    description: "make code text",
    aliases: [""],
    keyboardShortcut: ["ctrl", "e"],
    command: () => editor.commands.toggleCode(),
  },
];
