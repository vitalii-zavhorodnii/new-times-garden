import { Duration } from 'luxon';

export const timeReadableConverter = (milliseconds: number): string => {
  const { days, hours, minutes, seconds } =
    Duration.fromMillis(milliseconds).rescale();

  const strTime = `${days ? days + 'd' : ''} ${hours ? hours + 'hr' : ''} ${
    minutes ? minutes + 'min' : ''
  } ${seconds ? seconds + 's' : ''}`;

  return strTime;
};
