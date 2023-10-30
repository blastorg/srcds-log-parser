import { ok } from "assert";
import { parse } from "../src";
import { getEventString } from "./helpers/getEventString";

describe("rcon", (): void => {
  it("should correctly parse", () => {
    const log = getEventString('rcon from "127.0.0.1:49987": command "say hello"');

    const result = parse(log);

    ok(result !== undefined, `Failed parse log: ${log}`);

    expect(result.type).toBe("rcon");
    expect(result.payload).toMatchObject({
      address: "127.0.0.1:49987",
      command: "say hello",
    });
  });
});
