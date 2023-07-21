export class Post {
  constructor(data) {
    this.id = data.id
    this.body = data.body
    this.imgUrl = data.imgUrl
    this.creatorId = data.creatorId
    this.likeIds = data.likeIds
    this.creator = data.creator
    this.likes = data.likes
    this.createdAt = new Date(data.createdAt)
  }

}
// let post = {
//   "creator": {
//     "_id": "63922fd4274d85e20428e306",
//     "subs": [
//       "auth0|63922fd3f27265590db73a6a"
//     ],
//     "email": "b.chilling@fast9.gov",
//     "name": "Bing Chilling",
//     "picture": "https://pbs.twimg.com/media/E-c1f4-WEAYnXDf.png",
//     "bio": "Go watch fast 9 today!",
//     "coverImg": "https://i.ytimg.com/vi/v_yT2lDEpwU/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AHUBoAC4AOKAgwIABABGBMgSyh_MA8=&rs=AOn4CLCXgPX1brmcl35ysT-n8Uaylncbzw",
//     "github": "https://github.com/MickShannahan",
//     "linkedin": "",
//     "resume": "https://MickShannahan.github.io",
//     "class": "All the Classes",
//     "graduated": false,
//     "createdAt": "2023-06-29T23:42:59.532Z",
//     "updatedAt": "2023-07-20T22:46:50.130Z",
//     "__v": 0,
//     "id": "63922fd4274d85e20428e306"
//   },
//   "likes": [
//     {
//       "_id": "63922fd4274d85e20428e306",
//       "name": "Bing Chilling",
//       "picture": "https://pbs.twimg.com/media/E-c1f4-WEAYnXDf.png",
//       "id": "63922fd4274d85e20428e306"
//     }
//   ],
//   "id": "64b9b8ebeb84f17d842ed3c4"
// }