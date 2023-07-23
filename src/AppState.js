import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},

  /** @type {import('./models/Account.js').Account} */
  account: {},

  /** @type {import('./models/Posts.js').Post[]} */
  posts: [],


  /** @type {import('./models/Post.js').Post|null} */
  profilePosts: [],

  /** @type {import('./models/Profile.js').Profile|null} */
  activeProfile: null,

  newer: null,

  older: null,

  page: 0


})
