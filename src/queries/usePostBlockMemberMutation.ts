import { postBlockMember } from "@/api/request";
import useUserStore from "@/store/useUserStore";
import { BlockBody } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const usePostBlockMemberMutation = (blockBody: BlockBody) => {
  const queryClient = useQueryClient();
  const { setUserId, setNickName } = useUserStore();

  const postBlockMemberMutation = useMutation(
    () => postBlockMember(blockBody),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getUserList"]);
        setUserId(0);
        setNickName("");
        alert(`userId ${blockBody.userId} 차단되었습니다.`);
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );
  return postBlockMemberMutation;
};

export default usePostBlockMemberMutation;
