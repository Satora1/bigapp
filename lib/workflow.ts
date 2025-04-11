import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QStashClient, resend } from "@upstash/qstash";
import config from "@/lib/config";

export const workflowClient = new WorkflowClient({
    baseUrl: config.env.upstash.qstashUrl,
    token: config.env.upstash.qstashToken,
})


const qstashClient = new QStashClient({
    token: config.env.upstash.qstashToken
});

export const sendEmail = async ({
    emial, subject, message
}: {
    emial: string,
    subject: string,
    message: string

}) => {
    await qstashClient.publishJSON({
        api: {
            name: "email",
            provider: resend({ token: config.env.resendToken }),
        },
        body: {
            from: "JS.shop <hello.jakubsatroa.shop>",
            to: [emial],
            subject,
            html: message,
        },
    });
}




