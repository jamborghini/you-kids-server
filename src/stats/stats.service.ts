import { response } from 'express';
import { Stats } from './entity/stats';
import { YouTubeResponse } from './../stats/interface/YouTubeResponse';

import { take, pluck } from 'rxjs/operators';
import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class StatsService {
    constructor(private http: HttpService) { }

    getResponse(videoId: string): Promise<YouTubeResponse> {
        
        return this.http.get<YouTubeResponse>(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&id=${videoId}&key=AIzaSyB6EJK6gXhGUocdYnwJO7AJfaKU_IqXTSU`).pipe(
            pluck('data'),
            take(1),
        ).toPromise();
    }

    async createStats(videoId: string): Promise<Stats> {
        const response = await this.getResponse(videoId);
       
        if(!response.items.length){
            return null;
        }
        
        const [{ snippet: { title, publishedAt }, statistics: { likeCount, dislikeCount, viewCount } }] = response.items;
        
        return Stats.create({
            title,
            publishedAt: new Date(publishedAt),
            likeCount: parseInt(likeCount) || null,
            dislikeCount: parseInt(dislikeCount) || null,
            viewCount: parseInt(viewCount) || null,
        })
    }
}
