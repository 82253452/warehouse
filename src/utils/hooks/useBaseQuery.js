import { useState } from 'react';
import { useMap, useUpdateEffect } from 'react-use';

export default function(init, paramData, base, api) {
  const [data, setData] = useState(init || {});
  const [param, { set: setParam }] = useMap(paramData || {});
  const [queryLoading, setQqueryLoading] = useState(true);

  useUpdateEffect(() => {
    query();
  }, [param]);

  async function query(p) {
    setQqueryLoading(true);
    await api(base, p).then(res => setData(res.data));
    setQqueryLoading(false);
  }

  return { data, param, query, setData, setParam, queryLoading, setQqueryLoading };
}
