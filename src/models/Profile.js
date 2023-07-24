export class Profile {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.picture = data.picture
    this.coverImg = data.coverImg
    this.bio = data.bio
    this.linkedin = data.linkedin
    this.github = data.github
    this.class = data.class
    this.graduated = data.graduated ? 'Graduated 🎓' : 'Not Graduated 🎓';
  }

}