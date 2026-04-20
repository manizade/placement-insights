import type { ClassRoom, Student, ReportCard, ProficiencyLevel, Grade } from "@/types";

export const campuses = ["Kadıköy Kampüsü", "Beşiktaş Kampüsü", "Ataşehir Kampüsü", "Bakırköy Kampüsü"];
export const gradeLevels = ["Hazırlık", "9. Sınıf", "10. Sınıf", "11. Sınıf", "12. Sınıf"];
export const branches = ["A", "B", "C", "D", "E"];
export const examTypes = ["Placement Test", "Mid-Term", "Final", "Quick Check"];
export const grades: Grade[] = ["Primary", "Secondary", "High School"];

export const mockClasses: ClassRoom[] = [
  // Primary
  {
    id: "c1",
    name: "Primary 3-A",
    branch: "A",
    campus: "Kadıköy Kampüsü",
    gradeLevel: "3. Sınıf",
    grade: "Primary",
    studentCount: 24,
    averageScore: 76,
    lastExamDate: "2025-04-12",
    examType: "Placement Test",
    completionRate: 96,
  },
  {
    id: "c2",
    name: "Primary 4-B",
    branch: "B",
    campus: "Kadıköy Kampüsü",
    gradeLevel: "4. Sınıf",
    grade: "Primary",
    studentCount: 26,
    averageScore: 71,
    lastExamDate: "2025-04-12",
    examType: "Placement Test",
    completionRate: 92,
  },
  {
    id: "c3",
    name: "Primary 5-A",
    branch: "A",
    campus: "Beşiktaş Kampüsü",
    gradeLevel: "5. Sınıf",
    grade: "Primary",
    studentCount: 22,
    averageScore: 80,
    lastExamDate: "2025-04-10",
    examType: "Quick Check",
    completionRate: 100,
  },
  // Secondary
  {
    id: "c4",
    name: "Secondary 6-A",
    branch: "A",
    campus: "Beşiktaş Kampüsü",
    gradeLevel: "6. Sınıf",
    grade: "Secondary",
    studentCount: 29,
    averageScore: 74,
    lastExamDate: "2025-04-10",
    examType: "Mid-Term",
    completionRate: 89,
  },
  {
    id: "c5",
    name: "Secondary 7-B",
    branch: "B",
    campus: "Ataşehir Kampüsü",
    gradeLevel: "7. Sınıf",
    grade: "Secondary",
    studentCount: 27,
    averageScore: 82,
    lastExamDate: "2025-04-08",
    examType: "Placement Test",
    completionRate: 100,
  },
  {
    id: "c6",
    name: "Secondary 8-C",
    branch: "C",
    campus: "Ataşehir Kampüsü",
    gradeLevel: "8. Sınıf",
    grade: "Secondary",
    studentCount: 25,
    averageScore: 68,
    lastExamDate: "2025-04-08",
    examType: "Placement Test",
    completionRate: 84,
  },
  // High School
  {
    id: "c7",
    name: "High School 9-A",
    branch: "A",
    campus: "Bakırköy Kampüsü",
    gradeLevel: "9. Sınıf",
    grade: "High School",
    studentCount: 24,
    averageScore: 79,
    lastExamDate: "2025-04-05",
    examType: "Final",
    completionRate: 95,
  },
  {
    id: "c8",
    name: "High School 11-A",
    branch: "A",
    campus: "Bakırköy Kampüsü",
    gradeLevel: "11. Sınıf",
    grade: "High School",
    studentCount: 22,
    averageScore: 88,
    lastExamDate: "2025-04-04",
    examType: "Final",
    completionRate: 100,
  },
  {
    id: "c9",
    name: "High School 12-B",
    branch: "B",
    campus: "Kadıköy Kampüsü",
    gradeLevel: "12. Sınıf",
    grade: "High School",
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

function asciiSlug(input: string): string {
  return input
    .toLowerCase()
    .replace(/ı/g, "i")
    .replace(/ş/g, "s")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9\s.]/g, "")
    .trim();
}

function makeUsername(name: string, idx: number): string {
  const parts = asciiSlug(name).split(/\s+/);
  const first = parts[0] ?? "user";
  const last = parts[1] ?? "";
  const styles = [
    `${first}.${last}`,
    `${first}${last}${10 + (idx % 90)}`,
    `${first}_${last}`,
    `${first}${last}`,
  ];
  return styles[idx % styles.length].replace(/\.+$/g, "").replace(/_+$/g, "");
}

export const mockStudents: Student[] = mockClasses.flatMap((cls) =>
  Array.from({ length: Math.min(cls.studentCount, 15) }).map((_, idx) => {
    const baseScore = cls.averageScore + (Math.random() * 30 - 15);
    const score = Math.max(20, Math.min(100, Math.round(baseScore)));
    const completion = score < 30 ? 0 : Math.min(100, Math.round(60 + Math.random() * 40));
    const status: Student["status"] =
      completion === 0 ? "absent" : completion < 100 ? "in_progress" : "completed";
    // result artık tamamlayan/tamamlamayan anlamında: completion 100 ise passed (tamamlayan), aksi halde failed (tamamlamayan), absent ise pending
    const result: Student["result"] =
      status === "absent" ? "pending" : status === "completed" ? "passed" : "failed";
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
      username: makeUsername(name, idx + cls.id.length),
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

export function getClassesByGrade(grade?: Grade | null): ClassRoom[] {
  if (!grade) return mockClasses;
  return mockClasses.filter((c) => c.grade === grade);
}

export function getClassStats(classId: string) {
  const students = getStudentsByClassId(classId);
  const attended = students.filter((s) => s.status !== "absent").length;
  // Tamamlayan = sınavı %100 bitirenler; Tamamlamayan = giriş yapmış ama bitirmemiş + katılmayan
  const completed = students.filter((s) => s.status === "completed").length;
  const notCompleted = students.length - completed;
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
    completed,
    notCompleted,
  };
}
