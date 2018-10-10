import {ThinkEhrUtil} from '../ThinkEhrUtil';
/**
 * Created by matjazhi on 31.5.2016.
 */

export class PeriodISO8601Parser {

  static parse(period, distributeOverflow?: boolean) {
    return PeriodISO8601Parser.parsePeriodString(period, distributeOverflow);
  };

  public iso8601_version: string = '0.2';
  constructor() {
  }
  
  static parseToTotalSeconds(period) {

    let multiplicators = [
      31104000 /* year   (360*24*60*60) */,
      2592000  /* month  (30*24*60*60) */,
      604800   /* week   (24*60*60*7) */,
      86400    /* day    (24*60*60) */,
      3600     /* hour   (60*60) */,
      60       /* minute (60) */,
      1        /* second (1) */];

    let durationPerUnit = PeriodISO8601Parser.parsePeriodString(period);
    let durationInSeconds = 0;

    for (let i = 0; i < durationPerUnit.length; i++) {
      let dpu = durationPerUnit[i];
      if (!ThinkEhrUtil.isNumber(dpu)) {
        dpu = 0;
      }
      durationInSeconds += durationPerUnit[i] * multiplicators[i];
    }

    return durationInSeconds;
  };


  static isValid(period) {
    try {
      PeriodISO8601Parser.parsePeriodString(period);
      return true;
    } catch (e) {
      return false;
    }
  };

  static periodToString(periodArray) {
    if (!ThinkEhrUtil.isArray(periodArray) || periodArray.length !== 7) {
      return null;
    } else {
      let periodMarkers = ['Y', 'M', 'W', 'D', 'H', 'M', 'S'];

      let ps = 'P';
      let hasDatePd = false;
      let hasTimePd = false;

      periodArray.forEach(function (p, i) {
        if (i === 4) {
          ps += 'T';
        }

        if (p !== 0 && p !== null) {
          ps += (p + periodMarkers[i]);
          if (!hasDatePd) {
            hasDatePd = i <= 3;
          }
          if (!hasTimePd) {
            hasTimePd = i >= 4;
          }
        }
      });

      if (!hasDatePd && !hasTimePd) {
        ps = null;
      } else if (!hasTimePd) {
        ps = ps.substring(0, ps.length - 1);
      }

      return ps;
    }
  };

  /**
   * Parses a ISO8601 period string.
   * @param period iso8601 period string
   * @param _distributeOverflow if 'true', the unit overflows are merge into the next higher units.
   */
  private static parsePeriodString(period: string, _distributeOverflow = false) {

    // regex splits as follows
    // grp0 omitted as it is equal to the sample
    //
    // | sample            | grp1   | grp2 | grp3 | grp4 | grp5 | grp6       | grp7 | grp8 | grp9 |
    // --------------------------------------------------------------------------------------------
    // | P1Y2M3W           | 1Y2M3W | 1Y   | 2M   | 3W   | 4D   | T12H30M17S | 12H  | 30M  | 17S  |
    // | P3Y6M4DT12H30M17S | 3Y6M4D | 3Y   | 6M   |      | 4D   | T12H30M17S | 12H  | 30M  | 17S  |
    // | P1M               | 1M     |      | 1M   |      |      |            |      |      |      |
    // | PT1M              | 3Y6M4D |      |      |      |      | T1M        |      | 1M   |      |
    // --------------------------------------------------------------------------------------------

    let distributeOverflow = (_distributeOverflow) ? _distributeOverflow : false;
    let valueIndexes: number[] = [2, 3, 4, 5, 7, 8, 9];
    let duration: number[] = [0, 0, 0, 0, 0, 0, 0];
    let overflowLimits: number[] = [0, 12, 4, 7, 24, 60, 60];
    let struct: any;

    // upcase the string just in case people don't follow the letter of the law
    if (period === null || period === undefined) {
      return [null, null, null, null, null, null, null];
    }
    period = period.toUpperCase();

    // input validation
    if (!period) {
      return duration;
    } else if ( typeof period !== 'string' ) {
      throw new Error('Invalid iso8601 period string \'' + period + '\'');
    };

    // parse the string
    if (struct = /^P((\d+Y)?(\d+M)?(\d+W)?(\d+D)?)?(T(\d+H)?(\d+M)?(\d+S)?)?$/.exec(period)) {

      // remove letters, replace by 0 if not defined
      for (let i = 0; i < valueIndexes.length; i++) {
        let structIndex = valueIndexes[i];
        duration[i] = struct[structIndex] ? +struct[structIndex].replace(/[A-Za-z]+/g, '') : 0;
      }
    }else {
      throw new Error('String \'' + period + '\' is not a valid ISO8601 period.');
    }

    if (distributeOverflow) {
      // note: stop at 1 to ignore overflow of years
      for (let i = duration.length - 1; i > 0; i--) {
        if (duration[i] >= overflowLimits[i]) {
          duration[i - 1] = duration[i - 1] + Math.floor(duration[i] / overflowLimits[i]);
          duration[i] = duration[i] % overflowLimits[i];
        }
      }
    }

    return duration;
  }

}
