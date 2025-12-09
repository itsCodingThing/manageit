const SUCCESS = {
	// -------------------------
	// AUTHENTICATION & USER ACTIONS
	// -------------------------
	AUTH_REGISTER_SUCCESS: {
		code: "AUTH_REGISTER_SUCCESS",
		message: "User registered successfully.",
	},
	AUTH_LOGIN_SUCCESS: {
		code: "AUTH_LOGIN_SUCCESS",
		message: "Logged in successfully.",
	},
	AUTH_LOGOUT_SUCCESS: {
		code: "AUTH_LOGOUT_SUCCESS",
		message: "Logged out successfully.",
	},
	AUTH_TOKEN_REFRESHED: {
		code: "AUTH_TOKEN_REFRESHED",
		message: "Token refreshed successfully.",
	},
	AUTH_PASSWORD_UPDATED: {
		code: "AUTH_PASSWORD_UPDATED",
		message: "Password updated successfully.",
	},
	AUTH_EMAIL_VERIFIED: {
		code: "AUTH_EMAIL_VERIFIED",
		message: "Email verified successfully.",
	},
	AUTH_OTP_SENT: {
		code: "AUTH_OTP_SENT",
		message: "OTP sent successfully.",
	},
	AUTH_OTP_VERIFIED: {
		code: "AUTH_OTP_VERIFIED",
		message: "OTP verified successfully.",
	},

	// -------------------------
	// USER MANAGEMENT
	// -------------------------
	USER_CREATED: {
		code: "USER_CREATED",
		message: "User account created successfully.",
	},
	USER_UPDATED: {
		code: "USER_UPDATED",
		message: "User information updated successfully.",
	},
	USER_DELETED: {
		code: "USER_DELETED",
		message: "User deleted successfully.",
	},
	USER_PROFILE_FETCHED: {
		code: "USER_PROFILE_FETCHED",
		message: "User profile fetched successfully.",
	},

	// -------------------------
	// DATABASE & RESOURCE
	// -------------------------
	RECORD_CREATED: {
		code: "RECORD_CREATED",
		message: "Record created successfully.",
	},
	RECORD_UPDATED: {
		code: "RECORD_UPDATED",
		message: "Record updated successfully.",
	},
	RECORD_DELETED: {
		code: "RECORD_DELETED",
		message: "Record deleted successfully.",
	},
	RECORD_FETCHED: {
		code: "RECORD_FETCHED",
		message: "Record fetched successfully.",
	},
	RECORDS_FETCHED: {
		code: "RECORDS_FETCHED",
		message: "Records fetched successfully.",
	},

	// -------------------------
	// FILE OPERATIONS
	// -------------------------
	FILE_UPLOADED: {
		code: "FILE_UPLOADED",
		message: "File uploaded successfully.",
	},
	FILE_DELETED: {
		code: "FILE_DELETED",
		message: "File deleted successfully.",
	},
	FILE_RENAMED: {
		code: "FILE_RENAMED",
		message: "File renamed successfully.",
	},
	FILE_DOWNLOADED: {
		code: "FILE_DOWNLOADED",
		message: "File downloaded successfully.",
	},

	// -------------------------
	// PERMISSIONS & ROLES
	// -------------------------
	ROLE_ASSIGNED: {
		code: "ROLE_ASSIGNED",
		message: "Role assigned successfully.",
	},
	PERMISSION_GRANTED: {
		code: "PERMISSION_GRANTED",
		message: "Permission granted successfully.",
	},
	PERMISSION_REVOKED: {
		code: "PERMISSION_REVOKED",
		message: "Permission revoked successfully.",
	},

	// -------------------------
	// EXAMS / TASKS / JOBS (for ed-tech or admin apps)
	// -------------------------
	EXAM_SCHEDULED: {
		code: "EXAM_SCHEDULED",
		message: "Exam scheduled successfully.",
	},
	EXAM_SUBMITTED: {
		code: "EXAM_SUBMITTED",
		message: "Exam submitted successfully.",
	},
	EXAM_RESULT_PUBLISHED: {
		code: "EXAM_RESULT_PUBLISHED",
		message: "Exam results published successfully.",
	},
	TASK_COMPLETED: {
		code: "TASK_COMPLETED",
		message: "Task completed successfully.",
	},
	JOB_PROCESSED: {
		code: "JOB_PROCESSED",
		message: "Job processed successfully.",
	},

	// -------------------------
	// SYSTEM & SERVER
	// -------------------------
	SERVER_HEALTHY: {
		code: "SERVER_HEALTHY",
		message: "Server is healthy and running.",
	},
	SERVER_RESTARTED: {
		code: "SERVER_RESTARTED",
		message: "Server restarted successfully.",
	},
	CONFIG_UPDATED: {
		code: "CONFIG_UPDATED",
		message: "Configuration updated successfully.",
	},

	// -------------------------
	// NOTIFICATIONS / COMMUNICATION
	// -------------------------
	EMAIL_SENT: {
		code: "EMAIL_SENT",
		message: "Email sent successfully.",
	},
	NOTIFICATION_SENT: {
		code: "NOTIFICATION_SENT",
		message: "Notification sent successfully.",
	},
	MESSAGE_SENT: {
		code: "MESSAGE_SENT",
		message: "Message sent successfully.",
	},
	MESSAGE_DELIVERED: {
		code: "MESSAGE_DELIVERED",
		message: "Message delivered successfully.",
	},

	// -------------------------
	// MISCELLANEOUS / GENERAL
	// -------------------------
	ACTION_COMPLETED: {
		code: "ACTION_COMPLETED",
		message: "Action completed successfully.",
	},
	OPERATION_SUCCESS: {
		code: "OPERATION_SUCCESS",
		message: "Operation completed successfully.",
	},
	SETTINGS_UPDATED: {
		code: "SETTINGS_UPDATED",
		message: "Settings updated successfully.",
	},
	DATA_IMPORTED: {
		code: "DATA_IMPORTED",
		message: "Data imported successfully.",
	},
	DATA_EXPORTED: {
		code: "DATA_EXPORTED",
		message: "Data exported successfully.",
	},
} as const;

export type SuccessCode = keyof typeof SUCCESS;
export type SuccessInfo = (typeof SUCCESS)[SuccessCode];
export default SUCCESS;
