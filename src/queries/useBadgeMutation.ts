import { patchBadgeStatus } from "@/api/request";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useBadgeMutation = (
  status: string,
  pageNum: number,
  badgeApplyId: number | null,
  nickName?: string
) => {
  const queryClient = useQueryClient();
  const nickNameQueryKey = nickName || "noNickname";
  const option = {
    onSuccess: () => {
      queryClient.invalidateQueries([
        "badge",
        status,
        pageNum,
        nickNameQueryKey,
      ]);
    },
    onError: (error: unknown) => {
      console.error(error);
    },
  };

  const rejectBadgeMutation = useMutation(async () => {
    if (badgeApplyId) {
      return patchBadgeStatus(badgeApplyId, "rejected");
    }
  }, option);

  const approveBadgeMutation = useMutation(async () => {
    if (badgeApplyId) {
      return patchBadgeStatus(badgeApplyId, "approved");
    }
  }, option);

  return { rejectBadgeMutation, approveBadgeMutation };
};

export default useBadgeMutation;
