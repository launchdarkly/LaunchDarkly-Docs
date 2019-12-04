declare module 'github-slugger' {
  class Slugger {
    constructor()

    slug(value: string, maintainCase?: boolean): string

    reset(): void
  }

  export default Slugger
}
