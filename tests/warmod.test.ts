import { ok } from "assert";
import { parse } from "../src";
import { getEventString } from "./helpers/getEventString";

describe("warmod", (): void => {
  it("should correctly parse", () => {
    const log = getEventString('[WarMod_BFG] {"event":"test"}');

    const result = parse(log);

    ok(result !== undefined, `Failed parse log: ${log}`);

    expect(result.type).toBe("warmod");
    expect(result.payload).toMatchObject({
      event: "test",
    });
  });
});
