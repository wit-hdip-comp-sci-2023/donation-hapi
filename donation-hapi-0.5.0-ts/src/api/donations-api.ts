import Boom from "@hapi/boom";
import { Request, ResponseObject, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";

export const donationsApi = {
  findAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit): Promise<ResponseObject | Boom.Boom<string>> {
      try {
        const donations = await db.donationStore.find();
        return h.response(donations).code(200);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findByCandidate: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const donations = await db.donationStore.findBy(request.params.id);
      return donations;
    },
  },

  makeDonation: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const candidate = await db.candidateStore.findOne(request.params.id);
      if (!candidate) {
        return Boom.notFound("No Candidate with this id");
      }
      const donation = {
        amount: request.payload.amount,
        method: request.payload.method,
        donor: request.auth.credentials.email,
        candidate: candidate._id,
        lat: request.payload.lat,
        lng: request.payload.lng,
      };
      const newDonation = await db.donationStore.add(donation);
      return newDonation;
    },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      console.log("delete...");
      await db.donationStore.deleteAll();
      return { success: true };
    },
  },
};
