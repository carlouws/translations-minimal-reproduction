import { Link } from "@remix-run/react";
import { useTranslation } from "react-i18next";

export default function Index() {
  const { t } = useTranslation();
  return (
    <div>
      <Link to="/login">{t("login")}</Link>
    </div>
  );
}
