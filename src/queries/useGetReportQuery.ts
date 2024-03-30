import { getReportList } from "@/api/request";
import { useQuery } from "@tanstack/react-query";

const useGetReportQuery = (pageNum: number = 1) =>
  useQuery(["report", pageNum], () => getReportList(pageNum));

export default useGetReportQuery;
