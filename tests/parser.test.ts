import { ok } from "assert";
import { parse } from "../src";
import { EVENT_DATE, getEventString } from "./helpers/getEventString";
import { counterTerroristTeam } from "./helpers/teams";

describe("parser", () => {
  it('should correctly parse "receivedAt"', () => {
    const logs = [
      getEventString('"Zen<1><[U:1:1520473131]><>" connected, address "10.200.109.185:59771"'),
      getEventString(
        '"Grim<6><[U:1:230970467]><CT>" [-652 -1179 -168] killed "MAUISNAKE<8><[U:1:19821282]><TERRORIST>" [-375 -2376 -98] with "m4a1_silencer"',
      ),
    ];

    for (const log of logs) {
      const result = parse(log);
      const eventDate = new Date(EVENT_DATE.replace(" - ", " "));

      ok(result !== undefined, `Failed parse log: ${log}`);

      expect(result.receivedAt).toBeInstanceOf(Date);
      expect(result.receivedAt.getTime()).toBe(eventDate.getTime());
    }
  });

  it("should correctly parse entities", (): void => {
    const events: [string, Record<string, unknown>][] = [
      [
        '"PlayerName<93><[U:1:230970467]><CT>" [-1117 2465 -72] committed suicide with "world"',
        {
          player: {
            kind: "player",

            entityId: 93,
            steamId: "[U:1:230970467]",

            name: "PlayerName",

            team: counterTerroristTeam,
          },
          how: "world",
        },
      ],
      [
        '"BotName<93><BOT><CT>" [-1117 2465 -72] committed suicide with "world"',
        {
          player: {
            kind: "bot",

            entityId: 93,

            name: "BotName",

            team: counterTerroristTeam,
          },
          how: "world",
        },
      ],
      [
        '"Console<><Console><>" [-1117 2465 -72] committed suicide with "world"',
        {
          player: {
            kind: "console",
          },
          how: "world",
        },
      ],
      [
        '"chicken<93>" [-1117 2465 -72] committed suicide with "world"',
        {
          player: {
            kind: "chicken",
            entityId: 93,
          },
          how: "world",
        },
      ],
    ];

    for (const [log, event] of events) {
      const result = parse(getEventString(log));

      ok(result !== undefined, `Failed parse log: ${log}`);

      expect(result.type).toBe("suicide");
      expect(result.payload).toMatchObject(event);
    }
  });
});
