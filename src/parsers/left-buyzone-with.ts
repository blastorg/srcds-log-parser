import { IBaseEvent, defineParser } from "./parser";
import { concatPattern } from "../helpers";
import { Entity, entityRe, parseEntity } from "../entities";

export type LeftBuyzoneWithEventPayload = {
  player: Entity;
  items: string[];
};

export type LeftBuyzoneWithEvent = IBaseEvent<"left_buyzone_with", LeftBuyzoneWithEventPayload>;

// eslint-disable-next-line max-len
// "Player<93><STEAM_1:0:12345><CT>" left buyzone with [ weapon_knife_butterfly weapon_usp_silencer kevlar(100) ]
export const leftBuyzoneWithParser = defineParser<LeftBuyzoneWithEvent>({
  type: "left_buyzone_with",

  patterns: [concatPattern`^(?<player>${entityRe}) left buyzone with (?<items>\\[.*\\])$`],

  parse({
    player,

    items,
  }) {
    return {
      player: parseEntity(player),
      items: items.trim().replaceAll("[", "").replaceAll("]", "").split(" ").slice(1, -1),
    };
  },
});
