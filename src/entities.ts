const basePlayerRe =
  /"(?<name>.+)<(?<entityId>\d*)><(?<steamId>(?:\[U:[01]:\d+\]|STEAM_[0-5]:[01]:\d+|BOT|Console))>(?:<(?<team>[^>]*)>)?"/;
const baseEntityRe = /"chicken<(?<entityId>\d+)>"/;
const baseWorldRe = /World/;

export const entityRe =
  /".+<\d*><(?:\[U:[01]:\d+\]|STEAM_[0-5]:[01]:\d+|BOT|Console)>(?:<[^>]*>)?"|"chicken<\d+>"|World/;
export const vectorRe = /\[?[-.\d]+ [-.\d]+ [-.\d]+\]?/;

export enum Team {
  UNASSIGNED = 0,
  SPECTATOR = 1,

  TERRORISTS = 2,
  COUNTER_TERRORISTS = 3,

  UNKNOWN = 999,
}

const teamMapper: Record<string, Team> = {
  Unassigned: Team.UNASSIGNED,
  Spectator: Team.SPECTATOR,

  TERRORIST: Team.TERRORISTS,
  CT: Team.COUNTER_TERRORISTS,

  Red: Team.TERRORISTS,
  Blue: Team.COUNTER_TERRORISTS,
};

export type Vector = [number, number, number];

export interface ITeamEntity {
  id: number;
  name: string;
}

export interface IWorldEntity {
  kind: "world";
}

export interface IConsoleEntity {
  kind: "console";
}

export interface IChickenEntity {
  kind: "chicken";

  entityId: number;
}

export interface IBasePlayerEntity {
  entityId: number;

  name: string;

  position?: Vector;

  team: ITeamEntity;
}

export interface IPlayerEntity extends IBasePlayerEntity {
  kind: "player";

  steamId: string;
}

export interface IBotEntity extends IBasePlayerEntity {
  kind: "bot";
}

export type Entity = IWorldEntity | IConsoleEntity | IChickenEntity | IPlayerEntity | IBotEntity;

export const parseTeam = (rawTeam: string): ITeamEntity => {
  const id = teamMapper[rawTeam] ?? Team.UNKNOWN;

  return {
    id,
    name: Team[id],
  };
};

export const parseEntity = (rawEntity: string): Entity => {
  if (baseWorldRe.test(rawEntity)) {
    return {
      kind: "world",
    };
  }

  if (baseEntityRe.test(rawEntity)) {
    const { entityId } = rawEntity.match(baseEntityRe)!.groups! as {
      entityId: string;
    };

    return {
      kind: "chicken",

      entityId: Number(entityId),
    };
  }

  if (basePlayerRe.test(rawEntity)) {
    const {
      entityId: rawEntityId,
      steamId,

      name,
      team: rawTeam,
    } = rawEntity.match(basePlayerRe)!.groups as {
      entityId: string;
      steamId: string;

      name: string;
      team: string;
    };

    if (steamId === "Console") {
      return {
        kind: "console",
      };
    }

    const entityId = Number(rawEntityId);
    const team = parseTeam(rawTeam);

    if (steamId === "BOT") {
      return {
        kind: "bot",
        entityId,
        name,
        team,
      };
    }

    return {
      kind: "player",
      entityId,
      steamId: convertSteamIdTo64Dec(steamId),
      name,
      team,
    };
  }

  throw new Error(`Failed parse entity "${rawEntity}"`);
};

export const parseVector = (rawVector: string): Vector => rawVector.split(" ").map(Number) as Vector;

export const convertSteamIdTo64Dec = (steamId: string): string => {
  // old steam id format: STEAM_1:0:12345
  if (steamId.includes("STEAM")) {
    const steamIdSplit = steamId.split(":");
    let commId = parseInt(steamIdSplit[2]) * 2;

    if (steamIdSplit[1] === "1") {
      commId += 1;
    }
    const newCommId = BigInt(commId) + BigInt(76561197960265728);
    return newCommId.toString();
  }

  // new steam id format: [U:1:230970467]
  const cleanedSteamId = steamId.replaceAll(/\[|\]/g, "");
  const uSteamIdSplit = cleanedSteamId.split(":");
  const commId = BigInt(uSteamIdSplit[2]) + BigInt(76561197960265728);
  return commId.toString();
};
