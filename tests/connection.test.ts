import { ok } from "assert";
import { parse } from "../src";
import { getEventString } from "./helpers/getEventString";
import { unknownTeam } from "./helpers/teams";

describe("connection", (): void => {
  it('should correctly parse sub-event "connected"', () => {
    const log = getEventString('"ConnectionPlayer<93><[U:1:230970467]><>" connected, address ""');

    const result = parse(log);

    ok(result !== undefined, `Failed parse log: ${log}`);

    expect(result.type).toBe("connection");
    expect(result.payload).toMatchObject({
      kind: "connected",
      player: {
        kind: "player",

        entityId: 93,
        steamId: "76561198191236195",

        name: "ConnectionPlayer",

        team: unknownTeam,
      },
      address: "",
      reason: undefined,
    });
  });

  it('should correctly parse sub-event "entered"', () => {
    const log = getEventString('"ConnectionPlayer<93><[U:1:230970467]><>" entered the game');

    const result = parse(log);

    ok(result !== undefined, `Failed parse log: ${log}`);

    expect(result.type).toBe("connection");
    expect(result.payload).toMatchObject({
      kind: "entered",
      player: {
        kind: "player",

        entityId: 93,
        steamId: "76561198191236195",

        name: "ConnectionPlayer",

        team: unknownTeam,
      },
      address: undefined,
      reason: undefined,
    });
  });

  it('should correctly parse sub-event "disconnected"', () => {
    const log = getEventString(
      '"ConnectionPlayer<93><[U:1:230970467]><>" disconnected (reason "Server shutting down")',
    );

    const result = parse(log);

    ok(result !== undefined, `Failed parse log: ${log}`);

    expect(result.type).toBe("connection");
    expect(result.payload).toMatchObject({
      kind: "disconnected",
      player: {
        kind: "player",

        entityId: 93,
        steamId: "76561198191236195",

        name: "ConnectionPlayer",

        team: unknownTeam,
      },
      address: undefined,
      reason: "Server shutting down",
    });
  });
});
