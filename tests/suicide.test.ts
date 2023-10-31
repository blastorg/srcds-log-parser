import { ok } from "assert";
import { parse } from "../src";
import { getEventString } from "./helpers/getEventString";
import { counterTerroristTeam } from "./helpers/teams";

describe("suicide", (): void => {
  it("should correctly parse", () => {
    const player = {
      kind: "player",

      entityId: 93,
      steamId: "76561198191236195",

      name: "PlayerName",

      position: [-1117, 2465, -72],

      team: counterTerroristTeam,
    };

    const events: [string, Record<string, unknown>][] = [
      [
        '"PlayerName<93><[U:1:230970467]><CT>" [-1117 2465 -72] committed suicide with "world"',
        {
          player,
          how: "world",
        },
      ],
      [
        '"PlayerName<93><[U:1:230970467]><CT>" [-1117 2465 -72] committed suicide with "hegrenade"',
        {
          player,
          how: "hegrenade",
        },
      ],
      [
        '"PlayerName<93><[U:1:230970467]><CT>" [-1117 2465 -72] committed suicide with "inferno"',
        {
          player,
          how: "inferno",
        },
      ],
    ];

    for (const [log, event] of events) {
      const result = parse(getEventString(log));

      ok(result !== undefined, `Failed parse log: ${log}`);

      expect(result.type).toBe("suicide");
      expect(result.payload).toMatchObject(event);
    }
  });
});
