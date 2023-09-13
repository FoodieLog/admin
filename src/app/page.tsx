"use client";
import { USER_COLUMNS } from "@/constants/table";
// import Row from "@/components/Table/Table";
import DateCalendarServerRequest from "@/components/Calendar";
export default function Home() {
  const data = [
    {
      id: "feed_id",
      type: "댓글/게시글",
      link: "URL",
      reported_id: "report_id",
      email: "thesecon@gmail.com",
      nickName: "HEROPY",
      grade: "일반회원",
      reporter: [
        {
          reporter_id: "reporter_id",
          nickName: "신고자",
          email: "repoter@gamil.com",
          reason: "광고/욕설/음란/명예훼손/기타",
          reportedAt: "2023-07-25 22:14",
          processedAt: "2023-07-26 22:14",
        },
        {
          reporter_id: "reporter_id",
          nickName: "신고자",
          email: "repoter@gamil.com",
          reason: "광고/욕설/음란/명예훼손/기타",
          reportedAt: "2023-07-25 22:14",
          processedAt: "2023-07-26 22:14",
        },
      ],
      status: "미처리/승인/반려",
    },
  ];

  return (
    <>
      <DateCalendarServerRequest />
    </>
  );
}
