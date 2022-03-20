<template>
  <h2>Passing Props</h2>
  <p>
    defineProps is a compile-time macro that is only available inside &lt;script
    setup&gt; and does not need to be explicitly imported. Declared props are
    automatically exposed to the template. defineProps also returns an object
    that contains all the props passed to the component, so that we can access
    them in JavaScript if needed:
  </p>

  <p>
    Similar to defineProps, defineEmits is also only usable in &lt;script
    setup&gt; and doesn't need to be imported. It returns an emit function that
    can be used to emit events in JavaScript code.
  </p>

  <div class="blog-list" :style="{ fontSize: postFontSize + 'em' }">
    <BlogPost
      v-for="post in blogs"
      :key="post.id"
      :title="post.title"
      @enlarge-text="enlargeText"
    />
  </div>

  <div class="blog-list" :style="{ fontSize: postFontSize2 + 'em' }">
    <blog-post2
      v-for="post in blogs"
      :key="post.id"
      :title="post.title"
      @enlarge-text="enlargeText2"
    />
  </div>
</template>

<script setup>
import BlogPost from './BlogPost.vue'
import BlogPost2 from './BlogPost2.vue'

const blogs = ref([
  {
    id: 1,
    title: 'Blog 1',
  },
  {
    id: 2,
    title: 'Blog 2',
  },
  {
    id: 3,
    title: 'Blog 3',
  },
])

const postFontSize = ref(1)
const postFontSize2 = ref(1)

const enlargeText = () => {
  postFontSize.value += 0.1
}

const enlargeText2 = () => {
  postFontSize2.value += 0.1
}
</script>
