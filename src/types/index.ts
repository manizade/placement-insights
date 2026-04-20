// Domain types for placement exam management

export type ExamStatus = "completed" | "in_progress" | "not_started" | "absent";
export type ResultStatus = "passed" | "failed" | "pending";
export type ProficiencyLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
export type Grade = "Primary" | "Secondary" | "High School";

export interface Campus {
  id: string;
  name: string;
}

export interface Branch {
  id: string;
  name: string;
}

export interface ClassRoom {
  id: string;
  name: string;
  branch: string;
  campus: string;
  gradeLevel: string;
  studentCount: number;
  averageScore: number;
  lastExamDate: string;
  examType: string;
  completionRate: number;
  grade: Grade;
}

export interface Student {
  id: string;
  fullName: string;
  studentNumber: string;
  classId: string;
  className: string;
  score: number;
  level: ProficiencyLevel;
  status: ExamStatus;
  result: ResultStatus;
  completion: number; // 0-100
  examDate: string;
  username: string;
}

export interface ReportCard {
  id: string;
  studentId: string;
  studentName: string;
  studentNumber: string;
  className: string;
  examType: string;
  examDate: string;
  overallScore: number;
  level: ProficiencyLevel;
  result: ResultStatus;
  sections: {
    name: string;
    score: number;
    max: number;
  }[];
}

export interface ClassStats {
  totalStudents: number;
  attended: number;
  averageScore: number;
  passed: number;
  failed: number;
}
