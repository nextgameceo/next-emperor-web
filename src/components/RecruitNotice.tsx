import { Notice } from "./ui";

/** 応募方法に関する注意書き（求人一覧・詳細で共通） */
export default function RecruitNotice() {
  return (
    <Notice>
      掲載している求人への応募は、各求人の応募窓口（掲載企業、または提携する人材紹介会社）から、ご本人が直接お申し込みください。
      面接・採用の判断・雇用契約は、各掲載企業が行います。NEXT EMPERORが応募者の履歴書や個人情報をお預かりすることはありません。
    </Notice>
  );
}
