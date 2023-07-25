<template>

  <div class="container-fluid">
<div class="row">
  <div class="col-12 p-4">
<h1>Search</h1>
<form @submit.prevent="getPostsByQuery()">
<label for="searchBar">Search Posts</label>
<input v-model="editable.query" id="searchBar" type="text" class="w-50">

<button type="submit" class="btn btn-outline-primary"> <i class="mdi mdi-magnify-plus-outline"></i> 
</button>
</form>

  </div>
</div>

<div class="row">
<div v-for="post in posts" :key="post.id" class="col-5 card">

<PostCard :postProp="post"/>

</div>


</div>

  </div>


</template>


<script>
import { computed, ref } from "vue";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostsService.js";
import { logger } from "../utils/Logger.js";

export default {
  setup(){

    const editable = ref({});



    return {
      editable,
      posts: computed(() => AppState.posts), 

      async getPostsByQuery() {
        try {
          logger.log(editable.value);

          const queryObject = editable.value;
          await postsService.getPostsByQuery(queryObject)
        } catch (error) {
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>
