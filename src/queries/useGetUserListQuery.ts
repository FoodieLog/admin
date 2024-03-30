import { getUserList } from "@/api/request";
import { useQuery } from "@tanstack/react-query";

const useGetUserListQuery = () =>
  useQuery(["getUserList"], () => getUserList());

export default useGetUserListQuery;
