import { AppState } from "../AppState.js"
import { Ad } from "../models/Ad.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class AdsService {
  async getAds() {
    const res = await api.get('api/ads')
    logger.log('[GOT ADS]', res.data)

    const ads = res.data.map(adPojo => new Ad(adPojo))

    AppState.ads = ads
  }
}

export const adsService = new AdsService()