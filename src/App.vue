<template>
  <div id="app">
    <!-- <nprogress-container></nprogress-container> -->
    <NprogressContainer></NprogressContainer>
    <router-view/>
  </div>
</template>

<script>
import NprogressContainer from './components/nprogress/NprogressContainer';
export default {
  name: 'app',
  components: {
    NprogressContainer
  }
}
</script>

<style>
</style>
