import { beforeEach, describe, expect, it } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import WordCloudMetadataMention from './word-cloud-metadata-mention.vue';

describe('WordCloudMetadataMention', () => {
  const labelMock = 'labelMock';
  const validCountMock = 10;
  const invalidCountMock = null;
  const typeMock = 'positive';

  let wrapper: VueWrapper;

  describe('When all props are provided and are valid', () => {
    beforeEach(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      wrapper = mount(WordCloudMetadataMention as any, {
        props: {
          label: labelMock,
          count: validCountMock,
          type: typeMock,
        },
      });
    });

    it('Should render the container', () => {
      expect(WordCloudMetadataMention).toBeTruthy();
      expect(wrapper.classes()).toContain('WordCloudMetadataMention');
    });

    it('Should display the label', () => {
      expect(wrapper.text()).toContain(`${labelMock}:`);
    });

    it('Should display the count', () => {
      expect(wrapper.text()).toContain(validCountMock);
    });

    it('Should have the type as a class', () => {
      expect(wrapper.find(`span.count.${typeMock}`).exists()).toBeTruthy();
    });
  });

  describe('When count is not a number', () => {
    beforeEach(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      wrapper = mount(WordCloudMetadataMention as any, {
        props: {
          label: labelMock,
          count: invalidCountMock,
          type: typeMock,
        },
      });
    });

    it('Should render a 0 for the count', () => {
      expect(wrapper.text()).not.toContain(invalidCountMock);
      expect(wrapper.text()).toContain(0);
    });
  });
});
