import { ok } from "assert";
import { parse, IParseOptions } from "../src";

const DATE_FILE = "01/28/2024 - 16:17:18: "
const DATE_HTTP = "01/28/2024 - 16:17:18.000 - "
const DATE      = "01/28/2024 16:17:18"

describe("parse function", (): void => {
  it("should correctly parse the receivedAt date for 'file' format", () => {
    const log = `${DATE_FILE}"PlayerName<1><[U:1:230970467]><>" connected, address ""`;
    const options: IParseOptions = {
      format: 'file'
    }
    const result = parse(log, options);
    const expectedDate = new Date(DATE)

    ok(result !== undefined, `Failed parse log: ${log}`);
    expect(result).toBeDefined();
    expect(result.receivedAt).toEqual(expectedDate);
  });

  it("should correctly parse the receivedAt date for 'http' format", () => {
    const log = `${DATE_HTTP}"PlayerName<1><[U:1:230970467]><>" connected, address ""`;
    const options: IParseOptions = {
      format: 'http'
    }
    const result = parse(log, options);
    const expectedDate = new Date(DATE)

    ok(result !== undefined, `Failed parse log: ${log}`);
    expect(result).toBeDefined();
    expect(result.receivedAt).toEqual(expectedDate);
  });

  it('should use "file" when not specified for backwards compatibility.', () => {
    const log = `${DATE_FILE}"PlayerName<1><[U:1:230970467]><>" connected, address ""`;
    const result = parse(log);
    const expectedDate = new Date(DATE)

    ok(result !== undefined, `Failed parse log: ${log}`);
    expect(result).toBeDefined();
    expect(result.receivedAt).toBeInstanceOf(Date);
    expect(result.receivedAt).toEqual(expectedDate);
  });
});
