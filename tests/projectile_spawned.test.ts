import { ok } from "assert";
import { parse } from "../src";
import { getEventString } from "./helpers/getEventString";

describe("projectile_spawned", (): void => {
  it("should correctly parse", () => {
    const log = getEventString(
      "Molotov projectile spawned at 470.226189 1001.444831 746.135715, velocity 225.051541 140.823573 -358.102564",
    );

    const result = parse(log);

    ok(result !== undefined, `Failed parse log: ${log}`);

    expect(result.type).toBe("projectile_spawned");
    expect(result.payload).toMatchObject({
      item: "molotov",
      position: [470.226189, 1001.444831, 746.135715],
      velocity: [225.051541, 140.823573, -358.102564],
    });
  });
});
