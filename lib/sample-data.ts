/**
 * 화면 확인용 예시 데이터.
 *
 * 아직 데이터베이스(Supabase)를 붙이지 않았기 때문에, 화면이 어떻게 보이는지
 * 확인할 수 있도록 이 파일 하나에 예시 데이터를 모아 둔다.
 * 나중에 데이터베이스를 붙일 때 이 파일만 걷어내면 된다.
 */

export type CountryCode = 'VN' | 'UZ' | 'MM'
export type EmploymentType = '정규직' | '계약직' | '일용직'
export type EnrollmentStatus =
  | 'NOT_STARTED' // 미시작
  | 'IN_PROGRESS' // 진행 중
  | 'COMPLETED' // 수료
  | 'OVERDUE' // 기한 초과

export const COUNTRY: Record<CountryCode, { ko: string; flag: string }> = {
  VN: { ko: '베트남', flag: '🇻🇳' },
  UZ: { ko: '우즈베키스탄', flag: '🇺🇿' },
  MM: { ko: '미얀마', flag: '🇲🇲' },
}

export const STATUS_LABEL: Record<EnrollmentStatus, string> = {
  NOT_STARTED: '미시작',
  IN_PROGRESS: '진행 중',
  COMPLETED: '수료',
  OVERDUE: '기한 초과',
}

/** Tailwind는 클래스 이름을 글자 그대로 찾으므로 전체 이름을 적어 둔다 */
export const STATUS_STYLE: Record<EnrollmentStatus, string> = {
  NOT_STARTED: 'bg-void-800/70 text-gray-200',
  IN_PROGRESS: 'bg-space-600/30 text-space-200',
  COMPLETED: 'bg-emerald-500/20 text-emerald-200',
  OVERDUE: 'bg-red-500/20 text-red-200',
}

/* ------------------------------------------------------------------ */
/* 교육 과정                                                           */
/* ------------------------------------------------------------------ */

export type CourseSection = {
  order: number
  title: string
  titleVi: string
  minutes: number
  summary: string
}

export type Course = {
  id: string
  title: string
  titleVi: string
  hours: number
  legalBasis: string
  sections: CourseSection[]
}

export const COURSES: Course[] = [
  {
    id: 'basic-safety',
    title: '외국인 근로자 기초안전보건교육',
    titleVi: 'Giáo dục an toàn vệ sinh lao động cơ bản',
    hours: 4,
    legalBasis: '산업안전보건법 제29조 · 시행규칙 별표 4',
    sections: [
      {
        order: 1,
        title: '산업안전보건법의 주요 내용',
        titleVi: 'Nội dung chính của Luật An toàn vệ sinh lao động',
        minutes: 50,
        summary:
          '사업주와 근로자가 각각 무엇을 지켜야 하는지, 위험할 때 작업을 멈출 수 있는 권리가 무엇인지 배웁니다.',
      },
      {
        order: 2,
        title: '산업재해 유형과 발생 원인',
        titleVi: 'Các loại tai nạn lao động và nguyên nhân',
        minutes: 50,
        summary:
          '떨어짐·끼임·부딪힘 등 현장에서 가장 많이 일어나는 사고를 사진과 사례로 확인합니다.',
      },
      {
        order: 3,
        title: '작업 전 안전점검과 TBM',
        titleVi: 'Kiểm tra an toàn trước khi làm việc và TBM',
        minutes: 40,
        summary:
          '일을 시작하기 전 5~10분 동안 무엇을 확인해야 하는지, 모르는 것을 어떻게 물어보는지 배웁니다.',
      },
      {
        order: 4,
        title: '보호구 착용과 방호장치',
        titleVi: 'Sử dụng thiết bị bảo hộ và cơ cấu che chắn',
        minutes: 40,
        summary:
          '안전모·안전화·안전대를 바르게 쓰는 법과, 덥다고 보호구를 벗으면 어떤 일이 생기는지 배웁니다.',
      },
      {
        order: 5,
        title: '사고 발생 시 대응과 응급처치',
        titleVi: 'Xử lý khi xảy ra tai nạn và sơ cứu',
        minutes: 40,
        summary:
          '사고가 났을 때 누구에게 어떻게 알리는지, 119에 무엇을 말해야 하는지 한국어 문장으로 익힙니다.',
      },
    ],
  },
  {
    id: 'regular-safety',
    title: '정기 안전보건교육 (반기)',
    titleVi: 'Giáo dục an toàn định kỳ (nửa năm)',
    hours: 6,
    legalBasis: '산업안전보건법 제29조 제1항 · 매반기 6시간 이상',
    sections: [
      {
        order: 1,
        title: '최근 산업재해 사례와 교훈',
        titleVi: 'Các vụ tai nạn gần đây và bài học',
        minutes: 90,
        summary:
          '최근 우리 업종에서 실제로 일어난 사고를 보고, 같은 일이 우리 현장에서 가능한지 함께 따져 봅니다.',
      },
      {
        order: 2,
        title: '위험성평가에 참여하는 방법',
        titleVi: 'Cách tham gia đánh giá rủi ro',
        minutes: 90,
        summary:
          '내가 하는 작업의 위험을 직접 말할 수 있어야 합니다. 법이 근로자 참여를 의무로 정하고 있습니다.',
      },
      {
        order: 3,
        title: '밀폐공간·고소작업 등 위험작업',
        titleVi: 'Công việc nguy hiểm: không gian kín, làm việc trên cao',
        minutes: 90,
        summary:
          '들어가기 전 반드시 허가와 산소 농도 측정이 필요한 작업을 구분합니다.',
      },
      {
        order: 4,
        title: '건강관리와 직업병 예방',
        titleVi: 'Quản lý sức khỏe và phòng bệnh nghề nghiệp',
        minutes: 90,
        summary:
          '소음·분진·근골격계 부담 작업에서 몸을 지키는 방법과 건강검진 받는 법을 안내합니다.',
      },
    ],
  },
]

