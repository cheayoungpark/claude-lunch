# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

점심 메뉴 추천 + 한 달 기록 웹앱. 순수 HTML/CSS/JS로 구성되어 있으며 빌드 도구 없이 브라우저에서 바로 실행된다.

## 배포

- GitHub Pages로 배포: `git push origin main` 으로 자동 반영
- URL: https://cheayoungpark.github.io/claude-lunch/
- CSS/JS 변경 시 캐시 무효화를 위해 `style.css?v=N` / `app.js?v=N` 버전 파라미터를 올려줘야 함 (index.html의 link/script 태그)

## 아키텍처

파일 3개로 구성:
- `index.html` — 레이아웃. 좌(메뉴 추천) / 우(기록) 2단 가로 레이아웃
- `style.css` — 스타일
- `app.js` — 모든 로직. 데이터, 추천 로직, 기록 CRUD, 달력 렌더링 포함

### 데이터 흐름

- 메뉴 데이터: `app.js` 상단 `menus` 배열 (30개, 한식/중식/일식/양식/분식)
- 점심 기록: `localStorage["lunchRecords"]` — `{ date: "YYYY-MM-DD", name, emoji, category }[]` 형식, 최근 31일만 보관
- 상태: `selectedCategory`, `excludedMenu`, `isSpinning` 전역 변수

### 주요 함수

- `recommend()` — 카테고리 필터 + 제외 메뉴 적용 후 랜덤 추천 (플래시 애니메이션)
- `recordLunch()` / `deleteRecord()` / `editRecord()` / `confirmEdit()` — 목록 뷰 기록 CRUD
- `calEditRecord()` / `calConfirmEdit()` / `calDeleteRecord()` — 달력 뷰 기록 CRUD
- `renderHistory()` — 목록 뷰 갱신
- `renderCalendar()` — 달력 뷰 갱신 (월 이동 지원)
- `showCalDetail()` — 달력 날짜 클릭 시 상세 표시

### 뷰 구조

오른쪽 패널에 목록/달력 탭이 있으며 `switchView(view)` 로 전환. 달력은 `calYear`, `calMonth` 전역 변수로 현재 표시 월 관리.
