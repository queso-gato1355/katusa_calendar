# 📅 카투사 PASS 캘린더 구독 서비스

## 📌 프로젝트 개요
본 프로젝트는 **Next.js**를 기반으로 제작된 **카투사 PASS 캘린더 구독 서비스**입니다.  
관리자가 일정을 추가/수정하면 자동으로 `.ics` 파일이 생성되며,   아이폰/구글 캘린더에서 해당 URL을 구독하면 실시간으로 일정이 반영됩니다.

이용자는 매번 PASS 일정을 확인할 필요 없이 기본 캘린더 어플 설정을 통해 쉽게 PASS 일정을 확인할 수 있습니다.

## 🚀 주요 기능
- `.ics` 파일 구독 URL 제공 (아이폰/구글 캘린더 지원)
- 관리자 페이지에서 일정 추가/수정/삭제 가능
- 일정 데이터는 JSON 파일 또는 데이터베이스(Supabase/Firebase) 사용 가능
- Vercel을 통한 배포 지원

## 📂 폴더 구조
```
katusa_calendar
│── public/               # 정적 파일 (로고, 이미지 등)
│── pages/                # Next.js 페이지 라우트
│   │── api/              # API 라우트 (백엔드)
│   │   │── events.js     # 일정 추가/삭제/수정 API
│   │   └── calendar.js   # .ics 파일 제공 API
│   ├── index.js          # 메인 페이지 (캘린더 구독 안내)
│   └── admin.js          # 관리자 페이지
│── data/                 # 일정 데이터 저장 (JSON 사용 시)
│── styles/               # CSS 스타일
│── .env                  # 환경 변수
│── package.json          # 프로젝트 의존성 목록
└── README.md             # 프로젝트 문서
```

## 🛠️ 프로젝트 설정 및 실행 방법

### 1️⃣ 필수 패키지 설치
```sh
npm install
```

### 2️⃣ 개발 서버 실행
```sh
npm run dev
```
> 기본적으로 `http://localhost:3000`에서 실행됩니다.

### 3️⃣ 환경 변수 설정 (.env)
`.env` 파일을 생성하고 아래 내용을 추가:
```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## 📡 API 엔드포인트
| Method  | Endpoint        | 설명 |
|---------|----------------|------|
| `GET`   | `/api/events`  | 일정 목록 조회 |
| `POST`  | `/api/events`  | 일정 추가 |
| `PUT`   | `/api/events`  | 일정 수정 |
| `DELETE`| `/api/events`  | 일정 삭제 |
| `GET`   | `/api/calendar.ics` | iCalendar(.ics) 파일 제공 |

## 📅 캘린더 구독 방법
1. 다음 URL을 복사:  
   ```
   https://your-vercel-app.vercel.app/api/calendar.ics
   ```
2. 아이폰/구글 캘린더에서 "캘린더 구독" 기능을 사용해 추가.

## 🎯 관리자 페이지 접속
- **URL:** `http://localhost:3000/admin`
- **기능:** 일정 추가, 수정, 삭제

## 📌 배포 (Vercel)
Vercel을 통해 프로젝트를 배포하려면:
```sh
npm run build
vercel deploy
```

## 📜 라이선스
이 프로젝트는 MIT 라이선스를 따릅니다.