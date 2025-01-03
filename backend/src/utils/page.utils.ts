export function getPage(page: string): number {
  return page ? +page : 1;
}

export function getPageSize(pageSize: string): number {
  return pageSize ? +pageSize : 3;
}

export function getTotalPage(totalItem: number, pageSize: number): number {
  return Math.ceil(totalItem / pageSize);
}
