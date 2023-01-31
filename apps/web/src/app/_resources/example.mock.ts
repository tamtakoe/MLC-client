export function getItems(req: any) {
  const items = [];
  const params = {
    sort: req.params.get('sort') || 'name:asc',
    limit: req.params.get('limit') || 20,
    offset: req.params.get('offset') || 0,
    total: req.params.get('total') || 137
  };

  for (let i = params.offset; i < Math.min(params.offset + params.limit, params.total); i++) {
      const item = {
        id: i + 1,
        name: btoa(i + params.offset),
        random: Math.random()
      }

    items.push(item);
  }

  return {
    data: params.sort.split(':')[1] === 'desc' ? items.reverse() : items,
    total: params.total,
    limit: params.limit,
    offset: params.offset,
  };
}
