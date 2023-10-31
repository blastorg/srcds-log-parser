import { ok } from "assert";
import { parse } from "../src";
import { getEventString } from "./helpers/getEventString";
import { counterTerroristTeam, terroristTeam } from "./helpers/teams";

describe("attacked", (): void => {
  it("should correctly parse", () => {
    const log = getEventString(
      '"AttackerName<93><[U:1:230970467]><CT>" [820 2225 -34] attacked "VictimName<94><[U:1:230970467]><TERRORIST>" [1001 2164 0] with "ak47" (damage "34") (damage_armor "4") (health "29") (armor "95") (hitgroup "stomach")',
    );

    const result = parse(log);

    ok(result !== undefined, `Failed parse log: ${log}`);

    expect(result.type).toBe("attacked");
    expect(result.payload).toMatchObject({
      attacker: {
        kind: "player",

        entityId: 93,
        steamId: "76561198191236195",

        name: "AttackerName",

        position: [820, 2225, -34],

        team: counterTerroristTeam,
      },
      victim: {
        kind: "player",

        entityId: 94,
        steamId: "76561198191236195",

        name: "VictimName",

        position: [1001, 2164, 0],

        team: terroristTeam,
      },

      weaponName: "ak47",

      damageAmount: 34,
      damageArmourAmount: 4,

      remainingHealth: 29,
      remainingArmour: 95,

      hitGroup: "stomach",
    });
  });
});
