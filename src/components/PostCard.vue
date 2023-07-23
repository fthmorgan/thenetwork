<template>
    <h2>{{ postProp.body }}</h2>
    <img class="img-fluid" :src="postProp.imgUrl">
    <div class="d-flex">
      <h3 class="mx-3">{{ postProp.creator.name }}</h3>

      <router-link :to="{name: 'Profile', params: {profileId: postProp.creatorId}}">
        <img class="creatorPicture" :src="postProp.creator.picture" :alt="postProp.creator.name">
      </router-link>

    </div>
    <div>
      <h4>{{ postProp.createdAt.toLocaleDateString() }}</h4>
      <h5><i class="mdi mdi-heart-outline fs-3"></i>{{ postProp.likes.length }}</h5>
    </div>

    <div v-if="account.id == postProp.creatorId">
      <button @click="removePost()" class="btn btn-danger" title="Delete this post" type="button">
            <i class="mdi mdi-delete"></i>
      </button>

      <button @click="setPostToEdit()" class="btn btn-info ms-3" title="Edit post" type="button">
          <i class="mdi mdi-pencil"></i>
      </button>
    </div>

</template>


<script>
import { computed, ref } from "vue";
import { Post } from "../models/Post.js";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { postsService } from "../services/PostsService.js";

export default {
props: {
  postProp: { type: Post, required: true }
},

  setup(props){

const editable = ref({})

    return {

      account: computed(() => AppState.account),

      async removePost() {
        try {
          const wantsToRemovePost = await Pop.confirm(`Are you sure you want to delete this post?`)

          if (!wantsToRemovePost) {
            return
          }

          const postId = props.postProp.id
          logger.log(postId)
          await postsService.removePost(postId)
        } catch (error) {
          Pop.error(error.message)
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

        setPostToEdit() {
        const postToEdit = props.postProp

        postsService.setPostToEdit(postToEdit)
      }


    }
  }
}
</script>


<style lang="scss" scoped>
.creatorPicture {
  height: 10vh;
  width: 10vh;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
}
</style>