export function findCourse(courseId: string): Course | undefined {
  return COURSES.find((c) => c.id === courseId)
}

/* ------------------------------------------------------------------ */
/* 어려운 말 사전 — 현장 한자어 · 은어 · 법정용어                       */
/* ------------------------------------------------------------------ */

export type Glossary = {
  term: string
  hanja?: string
  alsoCalled?: string
  meaning: string
  meaningVi: string
}

export const GLOSSARY: Glossary[] = [
  {
    term: '고소작업',
    hanja: '高所作業',
    meaning:
      '높은 곳에서 하는 작업. 바닥에서 2m 이상이면 반드시 안전대를 걸어야 합니다.',
    meaningVi: 'Làm việc trên cao — từ 2m trở lên phải móc dây an toàn.',
  },
  {
    term: '협착',
    hanja: '狹窄',
    alsoCalled: '끼임',
    meaning:
      '기계나 물체 사이에 몸이 끼이는 사고. 기계가 돌고 있을 때 손을 넣지 않습니다.',
    meaningVi: 'Bị kẹp giữa máy hoặc vật — không đưa tay vào khi máy đang chạy.',
  },
  {
    term: '방호장치',
    hanja: '防護裝置',
    meaning:
      '기계의 위험한 부분에 손이 닿지 않게 막아 주는 덮개나 장치. 임의로 떼면 안 됩니다.',
    meaningVi: 'Cơ cấu che chắn — tuyệt đối không được tự ý tháo ra.',
  },
  {
    term: '안전대',
    hanja: '安全帶',
    alsoCalled: '안전벨트',
    meaning: '높은 곳에서 떨어지지 않도록 몸에 매는 벨트와 줄.',
    meaningVi: 'Dây đai an toàn dùng khi làm việc trên cao.',
  },
  {
    term: 'TBM',
    alsoCalled: '작업 전 안전점검회의',
    meaning:
      '일을 시작하기 전 5~10분간 오늘 할 일과 위험을 함께 확인하는 짧은 모임.',
    meaningVi:
      'Họp ngắn 5–10 phút trước ca làm để xác nhận công việc và mối nguy.',
  },
  {
    term: '위험성평가',
    hanja: '危險性評價',
    meaning:
      '작업에 어떤 위험이 있는지 미리 찾아내어 없애는 절차. 근로자도 참여해야 합니다.',
    meaningVi:
      'Đánh giá rủi ro — người lao động cũng phải được tham gia theo luật.',
  },
  {
    term: '중량물',
    hanja: '重量物',
    meaning:
      '무거운 물건. 혼자 들지 말고 장비를 쓰거나 두 사람 이상이 함께 듭니다.',
    meaningVi: 'Vật nặng — không nâng một mình, dùng thiết bị hoặc hai người.',
  },
  {
    term: '아차사고',
    alsoCalled: '니어미스',
    meaning:
      '다칠 뻔했지만 다치지 않은 일. 숨기지 말고 알려야 큰 사고를 막습니다.',
    meaningVi: 'Suýt tai nạn — phải báo cáo để ngăn tai nạn lớn.',
  },
]

