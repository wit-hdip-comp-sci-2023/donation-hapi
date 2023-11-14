import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const candidatesApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const candidates = await db.candidateStore.find();
      return candidates;
    },
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const candidate = await db.candidateStore.getCandidateById(request.params.id);
        if (!candidate) {
          return Boom.notFound("No Candidate with this id");
        }
        return candidate;
      } catch (err) {
        return Boom.notFound("No Candidate with this id");
      }
    },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const candidate = await db.candidateStore.addCandidate(request.payload);
      if (candidate) {
        return h.response(candidate).code(201);
      }
      return Boom.badImplementation("error creating candidate");
    },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      await db.candidateStore.deleteAll();
      return { success: true };
    },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      await deleteCandidateById(id);
      return { success: true };
    },
  },
};
