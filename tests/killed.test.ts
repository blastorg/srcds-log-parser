import { ok } from "assert";
import { parse } from "../src";
import { getEventString } from "./helpers/getEventString";
import { counterTerroristTeam, terroristTeam } from "./helpers/teams";

describe("killed", (): void => {
  it("should correctly parse", () => {
    const log = getEventString(
      '"AttackerName<93><[U:1:230970467]><CT>" [698 2222 -69] killed "VictimName<94><[U:1:230970467]><TERRORIST>" [1303 2143 64] with "hkp2000" (throughsmoke headshot)',
    );

    const result = parse(log);

    ok(result !== undefined, `Failed parse log: ${log}`);

    expect(result.type).toBe("killed");
    expect(result.payload).toMatchObject({
      attacker: {
        kind: "player",

        entityId: 93,
        steamId: "[U:1:230970467]",

        name: "AttackerName",

        position: [698, 2222, -69],

        team: counterTerroristTeam,
      },
      victim: {
        kind: "player",

        entityId: 94,
        steamId: "[U:1:230970467]",

        name: "VictimName",

        position: [1303, 2143, 64],

        team: terroristTeam,
      },
      weaponName: "hkp2000",
      modifiers: ["throughsmoke", "headshot"],
    });
  });
});
