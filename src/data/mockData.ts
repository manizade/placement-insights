import type { ClassRoom, Student, ReportCard, ProficiencyLevel } from "@/types";

export const campuses = ["Kadıköy Kampüsü", "Beşiktaş Kampüsü", "Ataşehir Kampüsü", "Bakırköy Kampüsü"];
export const gradeLevels = ["Hazırlık", "9. Sınıf", "10. Sınıf", "11. Sınıf", "12. Sınıf"];
export const branches = ["A", "B", "C", "D", "E"];
export const examTypes = ["Placement Test", "Mid-Term", "Final", "Quick Check"];

export const mockClasses: ClassRoom[] = [
  {
    id: "c1",
    name: "Hazırlık A",
    branch: "A",
    campus: "Kadıköy Kampüsü",
    gradeLevel: "Hazırlık",
    studentCount: 28,
    averageScore: 78,
    lastExamDate: "2025-04-12",
    examType: "Placement Test",
    completionRate: 96,
  },
  {
    id: "c2",
    name: "Hazırlık B",
    branch: "B",
    campus: "Kadıköy Kampüsü",
    gradeLevel: "Hazırlık",
    studentCount: 26,
    averageScore: 71,
    lastExamDate: "2025-04-12",
    examType: "Placement Test",
    completionRate: 92,
  },
  {
    id: "c3",
    name: "9-A",
    branch: "A",
    campus: "Beşiktaş Kampüsü",
    gradeLevel: "9. Sınıf",
    studentCount: 30,
    averageScore: 82,
    lastExamDate: "2025-04-10",
    examType: "Mid-Term",
    completionRate: 100,
  },
  {
    id: "c4",
    name: "9-B",
    branch: "B",
    campus: "Beşiktaş Kampüsü",
    gradeLevel: "9. Sınıf",
    studentCount: 29,
    averageScore: 74,
    lastExamDate: "2025-04-10",
    examType: "Mid-Term",
    completionRate: 89,
  },
  {
    id: "c5",
    name: "10-A",
    branch: "A",
    campus: "Ataşehir Kampüsü",
    gradeLevel: "10. Sınıf",
    studentCount: 27,
    averageScore: 85,
    lastExamDate: "2025-04-08",
    examType: "Placement Test",
    completionRate: 100,
  },
  {
    id: "c6",
    name: "10-C",
    branch: "C",
    campus: "Ataşehir Kampüsü",
    gradeLevel: "10. Sınıf",
    studentCount: 25,
    averageScore: 68,
    lastExamDate: "2025-04-08",
    examType: "Placement Test",
    completionRate: 84,
  },
  {
    id: "c7",
    name: "11-A",
    branch: "A",
    campus: "Bakırköy Kampüsü",
    gradeLevel: "11. Sınıf",
    studentCount: 24,
    averageScore: 79,
    lastExamDate: "2025-04-05",
    examType: "Final",
    completionRate: 95,
  },
  {
    id: "c8",
    name: "12-A",
    branch: "A",
    campus: "Bakırköy Kampüsü",
    gradeLevel: "12. Sınıf",
    studentCount: 22,
    averageScore: 88,
    lastExamDate: "2025-04-04",
    examType: "Final",
    completionRate: 100,
  },
  {
    id: "c9",
    name: "12-B",
    branch: "B",
    campus: "Kadıköy Kampüsü",
    gradeLevel: "12. Sınıf",
    studentCount: 23,
    averageScore: 91,
    lastExamDate: "2025-04-03",
    examType: "Final",
    completionRate: 100,
  },
];

const turkishNames = [
  "Ada Yılmaz", "Mehmet Demir", "Zeynep Kaya", "Emir Şahin", "Elif Çelik",
  "Yusuf Arslan", "Defne Öztürk", "Ali Aydın", "Selin Doğan", "Kerem Polat",
  "Ayşe Korkmaz", "Berk Aksoy", "İrem Güneş", "Cem Kara", "Lara Yıldız",
  "Mert Erdoğan", "Naz Çetin", "Bora Acar", "Sude Tan", "Eren Koç",
  "Melis Bulut", "Kaan Özkan", "Doğa Aslan", "Ozan Şen", "Ela Tunç",
  "Tuna Yalçın", "Asya Karaca", "Can Pekin", "Mira Akın", "Berke Soylu",
];

function levelFromScore(score: number): ProficiencyLevel {
  if (score >= 90) return "C2";
  if (score >= 80) return "C1";
  if (score >= 70) return "B2";
  if (score >= 60) return "B1";
  if (score >= 45) return "A2";
  return "A1";
}

export const mockStudents: Student[] = mockClasses.flatMap((cls) =>
  Array.from({ length: Math.min(cls.studentCount, 15) }).map((_, idx) => {
    const baseScore = cls.averageScore + (Math.random() * 30 - 15);
    const score = Math.max(20, Math.min(100, Math.round(baseScore)));
    const completion = score < 30 ? 0 : Math.min(100, Math.round(60 + Math.random() * 40));
    const status: Student["status"] =
      completion === 0 ? "absent" : completion < 100 ? "in_progress" : "completed";
    const result: Student["result"] = status === "absent" ? "pending" : score >= 60 ? "passed" : "failed";
    const name = turkishNames[(turkishNames.length + idx * 3 + cls.id.length) % turkishNames.length];
    return {
      id: `${cls.id}-s${idx + 1}`,
      fullName: name,
      studentNumber: `${cls.id.toUpperCase()}-${String(1000 + idx).padStart(4, "0")}`,
      classId: cls.id,
      className: cls.name,
      score,
      level: levelFromScore(score),
      status,
      result,
      completion,
      examDate: cls.lastExamDate,
      email: `${name.toLowerCase().replace(/\s+/g, ".").replace(/ı/g, "i").replace(/ş/g, "s").replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ö/g, "o").replace(/ç/g, "c")}@okul.edu.tr`,
    };
  }),
);

export const mockReportCards: ReportCard[] = mockStudents
  .filter((s) => s.status !== "absent")
  .slice(0, 40)
  .map((s) => ({
    id: `r-${s.id}`,
    studentId: s.id,
    studentName: s.fullName,
    studentNumber: s.studentNumber,
    className: s.className,
    examType: "Placement Test",
    examDate: s.examDate,
    overallScore: s.score,
    level: s.level,
    result: s.result,
    sections: [
      { name: "Reading", score: Math.round(s.score * (0.85 + Math.random() * 0.3)), max: 100 },
      { name: "Listening", score: Math.round(s.score * (0.85 + Math.random() * 0.3)), max: 100 },
      { name: "Grammar", score: Math.round(s.score * (0.85 + Math.random() * 0.3)), max: 100 },
      { name: "Vocabulary", score: Math.round(s.score * (0.85 + Math.random() * 0.3)), max: 100 },
    ],
  }));

export function getClassById(id: string): ClassRoom | undefined {
  return mockClasses.find((c) => c.id === id);
}

export function getStudentsByClassId(classId: string): Student[] {
  return mockStudents.filter((s) => s.classId === classId);
}

export function getClassStats(classId: string) {
  const students = getStudentsByClassId(classId);
  const attended = students.filter((s) => s.status !== "absent").length;
  const passed = students.filter((s) => s.result === "passed").length;
  const failed = students.filter((s) => s.result === "failed").length;
  const avg =
    attended === 0
      ? 0
      : Math.round(
          students.filter((s) => s.status !== "absent").reduce((acc, s) => acc + s.score, 0) /
            attended,
        );
  return {
    totalStudents: students.length,
    attended,
    averageScore: avg,
    passed,
    failed,
  };
}
