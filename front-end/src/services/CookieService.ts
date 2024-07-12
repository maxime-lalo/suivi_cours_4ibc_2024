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
        console.log(cookie);
        return cookie;
    }
}
