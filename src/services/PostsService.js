import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class PostsService {

  async getPosts() {
    const res = await api.get('/api/posts')
    logger.log('[GOT POSTS]', res.data)
    const posts = res.data.posts.map(postPojo => new Post(postPojo))

    AppState.posts = posts

    AppState.newer = res.data.newer
    AppState.older = res.data.older
  }

  async getProfilePosts(profileId) {
    const res = await api.get('api/posts', {
      params: {
        creatorId: profileId
      }
    })
    logger.log('[GETTING PROFILE POSTS]', res.data)

    const profilePosts = res.data.posts.map(postPojo => new Post(postPojo))
    AppState.posts = profilePosts
  }

  async changePage(url) {
    const res = await api.get(url)
    logger.log('[CHANGING PAGE]')
    AppState.newer = res.data.newer
    AppState.older = res.data.older

    const profilePosts = res.data.posts.map(postPojo => new Post(postPojo))
    AppState.posts = profilePosts

  }

}

export const postsService = new PostsService()