import { ok } from "assert";
import { parse } from "../src";
import { getEventString } from "./helpers/getEventString";
import { unknownTeam } from "./helpers/teams";

describe("validated", (): void => {
  it("should correctly parse", () => {
    const events: [string, Record<string, unknown>][] = [
      [
        '"PlayerName<93><[U:1:230970467]><>" STEAM USERID validated',
        {
          kind: "valid",

          player: {
            kind: "player",

            entityId: 93,
            steamId: "[U:1:230970467]",

            name: "PlayerName",

            team: unknownTeam,
          },
        },
      ],
      [
        "STEAMAUTH: Client PlayerName received failure code 6",
        {
          kind: "failed",

          player: {
            name: "PlayerName",
          },

          code: 6,
        },
      ],
    ];

    for (const [log, event] of events) {
      const result = parse(getEventString(log));

      ok(result !== undefined, `Failed parse log: ${log}`);

      expect(result.type).toBe("validated");
      expect(result.payload).toMatchObject(event);
    }
  });
});
