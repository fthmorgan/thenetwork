<template>
  <div class="container-fluid" v-if="profile">
    <div class="row">
      <div class="col-12 mt-3 p-0">
        <img class="img-fluid" :src="profile.coverImg" :alt="profile.name">
      </div>
      <div>
      </div>
      <div>
        <div class="d-flex align-items-center mb-3 mt-3 justify-content-center">
          <img class="image-fluid profileImg" :src="profile.picture">
          <h1 class="profileName">{{ profile.name }}</h1>
        </div>
        <p>{{ profile.bio }}</p>
        <a :href="profile.linkedin"><i class="mdi mdi-linkedin fs-1"></i></a>
        <a :href="profile.github"><i class="mdi mdi-github fs-1"></i></a>
        <h3> {{ profile.graduated }}</h3>
        <h4> {{ profile.class }}</h4>

      </div>
    </div>
    <div class="row">
      <div class="col-5 card" v-for="post in profilePosts" :key="post.id" >
        <div class="d-flex">
          <h3 class="mt-3">{{ post.creator.name }}</h3>
          <img class="img-fluid profileImg mt-3 mb-3" :src="post.creator.picture">
        </div>
        <h5>{{ post.body }}</h5>
      <div>
      <h4>{{ post.createdAt.toLocaleDateString() }}</h4>
      <h5><i class="mdi mdi-heart-outline fs-3"></i>{{ post.likes.length }}</h5>
    </div>
      </div>
    </div>
    <div>
      
      <h1>Page: {{ page }}</h1>
    <div class="d-flex justify-content-between mb-3">
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
.profileImg {
  height: 10vh;
  width: 10vh;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
}

.profileName {
  margin-left: 10px;
}
</style>