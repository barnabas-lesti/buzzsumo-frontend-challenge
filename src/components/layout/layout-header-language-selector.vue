<script setup lang="ts">
/**
 * Language selector component.
 */

import { onBeforeUnmount, onMounted, ref } from 'vue';

/**
 * Language selector state indicator.
 */
const isLanguageSelectorOpen = ref(false);

/**
 * Icon element reference.
 */
const iconRef = ref<HTMLElement | null>(null);

/**
 * Languages element reference.
 */
const languagesRef = ref<HTMLElement | null>(null);

/**
 * Selector icon click handler.
 */
function onIconClick() {
  if (isLanguageSelectorOpen.value) {
    isLanguageSelectorOpen.value = false;
  } else {
    isLanguageSelectorOpen.value = true;
  }
}

/**
 * Body click event handler.
 * @param event Click event object.
 */
function onBodyClick(event: Event) {
  if (shouldPropagateBodyClick(event.target as HTMLElement)) {
    isLanguageSelectorOpen.value = false;
  }
}

/**
 * Returns with a boolean if the element should let click propagation pass through.
 * @param element Target element.
 */
function shouldPropagateBodyClick(element: HTMLElement): boolean {
  return !(element === iconRef.value || element === languagesRef.value);
}

onMounted(() => {
  document.body.addEventListener('click', onBodyClick);
});

onBeforeUnmount(() => {
  document.body.removeEventListener('click', onBodyClick);
});
</script>

<template>
  <div
    :class="[
      'layout-header-language-selector',
      isLanguageSelectorOpen && 'open',
    ]"
  >
    <span class="icon material-icons" @click="onIconClick" ref="iconRef">
      language
    </span>
    <div class="languages" ref="languagesRef">
      <div
        v-for="locale of $i18n.availableLocales"
        :class="['language', locale === $i18n.locale && 'active']"
        :key="locale"
        @click="$i18n.locale = locale"
      >
        {{ $t('components.layoutHeaderLanguageSelector.language.' + locale) }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout-header-language-selector {
  font-size: 0;
  position: relative;

  .languages {
    display: none;
    position: absolute;
    top: 50%;
    right: 50%;
    z-index: 900;
    font-size: 1rem;
    background-color: #fff;
    padding: 1rem;
    box-shadow: 0px 0 5px 0px rgba(0, 0, 0, 0.25);
  }

  .language {
    &.active {
      font-weight: bold;
    }

    &:not(:last-of-type) {
      margin-bottom: 1rem;
    }
  }

  &.open {
    .languages {
      display: block;
    }
  }
}
</style>