/* ------------------------------------------------------------------ */
/* 근로자와 교육 배정                                                  */
/* ------------------------------------------------------------------ */

export type Enrollment = {
  courseId: string
  status: EnrollmentStatus
  progress: number
  completedSections: number
  assignedOn: string
  dueOn: string
  completedOn?: string
  certificateId?: string
}

export type Worker = {
  id: string
  name: string
  nameLocal: string
  country: CountryCode
  department: string
  employmentType: EmploymentType
  hiredOn: string
  enrollments: Enrollment[]
}

export const COMPANY = {
  name: '대한정밀공업 주식회사',
  businessNumber: '124-81-00352',
  industry: '제조업 (자동차 부품)',
  employeeCount: 512,
}

export const WORKERS: Worker[] = [
  {
    id: 'w-01',
    name: '응우옌 반 훙',
    nameLocal: 'Nguyễn Văn Hùng',
    country: 'VN',
    department: '사출 1팀',
    employmentType: '정규직',
    hiredOn: '2024-03-11',
    enrollments: [
      {
        courseId: 'basic-safety',
        status: 'COMPLETED',
        progress: 100,
        completedSections: 5,
        assignedOn: '2026-07-01',
        dueOn: '2026-07-31',
        completedOn: '2026-07-24',
        certificateId: 'cert-1024',
      },
      {
        courseId: 'regular-safety',
        status: 'IN_PROGRESS',
        progress: 50,
        completedSections: 2,
        assignedOn: '2026-09-01',
        dueOn: '2026-09-30',
      },
    ],
  },
  {
    id: 'w-02',
    name: '쩐 티 마이',
    nameLocal: 'Trần Thị Mai',
    country: 'VN',
    department: '품질검사',
    employmentType: '계약직',
    hiredOn: '2025-05-02',
    enrollments: [
      {
        courseId: 'basic-safety',
        status: 'IN_PROGRESS',
        progress: 62,
        completedSections: 3,
        assignedOn: '2026-08-20',
        dueOn: '2026-09-19',
      },
    ],
  },
  {
    id: 'w-03',
    name: '레 민 뚜언',
    nameLocal: 'Lê Minh Tuấn',
    country: 'VN',
    department: '프레스 가공',
    employmentType: '정규직',
    hiredOn: '2023-11-20',
    enrollments: [
      {
        courseId: 'basic-safety',
        status: 'IN_PROGRESS',
        progress: 35,
        completedSections: 1,
        assignedOn: '2026-08-25',
        dueOn: '2026-09-24',
      },
    ],
  },
  {
    id: 'w-04',
    name: '팜 반 득',
    nameLocal: 'Phạm Văn Đức',
    country: 'VN',
    department: '물류창고',
    employmentType: '일용직',
    hiredOn: '2026-09-01',
    enrollments: [
      {
        courseId: 'basic-safety',
        status: 'NOT_STARTED',
        progress: 0,
        completedSections: 0,
        assignedOn: '2026-09-02',
        dueOn: '2026-09-30',
      },
    ],
  },
  {
    id: 'w-05',
    name: '아지즈 라히모프',
    nameLocal: 'Aziz Rakhimov',
    country: 'UZ',
    department: '골조공사팀',
    employmentType: '일용직',
    hiredOn: '2026-04-15',
    enrollments: [
      {
        courseId: 'basic-safety',
        status: 'COMPLETED',
        progress: 100,
        completedSections: 5,
        assignedOn: '2026-04-16',
        dueOn: '2026-05-15',
        completedOn: '2026-04-29',
        certificateId: 'cert-0987',
      },
    ],
  },
  {
    id: 'w-06',
    name: '딜노자 카리모바',
    nameLocal: 'Dilnoza Karimova',
    country: 'UZ',
    department: '조립 2팀',
    employmentType: '정규직',
    hiredOn: '2025-01-07',
    enrollments: [
      {
        courseId: 'basic-safety',
        status: 'IN_PROGRESS',
        progress: 80,
        completedSections: 4,
        assignedOn: '2026-08-18',
        dueOn: '2026-09-17',
      },
    ],
  },
  {
    id: 'w-07',
    name: '자수르 유수포프',
    nameLocal: 'Jasur Yusupov',
    country: 'UZ',
    department: '도장팀',
    employmentType: '계약직',
    hiredOn: '2026-08-28',
    enrollments: [
      {
        courseId: 'basic-safety',
        status: 'NOT_STARTED',
        progress: 0,
        completedSections: 0,
        assignedOn: '2026-08-29',
        dueOn: '2026-09-28',
      },
    ],
  },
  {
    id: 'w-08',
    name: '아웅 먀 투',
    nameLocal: 'Aung Myat Thu',
    country: 'MM',
    department: '설비보전',
    employmentType: '정규직',
    hiredOn: '2024-09-09',
    enrollments: [
      {
        courseId: 'basic-safety',
        status: 'COMPLETED',
        progress: 100,
        completedSections: 5,
        assignedOn: '2026-06-01',
        dueOn: '2026-06-30',
        completedOn: '2026-06-18',
        certificateId: 'cert-0912',
      },
    ],
  },
  {
    id: 'w-09',
    name: '띠리 킨',
    nameLocal: 'Thiri Khin',
    country: 'MM',
    department: '조립 2팀',
    employmentType: '계약직',
    hiredOn: '2026-07-14',
    enrollments: [
      {
        courseId: 'basic-safety',
        status: 'IN_PROGRESS',
        progress: 15,
        completedSections: 0,
        assignedOn: '2026-09-03',
        dueOn: '2026-10-02',
      },
    ],
  },
  {
    id: 'w-10',
    name: '쪼 진 우',
    nameLocal: 'Kyaw Zin Oo',
    country: 'MM',
    department: '물류창고',
    employmentType: '일용직',
    hiredOn: '2026-05-26',
    enrollments: [
      {
        courseId: 'basic-safety',
        status: 'OVERDUE',
        progress: 20,
        completedSections: 1,
        assignedOn: '2026-07-10',
        dueOn: '2026-08-09',
      },
    ],
  },
]

