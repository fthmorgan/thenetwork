<template>
  <div class="container-fluid" v-if="profile">
    <div class="row">
      <div class="col-12">
        <img class="img-fluid" :src="profile.coverImg" :alt="profile.name">
      </div>
      <div>
        <form v-if="account.id" @submit.prevent="createPost()">
            <div>
              <textarea v-model="editable.body" class="form-control" placeholder="Add Your Post"
                id="body" style="height: 100px"></textarea>
              <label for="body">Post</label>
            </div>
            <div>
              <input v-model="editable.imgUrl" required type="url" class="form-control" id="imgUrl"
                placeholder="ImgUrl...">
              <label for="imgUrl">ImgUrl</label>
            </div>
            <button type="submit" class="btn btn-outline-primary">Post</button>
            
        </form>
      </div>
      <div>
        <h1>{{ profile.name }}</h1>
        <h2>{{ profile.bio }}</h2>
        <h3></h3>
      </div>
    </div>
    <div class="row">
      <div class="col-3 card" v-for="post in profilePosts" :key="post.id" >
        <h1>{{ post.creator.name }}</h1>
        <h3>{{ post.body }}</h3>
        
      </div>
    </div>
    <div>
      
      <h1>{{ page }}</h1>
    <div class="d-flex justify-content-between">
      <button @click="changePage(older)" :disabled="!older" class="btn btn-info" >
              Older <span class="badge bg-primary"><i class="mdi mdi-page-previous-outline"></i></span>
      </button>
      <button @click="changePage(newer)" :disabled="!newer" class="btn btn-info" >
              Newer <span class="badge bg-primary"><i class="mdi mdi-page-next-outline"></i></span>
      </button>
    </div>

</div>
  </div>
</template>


<script>
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { computed, onMounted, ref } from "vue";
import { AppState } from "../AppState.js";
import { profileService } from "../services/ProfileService.js";
import { postsService } from "../services/PostsService.js";

export default {

  setup(){

const editable = ref({})

    const route = useRoute()

    async function getProfileById() {
        try {
        const profileId = route.params.profileId
        logger.log('Here is the route parameter id', profileId)
        await profileService.getProfileById(profileId)
        } catch (error) {
        Pop.error(error.message)
      }
    }

    async function getProfilePosts() {
      try {
        const profileId = route.params.profileId
        await postsService.getProfilePosts(profileId)
      } catch (error) {
        Pop.error(error.message)
      }
    }
    
onMounted(() => {
  getProfileById()
  getProfilePosts()
})

    return {
      editable,
      account: computed(() => AppState.account),
      profile: computed(() => AppState.activeProfile),
      profilePosts: computed(() => AppState.posts),
      older: computed(() => AppState.older),
      newer: computed(() => AppState.newer),
      page: computed(() => AppState.page),

      async changePage(page) {
  try {
  const profileId = route.params.profileId
  const urlProfile = `api/posts?creatorId=${profileId}&page=${page}`
  logger.log('[CHANGE PAGE]', urlProfile, profileId, page)
  await postsService.changePage(urlProfile, profileId, page)
} catch (error) {
  Pop.error(error.message)
}
      },

      async createPost() {
        try {
          const postData = editable.value
          await postsService.createPost(postData)
          editable.value = {}
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>