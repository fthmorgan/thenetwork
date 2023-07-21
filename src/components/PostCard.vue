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

</template>


<script>
import { Post } from "../models/Post.js";

export default {
props: {
  postProp: { type: Post, required: true }
},

  setup(){

    return {}
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