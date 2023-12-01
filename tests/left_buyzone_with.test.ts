import { ok } from "assert";
import { parse } from "../src";
import { getEventString } from "./helpers/getEventString";
import { counterTerroristTeam } from "./helpers/teams";

describe("left buyzone with", (): void => {
  it("should correctly parse", () => {
    const log = getEventString(
      '"Player<93><[U:1:230970467]><CT>" left buyzone with [ weapon_knife_butterfly weapon_usp_silencer kevlar(100) ]',
    );

    const result = parse(log);

    ok(result !== undefined, `Failed parse log: ${log}`);

    expect(result.type).toBe("left_buyzone_with");
    expect(result.payload).toMatchObject({
      entity: {
        kind: "player",

        entityId: 93,
        steamId: "76561198191236195",

        name: "Player",

        team: counterTerroristTeam,
      },
      items: ["weapon_knife_butterfly", "weapon_usp_silencer", "kevlar(100)"],
    });
  });
});
