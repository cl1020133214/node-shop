<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
  @font-face {
    font-family: Alibaba;
    src: url("./assets/font/.font-spider/Alibaba-PuHuiTi-Regular.otf");
  }
  .van-list__finished-text {
    font-size: 20px !important;
    color: rgba(0, 0, 0, 1) !important;
    line-height: 95px !important;
  }

  .van-cell:not(:last-child)::after {
    border-bottom: 0px !important;
  }
  #__vconsole {
    color: #000;
    font-size: 30px!important;
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  }
</style>
