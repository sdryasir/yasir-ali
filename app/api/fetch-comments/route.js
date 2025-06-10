import axios from 'axios';
import dbConnect from '@/lib/mongoose';
import Comment from '@/models/Comment';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.CHANNEL_ID;

async function getUploadsPlaylistId() {
  const res = await axios.get('https://www.googleapis.com/youtube/v3/channels', {
    params: {
      part: 'contentDetails',
      id: CHANNEL_ID,
      key: YOUTUBE_API_KEY,
    },
  });
  return res.data.items[0].contentDetails.relatedPlaylists.uploads;
}

async function getAllVideoIds(playlistId) {
  let videoIds = [];
  let nextPageToken = '';
  do {
    const res = await axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
      params: {
        part: 'contentDetails',
        maxResults: 50,
        playlistId,
        pageToken: nextPageToken,
        key: YOUTUBE_API_KEY,
      },
    });
    videoIds.push(...res.data.items.map(item => item.contentDetails.videoId));
    nextPageToken = res.data.nextPageToken;
  } while (nextPageToken);
  return videoIds;
}

async function getVideoDetails(videoId) {
  const res = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
    params: {
      part: 'snippet',
      id: videoId,
      key: YOUTUBE_API_KEY,
    },
  });

  const snippet = res.data.items[0]?.snippet;
  return {
    title: snippet?.title || 'Unknown Title',
    url: `https://www.youtube.com/watch?v=${videoId}`,
  };
}

async function getComments(videoId, videoTitle, videoUrl) {
  let comments = [];
  let nextPageToken = '';

  do {
    const res = await axios.get('https://www.googleapis.com/youtube/v3/commentThreads', {
      params: {
        part: 'snippet',
        videoId,
        maxResults: 50,
        pageToken: nextPageToken,
        key: YOUTUBE_API_KEY,
        textFormat: 'plainText',
      },
    });

    comments.push(
      ...res.data.items.map(item => {
        const snippet = item.snippet.topLevelComment.snippet;
        return {
          videoId,
          videoTitle,
          videoUrl,
          text: snippet.textDisplay,
          author: snippet.authorDisplayName,
          authorImage: snippet.authorProfileImageUrl,
          publishedAt: snippet.publishedAt,
        };
      })
    );

    nextPageToken = res.data.nextPageToken;
  } while (nextPageToken);

  return comments;
}

export async function GET() {
  try {
    await dbConnect();

    const playlistId = await getUploadsPlaylistId();
    const videoIds = await getAllVideoIds(playlistId);
   

    for (const videoId of videoIds) {
      const { title, url } = await getVideoDetails(videoId);
      const comments = await getComments(videoId, title, url);
      await Comment.insertMany(comments, { ordered: false }).catch(() => {});
    }

    return Response.json({ message: 'Comments fetched and stored successfully.', videoIds });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}