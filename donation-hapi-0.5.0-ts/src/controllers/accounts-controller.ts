import { Request, ResponseObject, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";
import { User } from "../types/donation-types.js";

export const accountsController = {
  index: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit): Promise<ResponseObject> {
      return h.view("Main", { title: "Welcome to Playlist" });
    },
  },

  showSignup: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit): Promise<ResponseObject> {
      return h.view("Signup", { title: "Sign up for Playlist" });
    },
  },

  signup: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit): Promise<ResponseObject> {
      const user = request.payload;
      await db.userStore.add(user);
      return h.redirect("/");
    },
  },

  showLogin: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit): Promise<ResponseObject> {
      return h.view("Login", { title: "Login to Playlist" });
    },
  },

  login: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit): Promise<ResponseObject> {
      const { email, password } = request.payload as User;
      const user = (await db.userStore.findBy(email)) as User;
      if (user === null || user.password !== password) {
        return h.redirect("/");
      }
      request.cookieAuth.set({ id: user._id });
      return h.redirect("/donate");
    },
  },

  logout: {
    handler: async function (request: Request, h: ResponseToolkit): Promise<ResponseObject> {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  async validate(request: Request, session: { id: string }): Promise<{ isValid: true; credentials: User } | { isValid: false }> {
    const user = (await db.userStore.findOne(session.id)) as User;
    if (user === null) {
      return { isValid: false };
    }
    return { isValid: true, credentials: user };
  },
};
