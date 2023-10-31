import { ok } from "assert";
import { parse } from "../src";
import { getEventString } from "./helpers/getEventString";
import { counterTerroristTeam, terroristTeam, unknownTeam } from "./helpers/teams";

describe("switched_team", (): void => {
  it("should correctly parse", () => {
    const log = getEventString('"PlayerName<93><[U:1:230970467]>" switched from team <TERRORIST> to <CT>');

    const result = parse(log);

    ok(result !== undefined, `Failed parse log: ${log}`);

    expect(result.type).toBe("switched_team");
    expect(result.payload).toMatchObject({
      player: {
        kind: "player",

        entityId: 93,
        steamId: "76561198191236195",

        name: "PlayerName",

        team: unknownTeam,
      },

      fromTeam: terroristTeam,
      toTeam: counterTerroristTeam,
    });
  });
});

describe("team_name", (): void => {
  it("should correctly parse", () => {
    const log = getEventString('Team playing "CT": Test');

    const result = parse(log);

    ok(result !== undefined, `Failed parse log: ${log}`);

    expect(result.type).toBe("team_name");
    expect(result.payload).toMatchObject({
      team: counterTerroristTeam,

      name: "Test",
    });
  });
});
