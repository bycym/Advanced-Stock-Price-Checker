import { format, transports, createLogger } from "winston";

export const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.colorize(),
    format.simple(),
    format.printf(
      (info) =>
        `[${info.level}] ${info.timestamp}\t:: ${info.message}` +
        (info.splat !== undefined ? `${info.splat}` : " ")
    )
  ),
  transports: [
    new transports.Console({
      level: "debug"
    }),
    new transports.File({ filename: "error.log", level: "error" })
  ],
  exitOnError: false
});
