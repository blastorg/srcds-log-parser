import { ok } from "assert";
import { parse } from "../src";
import { getEventString } from "./helpers/getEventString";

describe("server_log", (): void => {
  it("should correctly parse", () => {
    const events: [string, Record<string, unknown>][] = [
      [
        String.raw`Log file started (file "logs\L172_028_192_001_27015_202009211728_000.log") (game "C:\Program Files (x86)\Steam\steamapps\common\Counter-Strike Global Offensive\csgo") (version "7929")`,
        {
          kind: "log_file",
          state: "started",
          filePath: String.raw`logs\L172_028_192_001_27015_202009211728_000.log`,
          gamePath: String.raw`C:\Program Files (x86)\Steam\steamapps\common\Counter-Strike Global Offensive\csgo`,
          version: "7929",
        },
      ],
      [
        "Log file closed",
        {
          kind: "log_file",
          state: "closed",
        },
      ],
      [
        'Loading map "de_inferno"',
        {
          kind: "map",
          state: "loading",
          map: "de_inferno",
        },
      ],
      [
        'Started map "de_inferno" (CRC "-896074606")',
        {
          kind: "map",
          state: "started",
          map: "de_inferno",
          crc: "-896074606",
        },
      ],
      [
        'server_message: "quit"',
        {
          kind: "message",
          message: "quit",
        },
      ],
      [
        'server_message: "restart"',
        {
          kind: "message",
          message: "restart",
        },
      ],
    ];

    for (const [log, event] of events) {
      const result = parse(getEventString(log));

      ok(result !== undefined, `Failed parse log: ${log}`);

      expect(result.type).toBe("server_log");
      expect(result.payload).toMatchObject(event);
    }
  });
});
