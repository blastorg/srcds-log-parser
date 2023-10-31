import { ok } from "assert";
import { parse } from "../src";
import { getEventString } from "./helpers/getEventString";
import { counterTerroristTeam } from "./helpers/teams";

describe("threw", (): void => {
  it("should correctly parse", () => {
    const log = getEventString('"PlayerName<93><[U:1:230970467]><CT>" threw molotov [-2035 1521 35]');

    const result = parse(log);

    ok(result !== undefined, `Failed parse log: ${log}`);

    expect(result.type).toBe("threw");
    expect(result.payload).toMatchObject({
      player: {
        kind: "player",

        entityId: 93,
        steamId: "76561198191236195",

        name: "PlayerName",

        position: [-2035, 1521, 35],

        team: counterTerroristTeam,
      },

      item: "molotov",
    });
  });
});
