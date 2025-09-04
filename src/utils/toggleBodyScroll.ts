// src/utils/toggleBodyScroll.ts

/**
 * body 스크롤을 제어하는 유틸 함수
 * @param disable true면 스크롤 막음, false면 복구
 */
export function toggleBodyScroll(disable: boolean) {
  if (disable) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}
