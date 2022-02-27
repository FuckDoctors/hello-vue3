<template>
  <div>
    <!--
    加一个同名跟文件夹同名的.vue文件，用来做分组的父组件，这样才能开启嵌套路由的功能
    文件夹下放一个index.vue，用来做path:''的组件，也可以不放，router-view内默认不显示东西
  -->
    <h1>Vue3 向导</h1>
    <nav>
      <router-link to="/guide/reactivity-fundamentals" class="link">
        Reactivity Fundamentals
      </router-link>
      <router-view />
    </nav>
  </div>
</template>

<script setup lang="ts"></script>

<route lang="yaml">
meta:
  layout: guide/index
</route>
