/**
 * Created by matjazhi on 15.4.2016.
 */

export class ThinkEhrUtil {
  static isArray(o): boolean {
    return Object.prototype.toString.call(o) === '[object Array]';
  }

  static isObject(o): boolean {
    return Object.prototype.toString.call(o) === '[object Object]';
  }

  static isString(o): boolean {
    return Object.prototype.toString.call(o) === '[object String]';
  }

  static isDate(o): boolean {
    return Object.prototype.toString.call(o) === '[object Date]' && !isNaN(o.getTime());
  }

  static isInteger(o): boolean {
    return (o === parseInt(o));
  }

  static isNumber(o): boolean {
    return !isNaN(parseFloat(o)) && isFinite(o);
  }

  static isFunction(f): boolean {
    var getType = {};
    return f && getType.toString.call(f) === '[object Function]';
  }

  static deepClone(o: any): any {
    return JSON.parse(JSON.stringify(o));
  }

  static copyArrayShallow(arr: Array<any>): Array<any> {
    var na = new Array(arr.length);
    var i = arr.length;
    while (i--) {
      na[i] = arr[i];
    }
    return na;
  }

  static countProperties(o): number {
    if (o && Object.keys) {
      return Object.keys(o).length;
    } else {
      var count: number = 0;
      for (var k in o) {
        if (o.hasOwnProperty(k)) {
          count++;
        }
      }

      return count;
    }
  }

  static getNthProperty(o, n): string {
    if (Object.keys) {
      return o[Object.keys(o)[n]];
    } else {
      var count = 0;
      for (var k in o) {
        if (o.hasOwnProperty(k)) {
          if (count++ === n) {
            return k;
          }
        }
      }

      return null;
    }
  }

