import { getBadgeList } from "@/api/request";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const useGetBadgeQuery = (
  status: string,
  pageNum: number,
  nickName?: string
) => {
  const queryClient = useQueryClient();
  const nickNameQueryKey = nickName || "noNickname";
  const queryResult = useQuery(
    ["badge", status, pageNum, nickNameQueryKey],
    () => getBadgeList(status, pageNum, nickName),
    {
      initialData: () => {
        const cachedData = queryClient.getQueryData(["badge"]);
        if (cachedData) return cachedData;
      },
    }
  );
  const prefetchNextPage = () => {
    queryClient.prefetchQuery(
      ["badge", status, pageNum, nickNameQueryKey],
      () => getBadgeList(status, pageNum + 1, nickName)
    );
  };

  return { ...queryResult, prefetchNextPage };
};

export default useGetBadgeQuery;
