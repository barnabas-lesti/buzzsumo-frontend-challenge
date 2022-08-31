<script setup lang="ts"></script>

<template>
  <footer class="layout-footer">
    <div class="copyright">
      {{ $t('components.layoutFooter.copyright') }}
    </div>
  </footer>
</template>

<style scoped lang="scss">
.layout-footer {
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: #e5e5e5;
  box-sizing: border-box;

  .copyright {
    color: #727272;
    font-size: 0.8rem;
  }

  @media only screen and (min-width: 768px) {
    justify-content: flex-end;
  }
}
</style>
