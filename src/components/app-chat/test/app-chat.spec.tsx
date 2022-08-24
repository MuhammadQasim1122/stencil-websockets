import { newSpecPage } from '@stencil/core/testing';
import { AppChat } from '../app-chat';

describe('app-chat', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppChat],
      html: `<app-chat></app-chat>`,
    });
    expect(page.root).toEqualHtml(`
      <app-chat>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-chat>
    `);
  });
});
