import { ok } from "assert";
import { parse } from "../src";
import { getEventString } from "./helpers/getEventString";
import { counterTerroristTeam } from "./helpers/teams";

describe("say", (): void => {
  it("should correctly parse", () => {
    const player = {
      kind: "player",

      entityId: 93,
      steamId: "76561198191236195",

      name: "PlayerName",

      team: counterTerroristTeam,
    };

    const events: [string, Record<string, unknown>][] = [
      [
        '"PlayerName<93><[U:1:230970467]><CT>" say "hello"',
        {
          player,
          to: "global",
          message: "hello",
        },
      ],
      [
        '"PlayerName<93><[U:1:230970467]><CT>" say_team "hello"',
        {
          player,
          to: "team",
          message: "hello",
        },
      ],
    ];

    for (const [log, event] of events) {
      const result = parse(getEventString(log));

      ok(result !== undefined, `Failed parse log: ${log}`);

      expect(result.type).toBe("say");
      expect(result.payload).toMatchObject(event);
    }
  });
});
