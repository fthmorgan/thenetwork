<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <form @submit.prevent="updateAccount()">
<div class="mb-3">
  <label for="name" class="form-label">Name</label>
  <input v-model="editable.name" type="text" class="form-control"  id="name" placeholder="">
</div>
<div class="mb-3">
  <label for="picture" class="form-label">Profile Picture</label>
  <input v-model="editable.picture" type="url" class="form-control"  id="picture" placeholder="">
</div>
<div class="mb-3">
  <label for="coverImg" class="form-label">Profile Cover Picture</label>
  <input v-model="editable.coverImg" type="url" class="form-control"  id="coverImg" placeholder="">
</div>
<div>
  <label for="bio">Bio</label>
  <textarea v-model="editable.bio" class="form-control" placeholder="Add Your Bio"
    id="bio" style="height: 100px">
  </textarea>
</div>
<div class="mb-3">
  <label for="linkedin" class="form-label">LinkedIn</label>
  <input v-model="editable.linkedin" type="url" class="form-control"  id="linkedin" placeholder="">
</div>
<div class="mb-3">
  <label for="github" class="form-label">Github</label>
  <input v-model="editable.github" type="url" class="form-control"  id="github" placeholder="">
</div>
<div class="mb-3">
  <label for="class" class="form-label">Graduating Class Year</label>
  <input v-model="editable.class" type="text" class="form-control"  id="class" placeholder="">
</div>
<input type="checkbox" id="graduated" v-model="editable.graduated" />
<label for="graduated">Graduated</label>
<div>
    <button type="submit" class="btn btn-primary mb-4">Update Profile</button>
</div>
  </form>
</template>

<script>
import { computed, ref, watchEffect } from 'vue';
import { AppState } from '../AppState';
import Pop from "../utils/Pop.js";
import { accountService } from "../services/AccountService.js";
export default {
  setup() {

    const editable = ref({})

async function updateAccount() {
  try {
    const resBody = editable.value
    await accountService.updateAccount(resBody)
  } catch (error) {
    Pop.error(error.messgae)
  }
}

watchEffect(() => {editable.value = {...AppState.account}})

    return {
      account: computed(() => AppState.account),

      editable,
      updateAccount
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
