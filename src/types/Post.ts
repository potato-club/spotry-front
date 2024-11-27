export interface Post{
    createdDate: string,
    title: string,
    conten: string,
    postState: string,
    sport: string,
    viewCount: number,
    likeCount: number,
    commentCount: number,
    tag: [
        string
    ]
}

export interface MainPost{
    id: number,
    title: string,
    sport: string,
    likeCount: number,
}

export interface CrewPost extends MainPost{
    id: number
}