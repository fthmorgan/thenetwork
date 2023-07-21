import { AppState } from "../AppState.js"
import { Profile } from "../models/Profile.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class ProfileService {

  async getProfileById(profileId) {
    const res = await api.get(`api/profiles/${profileId}`)
    logger.log('[GETTING PROFILE]', res.data)
    const profile = new Profile(res.data)
    AppState.activeProfile = profile
  }

}
export const profileService = new ProfileService()

