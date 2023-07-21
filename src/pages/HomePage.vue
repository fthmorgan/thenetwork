<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
        <div v-for="post in posts" :key="post.id" class="col-6 card">

        <PostCard :postProp="post" />

        </div>
      </div>
          <div class="d-flex justify-content-between">
      <button :disabled="!older" @click="changePage(older)" class="btn btn-info" >
              Older  <span class="badge bg-primary"><i class="mdi mdi-page-previous-outline"></i></span>
      </button>
      <button :disabled="!newer" @click="changePage(newer)" class="btn btn-info" >
              Newer <span class="badge bg-primary"><i class="mdi mdi-page-next-outline"></i></span>
      </button>
    </div>
    </div>
</template>

<script>
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostsService.js";
import { computed, onMounted } from "vue";
import { logger } from "../utils/Logger.js";
import { AppState } from "../AppState.js";

export default {
  setup() {

async function getPosts() {
  try {
    await postsService.getPosts();
  } catch (error) {
    Pop.error(error.message);
  }
}

onMounted(() => {
  logger.log("[HOME PAGE MOUNTED]")
getPosts();
});

    return {
posts: computed(() => AppState.posts),
newer: computed(() => AppState.newer),
older: computed(() => AppState.older),

  async changePage(url) {
    try {
      // logger.log('[CHANGE PAGE]', url)
  await postsService.changePage(url)
}   catch (error) {
  Pop.error(error.message)
}
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
