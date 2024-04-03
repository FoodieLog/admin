import { getReportList } from "@/api/request";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const useGetReportQuery = (pageNum: number) => {
  const queryClient = useQueryClient();
  const queryResult = useQuery(
    ["report", pageNum],
    () => getReportList(pageNum),
    {
      initialData: () => {
        const cachedData = queryClient.getQueryData(["report"]);
        if (cachedData) return cachedData;
      },
    }
  );

  const prefetchNextPage = () => {
    queryClient.prefetchQuery(["report", pageNum], () =>
      getReportList(pageNum + 1)
    );
  };

  return { ...queryResult, prefetchNextPage };
};

export default useGetReportQuery;
