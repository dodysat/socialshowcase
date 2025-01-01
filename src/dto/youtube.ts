export interface Channel {
  id: string
  snippet: {
    title: string
    description: string
    customUrl: string
    publishedAt: string
    thumbnails: {
      high: {
        url: string
        width: number
        height: number
      }
    }
    localized: {
      title: string
      description: string
    }
  }
  statistics: {
    viewCount: string
    subscriberCount: string
    hiddenSubscriberCount: boolean
    videoCount: string
  }
}

export interface Video {
  id: string
  snippet: {
    publishedAt: string
    channelId: string
    title: string
    description: string
    channelTitle: string
    thumbnails: {
      maxres: {
        url: string
        width: number
        height: number
      }
    }
    tags: string[]
    categoryId: string
  }
  statistics: {
    viewCount: string
    likeCount: string
    favoriteCount: string
    commentCount: string
  }
}
