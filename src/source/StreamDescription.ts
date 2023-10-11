import {SourceDescription} from 'react-native-theoplayer';

export enum StreamType {
  dash = 'DASH',
  hls = 'HLS (CMAF)',
  hls_mpeg2 = 'HLS (MPEG-2 TS)',
  mp3 = 'MP3',
  mp4 = 'MP4',
}

export enum ContentType {
  vod = 'VOD',
  live = 'Live',
}

export interface StreamDescription {
  id: string;
  title: string;
  streamType: StreamType;
  contentType: ContentType;
  isContentProtected: boolean;
  hasCaptions: boolean;
  isMultiPeriod: boolean;
  sourceDescription: SourceDescription;
}
