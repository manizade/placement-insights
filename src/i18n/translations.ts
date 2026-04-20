// Lightweight, dependency-free i18n dictionary.
// Replace later with react-i18next or similar — keep keys stable.

export type Language = "tr" | "en";

export const translations = {
  tr: {
    // Nav / topbar
    "nav.classes": "Sınıflar",
    "nav.reports": "Karneler",
    "topbar.search": "Hızlı arama...",
    "topbar.notifications": "Bildirimler",
    "topbar.role": "Koordinatör",
    "topbar.language": "Dil",

    // Filter sidebar
    "filters.title": "Filtreler",
    "filters.clear": "Temizle",
    "filters.exam": "Sınav",
    "filters.grade": "Seviye",
    "filters.class": "Sınıf",
    "filters.student": "Öğrenci",
    "filters.selectExam": "Sınav seçin",
    "filters.selectGrade": "Seviye seçin",
    "filters.selectClass": "Sınıf seçin",
    "filters.selectStudent": "Öğrenci seçin",
    "filters.apply": "Filtreleri Uygula",

    // Classes page
    "classes.title": "Sınıflar",
    "classes.subtitle":
      "Tüm sınıfların placement sınavı sonuçlarını ve performansını görüntüleyin.",
    "classes.searchPlaceholder": "Sınıf, kampüs veya seviye ara...",
    "classes.sort.name": "İsme göre",
    "classes.sort.score": "Skora göre",
    "classes.sort.date": "Tarihe göre",
    "classes.shown": "sınıf gösteriliyor",
    "classes.gridView": "Kart görünümü",
    "classes.listView": "Liste görünümü",

    // Class card
    "card.branch": "Şube",
    "card.students": "Öğrenci",
    "card.lastExam": "Son Sınav",
    "card.averageScore": "Ortalama Skor",
    "card.completion": "Tamamlanma",

    // Download lists
    "download.lists": "Listeleri İndir",
    "download.lists.title": "Sınıf seçin",
    "download.lists.searchPlaceholder": "Sınıf ara...",
    "download.lists.allClasses": "Tüm Sınıflar",
    "download.lists.confirm": "Seçilen Listeleri İndir",
    "download.lists.empty": "Sonuç bulunamadı",
    "download.lists.errorEmpty": "Lütfen en az bir sınıf seçin",
    "download.lists.successAll": "Tüm sınıfların listeleri hazırlanıyor",
    "download.lists.successN": "{count} sınıfın listesi hazırlanıyor",
    "download.toastDesc": "İndirme başlatıldı (mock).",
    "download.studentsSuffix": "öğrenci",

    // Download reports
    "download.reports": "Karneleri İndir",
    "download.reports.title": "Karne seçin",
    "download.reports.searchPlaceholder": "Öğrenci, no veya sınıf ara...",
    "download.reports.all": "Tüm Karneler",
    "download.reports.confirm": "Seçilen Karneleri İndir",
    "download.reports.errorEmpty": "Lütfen en az bir karne seçin",
    "download.reports.successAll": "Tüm karneler hazırlanıyor",
    "download.reports.successN": "{count} karne hazırlanıyor",
    "common.clear": "Temizle",

    // Reports page
    "reports.title": "Karneler",
    "reports.subtitle":
      "Placement sınavlarından sonra üretilen öğrenci karnelerini görüntüleyin ve indirin.",
    "reports.tabs.all": "Tümü",
    "reports.tabs.completed": "Tamamlayan",
    "reports.tabs.notCompleted": "Tamamlamayan",
    "reports.searchPlaceholder": "Öğrenci, no veya sınıf ara...",
    "reports.empty.title": "Karne bulunamadı",
    "reports.empty.desc":
      "Filtreleri değiştirerek veya arama terimini güncelleyerek tekrar deneyin.",
    "reports.mockNote":
      "Bu mock veridir. Backend bağlandığında gerçek karneler burada listelenecek.",
    "reports.stat.total": "Toplam Karne",
    "reports.stat.completed": "Tamamlayan",
    "reports.stat.average": "Ortalama Skor",

    // Report card item
    "report.completed": "Tamamlayan",
    "report.notCompleted": "Tamamlamayan",
    "report.overall": "Genel Skor",
    "report.exam": "Sınav",
    "report.download": "İndir",

    // Class detail
    "detail.breadcrumb": "Sınıflar",
    "detail.back": "Sınıflara Dön",
    "detail.notFound.title": "Sınıf bulunamadı",
    "detail.notFound.desc": "Aradığınız sınıf mevcut değil veya silinmiş olabilir.",
    "detail.export": "Sonuçları Dışa Aktar",
    "detail.stat.totalStudents": "Toplam Öğrenci",
    "detail.stat.attended": "Sınava Giren",
    "detail.stat.attendance": "%{pct} katılım",
    "detail.stat.average": "Ortalama Skor",
    "detail.stat.outOf": "100 üzerinden",
    "detail.stat.completedRatio": "Tamamlayan / Tamamlamayan",
    "detail.tabs.all": "Tümü",
    "detail.tabs.completed": "Tamamlayan",
    "detail.tabs.notCompleted": "Tamamlamayan",
    "detail.searchStudent": "Öğrenci ara...",
    "detail.empty.title": "Bu kriterlere uygun öğrenci yok",
    "detail.empty.desc": "Filtreleri değiştirerek tekrar deneyin.",

    // Student table
    "table.student": "Öğrenci",
    "table.no": "No",
    "table.score": "Skor",
    "table.level": "Seviye",
    "table.status": "Durum",
    "table.completion": "Tamamlanma",
    "table.result": "Sonuç",
    "table.date": "Tarih",
    "table.detail": "Detay",
    "status.completed": "Tamamlandı",
    "status.in_progress": "Devam Ediyor",
    "status.absent": "Katılmadı",
    "status.not_started": "Başlamadı",
    "result.passed": "Tamamlayan",
    "result.failed": "Tamamlamayan",
  },
  en: {
    // Nav / topbar
    "nav.classes": "Classes",
    "nav.reports": "Reports",
    "topbar.search": "Quick search...",
    "topbar.notifications": "Notifications",
    "topbar.role": "Coordinator",
    "topbar.language": "Language",

    // Filter sidebar
    "filters.title": "Filters",
    "filters.clear": "Clear",
    "filters.exam": "Exam",
    "filters.grade": "Grade",
    "filters.class": "Class",
    "filters.student": "Student",
    "filters.selectExam": "Select exam",
    "filters.selectGrade": "Select grade",
    "filters.selectClass": "Select class",
    "filters.selectStudent": "Select student",
    "filters.apply": "Apply Filters",

    // Classes page
    "classes.title": "Classes",
    "classes.subtitle":
      "View placement exam results and performance for all classes.",
    "classes.searchPlaceholder": "Search class, campus or grade...",
    "classes.sort.name": "By name",
    "classes.sort.score": "By score",
    "classes.sort.date": "By date",
    "classes.shown": "classes shown",
    "classes.gridView": "Grid view",
    "classes.listView": "List view",

    // Class card
    "card.branch": "Branch",
    "card.students": "Students",
    "card.lastExam": "Last Exam",
    "card.averageScore": "Average Score",
    "card.completion": "Completion",

    // Download lists
    "download.lists": "Download Lists",
    "download.lists.title": "Select classes",
    "download.lists.searchPlaceholder": "Search class...",
    "download.lists.allClasses": "All Classes",
    "download.lists.confirm": "Download Selected Lists",
    "download.lists.empty": "No results",
    "download.lists.errorEmpty": "Please select at least one class",
    "download.lists.successAll": "Preparing lists for all classes",
    "download.lists.successN": "Preparing lists for {count} classes",
    "download.toastDesc": "Download started (mock).",
    "download.studentsSuffix": "students",

    // Download reports
    "download.reports": "Download Reports",
    "download.reports.title": "Select reports",
    "download.reports.searchPlaceholder": "Search student, ID or class...",
    "download.reports.all": "All Reports",
    "download.reports.confirm": "Download Selected Reports",
    "download.reports.errorEmpty": "Please select at least one report",
    "download.reports.successAll": "Preparing all reports",
    "download.reports.successN": "Preparing {count} reports",
    "common.clear": "Clear",

    // Reports page
    "reports.title": "Reports",
    "reports.subtitle":
      "View and download student report cards generated after placement exams.",
    "reports.tabs.all": "All",
    "reports.tabs.completed": "Completed",
    "reports.tabs.notCompleted": "Not Completed",
    "reports.searchPlaceholder": "Search student, ID or class...",
    "reports.empty.title": "No reports found",
    "reports.empty.desc":
      "Try changing the filters or updating your search term.",
    "reports.mockNote":
      "This is mock data. Real reports will appear here once the backend is connected.",
    "reports.stat.total": "Total Reports",
    "reports.stat.completed": "Completed",
    "reports.stat.average": "Average Score",

    // Report card item
    "report.completed": "Completed",
    "report.notCompleted": "Not Completed",
    "report.overall": "Overall Score",
    "report.exam": "Exam",
    "report.download": "Download",

    // Class detail
    "detail.breadcrumb": "Classes",
    "detail.back": "Back to Classes",
    "detail.notFound.title": "Class not found",
    "detail.notFound.desc": "The class you are looking for does not exist or has been removed.",
    "detail.export": "Export Results",
    "detail.stat.totalStudents": "Total Students",
    "detail.stat.attended": "Attended",
    "detail.stat.attendance": "{pct}% attendance",
    "detail.stat.average": "Average Score",
    "detail.stat.outOf": "out of 100",
    "detail.stat.completedRatio": "Completed / Not Completed",
    "detail.tabs.all": "All",
    "detail.tabs.completed": "Completed",
    "detail.tabs.notCompleted": "Not Completed",
    "detail.searchStudent": "Search student...",
    "detail.empty.title": "No students match these criteria",
    "detail.empty.desc": "Try changing the filters.",

    // Student table
    "table.student": "Student",
    "table.no": "ID",
    "table.score": "Score",
    "table.level": "Level",
    "table.status": "Status",
    "table.completion": "Completion",
    "table.result": "Result",
    "table.date": "Date",
    "table.detail": "Details",
    "status.completed": "Completed",
    "status.in_progress": "In Progress",
    "status.absent": "Absent",
    "status.not_started": "Not Started",
    "result.passed": "Completed",
    "result.failed": "Not Completed",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["tr"];
