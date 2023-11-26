import { Request, ResponseObject, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";
import { Candidate, Donation, User } from "../types/donation-stores.js";

export const donationsController = {
  index: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const candidates = await db.candidateStore.find();
      return h.view("Donate", { title: "Make a Donation", candidates: candidates });
    },
  },
  report: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const donations = await db.donationStore.find();
      return h.view("Report", {
        title: "Donations to Date",
        donations: donations,
      });
    },
  },
  donate: {
    handler: async function (request: Request, h: ResponseToolkit): Promise<ResponseObject> {
      try {
        const loggedInUser = request.auth.credentials as User;
        const donationPayload = request.payload as Donation;
        const rawCandidate = donationPayload.candidate.split(",");
        const candidate = (await db.candidateStore.findBy(rawCandidate[1])) as Candidate;

        const donation = {
          amount: donationPayload.amount,
          method: donationPayload.method,
          donor: loggedInUser.email,
          candidate: candidate._id,
          lat: donationPayload.lat,
          lng: donationPayload.lng,
        };
        await db.donationStore.add(donation);

        return h.redirect("/report");
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    },
  },
};
