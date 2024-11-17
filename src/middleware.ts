import { NextResponse, NextRequest } from "next/server";
// import { RequestCookies, ResponseCookies } from "next/dist/server/web/spec-extension/cookies";
import acceptLanguage from "accept-language";
import { locales } from "./app/i18n";
import { getLangFromString } from "./utils/commonUtils";
import { CookiesKey } from "./constants/cookies";

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
    unstable_allowDynamic: [
      "**/node_modules/lodash/_root.js", // allows a single file
    ],
  }

acceptLanguage.languages(locales);

const checkLocal = (request: NextRequest, response: NextResponse) => {
    // HJSRR-3428
    // if ([`/${ROUTES.APP}`, `/${ROUTES.MOBILE_PAYMENT}`, `/${ROUTES.PLAYGROUND}`].includes(request.nextUrl.pathname)) {
    //   return response;
    // } 
  
    const langFromPathname = getLangFromString(request.nextUrl.pathname);
    const queryParams = request.nextUrl.search;
  
    // Redirect if lang in path is not supported
    if (
      !locales.some(locale => request.nextUrl.pathname.startsWith(`/${locale}`)) &&
      !request.nextUrl.pathname.startsWith("/_next")
    ) {
      response = NextResponse.redirect(
        new URL(`/${langFromPathname}${request.nextUrl.pathname}${queryParams ?? ""}`, request.url)
      );
    }
  
    const referer = request.headers.get("referer");
    let langInReferer: string | undefined = undefined;
    if (referer) {
      const refererUrl = new URL(referer);
      langInReferer = locales.find(locale => refererUrl.pathname.startsWith(`/${locale}`));
    }
  
    if (langInReferer) {
      response.cookies.set(CookiesKey.i18next, langInReferer);
    } else {
      response.cookies.set(CookiesKey.i18next, langFromPathname);
    }
  
    return response;
  };

  export async function middleware(request: NextRequest) {
    // get the path name from server side
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-pathname", request.nextUrl.pathname);
    let response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  
    response = checkLocal(request, response);
    // response = validateIfRouteNeedsToLogin(request, response);
  
    // setIsFooterHidden(response.cookies, request.nextUrl.pathname);
    // setIsDeliveryBarHidden(response.cookies, request.nextUrl.pathname);
    // setDeviceId(request, response);
    return response;
  }