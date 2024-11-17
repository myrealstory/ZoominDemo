
import Profile from "../../component/profile";
import Main from "@/component/main";
import { LocaleKeysType, locales } from "../i18n";
import JobExperience from "@/component/job";
import { Example } from "@/component/example";
import { notFound } from "next/navigation"; // Next.js helper

export type PageProps = {
  params: Promise<{
    lang: LocaleKeysType;
  }>;
};

export async function generateStaticParams() {
  const supportedLocales = ["en", "tc"];
  return supportedLocales.map((lang) => ({ lang }));
}


export default async function Page ({ params }: PageProps) {

  const { lang } = await params;
  const supportedLocales = ["en", "tc"]; // List of supported languages

  if (!supportedLocales.includes(lang)) {
    notFound(); // Returns a 404 page for unsupported languages
    // return <main>Your page content here for lang: {lang}</main>;
  }


  return (
    <main className="h-full w-full relative">
      <Main />
      <Profile lang={lang}/>
      <JobExperience lang={lang}/>
      <Example lang={lang}/>
    </main>
  );
}
