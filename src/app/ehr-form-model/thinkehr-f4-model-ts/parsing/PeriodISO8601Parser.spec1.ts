import {} from '@angular/core/testing';
import {PeriodISO8601Parser} from "./PeriodISO8601Parser";
import {ThinkEhrUtil} from "../ThinkEhrUtil";


describe('PeriodISO8601Parser', () => {

  it("Nezasa Period Parse Test", function () {
    let pStr = "P1M";
    let p = PeriodISO8601Parser.parse(pStr);
    expect(PeriodISO8601Parser.isValid(pStr)).toBeTruthy();
    expect(ThinkEhrUtil.isArray(p)).toBeTruthy();
    expect(p.length).toBe(7);
    expect(p[0]).toBe(0);
    expect(p[1]).toBe(1);
    expect(p[2]).toBe(0);
    expect(p[3]).toBe(0);
    expect(p[4]).toBe(0);
    expect(p[5]).toBe(0);
    expect(p[6]).toBe(0);

    pStr = "P2DT4H16M";
    p = PeriodISO8601Parser.parse(pStr);
    expect(ThinkEhrUtil.isArray(p)).toBeTruthy();
    expect(PeriodISO8601Parser.isValid(pStr)).toBeTruthy();
    expect(p.length).toBe(7);
    expect(p[0]).toBe(0);
    expect(p[1]).toBe(0);
    expect(p[2]).toBe(0);
    expect(p[3]).toBe(2);
    expect(p[4]).toBe(4);
    expect(p[5]).toBe(16);
    expect(p[6]).toBe(0);

    pStr = "PT14H450M303S";
    p = PeriodISO8601Parser.parse(pStr);
    expect(ThinkEhrUtil.isArray(p)).toBeTruthy();
    expect(PeriodISO8601Parser.isValid(pStr)).toBeTruthy();
    expect(p.length).toBe(7);
    expect(p[0]).toBe(0);
    expect(p[1]).toBe(0);
    expect(p[2]).toBe(0);
    expect(p[3]).toBe(0);
    expect(p[4]).toBe(14);
    expect(p[5]).toBe(450);
    expect(p[6]).toBe(303);

    // With overflow
    p = PeriodISO8601Parser.parse(pStr, true);
    expect(ThinkEhrUtil.isArray(p)).toBeTruthy();
    expect(PeriodISO8601Parser.isValid(pStr)).toBeTruthy();
    expect(p.length).toBe(7);
    expect(p[0]).toBe(0);
    expect(p[1]).toBe(0);
    expect(p[2]).toBe(0);
    expect(p[3]).toBe(0);
    expect(p[4]).toBe(21);
    expect(p[5]).toBe(35);
    expect(p[6]).toBe(3);

  });

  it("Nezasa Period To String Test", function () {
    let pStr = "P1M";
    let p = PeriodISO8601Parser.parse(pStr);
    expect(PeriodISO8601Parser.isValid(pStr)).toBeTruthy();
    let psStr2 = PeriodISO8601Parser.periodToString(p);
    expect(psStr2).toBe("P1M");

    pStr = "P2DT4H16M";
    p = PeriodISO8601Parser.parse(pStr);
    expect(PeriodISO8601Parser.isValid(pStr)).toBeTruthy();
    psStr2 = PeriodISO8601Parser.periodToString(p);
    expect(psStr2).toBe("P2DT4H16M");

    pStr = "PT14H450M303S";
    p = PeriodISO8601Parser.parse(pStr);
    expect(PeriodISO8601Parser.isValid(pStr)).toBeTruthy();
    psStr2 = PeriodISO8601Parser.periodToString(p);
    expect(psStr2).toBe("PT14H450M303S");

  });

  it("Nezasa Period Empty Values Test", function () {

    // ""
    let pStr = "";
    let p = PeriodISO8601Parser.parse(pStr);
    expect(PeriodISO8601Parser.isValid(pStr)).toBeTruthy();
    expect(p.length).toBe(7);
    expect(p[0]).toBe(0);
    expect(p[1]).toBe(0);
    expect(p[2]).toBe(0);
    expect(p[3]).toBe(0);
    expect(p[4]).toBe(0);
    expect(p[5]).toBe(0);
    expect(p[6]).toBe(0);
    let psStr2 = PeriodISO8601Parser.periodToString(p);
    expect(psStr2).toBeNull();

    // null
    pStr = null;
    p = PeriodISO8601Parser.parse(pStr);
    expect(PeriodISO8601Parser.isValid(pStr)).toBeTruthy();
    expect(p.length).toBe(7);
    expect(p[0]).toBeNull();
    expect(p[1]).toBeNull();
    expect(p[2]).toBeNull();
    expect(p[3]).toBeNull();
    expect(p[4]).toBeNull();
    expect(p[5]).toBeNull();
    expect(p[6]).toBeNull();
    psStr2 = PeriodISO8601Parser.periodToString(p);
    expect(psStr2).toBeNull();
  });

  it("Nezasa Array With Nulls Test", function () {

    let p = [null, null, null, null, null, null, null];
    let psStr2 = PeriodISO8601Parser.periodToString(p);
    expect( psStr2 ).toBeNull();

  });

  it("Nezasa Parse to Seconds Test", function () {
    let p = "P1M";
    let seconds = PeriodISO8601Parser.parseToTotalSeconds(p);
    expect(seconds).toBe(2592000);

    //"year": 31104000,
    //    "month": 2592000,
    //    "week": 604800,
    //    "day": 86400,
    //    "hour": 3600,
    //    "minute": 60,
    //    "second": 1

    p = "P2DT4H16M";
    seconds = PeriodISO8601Parser.parseToTotalSeconds(p);
    expect(seconds).toBe(2 * 86400 + 4 * 3600 + 16 * 60);

    expect(PeriodISO8601Parser.parseToTotalSeconds("P4M1W5DT3M")).toBe(PeriodISO8601Parser.parseToTotalSeconds("P4M12DT1M120S"));
  });

});
