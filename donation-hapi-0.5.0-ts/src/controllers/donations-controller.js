import { db } from "../models/db.js";
export const donationsController = {
    index: {
        handler: async function (request, h) {
            const candidates = await db.candidateStore.find();
            return h.view("Donate", { title: "Make a Donation", candidates: candidates });
        },
    },
    report: {
        handler: async function (request, h) {
            const donations = await db.donationStore.find();
            return h.view("Report", {
                title: "Donations to Date",
                donations: donations,
            });
        },
    },
    donate: {
        handler: async function (request, h) {
            try {
                const loggedInUser = request.auth.credentials;
                const donationPayload = request.payload;
                const candidateId = donationPayload.candidate;
                const donation = {
                    amount: donationPayload.amount,
                    method: donationPayload.method,
                    donor: loggedInUser.email,
                    candidate: candidateId,
                    lat: donationPayload.lat,
                    lng: donationPayload.lng,
                };
                await db.donationStore.add(donation);
                return h.redirect("/report");
            }
            catch (err) {
                return h.view("main", { errors: [{ message: err.message }] });
            }
        },
    },
};
