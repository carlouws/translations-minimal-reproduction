import i18next from "~/i18next.server";
import type {
  ActionFunction,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";
import { useChangeLanguage } from "remix-i18next";
import { useTranslation } from "react-i18next";
import { i18nCookie } from "./cookie";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css",
    },
  ];
};

type LoaderData = { locale: string };

export const loader: LoaderFunction = async ({ request }) => {
  const locale = await i18next.getLocale(request);
  return json<LoaderData>(
    { locale },
    {
      headers: { "Set-Cookie": await i18nCookie.serialize(locale) },
    }
  );
};

export const action: ActionFunction = async ({ request }) => {
  const bodyParams = await request.formData();
  const language = bodyParams.get("language");

  return json(
    {},
    {
      headers: { "Set-Cookie": await i18nCookie.serialize(language) },
    }
  );
};

export let handle = {
  i18n: "global",
};

export default function App() {
  const { locale } = useLoaderData<LoaderData>();

  const { i18n } = useTranslation();

  useChangeLanguage(locale);

  return (
    <html lang={locale} dir={i18n.dir()}>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Shell />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

const LanguageSelect = () => {
  const { locale } = useLoaderData<LoaderData>();
  const fetcher = useFetcher();

  const handleChange = (event: { currentTarget: HTMLFormElement }) => {
    fetcher.submit(event.currentTarget, { replace: true });
  };

  return (
    <div className="my-auto ml-2">
      <fetcher.Form method="post" onChange={handleChange}>
        <div className="select">
          <select name="language" defaultValue={locale}>
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
        </div>
      </fetcher.Form>
    </div>
  );
};

function Shell() {
  return (
    <>
      <nav className="navbar is-info">
        <div className="navbar-start">
          <LanguageSelect />
        </div>
      </nav>
      <section className="hero is-fullheight-with-navbar has-background-light">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-6 is-offset-3">
              <Outlet />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
