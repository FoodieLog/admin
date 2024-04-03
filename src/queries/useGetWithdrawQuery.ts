import { getWithdrawerList } from "@/api/request";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const useGetWithdrawQuery = (
  badge: string,
  pageNum: number,
  nickName?: string
) => {
  const queryClient = useQueryClient();
  const nickNameQueryKey = nickName || "noNickname";
  const queryResult = useQuery(
    ["withdraw", badge, pageNum, nickNameQueryKey],
    () => getWithdrawerList(badge, pageNum, nickName),
    {
      initialData: () => {
        const cachedData = queryClient.getQueryData(["withdraw"]);
        if (cachedData) return cachedData;
      },
    }
  );
  const prefetchNextPage = () => {
    queryClient.prefetchQuery(
      ["withdraw", badge, pageNum, nickNameQueryKey],
      () => getWithdrawerList(badge, pageNum + 1, nickName)
    );
  };

  return { ...queryResult, prefetchNextPage };
};

export default useGetWithdrawQuery;
