import { getUserList } from "@/api/request";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const useGetUserListQuery = (pageNum: number) => {
  const queryClient = useQueryClient();

  const queryResult = useQuery(
    ["getUserList", pageNum],
    () => getUserList(pageNum),
    {
      initialData: () => {
        const cachedData = queryClient.getQueryData(["getUserList"]);
        if (cachedData) return cachedData;
      },
    }
  );

  const prefetchNextPage = () => {
    queryClient.prefetchQuery(["getUserlist", pageNum], () =>
      getUserList(pageNum + 1)
    );
  };

  return { ...queryResult, prefetchNextPage };
};

export default useGetUserListQuery;
