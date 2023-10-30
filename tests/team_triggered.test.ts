import { ok } from "assert";
import { parse } from "../src";
import { getEventString } from "./helpers/getEventString";
import { counterTerroristTeam, terroristTeam } from "./helpers/teams";

describe("team_triggered", (): void => {
  it("should correctly parse", () => {
    const events: [string, Record<string, unknown>][] = [
      [
        'Team "TERRORIST" triggered "SFUI_Notice_Terrorists_Win" (CT "7") (T "3")',
        {
          kind: "sfui_notice_terrorists_win",

          team: terroristTeam,

          counterTerroristScore: 7,
          terroristScore: 3,
        },
      ],
      [
        'Team "CT" triggered "SFUI_Notice_CTs_Win" (CT "7") (T "3")',
        {
          kind: "sfui_notice_cts_win",

          team: counterTerroristTeam,

          counterTerroristScore: 7,
          terroristScore: 3,
        },
      ],
      [
        'Team "CT" triggered "SFUI_Notice_Target_Bombed" (CT "7") (T "3")',
        {
          kind: "sfui_notice_target_bombed",

          team: counterTerroristTeam,

          counterTerroristScore: 7,
          terroristScore: 3,
        },
      ],
      [
        'Team "CT" triggered "SFUI_Notice_Target_Saved" (CT "7") (T "3")',
        {
          kind: "sfui_notice_target_saved",

          team: counterTerroristTeam,

          counterTerroristScore: 7,
          terroristScore: 3,
        },
      ],
      [
        'Team "CT" triggered "SFUI_Notice_Bomb_Defused" (CT "7") (T "3")',
        {
          kind: "sfui_notice_bomb_defused",

          team: counterTerroristTeam,

          counterTerroristScore: 7,
          terroristScore: 3,
        },
      ],
    ];

    for (const [log, event] of events) {
      const result = parse(getEventString(log));

      ok(result !== undefined, `Failed parse log: ${log}`);

      expect(result.type).toBe("team_triggered");
      expect(result.payload).toMatchObject(event);
    }
  });
});
