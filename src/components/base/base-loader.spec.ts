import { beforeEach, describe, expect, it } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import BaseLoader from './base-loader.vue';

describe('BaseLoader', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(BaseLoader);
  });

  it('Should render the container', () => {
    expect(BaseLoader).toBeTruthy();
    expect(wrapper.classes()).toContain('BaseLoader');
  });

  it('Should render a loader icon', () => {
    expect(wrapper.find('span.material-icons').exists()).toBeTruthy();
    expect(wrapper.text()).toEqual('sensors');
  });
});
