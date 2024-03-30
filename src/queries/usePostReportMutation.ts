import { patchReport } from "@/api/request";
import { PatchReportBody } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const usePostReportMutation = (
  reportBody: {
    contentId: number;
    reportedId: number;
  },
  pageNum: number
) => {
  const queryClient = useQueryClient();
  const option = {
    onSuccess: () => {
      queryClient.invalidateQueries(["report", pageNum]);
    },
  };

  const approveReportMutation = useMutation(
    () => patchReport({ ...reportBody, status: "APPROVED" }),
    option
  );

  const rejectReportMutation = useMutation(
    () => patchReport({ ...reportBody, status: "REJECTED" }),
    option
  );

  return { approveReportMutation, rejectReportMutation };
};

export default usePostReportMutation;
