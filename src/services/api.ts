/**
 * API service layer — placeholder.
 *
 * Bu dosya backend bağlandığında gerçek HTTP çağrıları ile değiştirilecek.
 * Şu an tüm fonksiyonlar mock datayı simüle eder (küçük gecikme ile).
 *
 * Örnek backend bağlantı için:
 *   const res = await fetch(`${API_BASE_URL}/classes`);
 *   return res.json();
 */

import {
  mockClasses,
  mockStudents,
  mockReportCards,
  getClassById,
  getStudentsByClassId,
  getClassStats,
} from "@/data/mockData";
import type { ClassRoom, Student, ReportCard, ClassStats } from "@/types";

// TODO: backend bağlandığında bu URL'i .env'den alın
export const API_BASE_URL = "/api";

const delay = <T,>(value: T, ms = 200): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

export const api = {
  // GET /classes
  listClasses: (): Promise<ClassRoom[]> => delay(mockClasses),

  // GET /classes/:id
  getClass: (id: string): Promise<ClassRoom | undefined> => delay(getClassById(id)),

  // GET /classes/:id/students
  listStudentsByClass: (classId: string): Promise<Student[]> =>
    delay(getStudentsByClassId(classId)),

  // GET /classes/:id/stats
  getClassStats: (classId: string): Promise<ClassStats> => delay(getClassStats(classId)),

  // GET /report-cards
  listReportCards: (): Promise<ReportCard[]> => delay(mockReportCards),

  // GET /students
  listStudents: (): Promise<Student[]> => delay(mockStudents),
};
