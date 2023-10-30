import { ok } from "assert";
import { parse } from "../src";
import { getEventString } from "./helpers/getEventString";
import { counterTerroristTeam } from "./helpers/teams";

describe("purchased", (): void => {
  it("should correctly parse", () => {
    const log = getEventString('"PlayerName<93><[U:1:230970467]><CT>" purchased "aug"');

    const result = parse(log);

    ok(result !== undefined, `Failed parse log: ${log}`);

    expect(result.type).toBe("purchased");
    expect(result.payload).toMatchObject({
      player: {
        kind: "player",

        entityId: 93,
        steamId: "[U:1:230970467]",

        name: "PlayerName",

        team: counterTerroristTeam,
      },
      weaponName: "aug",
    });
  });
});
