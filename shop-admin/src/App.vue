<script setup>

</script>

<template>


  <router-view></router-view>

</template>

<style>   
/* 这里的scoped会导致无法覆盖原来的 */
  #nprogress .bar{
  background: #dbeef9!important;
  height: 3px!important;
}
#nprogress .spinner-icon{
  border-top-color: #a9dfff!important;
  border-left-color: #a9dfff!important;
}
</style>
