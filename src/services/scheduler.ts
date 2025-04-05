import { Queue, Worker, type Job } from "bullmq";
import { prisma } from "project/database/db";
import logger from "project/utils/logger";

const eventName = "jobber";
const connection = {
	host: "0.0.0.0",
};

const jobber = new Queue("jobber", { connection });
const jobberWorker = new Worker(eventName, processJob, { connection });

async function processJob(job: Job) {
	if (job.name === "remove_otp") {
		await prisma.userOTP.delete({ where: { id: Number(job.data.id) } });
		logger.info({ userOTP: job.data.id }, "remove otp job completed");
	}
}

jobberWorker.on("completed", (job) => {
	console.log(`${job.id} has completed!`);
});

jobberWorker.on("failed", (job, err) => {
	console.log(`${job?.id} has failed with ${err.message}`);
});

export const scheduler = {
	scheduleRemoveOTP: async (id: string) => {
		const result = await jobber.add("remove_otp", { id }, { delay: 1000 * 60 });
		logger.info("remove otp job added to queue");

		return result.id;
	},
};
