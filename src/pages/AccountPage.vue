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
<div>
    <button type="submit" class="btn btn-primary">Update Profile</button>
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
