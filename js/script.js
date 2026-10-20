/* ══════════════════════════════════════
   합동속기사무소 - script.js
   ══════════════════════════════════════ */

/* ────────────────────────────────────────
   ★ 카카오톡 1:1 오픈채팅 URL
   주소를 바꿀 때는 아래 한 줄만 수정하면
   페이지 전체 카카오톡 버튼에 자동 반영됩니다.
   ──────────────────────────────────────── */
const KAKAO_CHAT_URL = "https://open.kakao.com/o/sVRLulTi";


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

/* 5) 본문 실행 */
document.addEventListener('DOMContentLoaded', () => {
  applyKakaoUrl();
  initHeader();
  initMobileNav();
  initFaq();
});
