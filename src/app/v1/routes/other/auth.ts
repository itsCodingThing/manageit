import type { FastifyPluginAsync } from "fastify";

import { compareHashPassword, encryptPassword } from "project/utils/encrypt";
import { generateJWT } from "project/utils/jwt";
import { sendErrorResponse, sendSuccessResponse } from "project/utils/serverResponse";
import { parseAsync, zod } from "project/utils/validation";
import { prisma } from "project/database/db";

export const authRoutes: FastifyPluginAsync = async (fastify) => {
  /**
   * @rotue   POST "/api/v1/auth/register"
   * @desc    Register users
   */
  fastify.route({
    method: "POST",
    url: "/auth/register",
    handler: async (req, res) => {
      const body = await parseAsync(
        zod.object({
          type: zod.union([zod.literal("admin"), zod.literal("student"), zod.literal("teacher")]),
          email: zod.string(),
          password: zod.string(),
          name: zod.string().optional(),
          contact: zod.string().optional(),
        }),
        req.body
      );

      const user = await prisma.authUser.findUnique({ where: { email: body.email } });
      if (user) {
        return sendErrorResponse({ msg: "Email already register with us", response: res });
      }


      const result = await prisma.$transaction(async (tx) => {
        let userId = 0;

        if (body.type === "admin") {
          const newUser = await tx.adminUser.create({
            data: {
              email: body.email,
              name: body.name ?? "",
              contact: body.contact ?? ""
            },
          });
          userId = newUser.id;
        }

        if (body.type === "student") {
          const newUser = await tx.student.create({
            data: {
              email: body.email,
              name: body.name ?? "",
              contact: body.contact ?? "",
              school_id: 0,
              address: ""
            },
          });
          userId = newUser.id;
        }

        if (body.type === "teacher") {
          const newUser = await tx.teacher.create({
            data: {
              email: body.email,
              name: body.name ?? "",
              contact: body.contact ?? "",
              school_id: 0,
              address: ""
            },
          });
          userId = newUser.id;
        }

        return await tx.authUser.create({
          data: {
            type: body.type,
            user_id: userId,
            email: body.email,
            password: encryptPassword(body.password),
          },
        });
      })

      return sendSuccessResponse({
        data: result,
        response: res,
      });
    },
  });

  /**
   * @rotue   POST "/api/v1/auth/login
   * @desc    Login admin user
   */
  fastify.route({
    method: "POST",
    url: "/auth/login",
    handler: async (req, res) => {
      const body = await parseAsync(
        zod.object({
          type: zod.union([zod.literal("admin"), zod.literal("student"), zod.literal("teacher")]),
          email: zod.string().email("enter a valid email"),
          password: zod.string().min(8, "please enter password min 8 charactor long"),
        }),
        req.body
      );

      const user = await prisma.authUser.findUnique({ where: { email: body.email, type: body.type } });
      if (!user) {
        return sendErrorResponse({ msg: "Email already register with us", response: res });
      }

      if (!compareHashPassword(body.password, user.password)) {
        return sendErrorResponse({ msg: "Invalid password", response: res });
      }

      const jwt = generateJWT({ id: user.id, type: body.type, school: "0" });

      return sendSuccessResponse({ response: res, data: jwt })
    },
  });

  /**
   * @route  POST "/api/v1/auth/app/login"
   * @desc   App user login
   */
  // fastify.route({
  //   method: "POST",
  //   url: "/auth/app/login",
  //   handler: async (req, res) => {
  //     const { code, contact, type } = await validate(
  //       yup.object({
  //         code: yup.string().required(),
  //         type: yup.string().oneOf(["teacher", "student", "evaluator", "parent"]).required(),
  //         contact: yup.string().required(),
  //       }),
  //       req.body
  //     );
  //
  //     const otp = await OTPService.gen4DigitOTP(contact);
  //
  //     const responseData = {
  //       school: "",
  //       id: "",
  //       otp: otp,
  //       contact: contact,
  //     };
  //
  //     if (type === "parent" || type === "evaluator") {
  //       if (type === "evaluator") {
  //         const user = await EvaluatorService.findEvaluatorByContact(contact);
  //         if (!user) {
  //           return sendErrorResponse({
  //             response: res,
  //             msg: "User does not exists",
  //           });
  //         }
  //
  //         await EvaluatorService.updateEvaluatorOtp({ id: user._id.toString(), otp });
  //
  //         responseData.id = user._id.toString();
  //         responseData.otp = otp;
  //       }
  //
  //       if (type === "parent") {
  //         const user = await ParentService.findParentByContact(contact);
  //         if (!user) {
  //           return sendErrorResponse({
  //             response: res,
  //             msg: "User does not exists",
  //           });
  //         }
  //
  //         await ParentService.updateParentOtp({ id: user._id.toString(), otp });
  //
  //         responseData.id = user._id.toString();
  //         responseData.otp = otp;
  //       }
  //     }
  //
  //     if (type === "student" || type === "teacher") {
  //       const school = await SchoolService.findSchoolByCode(code);
  //       if (!school) {
  //         return sendErrorResponse({
  //           response: res,
  //           msg: "no school with this code",
  //         });
  //       }
  //
  //       if (type === "student") {
  //         const user = await StudentService.getStudentBySchoolIdAndContact({
  //           contact,
  //           schoolId: school._id.toString(),
  //         });
  //         if (!user) {
  //           return sendErrorResponse({
  //             response: res,
  //             msg: "User does not exists",
  //           });
  //         }
  //
  //         await StudentService.updateStudentOtp({ id: user._id.toString(), otp });
  //
  //         responseData.id = user._id.toString();
  //         responseData.otp = otp;
  //       }
  //
  //       if (type === "teacher") {
  //         const user = await TeacherService.findTeacherBySchoolIdAndContact({
  //           contact,
  //           schoolId: school._id.toString(),
  //         });
  //         if (!user) {
  //           return sendErrorResponse({
  //             response: res,
  //             msg: "User does not exists",
  //           });
  //         }
  //
  //         await TeacherService.updateTeacherOtp({ id: user._id.toString(), otp });
  //
  //         responseData.id = user._id.toString();
  //         responseData.otp = otp;
  //       }
  //     }
  //
  //     await OTPService.sendOTP(responseData.contact, responseData.otp);
  //
  //     return sendSuccessResponse({
  //       response: res,
  //       data: responseData,
  //     });
  //   },
  // });
  //
  /**
   * @route  POST "/api/v1/auth/app/verify"
   * @desc   App user otp verify
   */
  // // fastify.route({
  //   method: "POST",
  //   url: "/auth/app/verify",
  //   handler: async (req, res) => {
  //     const body = await validate(
  //       yup.object({
  //         otp: yup.string().required(),
  //         id: yup.string().required(),
  //         type: yup.string().oneOf(["teacher", "student", "evaluator", "parent"]).required(),
  //       }),
  //       req.body
  //     );
  //
  //     if (body.type === "teacher") {
  //       const otp = await TeacherService.getTeacherOtpById(body.id);
  //
  //       if (!otp) {
  //         return sendErrorResponse({
  //           response: res,
  //           msg: "Invalid OTP. Please enter correct OTP and try again",
  //         });
  //       }
  //
  //       if (otp !== body.otp) {
  //         return sendErrorResponse({
  //           response: res,
  //           msg: "Invalid OTP. Please enter correct OTP and try again",
  //         });
  //       }
  //
  //       const user = await TeacherService.updateTeacherOtp({ id: body.id, otp: "" });
  //       const token = generateJWT({
  //         id: user?._id.toString() ?? "",
  //         school: user?.school?._id.toString() ?? "",
  //         type: body.type,
  //       });
  //
  //       return sendSuccessResponse({
  //         msg: "Login successfully",
  //         data: { user, token },
  //         response: res,
  //       });
  //     }
  //
  //     if (body.type === "student") {
  //       const otp = await StudentService.getStudentOtpById(body.id);
  //
  //       if (!otp) {
  //         return sendErrorResponse({
  //           response: res,
  //           msg: "Invalid OTP. Please enter correct OTP and try again",
  //         });
  //       }
  //
  //       if (otp !== body.otp) {
  //         return sendErrorResponse({
  //           response: res,
  //           msg: "Invalid OTP. Please enter correct OTP and try again",
  //         });
  //       }
  //
  //       const user = await StudentService.updateStudentOtp({ id: body.id, otp: "" });
  //       const token = generateJWT({
  //         id: user?._id.toString() ?? "",
  //         school: user?.school?._id.toString() ?? "",
  //         type: body.type,
  //       });
  //
  //       return sendSuccessResponse({
  //         msg: "Login successfully",
  //         data: { user, token },
  //         response: res,
  //       });
  //     }
  //
  //     if (body.type === "evaluator") {
  //       const otp = await EvaluatorService.getEvaluatorOtpById(body.id);
  //
  //       if (!otp) {
  //         return sendErrorResponse({
  //           response: res,
  //           msg: "Invalid OTP. Please enter correct OTP and try again",
  //         });
  //       }
  //
  //       if (otp !== body.otp) {
  //         return sendErrorResponse({
  //           response: res,
  //           msg: "Invalid OTP. Please enter correct OTP and try again",
  //         });
  //       }
  //
  //       const user = await EvaluatorService.updateEvaluatorOtp({ id: body.id, otp: "" });
  //       const token = generateJWT({ id: user?._id.toString() ?? "", school: "", type: body.type });
  //
  //       return sendSuccessResponse({
  //         msg: "Login successfully",
  //         data: { user, token },
  //         response: res,
  //       });
  //     }
  //
  //     if (body.type === "parent") {
  //       const otp = await ParentService.getParentOtpById(body.id);
  //
  //       if (!otp) {
  //         return sendErrorResponse({
  //           response: res,
  //           msg: "Invalid OTP. Please enter correct OTP and try again",
  //         });
  //       }
  //
  //       if (otp !== body.otp) {
  //         return sendErrorResponse({
  //           response: res,
  //           msg: "Invalid OTP. Please enter correct OTP and try again",
  //         });
  //       }
  //
  //       const user = await ParentService.updateParentOtp({ id: body.id, otp: "" });
  //       const token = generateJWT({ id: user?._id.toString() ?? "", school: "", type: body.type });
  //
  //       return sendSuccessResponse({
  //         msg: "Login successfully",
  //         data: { user, token },
  //         response: res,
  //       });
  //     }
  //   },
  // });

  /**
   * @route  POST "/api/v1/auth/app/refresh"
   * @desc   App user refresh token
   */
  // fastify.route({
  //   method: "POST",
  //   url: "/auth/app/refresh",
  //   handler: async (req, res) => {
  //     const { user_id, device_id, school_id, type } = await validate(
  //       yup.object({
  //         school_id: yup.string().required(),
  //         user_id: yup.string().required(),
  //         device_id: yup.string().required(),
  //         type: yup.string().oneOf(["teacher", "student", "evaluator", "parent"]).required(),
  //       }),
  //       req.body
  //     );
  //
  //     const device = await DeviceService.deviceModel.findOne({ user_id, device_id, deleted: false }).lean();
  //     if (!device) {
  //       return sendErrorResponse({
  //         code: 400,
  //         msg: "User device not found",
  //         response: res,
  //       });
  //     }
  //
  //     const token = generateJWT({ id: user_id, school: school_id, type: type });
  //
  //     return sendSuccessResponse({
  //       data: { token },
  //       response: res,
  //     });
  //   },
  // });

};
