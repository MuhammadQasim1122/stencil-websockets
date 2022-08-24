import { newE2EPage } from '@stencil/core/testing';

describe('app-chat', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-chat></app-chat>');

    const element = await page.find('app-chat');
    expect(element).toHaveClass('hydrated');
  });
});
