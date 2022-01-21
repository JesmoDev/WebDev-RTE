import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-rich-text-editor/lib/index';

export default {
  id: 'uui-rich-text-editor',
  title: 'Inputs/Rich Text Editor',
  component: 'uui-rich-text-editor',
  parameters: {
    docs: {
      source: {
        code: `<uui-rich-text-editor></uui-rich-text-editor>`,
      },
    },
  },
};

export const Overview: Story = () =>
  html`<uui-rich-text-editor></uui-rich-text-editor>`;
