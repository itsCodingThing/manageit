import { type Model, type Types, model, Schema } from "mongoose";

interface IDBExam {
  _id: Types.ObjectId;
  school: Types.ObjectId;
  batch: Types.ObjectId;
  name: string;
  board: string;
  class: string;
  subject: Types.Array<string>;
  type: "Subjective" | "Objective";
  variant: string;
  total_marks: number;
  no_of_questions: number;
  negative_marks: number;
  schedule_type: "Online" | "Offline" | "Hybrid";
  student_list: Types.Array<Types.ObjectId>;
  copy_check_teachers: Types.Array<Types.ObjectId>;
  copy_upload_teachers: Types.Array<Types.ObjectId>;
  copy_alter_teachers: Types.Array<Types.ObjectId>;
  copy_check_instructions: {
    instructions: Types.Array<string>;
    level_of_checking: string;
  };
  result_declared_teachers: Types.Array<string>;
  result_declared_type: string;
  rejoin: number;
  start_time: Date;
  end_time: Date;
  copy_submit_time: Date;
  created_by: string;
  updated_by: string;
  deleted: boolean;
  created_at: string;
  updated_at: string;
}

type TExamModel = Model<IDBExam>;

const ExamSchema = new Schema<IDBExam, TExamModel>(
  {
    batch: { type: Schema.Types.ObjectId, ref: "Batch" },
    school: { type: Schema.Types.ObjectId, ref: "School" },
    name: { type: String },
    board: { type: String },
    class: { type: String },
    subject: { type: [String] },
    type: { type: String, enum: ["Subjective", "Objective"] },
    variant: { type: String },
    total_marks: { type: Number },
    no_of_questions: { type: Number },
    negative_marks: { type: Number },
    schedule_type: { type: String, enum: ["Online", "Offline", "Hybrid"] },
    student_list: {
      type: [{ type: Schema.Types.ObjectId, ref: "Student" }],
      default: [],
    },
    copy_check_teachers: {
      type: [{ type: Schema.Types.ObjectId, ref: "Teacher" }],
      default: [],
    },
    copy_upload_teachers: {
      type: [{ type: Schema.Types.ObjectId, ref: "Teacher" }],
      default: [],
    },
    copy_alter_teachers: {
      type: [{ type: Schema.Types.ObjectId, ref: "Teacher" }],
      default: [],
    },
    copy_check_instructions: {
      instructions: { type: [String], default: [] },
      level_of_checking: { type: String, default: "Moderate" },
    },
    result_declared_teachers: { type: [String], default: [] },
    result_declared_type: { type: String },
    rejoin: { type: Number },
    start_time: { type: Date },
    end_time: { type: Date },
    copy_submit_time: { type: Date },
    created_by: { type: String, default: "" },
    updated_by: { type: String, default: "" },
    deleted: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
);

export const ExamModel = model<IDBExam, TExamModel>("Exam", ExamSchema);
