/* ══════════════════════════════════════
   유언.녹취 합동속기사무소 - script.js
   ══════════════════════════════════════ */

/* ────────────────────────────────────────
   ★ 카카오톡 1:1 오픈채팅 URL
   주소를 바꿀 때는 아래 한 줄만 수정하면
   페이지 전체 카카오톡 버튼에 자동 반영됩니다.
   ──────────────────────────────────────── */
const KAKAO_CHAT_URL = "https://open.kakao.com/o/syStDWTi";


/* 1) 모든 카카오톡 링크에 URL 적용 */
function applyKakaoUrl() {
  document.querySelectorAll('.js-kakao-open').forEach(el => {
    el.href = KAKAO_CHAT_URL;
    el.target = '_blank';
    el.rel = 'noopener';
  });
}

/* 2) 헤더 스크롤 그림자 */
function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 10);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* 3) 모바일 메뉴 */
function initMobileNav() {
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  if (!burger || !nav) return;

  burger.addEventListener('click', () => nav.classList.toggle('is-open'));

  // 메뉴를 클릭하면 닫히도록
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => nav.classList.remove('is-open'));
  });

  // 화면이 넓어지면 자동 닫기
  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) nav.classList.remove('is-open');
  });
}

/* 4) FAQ — 한 번에 하나만 펼치기 */
function initFaq() {
  const items = document.querySelectorAll('.faq__item');
  items.forEach(item => {
    item.addEventListener('toggle', () => {
      if (item.open) items.forEach(o => { if (o !== item) o.open = false; });
    });
  });
}

/* 5) 홈 진입 시 항상 첫 화면(상단)부터 보이도록
      - 세션 복원·이전 방문으로 화면이 맨 아래에서 열리는 문제 방지
      - 특정 섹션(#faq 등) 링크로 열었을 때는 위치 유지 */
function initTopOnOpen() {
  if (location.hash && location.hash !== '#') return;
  const html = document.documentElement;
  const prev = html.style.scrollBehavior;
  html.style.scrollBehavior = 'auto';   // CSS smooth 무력화
  try {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });  // 애니메이션 없이 즉시 상단
  } catch (e) {
    window.scrollTo(0, 0);
  }
  html.style.scrollBehavior = prev;
}
window.addEventListener('load', initTopOnOpen);
if (document.readyState === 'complete') initTopOnOpen();

/* 6) 우측 하단 '맨 위로' 버튼 */
function initTopBtn() {
  const btn = document.querySelector('.float__btn--top');
  if (!btn) return;
  btn.addEventListener('click', e => {
    e.preventDefault();   // 주소에 #top 붙는 것 방지
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } catch (err) {
      window.scrollTo(0, 0);
    }
  });
}

/* 7) 본문 실행 */
document.addEventListener('DOMContentLoaded', () => {
  applyKakaoUrl();
  initHeader();
  initMobileNav();
  initFaq();
  initTopBtn();
});