/** 학습 화면에서 "지금 로그인한 근로자"로 쓰는 사람 */
export const CURRENT_WORKER_ID = 'w-01'

export function findWorker(workerId: string): Worker | undefined {
  return WORKERS.find((w) => w.id === workerId)
}

/** 목록에 한 줄로 보여 줄 대표 교육 — 아직 안 끝난 것을 먼저 보여 준다 */
export function primaryEnrollment(worker: Worker): Enrollment {
  return (
    worker.enrollments.find((e) => e.status !== 'COMPLETED') ??
    worker.enrollments[0]
  )
}

export function countByStatus(status: EnrollmentStatus): number {
  return WORKERS.filter((w) => primaryEnrollment(w).status === status).length
}

/* ------------------------------------------------------------------ */
/* 수료증                                                              */
/* ------------------------------------------------------------------ */

export type Certificate = {
  id: string
  number: string
  worker: Worker
  course: Course
  issuedOn: string
}

/** 발급된 수료증 전부 (근로자들의 수료 기록에서 모은다) */
export function allCertificates(): Certificate[] {
  const result: Certificate[] = []

  for (const worker of WORKERS) {
    for (const enrollment of worker.enrollments) {
      const course = findCourse(enrollment.courseId)
      if (!enrollment.certificateId || !enrollment.completedOn || !course) {
        continue
      }
      result.push({
        id: enrollment.certificateId,
        number: `KSE-${enrollment.completedOn.slice(0, 4)}-${enrollment.certificateId
          .replace('cert-', '')
          .padStart(6, '0')}`,
        worker,
        course,
        issuedOn: enrollment.completedOn,
      })
    }
  }

  return result.sort((a, b) => b.issuedOn.localeCompare(a.issuedOn))
}

export function findCertificate(certificateId: string): Certificate | undefined {
  return allCertificates().find((c) => c.id === certificateId)
}
