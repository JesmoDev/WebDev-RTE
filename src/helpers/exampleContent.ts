export default {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: {
        level: 1,
      },
      content: [
        {
          type: 'text',
          text: 'Heading 1',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum erat ligula, efficitur quis mauris a, accumsan efficitur eros. Sed eu porttitor enim, et venenatis sapien. Donec quis consequat neque. Aliquam gravida metus a mauris consectetur semper. Sed sed mattis odio. Vestibulum pulvinar libero eros, in cursus nulla hendrerit eu. Curabitur pellentesque mi urna, vel vestibulum leo euismod sit amet. Fusce suscipit augue sit amet leo bibendum pretium. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse tristique fringilla lorem, nec accumsan lacus pellentesque sit amet. Morbi sagittis porta rutrum. Morbi a cursus ante. Phasellus ac diam elit.',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 2,
      },
      content: [
        {
          type: 'text',
          text: 'Quote',
        },
      ],
    },
    {
      type: 'blockquote',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Nam ullamcorper rutrum turpis, eu faucibus velit tincidunt laoreet. Vestibulum aliquam ligula et nulla faucibus, a iaculis metus fermentum. Mauris at augue eu sapien bibendum lacinia. Integer semper lobortis nulla a molestie. Suspendisse hendrerit turpis vehicula, scelerisque sapien ut, malesuada augue. Fusce nunc orci, cursus non molestie ac, posuere a sem. In laoreet risus eget',
            },
          ],
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 3,
      },
      content: [
        {
          type: 'text',
          text: 'Bullet List',
        },
      ],
    },
    {
      type: 'bulletList',
      content: [
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Yo',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'This is cool',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'bullet list',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 3,
      },
      content: [
        {
          type: 'text',
          text: 'Numbered list',
        },
      ],
    },
    {
      type: 'orderedList',
      attrs: {
        start: 1,
      },
      content: [
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Hello',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'This is in order',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'yea',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 3,
      },
      content: [
        {
          type: 'text',
          text: 'Code block',
        },
      ],
    },
    {
      type: 'codeBlock',
      attrs: {
        language: 'jsx',
      },
      content: [
        {
          type: 'text',
          text: 'firstUpdated() {\n    const mountElement = this.shadowRoot.querySelector(".rte-editor");\n\n    this.editor = new Editor({\n      element: mountElement,\n      extensions: [StarterKit],\n      content: "<p>Hello World!</p>",\n    });\n  }\n',
        },
      ],
    },
  ],
};
