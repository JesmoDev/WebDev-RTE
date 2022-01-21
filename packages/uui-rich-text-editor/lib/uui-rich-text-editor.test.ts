import { html, fixture, expect } from '@open-wc/testing';
import { UUIRichTextEditorElement } from './uui-rich-text-editor.element';
import '.';

describe('UUIRichTextEditorElement', () => {
  let element: UUIRichTextEditorElement;

  beforeEach(async () => {
    element = await fixture(
      html` <uui-rich-text-editor></uui-rich-text-editor> `
    );
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});