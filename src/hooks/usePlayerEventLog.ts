import {useEffect, useState} from 'react';
import {
  THEOplayer,
  Event,
  ReadyStateChangeEvent,
  TimeUpdateEvent,
  ErrorEvent,
  PlayerEventType,
  MediaTrackListEvent,
  TextTrackListEvent,
} from 'react-native-theoplayer';

export const MOST_PLAYER_EVENTS: PlayerEventType[] = [
  PlayerEventType.ENDED,
  PlayerEventType.ERROR,
  PlayerEventType.LOAD_START,
  PlayerEventType.LOADED_DATA,
  PlayerEventType.LOADED_METADATA,
  PlayerEventType.CANPLAY,
  PlayerEventType.PLAY,
  PlayerEventType.PLAYING,
  PlayerEventType.PAUSE,
  PlayerEventType.READYSTATE_CHANGE,
  PlayerEventType.PRESENTATIONMODE_CHANGE,
  PlayerEventType.RATE_CHANGE,
  PlayerEventType.SEEKED,
  PlayerEventType.SEEKING,
  PlayerEventType.SOURCE_CHANGE,
  PlayerEventType.TIME_UPDATE,
  PlayerEventType.VOLUME_CHANGE,
  PlayerEventType.WAITING,
  PlayerEventType.TEXT_TRACK,
  PlayerEventType.TEXT_TRACK_LIST,
  PlayerEventType.MEDIA_TRACK,
  PlayerEventType.MEDIA_TRACK_LIST,
];

export function usePlayerEventLog(
  player: THEOplayer | undefined,
  playerEvents: PlayerEventType[] = MOST_PLAYER_EVENTS,
  maxLogLines = 25,
): string {
  const [log, updateLog] = useState<string[]>([]);
  useEffect(() => {
    const onEvent = (event: Event) => {
      updateLog((currentLog) => {
        return [
          ...currentLog,
          `[${formatDate(event.date)}] ${event.type} ${formatEventBody(event)}`,
        ];
      });
    };
    playerEvents.forEach((eventType) =>
      player?.addEventListener(eventType, onEvent),
    );
    return () => {
      playerEvents.forEach((eventType) =>
        player?.removeEventListener(eventType, onEvent),
      );
    };
  }, [player]);
  return log.slice(-maxLogLines).join('\n');
}

function formatEventBody(event: Event): string {
  switch (event.type) {
    case PlayerEventType.READYSTATE_CHANGE:
      return formatReadyState((event as ReadyStateChangeEvent).readyState);
    case PlayerEventType.TIME_UPDATE:
      return `${1e-3 * (event as TimeUpdateEvent).currentTime}s`;
    case PlayerEventType.ERROR:
      return `[${(event as ErrorEvent).error.errorCode}] ${
        (event as ErrorEvent).error.errorMessage
      }`;
    case PlayerEventType.TEXT_TRACK_LIST:
    case PlayerEventType.MEDIA_TRACK_LIST:
      return formatTrackListEvent(
        event as MediaTrackListEvent | TextTrackListEvent,
      );
  }
  return '';
}

function formatDate(date: Date): string {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function formatTrackListEvent(
  event: MediaTrackListEvent | TextTrackListEvent,
): string {
  const track = event.track;
  return `${event.subType}: ${track.label} ${track.kind}`;
}

function formatReadyState(readyState: number): string {
  switch (readyState) {
    case 0:
      return 'HAVE_NOTHING';
    case 1:
      return 'HAVE_METADATA';
    case 2:
      return 'HAVE_CURRENT_DATA';
    case 3:
      return 'HAVE_FUTURE_DATA';
    case 4:
      return 'HAVE_ENOUGH_DATA';
  }
  return `UNKNOWN (${readyState})`;
}
