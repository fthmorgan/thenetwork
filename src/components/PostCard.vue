<template>
    <h2>{{ postProp.body }}</h2>
    <img class="img-fluid rounded" :src="postProp.imgUrl">
    <div class="d-flex justify-content-center mt-3">
      <h3 class="mx-3 mt-2">{{ postProp.creator.name }}</h3>
      
      <router-link :to="{name: 'Profile', params: {profileId: postProp.creatorId}}">
        <img class="creatorPicture" :src="postProp.creator.picture" :alt="postProp.creator.name">
      </router-link>

    </div>

    <div class="">
      <div>
        <h4>{{ postProp.createdAt.toLocaleDateString() }}</h4>
        <button :disabled="!account.id" class="btn btn-light mb-3"><i @click="likePost()" class="mdi mdi-heart-outline fs-3 selectable"></i>{{ postProp.likes.length }}</button>
      </div>
  
      <div v-if="account.id == postProp.creatorId">
        <div class="mt-1 mb-3 d-flex justify-content-end">
          <button @click="removePost()" class="btn btn-danger" title="Delete this post" type="button">
                <i class="mdi mdi-delete"></i>
          </button>
    
          <button @click="setPostToEdit()" class="btn btn-info ms-3" title="Edit post" type="button">
              <i class="mdi mdi-pencil"></i>
          </button>
        </div>
      </div>
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

// const editable = ref({})

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

      async likePost() {
        try {
          const postId = props.postProp.id
          await postsService.likePost(postId)
          logger.log(postId)
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