<template>
  <header>
    <Navbar />
  </header>
  <main>
    <form v-if="account.id" @submit.prevent="handleSubmit()" class="mt-3 mb-3 bg-white p-4 elevation rounded">
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
    <router-view />
    <div class="container-fluid">
        <div class="row" v-for="ad in ads" :key="ad.banner">
          <img class="img-fluid p-0" :src="ad.banner">
        </div>
    </div>
  </main>
  <footer class="text-primary">
    Made by Faith
  </footer>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import { postsService } from "./services/PostsService.js"
import Pop from "./utils/Pop.js"
import { adsService } from "./services/AdsService.js"

export default {
  setup() {
const editable = ref({})

    async function getAds() {
      try {
        await adsService.getAds()
      }
      catch (error) {
        Pop.error(error);
      }
    }

  onMounted(() => {
      getAds();
    });

    watchEffect(() => {
      if (AppState.activePost) {
        const postWithBrokenReference = { ...AppState.activePost }
        editable.value = postWithBrokenReference
      }
    })


    return {
      editable,

      appState: computed(() => AppState),
      account: computed(() => AppState.account),
      ads: computed(() => AppState.ads),

handleSubmit() {
        if (editable.value.id) {

          this.editPost()
        }
        else {
          this.createPost()
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
      },

      async editPost() {
        try {
          const postData = editable.value

          await postsService.editPost(postData)

          editable.value = {}

        } catch (error) {
          Pop.error(error.message)
        }
      },
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root{
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  background-color: lightblue;
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