  static guid(separatorParam?: string): string {
    var separator: string = separatorParam ? separatorParam : '-';
    var maskStr: string = 'xxxxxxxx' + separator + 'xxxx' + separator + '4xxx' + separator + 'yxxx' + separator + 'xxxxxxxxxxxx';
    return maskStr.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  static toDate(o): Date {
    if (this.isString(o)) {
      var retDate = o.length > 0 ? new Date(o) : null;
      return retDate && this.isDate(retDate) ? retDate : null;
    }

    return o;
  }

  static toTime(o): Date {
    if (this.isString(o)) {
      if (o.length > 0) {

        var tv = "1970-01-02T" + o;
        var retDate = new Date(tv);

        return retDate && this.isDate(retDate) ? retDate : null;
      } else {
        return null;
      }
    }

    return o;
  }

  static toLocalTimezoneOffsetISOString(isoDateString: string): string {
    if (this.isString(isoDateString)) {

      var isoDateRegex: RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
      var timeDelimiter: number = isoDateString.indexOf("T");
      if (timeDelimiter > 0) {
        var timezoneDelimiterIndex: number = isoDateString.indexOf("+");
        if (timezoneDelimiterIndex < 0) {

          //find any characters after T delimiter
          var anyCharsAfterTimeDelimiter: boolean = isoDateString.match(/(\D*)/g).map(function (itm, i) {
            return itm.length && itm.match(/[^0-9\d\s\.:-]/) ? i : null
          }).filter(function (itm) {
            return itm > timeDelimiter
          }).length > 0;
          if (!anyCharsAfterTimeDelimiter) {
            // add time value, remove millis
            while (isoDateString.substring(timeDelimiter + 1).split(":").length <= 2) {
              isoDateString += ':00';
            }
            var millisDelimiter: number = isoDateString.indexOf('.');
            if (millisDelimiter > 0) {
              isoDateString = isoDateString.substring(0, millisDelimiter);
            }
          }
          if (isoDateString.search(isoDateRegex) != 0) {
            var dateStrPartSplit: Array<string> = isoDateString.substring(0, timeDelimiter).split('-');
            var timeStrPartSplit: Array<string> = isoDateString.substring(timeDelimiter + 1).split(':');
            var toDoubleDigit = function (val: string): string {
              if (val.length < 2) {
                return ("00" + val).slice(-2);
              }
              return val
            };
            var dateStrPartString: string = dateStrPartSplit.map(toDoubleDigit).join('-');
            var timeStrPartString = timeStrPartSplit.map(toDoubleDigit).join(':');
            isoDateString = dateStrPartString + 'T' + timeStrPartString
          }
        }
      }

      if (isoDateString.search(isoDateRegex) == 0) {
        var pad = function (num) {
            var norm: number = Math.abs(Math.floor(num));
            return (norm < 10 ? '0' : '') + norm;
          },
          tzo = -(new Date(isoDateString)).getTimezoneOffset(),
          sign = tzo >= 0 ? '+' : '-';
        return isoDateString + '.000' + sign + pad(tzo / 60) + ':' + pad(tzo % 60);
      } else {
        return isoDateString;
      }
    }
    return isoDateString;
  }

  static toDateApplyTzDiff(o) {

    var d: Date;
    if (this.isString(o)) {
      d = o.length > 0 ? new Date(o) : null;
    } else if (this.isDate(o)) {
      d = o;
    }

    if (d) {
      var curDate: Date = new Date();
      var offsetMs: number = curDate.getTimezoneOffset() * 60 * 1000;
      var dMs: number = d.getTime();
      var modifiedTs: number = dMs + offsetMs;
      d = new Date();
      d.setTime(modifiedTs);

      return d;
    }

    return o;
  }

  static toUtcDate(o) {
    if (this.isDate(o)) {
      var offsetMs: number = o.getTimezoneOffset() * 60 * 1000;
      if (offsetMs === 0) {
        return o;
      } else {
        var d: Date = new Date();
        d.setTime(o.getTime() + offsetMs);
        return d;
      }
    }

    return o;
  }

//TODO check why sometimes Date is returned and sometimes timestamp number - ??
  static dateFromISO(s: string): any {
    var testIso = '2011-11-24T09:00:27';
    // Chrome
    var diso: number = Date.parse(testIso);
    if (diso === 1322118027000) return function (s) {
      return new Date(Date.parse(s));
    };
    // JS 1.8 gecko
    var noOffset = function (s): number {
      var day = s.slice(0, -5).split(/\D/).map(function (itm) {
        return parseInt(itm, 10) || 0;
      });
      day[1] -= 1;
      day = new Date(Date.UTC.apply(Date, day));
      var offsetString = s.slice(-5);
      var offset = parseInt(offsetString, 10) / 100;
      if (offsetString.slice(0, 1) == "+") offset *= -1;
      day.setHours(day.getHours() + offset);
      return day.getTime();
    };
    if (noOffset(testIso) === 1322118027000) {
      return noOffset;
    }
    var ret = function (s) { // kennebec@SO + QTax@SO
      var day, tz,
//        rx = /^(\d{4}\-\d\d\-\d\d([tT][\d:\.]*)?)([zZ]|([+\-])(\d{4}))?$/,
        rx = /^(\d{4}\-\d\d\-\d\d([tT][\d:\.]*)?)([zZ]|([+\-])(\d\d):?(\d\d))?$/,

        p = rx.exec(s) || [];
      if (p[1]) {
        day = p[1].split(/\D/).map(function (itm) {
          return parseInt(itm, 10) || 0;
        });
        day[1] -= 1;
        day = new Date(Date.UTC.apply(Date, day));
        if (!day.getDate()) return NaN;
        if (p[5]) {
          tz = parseInt(p[5], 10) / 100 * 60;
          if (p[6]) tz += parseInt(p[6], 10);
          if (p[4] == "+") tz *= -1;
          if (tz) day.setUTCMinutes(day.getUTCMinutes() + tz);
        }
        return day;
      }
      return NaN;
    };
    return ret(s)
  }

  static isSameTimezone(d1: Date, d2: Date): boolean {
    if (this.isDate(d1) && this.isDate(d2)) {
      return d1.getTimezoneOffset() === d2.getTimezoneOffset();
    }

    return false;
  }

  static sanitizeName(name) {
    return name.replace(/[\/:-]/g, "_");
  }

  static _extend(from: Object, to: Object): any {
    for (var prop in from) {
      if (from.hasOwnProperty(prop)) {
        to[prop] = from[prop];
      }
    }
  };

  static arrayValuesEqual(v1, v2) {
    if (v1 instanceof Array && v2 instanceof Array) {
      var valuesEqual: boolean = v1.length === v2.length && (v1.findIndex((val1: any, ind: number) => {
        return val1 !== v2[ind];
      }) < 0);
      //console.log("COMPARE DIST", v1, v2, valuesEqual);
      return valuesEqual;
    } else {
      return v1 === v2;
    }
  };

  /*static arrayObjectValuesEqual(v1, v2) {
    if (v1 instanceof Array && v2 instanceof Array) {
      return v1.length === v2.length && (v1.findIndex((val1: any, ind: number) => {
        return ThinkEhrUtil.flatObjectCompare(val1, v2[ind]);
      }) < 0);
    } else {
      return v1 === v2;
    }
  };
static flatObjectCompare (a, b) {
    // Create arrays of property names
    const aProps = Object.getOwnPropertyNames(a);
    const bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
      return false;
    }

    for (let i = 0; i < aProps.length; i++) {
      const propName = aProps[i];

      // If values of same property are not equal,
      // objects are not equivalent
      if (a[propName] !== b[propName]) {
        return false;
      }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
  }*/
}
