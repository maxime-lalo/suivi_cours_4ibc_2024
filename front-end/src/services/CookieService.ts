export default class CookieService {
    private static instance: CookieService;

    public static getInstance(): CookieService {
        if (!CookieService.instance) {
            CookieService.instance = new CookieService();
        }

        return CookieService.instance;
    }

    private getCookie(key: string) {
        var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
        return b ? b.pop() : "";
    }

    public getJwtToken(): string | null {
        const cookie = this.getCookie("accessToken");
        if (!cookie) return null;
        return cookie;
    }

    public removeJwtToken() {
        document.cookie =
            "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
}
