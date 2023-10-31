import { ok } from "assert";
import { parse } from "../src";
import { getEventString } from "./helpers/getEventString";
import { counterTerroristTeam } from "./helpers/teams";

describe("player_updated", (): void => {
  it("should correctly parse", () => {
    const log = getEventString('"OldName<93><[U:1:230970467]><CT>" changed name to "NewName"');

    const result = parse(log);

    ok(result !== undefined, `Failed parse log: ${log}`);

    expect(result.type).toBe("player_update");
    expect(result.payload).toMatchObject({
      kind: "change_name",
      player: {
        kind: "player",

        entityId: 93,
        steamId: "76561198191236195",

        name: "OldName",

        team: counterTerroristTeam,
      },
      newName: "NewName",
    });
  });
});
