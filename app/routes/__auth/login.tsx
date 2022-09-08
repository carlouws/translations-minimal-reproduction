import { useTranslation } from "react-i18next";

export default function LoginRoute() {
  const { t } = useTranslation();

  return (
    <div className="box">
      <form>
        <div className="field">
          <label className="label">{t("email")}</label>
          <div className="control">
            <input className="input" type="text" />
          </div>
        </div>
        <div className="field">
          <label className="label">{t("password")}</label>
          <div className="control">
            <input className="input" type="password" />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button className="button is-info">{t("login")}</button>
          </div>
        </div>
      </form>
    </div>
  );
}
