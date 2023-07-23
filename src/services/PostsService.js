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
    AppState.page = res.data.page
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
    logger.log('[CHANGING PAGE]', url)
    AppState.newer = res.data.newer
    AppState.older = res.data.older

    const posts = res.data.posts.map(postPojo => new Post(postPojo))
    AppState.posts = posts

  }
  async changeProfilePage(urlProfile, profileId, page) {
    const res = await api.get(urlProfile, profileId, page)
    logger.log('[CHANGING PAGE]', profileId, page)
    AppState.newer = res.data.newer
    AppState.older = res.data.older
    AppState.page = res.data.page

    const posts = res.data.posts.map(postPojo => new Post(postPojo))
    AppState.profilePosts = posts

  }

}

export const postsService = new PostsService()