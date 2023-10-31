import { ok } from "assert";
import { parse } from "../src";
import { getEventString } from "./helpers/getEventString";
import { counterTerroristTeam, terroristTeam } from "./helpers/teams";

describe("assist", (): void => {
  it("should correctly parse", () => {
    const log = getEventString(
      '"AssitantName<93><[U:1:230970467]><CT>" assisted killing "VictimName<92><[U:1:230970467]><TERRORIST>"',
    );

    const result = parse(log);

    ok(result !== undefined, `Failed parse log: ${log}`);

    expect(result.type).toBe("assist");
    expect(result.payload).toMatchObject({
      assistant: {
        kind: "player",

        entityId: 93,
        steamId: "76561198191236195",

        name: "AssitantName",

        team: counterTerroristTeam,
      },
      victim: {
        kind: "player",

        entityId: 92,
        steamId: "76561198191236195",

        name: "VictimName",

        team: terroristTeam,
      },
    });
  });
});
