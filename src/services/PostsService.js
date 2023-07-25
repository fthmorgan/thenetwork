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
    AppState.older = res.data.older
  }

  async changePage(url) {
    const res = await api.get(url)
    logger.log('[CHANGING PAGE]', url)
    AppState.newer = res.data.newer
    AppState.older = res.data.older

    const posts = res.data.posts.map(postPojo => new Post(postPojo))
    AppState.posts = posts

  }
  async changeProfilePage(profileId, page) {
    logger.log('before req', profileId, page)
    // TODO pass in the url from the profile response (newer/older)
    const res = await api.get(profileId, page)
    logger.log('[CHANGING PROFILE PAGE]', res.data)
    AppState.newer = res.data.newer
    AppState.older = res.data.older
    AppState.page = res.data.page

    const posts = res.data.posts.map(postPojo => new Post(postPojo))
    AppState.profilePosts = posts
  }

  async createPost(postData) {
    const res = await api.post('api/posts', postData)

    logger.log('[CREATED POST]', res.data)

    const post = new Post(res.data)

    AppState.posts.push(post)
  }

  async removePost(postId) {
    const res = await api.delete(`api/posts/${postId}`)

    logger.log('[REMOVED POST]', res.data)

    const postIndex = AppState.posts.findIndex(post => post.id == postId)

    AppState.posts.splice(postIndex, 1)
  }

  async likePost(postId) {
    const res = await api.post(`/api/posts/${postId}/like`)
    logger.log('[LIKED POST]', res.data)

    const post = new Post(res.data)

    AppState.posts.push(post)
  }

  async editPost(postData) {
    const res = await api.put(`api/posts/${postData.id}`, postData)

    logger.log('[EDITED POST]', res.data)

    const post = new Post(res.data)

    const postIndex = AppState.posts.findIndex(post => post.id == postData.id)

    AppState.posts.splice(postIndex, 1, post)
  }

  setPostToEdit(postToEdit) {
    AppState.activePost = postToEdit
    logger.log('[SET TO EDIT]', AppState.activePost)
  }

  async getPostsByQuery(queryObject) {
    const res = await api.get(`/api/posts?query=${queryObject.query}`)

    logger.log('[GOT POSTS WITH QUERY]', res.data)

    const posts = res.data.posts.map(postPojo => new Post(postPojo))

    AppState.posts = posts
  }

}

export const postsService = new PostsService()