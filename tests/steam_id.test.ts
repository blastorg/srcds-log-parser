import { ok } from "assert";
import { parse } from "../src";
import { getEventString } from "./helpers/getEventString";
import { counterTerroristTeam } from "./helpers/teams";

describe("steam id", () => {
  const event = {
    player: {
      kind: "player",
      entityId: 93,
      steamId: "76561198191236195",
      name: "PlayerName",
      team: counterTerroristTeam,
    },
    how: "world",
  };

  it("should correctly parse with new steam id", () => {
    const log = '"PlayerName<93><[U:1:230970467]><CT>" [-1117 2465 -72] committed suicide with "world"';
    const result = parse(getEventString(log));

    ok(result !== undefined, `Failed parse log: ${log}`);

    expect(result.type).toBe("suicide");
    expect(result.payload).toMatchObject(event);
  });

  it("should correctly parse with old steam id", () => {
    const log = '"PlayerName<93><STEAM_0:1:115485233><CT>" [-1117 2465 -72] committed suicide with "world"';
    const result = parse(getEventString(log));

    ok(result !== undefined, `Failed parse log: ${log}`);

    expect(result.type).toBe("suicide");
    expect(result.payload).toMatchObject(event);
  });
});
