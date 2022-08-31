import { beforeEach, describe, expect, it } from 'vitest';
import { shallowMount, VueWrapper } from '@vue/test-utils';
import App from './app.vue';

describe('App', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(App);
  });

  it('Should render the container', () => {
    expect(App).toBeTruthy();
    expect(wrapper.classes()).toContain('App');
  });

  it('Should render the WordCloud component', () => {
    expect(wrapper.find('word-cloud-stub').exists()).toBeTruthy();
  });
});
