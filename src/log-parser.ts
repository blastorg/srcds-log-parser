import {
  IBaseParser,
  assistParser,
  attackedParser,
  connectionParser,
  entityTriggeredParser,
  killedParser,
  leftBuyzoneWithParser,
  playerUpdateParser,
  projectileSpawnedParser,
  purchasedParser,
  rconParser,
  sayParser,
  scoredParser,
  serverCVarParser,
  ServerLogParser,
  suicideParser,
  switchedTeamParser,
  teamNameParser,
  teamTriggeredParser,
  threwParser,
  validatedParser,
  warmodParser,
  AssistEvent,
  AttackedEvent,
  ConnectionEvent,
  EntityTriggeredEvent,
  KilledEvent,
  LeftBuyzoneWithEvent,
  PlayerUpdateEvent,
  ProjectileSpawnedEvent,
  PurchasedEvent,
  RconEvent,
  SayEvent,
  ScoredEvent,
  ServerCVarEvent,
  ServerLogEvent,
  SuicideEvent,
  SwitchedTeamEvent,
  TeamNameEvent,
  TeamTriggeredEvent,
  ThrewEvent,
  ValidatedEvent,
  WarmodEvent,
} from "./parsers";

export const defaultParsers = [
  assistParser,
  attackedParser,
  connectionParser,
  entityTriggeredParser,
  killedParser,
  leftBuyzoneWithParser,
  playerUpdateParser,
  projectileSpawnedParser,
  purchasedParser,
  rconParser,
  sayParser,
  scoredParser,
  serverCVarParser,
  ServerLogParser,
  suicideParser,
  switchedTeamParser,
  teamNameParser,
  teamTriggeredParser,
  threwParser,
  validatedParser,
  warmodParser,
];

export type Events =
  | AssistEvent
  | AttackedEvent
  | ConnectionEvent
  | EntityTriggeredEvent
  | KilledEvent
  | LeftBuyzoneWithEvent
  | PlayerUpdateEvent
  | ProjectileSpawnedEvent
  | PurchasedEvent
  | RconEvent
  | SayEvent
  | ScoredEvent
  | ServerCVarEvent
  | ServerLogEvent
  | SuicideEvent
  | SwitchedTeamEvent
  | TeamNameEvent
  | TeamTriggeredEvent
  | ThrewEvent
  | ValidatedEvent
  | WarmodEvent;

const { length: LENGTH_OF_DATE_FILE } = "10/20/2020 - 10:30:50: ";  // File format
const { length: LENGTH_OF_DATE_HTTP } = "01/28/2024 - 13:11:03.628 - ";  // Http format

export interface IParseOptions {
  parsers?: IBaseParser<Events>[];
  format?: "file" | "http";
}

export function parse(rawLog: string, { parsers = defaultParsers, format="file" }: IParseOptions = {}): Events | undefined {

  let receivedAt: Date;
  let log: string;

  if (format==="file"){
    receivedAt = new Date(rawLog.substring(0, LENGTH_OF_DATE_FILE - 2).replace(" - ", " "));
    log = rawLog.substring(LENGTH_OF_DATE_FILE);
  } else if (format==="http"){
    receivedAt = new Date(rawLog.substring(0, LENGTH_OF_DATE_HTTP - 3).replace(" - ", " "));
    log = rawLog.substring(LENGTH_OF_DATE_HTTP);
  } else {
    throw new Error("Invalid format specified.");
  }
  
  for (const parser of parsers) {
    const pattern = parser.patterns.find((item) => item.test(log));

    if (pattern === undefined) {
      continue;
    }

    const groups = log.match(pattern)!.groups!;

    const payload = parser.parse(groups);

    return {
      type: parser.type,
      receivedAt,
      payload,
    } as Events;
  }

  return undefined;
}
