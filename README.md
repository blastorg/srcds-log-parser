# srcds-log-parser

![build & release](https://github.com/blastorg/srcds-log-parser/actions/workflows/release.yaml/badge.svg)
![package downloads](https://img.shields.io/npm/v/%40blastorg/srcds-log-parser)

A log parsing tool, that can be used for parsing logs sent from CS2 game server via an HTTP endpoint.

Big shout out to the original author of this library [negezor](https://github.com/negezor), who created this awesome library which strongly types log events coming from the game server.

## Reasoning behind the fork of this library

The reason why we have created this fork of the library, is because we saw that the library hasn't been actively worked on for about 2 years.

We have changed this library up a bit after Valve, the creators of Counter Strike, released their version 2 of the game (Counter Strike 2). They changed up some formats of how they are outputting the logs from the game server, and this library is up-to-date on that format.

## What's the difference between this library and the original one?

We have chosen to remove the log receiver because we didn't see a use case for it, the main part of this library should be as the name implies `srcds-log-parser`

We have added a few things which update the parser to be able to parse the new CS2 logs. The other part which has changed is the format the steam id is returned in. In the logs, the steam id includes the steam universe, which the steam account is connected to. To give developers and users who uses this library a better experience, we have chosen to convert the steam id coming from the logs to steam id 64 (decimal) format, which can be stored as a `BigInt`, because of it's size.

## Requirements

In order to install and use this package, you need to have Node.js installed (at least `v18`).

Because this library is using regex for all of it's parsing, it does not need any other dependencies.

# Installation

```bash
$ npm install @blastorg/srcds-log-parser
```

## Example usage

```ts
import { parse } from '@blastorg/srcds-log-parser';

// Log coming from CS2 game server
const log = '10/20/2020 - 10:30:50: "AttackerName<93><[U:1:230970467]><CT>" [698 2222 -69] killed "VictimName<94><[U:1:230970467]><TERRORIST>" [1303 2143 64] with "hkp2000" (throughsmoke headshot)'

const parsedLog = parse(log);

console.log(parsedLog);
{
  type: "killed",
  receivedAt: Date("10/20/2020 10:30:50");
  payload: {
    attacker: {
      kind: "player",
      entityId: 93,
      steamId: "76561198191236195", // Steam ID 64 (BigInt)
      name: "AttackerName",
      position: [698, 2222, -69],
      team: {
        id: 3,
        name: "COUNTER_TERRORISTS",
      },
    },
    victim: {
      kind: "player",
      entityId: 94,
      steamId: "76561198191236195", // Steam ID 64 (BigInt)
      name: "VictimName",
      position: [1303, 2143, 64],
      team: {
        id: 2,
        name: "TERRORISTS",
      },
    },
    weaponName: "hkp2000",
    modifiers: ["throughsmoke", "headshot"],
  },
}
```
