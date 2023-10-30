import { ok } from "assert";
import { parse } from "../src";
import { getEventString } from "./helpers/getEventString";

describe("server_cvar", (): void => {
  it("should correctly parse", () => {
    const events: [string, Record<string, unknown>][] = [
      [
        '"mp_fraglimit" = "0"',
        {
          name: "mp_fraglimit",
          value: "0",
        },
      ],
      [
        'server_cvar: "sv_cheats" "1"',
        {
          name: "sv_cheats",
          value: "1",
        },
      ],
    ];

    for (const [log, event] of events) {
      const result = parse(getEventString(log));

      ok(result !== undefined, `Failed parse log: ${log}`);

      expect(result.type).toBe("server_cvar");
      expect(result.payload).toMatchObject(event);
    }
  });
});
