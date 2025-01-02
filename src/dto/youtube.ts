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
  contentDetails: {
    relatedPlaylists: {
      likes: string
      uploads: string
    }
  }
  exp?: number
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
  contentDetails: {
    duration: string
    dimension: string
    definition: string
    caption: string
    licensedContent: boolean
    projection: string
  }
  statistics: {
    viewCount: string
    likeCount: string
    favoriteCount: string
    commentCount: string
  }
}

export interface PlaylistItem {
  contentDetails: {
    videoId: string
  }
}
