import { NextResponse } from 'next/server';
import ytdl from '@distube/ytdl-core';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';
import { OpenAI } from 'openai';

// Setup OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// 🪟 Set ffmpeg path (Only required on Windows)
// ffmpeg.setFfmpegPath('C:\\ffmpeg\\ffmpeg.exe'); 

export async function POST(req) {
  try {
    const { videoUrl } = await req.json();
// const videoUrl = 'https://www.youtube.com/watch?v=aqz-KE-bpKQ';
    console.log("+++++++++++++++", videoUrl);
    

    if (!videoUrl || !ytdl.validateURL(videoUrl)) {
      return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
    }

    const videoId = ytdl.getURLVideoID(videoUrl);
    const audioDir = path.join(process.cwd(), 'tmp');
    if (!fs.existsSync(audioDir)) fs.mkdirSync(audioDir);
    const audioPath = path.join(audioDir, `${videoId}.mp3`);

    // Download and convert audio
    const stream = ytdl(videoUrl, {
      quality: 'highestaudio',
      filter: 'audioonly',
      highWaterMark: 1 << 25,
    });

    stream.on('info', info => {
        console.log('🎥 Video title:', info.videoDetails.title);
    });
    stream.on('error', err => {
        console.error('❌ ytdl stream error:', err.message);
    });

    await new Promise((resolve, reject) => {
      ffmpeg(stream)
        .audioBitrate(128)
        .format('mp3')
        .on('start', (cmd) => console.log('▶️ ffmpeg started:', cmd))
        .on('progress', (p) => console.log('⏳ ffmpeg progress:', p.timemark))
        .on('end', () => {
          console.log('✅ ffmpeg finished');
          resolve();
        })
        .on('error', (err) => {
          console.error('❌ ffmpeg error:', err.message);
          reject(err);
        })
        .save(audioPath);
    });

    const fileSize = fs.statSync(audioPath).size;
    if (fileSize === 0) {
      throw new Error('Audio file is empty');
    }

    console.log('📝 Transcribing...');
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(audioPath),
      model: 'whisper-1',
      response_format: 'text',
    });

    console.log('✅ Transcription done');

    // Optional cleanup
    fs.unlinkSync(audioPath);

    return NextResponse.json({ transcript: transcription }, { status: 200 });
  } catch (error) {
    console.error('[API ERROR]', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
