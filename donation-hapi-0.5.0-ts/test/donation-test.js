import { assert } from "chai";
import { db } from "../src/models/db.js";
import { maggie, testCandidates, testDonations } from "./fixtures.js";
import { assertSubset } from "./test-utils.js";

suite("Donation API tests", () => {
  setup(async () => {
    db.init("firebase");
    await db.userStore.addUser(maggie);
    await db.candidateStore.addCandidate(testCandidates[0]);
    await db.candidateStore.addCandidate(testCandidates[1]);
  });
  teardown(async () => {
    // await db.candidateStore.deleteAllCandidates();
    // await db.donationStore.deleteAllDonations();
    // await db.userStore.deleteAllUsers();
    db.disconnectFirebase();
  });

  test("create a donation", async () => {
    const returnedCandidate = await db.addCandidate(testCandidates[0]);
    await db.makeDonation(returnedCandidate._id, testDonations[0]);
    // const returnedDonations = await donationService.getDonations(returnedCandidate._id);
    // assert.equal(returnedDonations.length, 1);
    // assertSubset(returnedDonations[0], testDonations[0]);
  });
});
