import { StudySession } from '../types';
import sessionsIndex from './sessions/index.json';

// Load all session data from JSON files
const loadSessionData = (): StudySession[] => {
  return sessionsIndex.map((filename: string) => {
    const sessionData = require(`./sessions/${filename}`);
    return {
      id: sessionData.id,
      title: sessionData.title,
      date: sessionData.date,
      presenter: sessionData.presenter,
      description: sessionData.description,
      tags: sessionData.tags || [],
      materials: sessionData.materials || [],
      videoUrl: sessionData.videoUrl,
      thumbnailUrl: sessionData.thumbnailUrl,
      podcastUrl: sessionData.podcastUrl
    };
  });
};

export const sessionsData = loadSessionData();