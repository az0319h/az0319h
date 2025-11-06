export type SortKey = "latest" | "oldest";

type MaybeDate = string | number | Date;

export type ProjectLike = {
  id: string;
  createdAt?: MaybeDate; // 필요하면 updatedAt으로 교체 가능
  // ...카드에서 쓰는 기타 필드들
};

function toTime(value?: MaybeDate) {
  if (value == null) return 0;
  const t = new Date(value).getTime();
  return Number.isNaN(t) ? 0 : t;
}

/** createdAt 기준 정렬 (필요 시 updatedAt으로 변경) */
export function sortProjects<T extends ProjectLike>(items: T[], sort: SortKey): T[] {
  const arr = [...items];
  if (sort === "latest") {
    arr.sort((a, b) => toTime(b.createdAt) - toTime(a.createdAt));
  } else {
    arr.sort((a, b) => toTime(a.createdAt) - toTime(b.createdAt));
  }
  return arr;
}
