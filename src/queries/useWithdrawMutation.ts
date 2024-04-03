import { patchRestoreWithdrawer } from "@/api/request";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useWithdrawMutation = (
  badge: string,
  pageNum: number,
  withdrawId: string,
  nickName?: string
) => {
  const queryClient = useQueryClient();
  const nickNameQueryKey = nickName || "noNickname";
  const option = {
    onSuccess: () => {
      queryClient.invalidateQueries([
        "withdraw",
        badge,
        pageNum,
        nickNameQueryKey,
      ]);
    },
    onError: (error: unknown) => {
      console.error(error);
    },
  };

  const restoreWithdraw = useMutation(async () => {
    return patchRestoreWithdrawer(withdrawId);
  }, option);

  return restoreWithdraw;
};

export default useWithdrawMutation;
