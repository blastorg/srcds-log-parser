import { ok } from "assert";
import { parse } from "../src";
import { getEventString } from "./helpers/getEventString";
import { counterTerroristTeam } from "./helpers/teams";

describe("entity_trigged", (): void => {
  it("should correctly parse", () => {
    const player = {
      kind: "player",

      entityId: 93,
      steamId: "76561198191236195",

      name: "PlayerName",

      team: counterTerroristTeam,
    };

    const world = {
      kind: "world",
    };

    const events: [string, Record<string, unknown>][] = [
      [
        'World triggered "Game_Commencing"',
        {
          entity: world,
          kind: "game_commencing",
          value: undefined,
        },
      ],
      [
        'World triggered "Match_Start" on "de_inferno"',
        {
          entity: world,
          kind: "match_start",
          value: "de_inferno",
        },
      ],
      [
        'World triggered "Round_Start"',
        {
          entity: world,
          kind: "round_start",
          value: undefined,
        },
      ],
      [
        'World triggered "Round_End"',
        {
          entity: world,
          kind: "round_end",
          value: undefined,
        },
      ],
      [
        'World triggered "Restart_Round_(1_second)"',
        {
          entity: world,
          kind: "restart_round_(1_second)",
          value: undefined,
        },
      ],
      [
        'World triggered "Restart_Round_(3_seconds)"',
        {
          entity: world,
          kind: "restart_round_(3_seconds)",
          value: undefined,
        },
      ],
      [
        '"PlayerName<93><[U:1:230970467]><CT>" triggered "Begin_Bomb_Defuse_With_Kit"',
        {
          entity: player,
          kind: "begin_bomb_defuse_with_kit",
          value: undefined,
        },
      ],
      [
        '"PlayerName<93><[U:1:230970467]><CT>" triggered "Begin_Bomb_Defuse_Without_Kit"',
        {
          entity: player,
          kind: "begin_bomb_defuse_without_kit",
          value: undefined,
        },
      ],
      [
        '"PlayerName<93><[U:1:230970467]><CT>" triggered "Defused_The_Bomb"',
        {
          entity: player,
          kind: "defused_the_bomb",
          value: undefined,
        },
      ],
      [
        '"PlayerName<93><[U:1:230970467]><CT>" triggered "Planted_The_Bomb"',
        {
          entity: player,
          kind: "planted_the_bomb",
          value: undefined,
        },
      ],
      [
        '"PlayerName<93><[U:1:230970467]><CT>" triggered "Got_The_Bomb"',
        {
          entity: player,
          kind: "got_the_bomb",
          value: undefined,
        },
      ],
      [
        '"PlayerName<93><[U:1:230970467]><CT>" triggered "Dropped_The_Bomb"',
        {
          entity: player,
          kind: "dropped_the_bomb",
          value: undefined,
        },
      ],
      [
        '"PlayerName<93><[U:1:230970467]><CT>" triggered "clantag" (value "123")',
        {
          entity: player,
          kind: "clantag",
          value: "123",
        },
      ],
    ];

    for (const [log, event] of events) {
      const result = parse(getEventString(log));

      ok(result !== undefined, `Failed parse log: ${log}`);

      expect(result.type).toBe("entity_triggered");
      expect(result.payload).toMatchObject(event);
    }
  });
});
