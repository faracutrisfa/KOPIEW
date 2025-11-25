const API_URL = "http://127.0.0.1:8000";

export default function normalizeImageUrl(url) {
    if (url && (url.startsWith("http://") || url.startsWith("https://"))) {
        return url;
    }

    if (url && url.startsWith("/storage")) {
        return `${API_URL}${url}`;
    }

    return "https://blogger.googleusercontent.com/img/a/AVvXsEgFEMze_nmuI79pIvhZ6Nam0oSOUrWz0jTW-WZmhkrfb0gtvuAbTyWcRrDmfBTwDq6nhFSziH9LwV1zD2pkAsK2AmFaiqXlPl4Wp8gLMN5sQ0y0ajM_PeXaFl5DZYU1p6oNdwLR84hqMbPF9z8n_HUGVQAxL0OT4vH7S21SnzZ_GgFaGmyI-lklxLeJ";
}

export function getToken() {
    return localStorage.getItem("token") || null;
}
