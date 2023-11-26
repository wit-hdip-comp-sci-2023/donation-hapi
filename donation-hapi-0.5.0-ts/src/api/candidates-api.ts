import Boom from "@hapi/boom";
import { Request, ResponseObject, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";

export const candidatesApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit): Promise<ResponseObject> {
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
        const candidate = await db.candidateStore.findOne(request.params.id);
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
      const candidate = await db.candidateStore.add(request.payload);
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
      await db.candidateStore.delete();
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
